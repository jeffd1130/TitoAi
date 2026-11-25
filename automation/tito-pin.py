#!/usr/bin/env python3
"""Pin-comment reminder for Tito AI — fires ~5 min after each post goes live.

Cron (Mac runs on PHT, no conversion):
  5 7 * * *   (7:00 AM Tue/Thu/Sat slides)
  5 19 * * *  (7:00 PM videos)
  5 20 * * *  (8:00 PM videos)

A post is due if its slot (PHT) is today and 0–15 min before now. For each due post, Jeff gets ONE
Telegram message with the seed comment (in <pre> for easy copy), the CTA word to watch for, and
the pin steps. Exits quietly when nothing is due.

This script never posts, comments or pins anything. It only sends Jeff a reminder.

Flags:
  --dry-run                 print the message instead of sending it
  --now 2026-11-25T19:05    pretend it's this time (PHT)
"""

import argparse, json, os, re, sys, urllib.request, urllib.parse
from datetime import datetime, timezone, timedelta

CHAT_ID = "8325608814"
STUDIO = "http://localhost:4545"
REPO_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHT = timezone(timedelta(hours=8))
WINDOW_MIN = 15
PIN_STEPS = "TikTok: long-press your comment → Pin · IG: swipe left on your comment → Pin · FB: ⋯ on your comment → Pin"

ap = argparse.ArgumentParser()
ap.add_argument("--dry-run", action="store_true")
ap.add_argument("--now", help="override current time, format %%Y-%%m-%%dT%%H:%%M (PHT)")
args = ap.parse_args()

now = (datetime.strptime(args.now, "%Y-%m-%dT%H:%M") if args.now else datetime.now(PHT)).replace(tzinfo=None)
today_iso = now.strftime("%Y-%m-%d")
today_str = now.strftime("%b ") + str(now.day)   # schedule.json style, e.g. "Nov 6"


def bot_token():
    if os.environ.get("TITO_TELEGRAM_TOKEN"):
        return os.environ["TITO_TELEGRAM_TOKEN"]
    with open(os.path.join(REPO_DIR, ".telegram-token")) as f:   # gitignored
        return f.read().strip()


def send_telegram(text):
    if args.dry_run:
        print("----- DRY RUN (not sent) -----\n" + text + "\n------------------------------")
        return {"ok": True}
    payload = urllib.parse.urlencode({"chat_id": CHAT_ID, "text": text, "parse_mode": "HTML",
                                      "disable_web_page_preview": "1"}).encode()
    req = urllib.request.Request(f"https://api.telegram.org/bot{bot_token()}/sendMessage", data=payload, method="POST")
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())


def studio(path, body=None):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(STUDIO + path, data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as resp:
        return json.loads(resp.read())


def esc(t):
    return str(t).replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def in_window(slot_dt):
    mins = (now - slot_dt).total_seconds() / 60
    return slot_dt.strftime("%Y-%m-%d") == today_iso and 0 <= mins <= WINDOW_MIN


# Same block rules as the Studio's parseCaptions(): "**TikTok**" or "## TikTok" headings.
HEAD_RE = re.compile(r"^(?:\*\*|##\s+)(TikTok|Instagram|Facebook|Seed comment[^*\n]*|First comment[^*\n]*|[A-Z]{3,} DM reply[^*\n]*|Production note[^*\n]*)\**\s*$", re.I | re.M)


def parse_captions(rel, section=None):
    try:
        with open(os.path.join(REPO_DIR, rel), encoding="utf-8") as f:
            text = f.read()
    except Exception:
        return {}
    if section:
        i = text.find(f"## {section}")
        if i < 0:
            return {}
        rest = text[i + 3:]
        j = rest.find("\n## ")
        text = rest[:j] if j >= 0 else rest
    marks = list(HEAD_RE.finditer(text))
    out = {}
    for k, m in enumerate(marks):
        end = marks[k + 1].start() if k + 1 < len(marks) else len(text)
        body = re.sub(r"\n## [\s\S]*$", "", text[m.end():end]).strip()
        name = m.group(1).lower()
        if name.startswith(("seed", "first comment")):
            out["seed"] = body
        elif name.endswith("dm reply") or " dm reply" in name:
            out["cta_heading"] = m.group(1).split()[0].upper()
        elif not name.startswith("production"):
            out[name] = body
    return out


def cta_word(caps):
    if caps.get("cta_heading"):
        return caps["cta_heading"]
    for k in ("tiktok", "instagram", "facebook", "seed"):
        m = re.search(r"\bComment\s+([A-Z]{3,})\b", caps.get(k) or "")
        if m:
            return m.group(1)
    return None


def message(title, slot_dt, seed, cta, note=""):
    when = slot_dt.strftime("%-I:%M %p")
    lines = ["📌 <b>PIN YOUR COMMENT NOW — TITO AI</b>", "",
             f"🎬 <b>{esc(title)}</b>",
             f"🕖 Posted {now.strftime('%a')} {today_str} · {when} PHT", ""]
    if seed:
        lines += ["<b>Seed comment</b> (tap to copy):", f"<pre>{esc(seed)[:3000]}</pre>", ""]
    elif not note:
        lines += ["⚠️ No seed comment found. Check captions.md", ""]
    if cta:
        lines += [f"👀 Watch replies for <b>{esc(cta)}</b> and send the DM reply.", ""]
    lines += ["<b>Pin it:</b>", esc(PIN_STEPS)]
    if note:
        lines += ["", note]
    return "\n".join(lines)


def send_or_die(text, label):
    res = send_telegram(text)
    if not res.get("ok"):
        raise SystemExit(f"❌ Telegram error for {label}: {res}")
    if not args.dry_run:
        print(f"✅ Pin reminder sent — {label}")


# 1) Studio first.
try:
    posts = studio("/api/posts")
except Exception:
    posts = None

if posts is not None:
    for p in posts:
        if not p.get("slot"):
            continue
        slot_dt = datetime.strptime(p["slot"], "%Y-%m-%dT%H:%M")
        if not in_window(slot_dt):
            continue
        caps = dict(p.get("captionsText") or {})
        cap_ref = p.get("captions") or {}
        if cap_ref.get("file"):   # also read the file for First comment / DM reply headings the Studio skips
            for k, v in parse_captions(cap_ref["file"], cap_ref.get("section")).items():
                caps.setdefault(k, v)
        send_or_die(message(p.get("title", p.get("id")), slot_dt, caps.get("seed"), cta_word(caps)), f"{p.get('id')} {p['slot']}")
    sys.exit(0)   # nothing due → quiet exit

# 2) Fallback: schedule.json (no time field, so infer it), reminder without the comment text.
TIME_RE = re.compile(r"(\d{1,2}):(\d{2})\s*(AM|PM)\s*PHT", re.I)


def infer_slot(p):
    m = TIME_RE.search(p.get("note") or "") or TIME_RE.search(p.get("tag") or "")
    if m:
        h = int(m.group(1)) % 12 + (12 if m.group(3).upper() == "PM" else 0)
        mi = int(m.group(2))
    elif re.search(r"slides|carousel", f"{p.get('title')} {p.get('tag')}", re.I):
        h, mi = 7, 0
    elif p.get("day") == "MON":
        h, mi = 20, 0
    else:
        h, mi = 19, 0
    return now.replace(hour=h, minute=mi, second=0, microsecond=0)


try:
    with open(os.path.join(REPO_DIR, "docs", "schedule.json")) as f:
        data = json.load(f)
except Exception:
    sys.exit(0)
for w in data.get("weeks", []):
    for p in w.get("posts", []):
        if p.get("date") != today_str or p.get("status") in ("draft", "skipped", "cancelled"):
            continue
        if re.search(r"\blive\b", p.get("tag") or "", re.I):   # free lives aren't feed posts
            continue
        slot_dt = infer_slot(p)
        if not in_window(slot_dt):
            continue
        cta = (re.search(r"\bComment\s+([A-Z]{3,})\b", p.get("note") or "") or [None, None])[1]
        note = "ℹ️ Tito AI Studio isn't running, so the comment text wasn't loaded. Copy it from the slot's captions.md."
        send_or_die(message(p["title"], slot_dt, None, cta, note), f"{p['title']} (no Studio)")
sys.exit(0)
