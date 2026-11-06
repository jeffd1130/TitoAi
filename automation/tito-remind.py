#!/usr/bin/env python3
"""Post-day reminder for Tito AI — fires 1 hour before each post time.

The Mac runs on PHT ("PST" = Philippine Standard Time), so cron uses PHT values directly:
  Mon 8 PM post → 7 PM reminder → 0 19 * * 1
  Wed 7 PM post → 6 PM reminder → 0 18 * * 3
  Fri 7 PM post → 6 PM reminder → 0 18 * * 5

If Tito AI Studio is running, today's posts come from it and each one is followed by its
media + per-platform captions (the Studio's Send to Telegram). Otherwise it falls back to
docs/schedule.json and sends the reminder text only.
"""

import json, os, sys, urllib.request, urllib.parse
from datetime import datetime, timezone, timedelta

CHAT_ID = "8325608814"
STUDIO = "http://localhost:4545"
BASE_URL = "https://jeffd1130.github.io/TitoAi/"
REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def bot_token():
    if os.environ.get("TITO_TELEGRAM_TOKEN"):
        return os.environ["TITO_TELEGRAM_TOKEN"]
    with open(os.path.join(REPO_DIR, ".telegram-token")) as f:   # gitignored
        return f.read().strip()


PHT = timezone(timedelta(hours=8))
now = datetime.now(PHT)
today_iso = now.strftime("%Y-%m-%d")
today_str = now.strftime("%b ") + str(now.day)   # schedule.json style, e.g. "Nov 6"
DROP_TIMES = {"MON": "8:00 PM", "WED": "7:00 PM", "FRI": "7:00 PM"}


def send_telegram(text):
    payload = urllib.parse.urlencode({"chat_id": CHAT_ID, "text": text, "parse_mode": "HTML",
                                      "disable_web_page_preview": "1"}).encode()
    req = urllib.request.Request(f"https://api.telegram.org/bot{bot_token()}/sendMessage", data=payload, method="POST")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())


def studio(path, body=None):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(STUDIO + path, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=180) as resp:
        return json.loads(resp.read())


def esc(t):
    return str(t).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def reminder(title, when, extra=""):
    return "\n".join([
        "🚨 <b>POST IN 1 HOUR — TITO AI</b>", "",
        f"📅 {now.strftime('%A')} {today_str} · <b>{esc(when)} PHT</b>",
        f"🎬 <b>{esc(title)}</b>", "",
        "<b>Checklist:</b>",
        "  ☐ Post natively on TikTok, IG and FB (captions follow below)",
        "  ☐ Seed + pin the first comment within 5 min",
        "  ☐ Tap Mark posted in Tito AI Studio",
        extra,
    ]).rstrip()


# 1) Studio first: today's unposted posts, with media + captions.
try:
    posts = studio("/api/posts")
except Exception:
    posts = None

if posts is not None:
    due = [p for p in posts if (p.get("slot") or "").startswith(today_iso) and len((p.get("state") or {}).get("posted") or {}) < 3]
    if not due:
        print(f"No posts due today ({today_iso} PHT) — nothing to remind.")
        sys.exit(0)
    for p in due:
        when = datetime.strptime(p["slot"], "%Y-%m-%dT%H:%M").strftime("%-I:%M %p")
        approved = (p.get("state") or {}).get("approved")
        res = send_telegram(reminder(p["title"], when, "" if approved else "\n⚠️ Not approved yet in Approve & Post."))
        if not res.get("ok"):
            raise SystemExit(f"❌ Telegram error: {res}")
        try:
            studio(f"/api/posts/{p['id']}/telegram", {})
            print(f"✅ Reminder + post package sent — {p['id']} {when} PHT")
        except Exception as e:
            print(f"⚠️ Reminder sent, media/captions failed for {p['id']}: {e}")
    sys.exit(0)

# 2) Fallback: schedule.json, reminder text only.
with open(os.path.join(REPO_DIR, "docs", "schedule.json")) as f:
    data = json.load(f)
due = [p for w in data["weeks"] for p in w.get("posts", []) if p.get("date") == today_str and p.get("status") not in ("posted", "live")]
if not due:
    print(f"No posts due today ({today_str} PHT) — nothing to remind.")
    sys.exit(0)
for p in due:
    extra = "\nℹ️ Tito AI Studio isn't running, so media and captions weren't attached. Start it and press 📨 Send to Telegram."
    if p.get("url"):
        extra += f'\n📄 <a href="{BASE_URL}{p["url"]}">Captions page →</a>'
    res = send_telegram(reminder(p["title"], DROP_TIMES.get(p["day"], "7:00 PM"), extra))
    print("✅ Reminder sent (no Studio)" if res.get("ok") else f"❌ Telegram error: {res}")
