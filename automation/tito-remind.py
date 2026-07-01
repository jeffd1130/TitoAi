#!/usr/bin/env python3
"""Drop-day reminder for Tito AI — fires 1 hour before scheduled post times.

Run via cron at 1 hour before each drop (Mac runs on local PHT time —
direct cron values, no offset conversion needed):
  Mon 8 PM PHT drop → fires 7 PM PHT  →  0 19 * * 1
  Wed 7 PM PHT drop → fires 6 PM PHT  →  0 18 * * 3
  Fri 7 PM PHT drop → fires 6 PM PHT  →  0 18 * * 5
"""

import json, os, sys, urllib.request, urllib.parse
from datetime import datetime, timezone, timedelta

BOT_TOKEN = "8960239761:AAFKehuxbPQTkB81CnGY3QtSf1JMFUe2qIg"
CHAT_ID = "8325608814"
BASE_URL = "https://jeffd1130.github.io/TitoAi/"

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEDULE_PATH = os.path.join(REPO_DIR, "docs", "schedule.json")

PHT = timezone(timedelta(hours=8))
now = datetime.now(PHT)
today_str = now.strftime("%b ") + str(now.day)   # e.g. "Jun 26"
day_name = now.strftime("%A")

DROP_TIMES = {"MON": "8:00 PM", "WED": "7:00 PM", "FRI": "7:00 PM"}
BUFFER_URL = "https://buffer.com"

with open(SCHEDULE_PATH) as f:
    data = json.load(f)

# Find posts dropping today that are not yet posted
today_drops = []
for w in data["weeks"]:
    for p in w.get("posts", []):
        if p.get("date") == today_str and p.get("status") not in ("posted", "live"):
            today_drops.append((w, p))

if not today_drops:
    print(f"No drops today ({today_str} PHT) — nothing to remind.")
    sys.exit(0)


def send_telegram(text):
    payload = urllib.parse.urlencode({
        "chat_id": CHAT_ID,
        "text": text,
        "parse_mode": "HTML",
        "disable_web_page_preview": "1",
    }).encode()
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        data=payload,
        method="POST",
    )
    req.add_header("Content-Type", "application/x-www-form-urlencoded")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())


for w, p in today_drops:
    drop_time = DROP_TIMES.get(p["day"], "7:00 PM")
    tag = p.get("tag", "Reel")
    boost_line = f"\n💰 Boost: {w['boost']}" if w.get("boost") else ""

    lines = [
        f"🚨 <b>DROP IN 1 HOUR — TITO AI</b>",
        "",
        f"📅 {day_name} {today_str} · <b>{drop_time} PHT</b>",
        f"🏷️ {w['id']} · {p['day']} · {tag}{boost_line}",
        f"🎬 <b>{p['title']}</b>",
        "",
        "<b>Pre-post checklist:</b>",
        "  ☐ Captions copied",
        "  ☐ Video / slides exported",
        "  ☐ TikTok scheduled in Buffer",
        "  ☐ IG + FB queued",
        "  ☐ First comment ready (pin within 5 min of posting)",
        "",
    ]

    if p.get("url"):
        lines.append(f'📄 <a href="{BASE_URL}{p["url"]}">Captions + Canva →</a>')
    lines.append(f'📅 <a href="{BUFFER_URL}">Open Buffer →</a>')
    lines.append("")
    lines.append(f'<a href="{BASE_URL}">Hub</a> · <a href="{BASE_URL}links.html">All Links</a>')

    result = send_telegram("\n".join(lines))
    if result.get("ok"):
        print(f"✅ Drop reminder sent — {p['day']} {today_str} {drop_time} PHT")
    else:
        print(f"❌ Error: {result}")
        raise SystemExit(1)
