#!/usr/bin/env python3
"""
Tito AI — Telegram Bot Listener
Polls for commands and responds. Runs as a launchd daemon.
"""

import os
import json
import logging
import subprocess
import sys
import time
import threading
import traceback
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

# ── Config ─────────────────────────────────────────────────────────────────────
BOT_TOKEN     = os.environ.get("TITO_TELEGRAM_TOKEN") or open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), ".telegram-token")).read().strip()   # gitignored
CHAT_ID       = 8325608814
SCHEDULE_FILE = Path("/Users/jeff/Documents/Claude/TItoAi/docs/schedule.json")
DAILY_SCRIPT  = Path("/Users/jeff/Documents/Claude/TItoAi/scripts/daily_update.py")
TIMELINE_URL  = "https://jeffd1130.github.io/TitoAi/timeline.html"
LOG_FILE      = Path("/Users/jeff/Documents/Claude/TItoAi/scripts/bot_listener.log")
POLL_TIMEOUT  = 30   # seconds for long-polling

PHT = timezone(timedelta(hours=8))

# Alliance daily-report commands for the Alliance group chat (handled by the Alliance project)
STATUS_EMOJI = {
    "posted":  "✅",
    "draft":   "📝",
    "planned": "📋",
    "tbd":     "❓",
}

# ── Logging ─────────────────────────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s",
    handlers=[
        logging.FileHandler(LOG_FILE),
        logging.StreamHandler(sys.stdout),
    ],
)
log = logging.getLogger(__name__)


# ── Telegram API helpers ────────────────────────────────────────────────────────
BASE = f"https://api.telegram.org/bot{BOT_TOKEN}"


def _call(method: str, payload: dict) -> dict:
    """POST to Telegram API; raise on HTTP or API error."""
    data = json.dumps(payload).encode()
    req  = urllib.request.Request(
        f"{BASE}/{method}",
        data=data,
        headers={"Content-Type": "application/json"},
    )
    with urllib.request.urlopen(req, timeout=POLL_TIMEOUT + 5) as resp:
        return json.loads(resp.read())


def get_updates(offset: int) -> list:
    try:
        result = _call("getUpdates", {"timeout": POLL_TIMEOUT, "offset": offset})
        return result.get("result", [])
    except urllib.error.HTTPError as e:
        if e.code == 409:
            # Another instance is polling this token — wait instead of spinning
            log.warning("getUpdates 409 Conflict: another bot instance is running. Retrying in 60s.")
            time.sleep(60)
        else:
            log.warning("getUpdates HTTP %s. Retrying in 10s.", e.code)
            time.sleep(10)
        return []
    except Exception:
        log.warning("getUpdates failed:\n%s", traceback.format_exc())
        time.sleep(10)
        return []


def send_message(text: str) -> None:
    try:
        _call("sendMessage", {
            "chat_id":    CHAT_ID,
            "text":       text,
            "parse_mode": "HTML",
        })
    except Exception:
        log.error("sendMessage failed:\n%s", traceback.format_exc())


# ── Command handlers ────────────────────────────────────────────────────────────
def handle_help() -> str:
    return (
        "<b>🤖 Tito AI Bot — Commands</b>\n\n"
        "/status — Run daily update &amp; show current status\n"
        "/timeline — Get the live content timeline URL\n"
        "/pending — List posts that need approval\n"
        "/send — Send the next post (media + captions) from Tito AI Studio\n"
        "/send &lt;post-id&gt; — Send a specific post\n"
        "/posts — List upcoming posts and their ids\n"
        "Any other message goes to 🎙️ Tito AI (chief of staff) in the Studio; replies come back here.\n"
        "/help — Show this message"
    )


def handle_timeline() -> str:
    return (
        f"📅 <b>Content Timeline</b>\n\n"
        f'<a href="{TIMELINE_URL}">View Timeline →</a>'
    )


def handle_status() -> str:
    # Run daily_update.py and capture output
    try:
        result = subprocess.run(
            [sys.executable, str(DAILY_SCRIPT)],
            capture_output=True,
            text=True,
            timeout=60,
        )
        output = (result.stdout + result.stderr).strip()
        if output:
            # Trim to 3800 chars to stay under Telegram's 4096-char limit
            if len(output) > 3800:
                output = output[:3800] + "\n…(truncated)"
            return f"<b>📊 Status Update</b>\n\n<pre>{output}</pre>"
        return "<b>📊 Status Update</b>\n\ndaily_update.py ran with no output."
    except subprocess.TimeoutExpired:
        return "⚠️ daily_update.py timed out (60 s)."
    except Exception:
        return f"⚠️ Failed to run daily_update.py:\n<pre>{traceback.format_exc()[:1000]}</pre>"


def handle_pending() -> str:
    try:
        data = json.loads(SCHEDULE_FILE.read_text())
    except Exception as exc:
        return f"⚠️ Could not read schedule.json: {exc}"

    lines = []
    for week in data.get("weeks", []):
        for post in week.get("posts", []):
            status = post.get("status", "tbd").lower()
            if status in ("draft", "planned", "tbd"):
                emoji = STATUS_EMOJI.get(status, "❓")
                week_id = week.get("id", "?")
                day     = post.get("day", "")
                title   = post.get("title", "Untitled")
                date    = post.get("date", "")
                lines.append(
                    f"{emoji} <b>[{week_id} {day}]</b> {title}"
                    + (f" · <i>{date}</i>" if date else "")
                    + "\n   ⚠️ <b>NEEDS APPROVAL</b>"
                )

    if not lines:
        return "✅ <b>No pending posts.</b>\n\nAll posts are either published or have no drafts yet."

    now_pht = datetime.now(PHT).strftime("%b %d, %Y %H:%M PHT")
    header  = f"<b>📋 Pending Posts</b> — {now_pht}\n\n"
    return header + "\n\n".join(lines)


# ── Studio: send a post's media + captions (needs Tito AI Studio running) ──────
STUDIO = "http://localhost:4545"


def _studio(path: str, body=None, timeout=180):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(STUDIO + path, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return json.loads(r.read())


def _open_posts():
    posts = [p for p in _studio("/api/posts", timeout=15) if p.get("slot") and len((p.get("state") or {}).get("posted") or {}) < 3]
    return sorted(posts, key=lambda p: p["slot"])


def handle_posts() -> str:
    try:
        posts = _open_posts()
    except Exception:
        return "⚠️ Tito AI Studio isn't running on the Mac. Start it with <code>bash studio/start.sh</code>."
    lines = [f"• <b>{p['slot'].replace('T', ' ')}</b> {'✅' if (p.get('state') or {}).get('approved') else '📝'} {p['title']}\n  <code>/send {p['id']}</code>" for p in posts]
    return "<b>📋 Upcoming posts</b>\n\n" + ("\n".join(lines) or "Nothing lined up.")


def handle_send(post_id: str = "") -> str:
    try:
        posts = _open_posts()
    except Exception:
        return "⚠️ Tito AI Studio isn't running on the Mac, so I can't send the files. Start it with <code>bash studio/start.sh</code>."
    post = next((p for p in posts if p["id"] == post_id), None) if post_id else (posts[0] if posts else None)
    if not post:
        return f"❓ No upcoming post called <code>{post_id}</code>. Send /posts for the list." if post_id else "Nothing lined up to send."
    send_message(f"📨 Sending <b>{post['title']}</b>… (video or slides, then each caption)")
    try:
        _studio(f"/api/posts/{post['id']}/telegram", {})
        return "✅ Done. Long-press the video or slides to save them, and long-press a caption to copy it."
    except Exception as e:
        return f"⚠️ Sending failed: {e}"


# ── Chat with Tito AI (chief of staff) from Telegram ─────────────────────────────
def _run(run_id: str):
    runs = _studio("/api/bootstrap", timeout=20)["runs"]
    return next((r for r in runs if r["id"] == run_id), None)


def _watch_reply(run_id: str, start: int) -> None:
    """Send Tito AI's new replies to Telegram whenever the chat goes idle; stop after 45 min."""
    sent, quiet, deadline = start, 0, time.time() + 45 * 60
    while time.time() < deadline:
        time.sleep(15)
        try:
            run = _run(run_id)
        except Exception:
            continue
        if not run or run.get("status") == "running":
            quiet = 0
            continue
        events = run.get("events") or []
        replies = [e["text"] for e in events[sent:] if e.get("kind") == "text" and e.get("text")]
        if replies:
            body = "\n\n".join(replies).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")
            send_message("🎙️ <b>Tito AI</b>\n\n" + body[:3800])
            sent, quiet = len(events), 0
        else:
            quiet += 1
            if quiet >= 40:          # ~10 min idle with nothing new
                return


def handle_chat(text: str) -> str:
    try:
        run = _studio("/api/main", {"text": text}, timeout=20)
    except urllib.error.HTTPError as e:
        return f"⚠️ Tito AI couldn't take that: {e.read().decode(errors='ignore')[:200]}"
    except Exception:
        return "⚠️ Tito AI Studio isn't running on the Mac. Start it with <code>bash studio/start.sh</code>."
    threading.Thread(target=_watch_reply, args=(run["id"], len(run.get("events") or [])), daemon=True).start()
    return "🎙️ Got it. Tito AI is working on it; the reply will come here."


COMMAND_MAP = {
    "/help":     handle_help,
    "/status":   handle_status,
    "/timeline": handle_timeline,
    "/pending":  handle_pending,
    "/posts":    handle_posts,
    "/start":    handle_help,
}


# ── Main loop ───────────────────────────────────────────────────────────────────
def main() -> None:
    log.info("Bot listener starting up.")
    send_message("🤖 Tito AI bot online · Send /help for commands")

    offset = 0
    while True:
        try:
            updates = get_updates(offset)
            for update in updates:
                offset = update["update_id"] + 1

                msg = update.get("message") or update.get("edited_message")
                if not msg:
                    continue

                # Authorisation gate — silently ignore anyone else
                from_chat = msg.get("chat", {}).get("id")
                if from_chat != CHAT_ID:
                    log.info("Ignored message from chat_id=%s", from_chat)
                    continue

                text = (msg.get("text") or "").strip()
                # Strip bot username suffix (e.g. /help@titoaiph_bot)
                command = text.split("@")[0].split()[0].lower() if text else ""

                log.info("Received command: %r", command)

                args = text.split()[1:]
                if command in ("/send", "/start") and (command == "/send" or args):
                    # /start send_<id> comes from the Mobile Hub's t.me link; /start next sends the next post
                    arg = args[0] if args else ""
                    arg = arg[len("send_"):] if arg.startswith("send_") else ("" if arg == "next" else arg)
                    send_message(handle_send(arg))
                elif command in COMMAND_MAP:
                    reply = COMMAND_MAP[command]()
                    send_message(reply)
                elif command.startswith("/"):
                    send_message(
                        f"❓ Unknown command: <code>{command}</code>\n\nSend /help for the list."
                    )
                elif text:
                    send_message(handle_chat(text))

        except KeyboardInterrupt:
            log.info("Interrupted — shutting down.")
            sys.exit(0)
        except Exception:
            log.error("Unhandled exception in main loop:\n%s", traceback.format_exc())
            time.sleep(5)  # brief back-off before retrying


if __name__ == "__main__":
    main()
