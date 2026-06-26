#!/usr/bin/env python3
"""D-3 media recording reminder — fires 3 days before each post day.

Fires at 9:00 AM Manila time:
  Friday   → D-3 for Monday post      cron: 0 17 * * 4
  Sunday   → D-3 for Wednesday post   cron: 0 17 * * 6
  Tuesday  → D-3 for Friday post      cron: 0 17 * * 1
"""

import json, os, sys, urllib.request, urllib.parse
from datetime import datetime, timezone, timedelta, date

BOT_TOKEN = "8960239761:AAFKehuxbPQTkB81CnGY3QtSf1JMFUe2qIg"
CHAT_ID = "8325608814"
BASE_URL = "https://jeffd1130.github.io/TitoAi/"
VIDEO_DIR = "Videos/"

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEDULE_PATH = os.path.join(REPO_DIR, "docs", "schedule.json")

PHT = timezone(timedelta(hours=8))
now = datetime.now(PHT)
today = now.date()
target = today + timedelta(days=3)   # D-3: post drops in 3 days

DROP_TIMES = {"MON": "8:00 PM", "WED": "7:00 PM", "FRI": "7:00 PM"}
FORMAT_TIPS = {
    "MON": "30–60s · talking head · one AI tip · clean background",
    "WED": "60–90s · split screen: face + screen share · tool demo",
    "FRI": "60–90s · close-up · emotional story · direct eye contact",
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
    print(f"No posts in 3 days ({target}) — no recording reminder needed.")
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
    fmt = FORMAT_TIPS.get(drop_day, "60–90s · talking head")
    drop_date = p.get("date", target.strftime("%b %-d"))
    tag = p.get("tag", "Reel")

    lines = [
        f"🎬 <b>RECORD TODAY — D-3 REMINDER</b>",
        "",
        f"📅 Post drops: <b>{drop_day} {drop_date} · {drop_time} PHT</b>",
        f"🏷️ {w['id']} · {tag}",
        f"📌 <b>{p['title']}</b>",
        "",
        f"<b>Recording specs:</b>",
        f"  · {fmt}",
        f"  · Natural light or ring light",
        f"  · Quiet background, no echo",
        f"  · Phone vertical 9:16 (TikTok-first)",
        f"  · Record 2–3 takes minimum",
        "",
        f"<b>After recording:</b>",
        f"  1. Save to <code>Videos/</code> in TitoAi project",
        f"  2. Name clearly: <code>W{w['id'][1:]}-{drop_day.lower()}-take1.mp4</code>",
        f"  3. Claude Code will pick it up for D-2 production",
        "",
        f"<i>D-2 content creation reminder arrives tomorrow morning.</i>",
        "",
        f'<a href="{BASE_URL}">Hub</a> · <a href="{BASE_URL}links.html">All Links</a>',
    ]

    result = send_telegram("\n".join(lines))
    if result.get("ok"):
        print(f"✅ Recording reminder sent — D-3 for {drop_day} {drop_date}")
    else:
        print(f"❌ Error: {result}")
        raise SystemExit(1)
