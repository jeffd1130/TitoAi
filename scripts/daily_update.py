#!/usr/bin/env python3
"""
Tito AI — Daily Status Update
Runs at 4 PM PST (8 AM PHT) every day.
Reads docs/schedule.json, updates "updated" date, commits + pushes, sends Telegram digest.
"""

import json, subprocess, sys, urllib.request, urllib.parse
from datetime import datetime, timezone, timedelta
from pathlib import Path

# ── Config ────────────────────────────────────────────────────────────────────
REPO_DIR    = Path("/Users/jeff/Documents/Claude/TItoAi")
SCHEDULE    = REPO_DIR / "docs/schedule.json"
BOT_TOKEN   = "8960239761:AAFKehuxbPQTkB81CnGY3QtSf1JMFUe2qIg"
CHAT_ID     = "8325608814"
TIMELINE_URL = "https://jeffd1130.github.io/TitoAi/timeline.html"

PHT = timezone(timedelta(hours=8))

STATUS_EMOJI = {
    "posted":  "✅",
    "draft":   "📝",
    "planned": "📋",
    "tbd":     "❓",
}

BOOST_EMOJI = {
    "TikTok":    "🎵",
    "Instagram": "📸",
    "Facebook":  "📘",
}

DAY_LABEL = {
    "MON": "Mon",
    "TUE": "Tue",
    "WED": "Wed",
    "THU": "Thu",
    "FRI": "Fri",
    "SAT": "Sat",
    "SUN": "Sun",
}

def send_telegram(text):
    payload = json.dumps({"chat_id": CHAT_ID, "parse_mode": "HTML", "text": text}).encode()
    req = urllib.request.Request(
        f"https://api.telegram.org/bot{BOT_TOKEN}/sendMessage",
        data=payload, headers={"Content-Type": "application/json"}, method="POST"
    )
    with urllib.request.urlopen(req, timeout=10) as r:
        return json.loads(r.read())

def git(cmd):
    result = subprocess.run(["git"] + cmd, cwd=REPO_DIR, capture_output=True, text=True)
    return result.returncode == 0

def current_and_next_week(weeks, today_str):
    current = next_wk = None
    for i, w in enumerate(weeks):
        # Find the first week with any non-posted post = current/active week
        has_upcoming = any(p["status"] != "posted" for p in w["posts"])
        if has_upcoming and current is None:
            current = w
            if i + 1 < len(weeks):
                next_wk = weeks[i + 1]
            break
    return current, next_wk

def format_post(p):
    em = STATUS_EMOJI.get(p["status"], "❓")
    day = DAY_LABEL.get(p["day"], p["day"])
    boost = f" · {BOOST_EMOJI.get(p.get('boost',''), '')} Boost" if p.get("boost") else ""
    tag = f" [{p['tag']}]" if p.get("tag") else ""
    needs_approval = " ⚠️ <b>NEEDS APPROVAL</b>" if p["status"] == "draft" else ""
    note = f"\n    <i>{p['note']}</i>" if p.get("note") else ""
    return f"{em} {day} {p['date']} — {p['title']}{tag}{boost}{needs_approval}{note}"

def build_message(data, today_pht):
    now_str = today_pht.strftime("%A, %b %d, %Y")
    weeks = data["weeks"]
    current, next_wk = current_and_next_week(weeks, today_pht.strftime("%Y-%m-%d"))

    lines = [
        f"📅 <b>TITO AI — Daily Status · @TitoAIPH</b>",
        f"<b>{now_str}</b>  ·  8:00 AM PHT (Manila)",
        "",
    ]

    if current:
        boost_note = f" · {current['boost']}" if current.get("boost") else ""
        highlight = "⭐ " if current.get("highlight") else ""
        lines.append(f"<b>{highlight}{current['id']} ({current['range']})</b>")
        lines.append(f"<i>{current['theme']}{boost_note}</i>")
        for p in current["posts"]:
            lines.append(format_post(p))
        lines.append("")

    if next_wk:
        boost_note = f" · {next_wk['boost']}" if next_wk.get("boost") else ""
        highlight = "⭐ " if next_wk.get("highlight") else ""
        lines.append(f"<b>NEXT → {highlight}{next_wk['id']} ({next_wk['range']})</b>")
        lines.append(f"<i>{next_wk['theme']}{boost_note}</i>")
        for p in next_wk["posts"]:
            lines.append(format_post(p))
        lines.append("")

    # Count stats
    all_posts = [p for w in weeks for p in w["posts"]]
    posted = sum(1 for p in all_posts if p["status"] == "posted")
    upcoming = sum(1 for p in all_posts if p["status"] in ("draft", "planned", "tbd"))

    lines.append(f"📊 {posted} posted · {upcoming} upcoming")
    lines.append(f"🔗 <a href=\"{TIMELINE_URL}\">Live Timeline</a>")

    return "\n".join(lines)

def main():
    today_pht = datetime.now(PHT)
    today_str = today_pht.strftime("%Y-%m-%d")

    # Load schedule
    data = json.loads(SCHEDULE.read_text())

    # Update "updated" date
    changed = data.get("updated") != today_str
    data["updated"] = today_str
    SCHEDULE.write_text(json.dumps(data, indent=2, ensure_ascii=False))

    # Commit + push if date changed
    if changed:
        git(["add", "docs/schedule.json"])
        git(["commit", "-m", f"chore: daily timeline update {today_str}"])
        git(["push"])

    # Build and send Telegram message
    msg = build_message(data, today_pht)
    result = send_telegram(msg)
    if result.get("ok"):
        print(f"[OK] Message sent · {today_str}")
    else:
        print(f"[ERR] {result}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
