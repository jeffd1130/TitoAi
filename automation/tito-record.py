#!/usr/bin/env python3
"""D-3 asset prep reminder — fires 3 days before each post day.

Fires at 9:00 AM PHT (Mac runs on local PHT time — direct cron values):
  Friday   → D-3 for Monday post      cron: 0 9 * * 5
  Sunday   → D-3 for Wednesday post   cron: 0 9 * * 0
  Tuesday  → D-3 for Friday post      cron: 0 9 * * 2
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
target = today + timedelta(days=3)   # D-3: post drops in 3 days

DROP_TIMES = {"MON": "8:00 PM", "WED": "7:00 PM", "FRI": "7:00 PM"}

# What assets each slot needs on carousel
ASSET_TIPS = {
    "MON": [
        "S1 — hook background photo (Filipino at work, clean desk, laptop)",
        "S4 — screenshot of Claude output for the prompt formula",
    ],
    "WED": [
        "S1 — hook background photo (freelancer, guro, BPO, or small biz context)",
        "S4 — screenshot of Claude output for the demo prompt",
    ],
    "FRI": [
        "Cover photo or still from the story (real, not stock)",
        "Optional: behind-the-scenes or face photo for authenticity",
    ],
}


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
        if d == target and p.get("status") not in ("posted", "live"):
            upcoming.append((w, p))

if not upcoming:
    print(f"No posts in 3 days ({target}) — no asset prep reminder needed.")
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
    tag = p.get("tag", "Carousel")
    assets = ASSET_TIPS.get(drop_day, ["S1 photo", "S4 screenshot"])
    canva_note = p.get("note", "")

    asset_lines = "\n".join(f"  · {a}" for a in assets)

    lines = [
        f"📋 <b>ASSET PREP — D-3 REMINDER</b>",
        "",
        f"📅 Post drops: <b>{drop_day} {drop_date} · {drop_time} PHT</b>",
        f"🏷️ {w['id']} · {tag}",
        f"📌 <b>{p['title']}</b>",
        "",
        f"<b>Gather these assets for Canva today:</b>",
        asset_lines,
        "",
        f"<b>How to add them:</b>",
        f"  1. Open the Canva design (link in captions page)",
        f"  2. Upload photo → place on S1 as background",
        f"  3. Take Claude screenshot → upload → place on S4 top-right zone",
        "",
        f"<i>D-2 content creation reminder arrives tomorrow morning.</i>",
        "",
        f'<a href="{BASE_URL}">Hub</a> · <a href="{BASE_URL}links.html">All Links</a>',
    ]

    result = send_telegram("\n".join(lines))
    if result.get("ok"):
        print(f"✅ Asset prep reminder sent — D-3 for {drop_day} {drop_date}")
    else:
        print(f"❌ Error: {result}")
        raise SystemExit(1)
