#!/usr/bin/env python3
"""
Tito AI — Telegram Bot Listener
Polls for commands and responds. Runs as a launchd daemon.
"""

import json
import logging
import subprocess
import sys
import time
import traceback
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone, timedelta
from pathlib import Path

# ── Config ─────────────────────────────────────────────────────────────────────
BOT_TOKEN     = "8960239761:AAFKehuxbPQTkB81CnGY3QtSf1JMFUe2qIg"
CHAT_ID       = 8325608814
SCHEDULE_FILE = Path("/Users/jeff/Documents/Claude/TItoAi/docs/schedule.json")
DAILY_SCRIPT  = Path("/Users/jeff/Documents/Claude/TItoAi/scripts/daily_update.py")
TIMELINE_URL  = "https://jeffd1130.github.io/TitoAi/timeline.html"
LOG_FILE      = Path("/Users/jeff/Documents/Claude/TItoAi/scripts/bot_listener.log")
POLL_TIMEOUT  = 30   # seconds for long-polling

PHT = timezone(timedelta(hours=8))

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
    except Exception:
        log.warning("getUpdates failed:\n%s", traceback.format_exc())
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


COMMAND_MAP = {
    "/help":     handle_help,
    "/status":   handle_status,
    "/timeline": handle_timeline,
    "/pending":  handle_pending,
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

                if command in COMMAND_MAP:
                    reply = COMMAND_MAP[command]()
                    send_message(reply)
                elif command.startswith("/"):
                    send_message(
                        f"❓ Unknown command: <code>{command}</code>\n\nSend /help for the list."
                    )
                # Non-command messages are silently ignored

        except KeyboardInterrupt:
            log.info("Interrupted — shutting down.")
            sys.exit(0)
        except Exception:
            log.error("Unhandled exception in main loop:\n%s", traceback.format_exc())
            time.sleep(5)  # brief back-off before retrying


if __name__ == "__main__":
    main()
