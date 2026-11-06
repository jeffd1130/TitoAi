#!/usr/bin/env python3
"""Snapshot Tito AI Studio into two self-contained pages for claude.ai Artifacts.

Reads the running Studio (http://localhost:4545) and fills the templates in this folder:
  studio-snapshot.template.html → out/tito-studio-snapshot.html
  mobile-hub.template.html      → out/tito-mobile-hub.html
Thumbnails are embedded as small JPEGs; videos link to GitHub Pages when they live under docs/.
Run: python3 studio/artifacts/export.py

With --pages it writes the live hub instead: docs/hub/index.html (laptop), docs/hub/m.html (phone),
docs/hub/data.json and docs/hub/thumbs/. The pages read data.json and refresh themselves, so both
stay in sync. With --push it also commits docs/hub and pushes when something changed (the Studio
calls this after changes). Note: GitHub Pages is public.
"""

import base64, hashlib, json, os, re, subprocess, sys, tempfile, urllib.request
from datetime import datetime, timezone, timedelta

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(os.path.dirname(HERE))
STUDIO = "http://localhost:4545"
PAGES = "https://jeffd1130.github.io/TitoAi/"
PHT = timezone(timedelta(hours=8))
PAGES_MODE, PUSH = "--pages" in sys.argv, "--push" in sys.argv
HUB = os.path.join(ROOT, "docs", "hub")


def get(path):
    with urllib.request.urlopen(STUDIO + path, timeout=30) as r:
        return json.loads(r.read())


def thumb(rel, width=360):
    src = os.path.join(ROOT, rel)
    if not os.path.exists(src):
        return None
    with tempfile.TemporaryDirectory() as tmp:
        out = os.path.join(tmp, "t.jpg")
        if rel.endswith(".mp4"):
            subprocess.run(["ffmpeg", "-loglevel", "error", "-ss", "1", "-i", src, "-frames:v", "1", "-vf", f"scale={width}:-2", "-q:v", "5", out], check=False)
        else:
            subprocess.run(["sips", "-s", "format", "jpeg", "-s", "formatOptions", "60", "--resampleWidth", str(width), src, "--out", out], capture_output=True, check=False)
        if not os.path.exists(out):
            return None
        return open(out, "rb").read()


def thumb_ref(post_id, rel):
    img = thumb(rel)
    if not img:
        return None
    if not PAGES_MODE:
        return "data:image/jpeg;base64," + base64.b64encode(img).decode()
    os.makedirs(os.path.join(HUB, "thumbs"), exist_ok=True)
    name = f"thumbs/{post_id}-{hashlib.md5(img).hexdigest()[:8]}.jpg"   # content-hashed, so phones never show a stale cover
    path = os.path.join(HUB, name)
    if not os.path.exists(path):
        open(path, "wb").write(img)
    return name


def page_url(rel):
    return PAGES + rel[len("docs/"):] if rel.startswith("docs/") else None


def md_inline(t):
    return re.sub(r"\*\*(.+?)\*\*", r"<b>\1</b>", t.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;"))


boot = get("/api/bootstrap")
personas = {a["name"]: f'{a.get("emoji", "")} {a.get("display", a["name"])}'.strip() for a in boot["agents"]}
personas.setdefault("tito-main", "🎙️ Tito AI")
runs = boot["runs"].values() if isinstance(boot["runs"], dict) else boot["runs"]
runs = sorted(runs, key=lambda r: r.get("updatedAt", 0), reverse=True)

posts = []
for p in get("/api/posts"):
    st = p.get("state") or {}
    caps = p.get("captionsText") or {}
    media = p.get("media") or []
    posts.append({
        "id": p["id"], "title": p["title"], "series": p.get("series", ""), "slot": p.get("slot"), "type": p.get("type"),
        "approved": bool(st.get("approved")),
        "posted": {k: (v or {}).get("link", "") for k, v in (st.get("posted") or {}).items()},
        "captions": {k: caps.get(k, "") for k in ("tiktok", "instagram", "facebook", "seed") if caps.get(k)},
        "thumb": thumb_ref(p["id"], p.get("cover") or (media[0] if media else "")),
        "slides": len(media) if p.get("type") != "video" else 0,
        "mediaUrl": page_url(media[0]) if media else None,
    })

sched = get("/api/schedule")
weeks = {}
for e in sched:
    if e["week"] in ("W45", "W46", "W47", "W48") and e["day"] in ("MON", "WED", "FRI"):
        weeks.setdefault(e["week"], {"week": e["week"], "range": e.get("range"), "theme": e.get("theme"), "posts": []})["posts"].append(
            {"day": e["day"], "date": e.get("date"), "title": e.get("title"), "status": e.get("status")})

# Active tasks: agents still working, slots on the calendar with no Studio post yet, ChatGPT clips not yet handed over.
post_dates = {(p.get("slot") or "")[:10] for p in posts}
today = datetime.now(PHT).strftime("%Y-%m-%d")
tasks = {
    "agents": [{"who": personas.get(r.get("agent"), r.get("agent")), "title": re.sub(r"^\[[^\]]*\]\s*", "", r.get("title", "")), "status": r.get("status")}
               for r in runs if r.get("status") in ("running", "queued", "review")],
    "toMake": [{"date": e["date"], "day": e["day"], "title": e.get("title"), "status": e.get("status")}
               for e in sched if e.get("date") and e["date"] >= today and e["day"] in ("MON", "WED", "FRI")
               and e["date"] not in post_dates and not str(e.get("title", "")).startswith("OPEN")],
}

handoffs = get("/api/handoffs")
tasks["handoffs"] = [h["id"] for h in handoffs if (h.get("state") or {}).get("status", "new") == "new"]

# Workflow nodes (same steps as the Studio board) with each agent's latest run.
def last_run(agent):
    r = next((x for x in runs if x.get("agent") == agent), None)
    return r and {"title": re.sub(r"^\[[^\]]*\]\s*", "", r.get("title", "")), "status": r.get("status"), "at": r.get("updatedAt")}

NODES = [
    ("plan", "💡", "Jeff", "Idea / request", None), ("plan", "🎙️", "Tito AI", "Chief of staff · plans + runs the team", "tito-main"),
    ("plan", "🔎", "Tita Saliksik", "Research · short summary", "tito-researcher"), ("plan", "✍️", "Kuya Sulat", "Script + captions", "tito-scriptwriter"),
    ("video", "🟢", "ChatGPT", "Makes video · Flow first, Gemini after", None), ("video", "🤝", "Claude Code", "Reviews the handoff, finishes it", None),
    ("video", "🎬", "Kuya Kamera", "Render + audio level", "video-producer"),
    ("carousel", "🎨", "Ate Disenyo", "carousel.json when there are no video credits", "tito-content-creator"), ("carousel", "🖼️", "Slide render", "Branded 1080×1350 slides", "carousel-render"),
    ("finish", "🧐", "Lola Suri", "QA verdict", "tito-qa"), ("finish", "✅", "Your approval", "Final video + post only", None),
]
workflow = [{"lane": lane, "emoji": e, "name": n, "role": role, "last": last_run(a) if a else None} for lane, e, n, role, a in NODES]
hand = [{"id": h["id"], "status": (h.get("state") or {}).get("status", "new"), "note": (h.get("noteText") or "")[:240],
         "at": h.get("mtime")} for h in handoffs]

ins = get("/api/insights")
m = ins.get("metrics") or {}
tt, fb, ig = m.get("tiktok_account_7d", {}), m.get("meta_facebook_28d", {}), m.get("meta_instagram_28d", {})

data = {
    "generated": datetime.now(PHT).strftime("%a %b %-d, %Y · %-I:%M %p PHT"),
    "generatedIso": datetime.now(PHT).strftime("%Y-%m-%dT%H:%M"),
    "live": PAGES_MODE,
    "posts": posts,
    "runs": [{"who": personas.get(r.get("agent"), r.get("agent")), "title": re.sub(r"^\[[^\]]*\]\s*", "", r.get("title", "")),
              "status": r.get("status"), "at": r.get("updatedAt")} for r in runs[:14]],
    "weeks": list(weeks.values()),
    "tasks": tasks,
    "workflow": workflow,
    "handoffs": hand,
    "results": {
        "pulled": ins.get("date"),
        "topline": [md_inline(t) for t in (ins.get("topline") or [])],
        "boost": md_inline(ins.get("boost") or ""),
        "kpis": [
            {"label": "TikTok views", "window": "7 days", "value": tt.get("video_views"), "delta": tt.get("video_views_change")},
            {"label": "TikTok likes", "window": "7 days", "value": tt.get("likes"), "delta": tt.get("likes_change")},
            {"label": "Facebook views", "window": "28 days", "value": fb.get("views"), "delta": fb.get("views_change")},
            {"label": "Facebook interactions", "window": "28 days", "value": fb.get("interactions")},
            {"label": "Instagram views", "window": "28 days", "value": ig.get("views")},
            {"label": "Instagram reach", "window": "28 days", "value": ig.get("reach")},
        ],
    },
    "links": {"bot": "https://t.me/titoaiph_bot", "hub": PAGES, "liveStudio": PAGES + "hub/", "liveMobile": PAGES + "hub/m.html",
              "studio": PAGES + "hub/" if PAGES_MODE else "https://claude.ai/artifact/3KfBLeRZ6PbRc4Tmd8Y5NF",
              "mobile": PAGES + "hub/m.html" if PAGES_MODE else "https://claude.ai/artifact/BK5LEUUtSkPdEnGdbXJXJn", "instagram": "https://www.instagram.com/tito.aiph/", "tiktok": "https://www.tiktok.com/@tito.aiph"},
}

PAGES_LOADER = """(() => {
  // Live hub: read data.json now, then reload when the Studio publishes a newer one.
  const x = new XMLHttpRequest(); x.open('GET', 'data.json?t=' + Date.now(), false); x.send();
  const d = JSON.parse(x.responseText);
  setInterval(() => fetch('data.json?t=' + Date.now()).then((r) => r.json()).then((n) => {
    if (n.generated !== d.generated && !document.activeElement.matches('textarea')) location.reload();
  }).catch(() => {}), 60000);
  return d;
})()"""
PAGE_HEAD = '<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<meta name="robots" content="noindex">\n<link rel="icon" type="image/png" sizes="192x192" href="icon-192.png">\n<link rel="apple-touch-icon" href="apple-touch-icon.png">\n<meta name="apple-mobile-web-app-title" content="Tito AI">\n<meta name="theme-color" content="#0A0F1E">\n<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}body{margin:0}img{max-width:100%}[hidden]{display:none!important}</style>\n'


def page(tpl, data_expr):
    html = open(os.path.join(HERE, tpl)).read().replace("/*__DATA__*/null", data_expr)
    if PAGES_MODE:   # artifacts get a skeleton at publish time; GitHub Pages needs a full document
        body = html.index("</style>") + len("</style>")
        html = PAGE_HEAD + html[:body] + "\n</head>\n<body>\n" + html[body:] + "\n</body>\n</html>\n"
    return html


if PAGES_MODE:
    os.makedirs(HUB, exist_ok=True)
    stable = {k: v for k, v in data.items() if k not in ("generated", "generatedIso", "live")}
    path = os.path.join(HUB, "data.json")
    old = json.load(open(path)) if os.path.exists(path) else {}
    changed = {k: v for k, v in old.items() if k not in ("generated", "generatedIso", "live")} != stable
    if changed:
        json.dump(data, open(path, "w"), ensure_ascii=False)
    for tpl, out in (("studio-snapshot.template.html", "index.html"), ("mobile-hub.template.html", "m.html")):
        html = page(tpl, PAGES_LOADER)
        f = os.path.join(HUB, out)
        if not os.path.exists(f) or open(f).read() != html:
            open(f, "w").write(html); changed = True
    os.makedirs(os.path.join(HUB, "thumbs"), exist_ok=True)
    for f in os.listdir(os.path.join(HUB, "thumbs")):   # drop covers no post uses any more
        if "thumbs/" + f not in {p["thumb"] for p in posts}:
            os.remove(os.path.join(HUB, "thumbs", f)); changed = True
    print("hub changed" if changed else "hub unchanged")
    if changed and PUSH:
        git = lambda *a: subprocess.run(["git", "-C", ROOT, *a], capture_output=True, text=True)
        git("add", "-A", "docs/hub")
        r = git("commit", "-m", "Hub: sync from Tito AI Studio", "--", "docs/hub")
        if r.returncode == 0:
            r = git("push")
            print("pushed" if r.returncode == 0 else "push failed: " + r.stderr[-300:])
        else:
            print("nothing to commit" if "nothing" in r.stdout + r.stderr else "commit failed: " + r.stderr[-300:])
    sys.exit(0)

os.makedirs(os.path.join(HERE, "out"), exist_ok=True)
payload = json.dumps(data, ensure_ascii=False).replace("</", "<\\/")
for tpl, out in (("studio-snapshot.template.html", "tito-studio-snapshot.html"), ("mobile-hub.template.html", "tito-mobile-hub.html")):
    html = page(tpl, payload)
    open(os.path.join(HERE, "out", out), "w").write(html)
    print(f"{out}: {len(html) // 1024} KB")
