#!/usr/bin/env python3
"""Weekly production reminder for Tito AI — sent Saturday 9 AM PHT.

Reads schedule.json and reports which upcoming posts still need production,
prompting Jeff to open Claude Code and generate content.

Cron: 0 9 * * 6   (9:00 AM PHT Saturday — Mac runs on local PHT time)
"""

import json, os, urllib.request, urllib.parse
from datetime import datetime, timezone, timedelta

BOT_TOKEN = "8960239761:AAFKehuxbPQTkB81CnGY3QtSf1JMFUe2qIg"
CHAT_ID = "8325608814"
BASE_URL = "https://jeffd1130.github.io/TitoAi/"

REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SCHEDULE_PATH = os.path.join(REPO_DIR, "docs", "schedule.json")

PHT = timezone(timedelta(hours=8))
now = datetime.now(PHT)
date_str = now.strftime("%b ") + str(now.day) + now.strftime(", %Y")

STATUS_ICON = {"posted": "✅", "live": "✅", "draft": "📝", "planned": "🕐", "ready": "🟡"}

with open(SCHEDULE_PATH) as f:
    data = json.load(f)

weeks = data["weeks"]
ci = next((i for i, w in enumerate(weeks) if w.get("highlight")), max(0, len(weeks) - 3))

# Show next 2 weeks (next + upcoming), find what needs production
upcoming_weeks = weeks[ci + 1:ci + 3]
needs_work = []
for w in upcoming_weeks:
    pending = [p for p in w.get("posts", []) if p.get("status") not in ("posted", "live", "draft", "ready")]
    if pending:
        needs_work.append((w, pending))

lines = [
    f"📅 <b>TITO AI — WEEKLY PRODUCTION CHECK</b>",
    f"<i>{date_str} PHT · Saturday morning</i>",
    "",
]

if not upcoming_weeks:
    lines.append("⚠️ No upcoming weeks found in schedule. Update schedule.json.")
else:
    for w in upcoming_weeks:
        posts = w.get("posts", [])
        all_done = all(p.get("status") in ("posted", "live", "draft", "ready") for p in posts)
        status_line = "✅ All drafted" if all_done else "⚠️ Needs production"
        lines.append(f"<b>{w['id']} · {w['range']}</b>  {status_line}")
        for p in posts:
            icon = STATUS_ICON.get(p["status"], "🕐")
            link = f' <a href="{BASE_URL}{p["url"]}">↗</a>' if p.get("url") else ""
            lines.append(f"  {icon} {p['day']} {p['date']} — {p['title'][:42]}{link}")
        lines.append("")

if needs_work:
    lines.append("📋 <b>Pending production this weekend:</b>")
    for w, pending in needs_work:
        for p in pending:
            lines.append(f"  · {w['id']} {p['day']} — {p['title'][:50]}")
    lines.append("")
    lines.append("Open <b>Claude Code</b> → TitoAi project")
    lines.append('Type: <code>produce-week W##</code> to generate scripts, captions, and Canva slides')
    lines.append("")

lines.append(f'<a href="{BASE_URL}">Hub</a> · <a href="{BASE_URL}timeline.html">Timeline</a> · <a href="{BASE_URL}links.html">All Links</a>')

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
    print(f"✅ Weekly production reminder sent ({date_str} PHT)")
else:
    print(f"❌ Error: {result}")
    raise SystemExit(1)
