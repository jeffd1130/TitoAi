#!/usr/bin/env python3
"""Daily status summary for Tito AI — reads schedule.json and sends via Telegram."""

import json, os, urllib.request, urllib.parse
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
date_str = now.strftime("%b ") + str(now.day) + now.strftime(", %Y")

STATUS_ICON = {"posted": "✅", "live": "✅", "draft": "📝", "planned": "🕐", "ready": "🟡"}
DROP_TIMES = {"MON": "8:00 PM", "WED": "7:00 PM", "FRI": "7:00 PM"}

with open(SCHEDULE_PATH) as f:
    data = json.load(f)

weeks = data["weeks"]
ci = next((i for i, w in enumerate(weeks) if w.get("highlight")), max(0, len(weeks) - 3))
show_weeks = weeks[ci:ci + 3]

# Check for any posts dropping today
today_drops = []
for w in weeks:
    for p in w.get("posts", []):
        if p.get("date") == today_str and p.get("status") not in ("posted", "live"):
            today_drops.append((w, p))

# Build message
lines = [f"📋 <b>TITO AI — {day_name.upper()} {date_str} PHT</b>", ""]

week_labels = {0: "⭐ CURRENT", 1: "🔜 NEXT", 2: "📅 UPCOMING"}
for idx, w in enumerate(show_weeks):
    label = week_labels.get(idx, w["id"])
    lines.append(f"<b>{label} · {w['id']} · {w['range']}</b>")
    for p in w.get("posts", []):
        icon = STATUS_ICON.get(p["status"], "🕐")
        drop = DROP_TIMES.get(p["day"], "")
        today_flag = " 🔴 TODAY" if p.get("date") == today_str and p.get("status") not in ("posted", "live") else ""
        title = p["title"][:42] + "…" if len(p["title"]) > 42 else p["title"]
        link = f' <a href="{BASE_URL}{p["url"]}">↗</a>' if p.get("url") else ""
        lines.append(f"  {icon} {p['day']} {p['date']} {drop} — {title}{today_flag}{link}")
    lines.append("")

if today_drops:
    lines.append("🔴 <b>DROP TODAY:</b>")
    for w, p in today_drops:
        drop = DROP_TIMES.get(p["day"], "7:00 PM")
        lines.append(f"  {p['day']} · {drop} PHT · {p['title']}")
        if p.get("url"):
            lines.append(f'  <a href="{BASE_URL}{p["url"]}">Open captions + Canva →</a>')
    lines.append("")

lines.append(f'<a href="{BASE_URL}">Hub</a> · <a href="{BASE_URL}links.html">All Links</a> · <a href="{BASE_URL}timeline.html">Timeline</a>')

msg = "\n".join(lines)


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


result = send_telegram(msg)
if result.get("ok"):
    print(f"✅ Daily summary sent ({date_str} PHT)")
else:
    print(f"❌ Error: {result}")
    raise SystemExit(1)
