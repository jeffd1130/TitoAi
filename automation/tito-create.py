#!/usr/bin/env python3
"""D-2 content creation reminder — fires 2 days before each post day.

Fires at 9:00 AM PHT (Mac runs on local PHT time — direct cron values):
  Saturday  → D-2 for Monday post      cron: 0 9 * * 6
  Monday    → D-2 for Wednesday post   cron: 0 9 * * 1
  Wednesday → D-2 for Friday post      cron: 0 9 * * 3
"""

import json, os, sys, urllib.request, urllib.parse
from datetime import datetime, timezone, timedelta, date

BOT_TOKEN = "8960239761:AAFKehuxbPQTkB81CnGY3QtSf1JMFUe2qIg"
CHAT_ID = "8325608814"
BASE_URL = "https://jeffd1130.github.io/TitoAi/"

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEDULE_PATH = os.path.join(REPO_DIR, "docs", "schedule.json")

PHT = timezone(timedelta(hours=8))
now = datetime.now(PHT)
today = now.date()
target = today + timedelta(days=2)   # D-2: post drops in 2 days

DROP_TIMES = {"MON": "8:00 PM", "WED": "7:00 PM", "FRI": "7:00 PM"}
SLOT_CMD = {"MON": "01-mon-ai-tip", "WED": "02-wed-demo", "FRI": "03-fri-inspiration"}


def parse_date(date_str, ref_year):
    for yr in (ref_year, ref_year + 1):
        try:
            d = datetime.strptime(f"{date_str} {yr}", "%b %d %Y").date()
            if abs((d - today).days) <= 365:
                return d
        except ValueError:
            pass
    return None


with open(SCHEDULE_PATH) as f:
    data = json.load(f)

upcoming = []
for w in data["weeks"]:
    for p in w.get("posts", []):
        d = parse_date(p.get("date", ""), today.year)
        if d == target and p.get("status") not in ("posted", "live", "draft", "ready"):
            upcoming.append((w, p))

if not upcoming:
    print(f"No unproduced posts in 2 days ({target}) — no content creation reminder needed.")
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


for w, p in upcoming:
    drop_day = p["day"]
    drop_time = DROP_TIMES.get(drop_day, "7:00 PM")
    drop_date = p.get("date", target.strftime("%b %-d"))
    slot = SLOT_CMD.get(drop_day, drop_day.lower())
    tag = p.get("tag", "Reel")
    week_id = w["id"]

    lines = [
        f"✍️ <b>CREATE CONTENT TODAY — D-2 REMINDER</b>",
        "",
        f"📅 Post drops: <b>{drop_day} {drop_date} · {drop_time} PHT</b>",
        f"🏷️ {week_id} · {tag}",
        f"📌 <b>{p['title']}</b>",
        "",
        f"<b>Production checklist:</b>",
        f"  ☐ Script written (scene-by-scene)",
        f"  ☐ Captions drafted (TikTok / IG / FB)",
        f"  ☐ Canva carousel slides designed (if carousel)",
        f"  ☐ Approval page pushed to GitHub Pages",
        f"  ☐ Canva edit link + approval link sent to Telegram",
        "",
        f"<b>Open Claude Code → TitoAi project and run:</b>",
        f"<code>produce-post {slot}</code>",
        "",
        f"<i>Target: fully approved by tomorrow (D-1). Drops {drop_day} {drop_date} at {drop_time} PHT.</i>",
        "",
        f'<a href="{BASE_URL}">Hub</a> · <a href="{BASE_URL}timeline.html">Timeline</a>',
    ]

    result = send_telegram("\n".join(lines))
    if result.get("ok"):
        print(f"✅ Content creation reminder sent — D-2 for {drop_day} {drop_date}")
    else:
        print(f"❌ Error: {result}")
        raise SystemExit(1)
