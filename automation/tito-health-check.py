#!/usr/bin/env python3
"""Weekly health check reminder for Tito AI — fires every Monday 8 AM PHT.

Cron: 0 8 * * 1  (Mac on PHT — direct hour, no offset needed)
"""

import urllib.request, urllib.parse
from datetime import datetime, timezone, timedelta

BOT_TOKEN = "8960239761:AAFKehuxbPQTkB81CnGY3QtSf1JMFUe2qIg"
CHAT_ID = "8325608814"
PHT = timezone(timedelta(hours=8))
now = datetime.now(PHT)
date_str = now.strftime("%b %-d, %Y")

msg = f"""🩺 <b>TITO AI — Weekly Health Check</b>
{date_str} · 8 AM PHT

Open Claude Code in the TitoAi directory and say:
<code>do health check</code>

Then run the tab opener:
<code>sh scripts/health-check-open.sh</code>

Checklist:
• IG followers + insights (30d)
• TikTok views + followers (7d)
• Write report to reports/
• Send Telegram summary"""

data = urllib.parse.urlencode({
    "chat_id": CHAT_ID,
    "text": msg,
    "parse_mode": "HTML"
}).encode()

req = urllib.request.Request(
    f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
    data=data
)
with urllib.request.urlopen(req) as resp:
    print(resp.read().decode())
