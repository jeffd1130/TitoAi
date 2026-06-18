#!/usr/bin/env python3
"""
Tito AI — Content Plan & Boost Budget Deck
W25–W27 · June–July 2026
Progressive boost ramp: Week 1 TikTok → Week 2 TikTok+IG → Week 3 All 3
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN

OUT_PPTX = "/Users/jeff/Documents/Claude/TItoAi/content/strategy/TitoAI-ContentBoostPlan-W25-W27.pptx"
OUT_PDF  = "/Users/jeff/Documents/Claude/TItoAi/content/strategy/TitoAI-ContentBoostPlan-W25-W27.pdf"

NAVY  = RGBColor(0x0A, 0x0F, 0x1E)
GOLD  = RGBColor(0xF5, 0x9E, 0x0B)
TEAL  = RGBColor(0x0D, 0x94, 0x88)
WHITE = RGBColor(0xFF, 0xFF, 0xFF)
GRAY  = RGBColor(0x9C, 0xA3, 0xAF)
LGRAY = RGBColor(0xE5, 0xE7, 0xEB)
DARK  = RGBColor(0x11, 0x18, 0x27)
RED   = RGBColor(0xDC, 0x26, 0x26)
GREEN = RGBColor(0x06, 0x5F, 0x46)
LGREEN= RGBColor(0x10, 0xB9, 0x81)
PINK  = RGBColor(0xE8, 0x79, 0xF9)
BLUE  = RGBColor(0x93, 0xC5, 0xFD)
DKDARK= RGBColor(0x0D, 0x16, 0x26)
AMBER = RGBColor(0xFC, 0xD3, 0x4D)
TIKRED= RGBColor(0xFF, 0x00, 0x50)
IGPUR = RGBColor(0xC1, 0x3B, 0x84)
FBBLUE= RGBColor(0x18, 0x77, 0xF2)

W = Inches(13.33)
H = Inches(7.5)

prs = Presentation()
prs.slide_width  = W
prs.slide_height = H
blank = prs.slide_layouts[6]
slide_n = [0]

def add_slide():
    slide_n[0] += 1
    return prs.slides.add_slide(blank)

def bg(slide, color=NAVY):
    fill = slide.background.fill
    fill.solid()
    fill.fore_color.rgb = color

def rect(slide, l, t, w, h, fill_color, line=None):
    shape = slide.shapes.add_shape(1, l, t, w, h)
    if line:
        shape.line.color.rgb = line
        shape.line.width = Pt(1)
    else:
        shape.line.fill.background()
    shape.fill.solid()
    shape.fill.fore_color.rgb = fill_color
    return shape

def tx(slide, text, l, t, w, h, size=16, bold=False, color=WHITE,
        align=PP_ALIGN.LEFT, italic=False):
    tb = slide.shapes.add_textbox(l, t, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    p = tf.paragraphs[0]
    p.alignment = align
    run = p.add_run()
    run.text = text
    run.font.size = Pt(size)
    run.font.bold = bold
    run.font.italic = italic
    run.font.color.rgb = color
    run.font.name = "Arial"
    return tb

def gold_bar(slide):
    rect(slide, 0, 0, W, Pt(6), GOLD)

def footer(slide, note=""):
    rect(slide, 0, H - Inches(0.42), W, Inches(0.42), DARK)
    tx(slide, f"Tito AI @TitoAIPH  ·  Content Plan & Boost Budget W25–W27  ·  June–July 2026  {note}",
       Inches(0.4), H - Inches(0.38), Inches(9), Inches(0.32), size=7.5, color=GRAY)
    tx(slide, str(slide_n[0]),
       W - Inches(0.55), H - Inches(0.38), Inches(0.4), Inches(0.32),
       size=8, color=GOLD, align=PP_ALIGN.RIGHT)

def slide_hdr(slide, title, sub=None):
    rect(slide, 0, Inches(1.1), Inches(0.06), Inches(0.52), GOLD)
    tx(slide, title, Inches(0.2), Inches(1.06), Inches(12.8), Inches(0.62),
       size=28, bold=True, color=WHITE)
    if sub:
        tx(slide, sub, Inches(0.22), Inches(1.72), Inches(12.8), Inches(0.3),
           size=10, color=GRAY, italic=True)
    rect(slide, Inches(0.2), Inches(1.8), Inches(12.9), Pt(2), GOLD)


# ── SLIDE 1 — COVER ──────────────────────────────────────────────────────────
s = add_slide(); bg(s)
gold_bar(s)
rect(s, 0, H - Inches(2.4), W, Inches(2.4), DARK)

tx(s, "CONTENT PLAN & BOOST BUDGET · W25–W27 · JUNE–JULY 2026",
   Inches(0.6), Inches(0.45), Inches(12), Inches(0.38),
   size=9, bold=True, color=GOLD)
tx(s, "Tito AI", Inches(0.6), Inches(1.0), Inches(12), Inches(1.0),
   size=62, bold=True, color=WHITE)
tx(s, "@TitoAIPH", Inches(0.6), Inches(1.95), Inches(12), Inches(0.65),
   size=36, bold=True, color=GOLD)
tx(s, "3 weeks · 9 posts · Php 6,000 total boost budget",
   Inches(0.6), Inches(2.72), Inches(12), Inches(0.45),
   size=18, color=LGRAY)

rect(s, Inches(0.6), Inches(3.32), Inches(0.7), Pt(4), GOLD)

# Platform ramp visual
for i, (plat, col, wk) in enumerate([
    ("WEEK 1\nTikTok only", TIKRED, "W25"),
    ("WEEK 2\nTikTok + IG", IGPUR, "W26"),
    ("WEEK 3\nAll 3 platforms", FBBLUE, "W27"),
]):
    bx = Inches(0.6 + i * 4.1)
    rect(s, bx, Inches(3.55), Inches(3.85), Inches(0.72), DARK)
    rect(s, bx, Inches(3.55), Pt(4), Inches(0.72), col)
    tx(s, wk, bx + Inches(0.14), Inches(3.6), Inches(1.0), Inches(0.28),
       size=9, bold=True, color=col)
    tx(s, plat, bx + Inches(1.1), Inches(3.6), Inches(2.6), Inches(0.55),
       size=10, bold=True, color=WHITE)

tx(s, "Php 2,000/week", Inches(0.6), Inches(4.38), Inches(3.85), Inches(0.3),
   size=11, bold=True, color=AMBER, align=PP_ALIGN.CENTER)
tx(s, "Php 2,000/week", Inches(4.7), Inches(4.38), Inches(3.85), Inches(0.3),
   size=11, bold=True, color=AMBER, align=PP_ALIGN.CENTER)
tx(s, "Php 2,000/week", Inches(8.8), Inches(4.38), Inches(3.85), Inches(0.3),
   size=11, bold=True, color=AMBER, align=PP_ALIGN.CENTER)

for i, (lbl, val) in enumerate([
    ("TOTAL BUDGET", "Php 6,000"),
    ("GOAL", "Followers + Views"),
    ("PREPARED BY", "Jeff de las Armas"),
]):
    bx = Inches(0.6 + i * 4.3)
    tx(s, lbl, bx, H - Inches(2.1), Inches(4.0), Inches(0.22), size=7.5, bold=True, color=GRAY)
    tx(s, val, bx, H - Inches(1.82), Inches(4.0), Inches(0.35), size=14, color=WHITE)

footer(s)


# ── SLIDE 2 — STRATEGY OVERVIEW ──────────────────────────────────────────────
s = add_slide(); bg(s)
gold_bar(s)
slide_hdr(s, "Strategy Overview", "Progressive platform ramp-up — build skills and data one platform at a time")

kpis = [
    (GOLD,   "Weekly budget",      "Php 2,000/week · Php 6,000 total across 3 weeks"),
    (TEAL,   "Posts per week",     "3 posts boosted — Mon AI Tip · Wed Demo · Fri Story"),
    (LGREEN, "Primary goal",       "Increase followers and video views across TikTok, Instagram, Facebook"),
    (PINK,   "Boost objective",    "Video views (TikTok) · Profile visits (Instagram) · Reach/Page likes (Facebook)"),
    (AMBER,  "Targeting",          "Philippines · Age 22–45 · Interests: Technology, Freelancing, Education"),
]
for i, (col, title, desc) in enumerate(kpis):
    y = Inches(2.02 + i * 0.72)
    rect(s, Inches(0.3), y, Inches(12.7), Inches(0.62), DARK)
    rect(s, Inches(0.3), y, Pt(4), Inches(0.62), col)
    tx(s, title, Inches(0.52), y + Inches(0.07), Inches(2.8), Inches(0.26),
       size=10, bold=True, color=col)
    tx(s, desc, Inches(3.55), y + Inches(0.06), Inches(9.3), Inches(0.5),
       size=10, color=LGRAY)

# Ramp-up visual
rect(s, Inches(0.3), Inches(5.7), Inches(12.7), Inches(1.3), DKDARK)
tx(s, "PLATFORM RAMP-UP", Inches(0.5), Inches(5.78), Inches(3.0), Inches(0.25),
   size=8, bold=True, color=GRAY)

for i, (wk, dates, plats, col) in enumerate([
    ("W25\nJun 15–21", "Learn TikTok\nPromote mechanics", "🎵 TikTok only", TIKRED),
    ("W26\nJun 22–28", "Add Instagram\nwith data from W25", "🎵 TikTok  +  📸 Instagram", IGPUR),
    ("W27\nJun 29–Jul 5", "Full 3-platform push\n(FB Page required)", "🎵 TikTok  +  📸 IG  +  📘 Facebook", FBBLUE),
]):
    bx = Inches(0.5 + i * 4.25)
    rect(s, bx, Inches(5.98), Inches(3.9), Inches(0.9), col)
    tx(s, wk, bx + Inches(0.1), Inches(6.02), Inches(3.7), Inches(0.82),
       size=10, bold=True, color=WHITE)
    tx(s, plats, bx + Inches(3.95), Inches(6.02), Inches(4.0), Inches(0.45),
       size=9, bold=True, color=col)
    tx(s, dates, bx + Inches(3.95), Inches(6.5), Inches(4.0), Inches(0.35),
       size=8, color=GRAY, italic=True)
    if i < 2:
        tx(s, "→", bx + Inches(3.68), Inches(6.1), Inches(0.55), Inches(0.6),
           size=20, bold=True, color=GOLD, align=PP_ALIGN.CENTER)

footer(s)


# ── SLIDE 3 — 9-POST CONTENT CALENDAR ────────────────────────────────────────
s = add_slide(); bg(s)
gold_bar(s)
slide_hdr(s, "3-Week Content Calendar", "9 posts · Mon/Wed/Fri each week · All drop at 7:00–8:00 PM PHT")

# Header row
cols_w  = [Inches(0.8), Inches(1.2), Inches(3.9), Inches(2.6), Inches(1.5), Inches(1.55), Inches(1.55)]
cols_x  = [Inches(0.3)]
for w in cols_w[:-1]:
    cols_x.append(cols_x[-1] + w)

hdrs = ["Week", "Date", "Post / Topic", "Hook", "Platform", "Budget", "Boost Dates"]
for j, (hdr, x, w) in enumerate(zip(hdrs, cols_x, cols_w)):
    rect(s, x, Inches(1.92), w, Inches(0.36), GREEN)
    tx(s, hdr, x + Inches(0.06), Inches(1.98), w - Inches(0.06), Inches(0.26),
       size=8.5, bold=True, color=WHITE)

posts = [
    # week, wk_col, day, date, topic, hook, platform, plat_col, budget, boost_dates
    ("W25", TIKRED, "MON", "Jun 16", "Claude o Gemini: Kailan Mo Gagamitin?",
     '"Claude o Gemini — alin ang mas tama?"',
     "TikTok", TIKRED, "Php 700", "Jun 17–18"),
    ("W25", TIKRED, "WED", "Jun 18", "Gumawa ng Resume Gamit ang Claude",
     '"10 segundos lang ang binibigay ng recruiter sa resume mo."',
     "TikTok", TIKRED, "Php 700", "Jun 19–20"),
    ("W25", TIKRED, "FRI", "Jun 20", "Father\'s Day Para Sa Php 2,000 — Tito AI Tries",
     '"Php 2,000. Father\'s Day ngayong weekend. Kayang-kaya ba ni Claude?"',
     "TikTok", TIKRED, "Php 600", "Jun 21–22"),
    ("W26", IGPUR, "MON", "Jun 22", "Ang Sabi Nila: Pang-Matalino Lang Iyan",
     '"Sabi nila: pang-matalino lang iyan. Tignan mo \'to."',
     "TikTok", TIKRED, "Php 700", "Jun 23–24"),
    ("W26", IGPUR, "WED", "Jun 25", "Gemini para sa Guro",
     '"Guro ka? 30 minuto ng lesson plan → 2 minuto gamit ito."',
     "Instagram", IGPUR, "Php 700", "Jun 26–27"),
    ("W26", IGPUR, "FRI", "Jun 27", "1 Buwan Kasama Tito AI — Ang Resulta",
     '"1 buwan na tayo. Ano na ang natutuhan natin?"',
     "TikTok", TIKRED, "Php 600", "Jun 28–29"),
    ("W27", FBBLUE, "MON", "Jun 30", "July Teaser — Ano ang Susunod?",
     '"Sa July — mas malalim. Mas praktikal. Mas libre."',
     "TikTok", TIKRED, "Php 600", "Jul 1–2"),
    ("W27", FBBLUE, "WED", "Jul 2", "TBD — Wednesday Demo",
     "TBD",
     "Facebook", FBBLUE, "Php 800", "Jul 3–4"),
    ("W27", FBBLUE, "FRI", "Jul 4", "TBD — Friday Story",
     "TBD",
     "Instagram", IGPUR, "Php 600", "Jul 5–6"),
]

last_wk = None
for i, (wk, wk_col, day, date, topic, hook, plat, plat_col, budget, boost_d) in enumerate(posts):
    y = Inches(2.34 + i * 0.52)
    row_bg = DKDARK if i % 2 == 0 else DARK
    for x, w in zip(cols_x, cols_w):
        rect(s, x, y, w, Inches(0.48), row_bg)

    if wk != last_wk:
        rect(s, cols_x[0], y, cols_w[0], Inches(0.48), wk_col)
        last_wk = wk

    tx(s, wk if wk != (posts[i-1][0] if i > 0 else None) else "",
       cols_x[0] + Inches(0.05), y + Inches(0.1), cols_w[0] - Inches(0.08), Inches(0.3),
       size=9, bold=True, color=WHITE if wk != (posts[i-1][0] if i > 0 else None) else wk_col)

    # Actually let's just show week label each row but color by week
    rect(s, cols_x[0], y, cols_w[0], Inches(0.48), wk_col)
    tx(s, wk, cols_x[0] + Inches(0.05), y + Inches(0.12), cols_w[0] - Inches(0.08), Inches(0.28),
       size=9, bold=True, color=WHITE, align=PP_ALIGN.CENTER)

    tx(s, f"{day}\n{date}", cols_x[1] + Inches(0.05), y + Inches(0.04),
       cols_w[1] - Inches(0.08), Inches(0.42), size=8.5, color=GOLD)
    tx(s, topic[:55], cols_x[2] + Inches(0.05), y + Inches(0.1),
       cols_w[2] - Inches(0.08), Inches(0.3), size=8.5, bold=True, color=WHITE)
    tx(s, hook[:70], cols_x[3] + Inches(0.05), y + Inches(0.1),
       cols_w[3] - Inches(0.08), Inches(0.3), size=7.5, italic=True, color=AMBER)
    rect(s, cols_x[4] + Inches(0.08), y + Inches(0.1),
         cols_w[4] - Inches(0.16), Inches(0.28), plat_col)
    tx(s, plat, cols_x[4] + Inches(0.08), y + Inches(0.12),
       cols_w[4] - Inches(0.16), Inches(0.26), size=8, bold=True, color=WHITE,
       align=PP_ALIGN.CENTER)
    tx(s, budget, cols_x[5] + Inches(0.05), y + Inches(0.1),
       cols_w[5] - Inches(0.08), Inches(0.28), size=9, bold=True, color=LGREEN)
    tx(s, boost_d, cols_x[6] + Inches(0.05), y + Inches(0.1),
       cols_w[6] - Inches(0.08), Inches(0.28), size=8, color=GRAY)

# Total row
ty = Inches(2.34 + 9 * 0.52)
rect(s, Inches(0.3), ty, sum(cols_w), Inches(0.36), GREEN)
tx(s, "TOTAL", Inches(0.36), ty + Inches(0.05), Inches(4.0), Inches(0.26),
   size=9, bold=True, color=WHITE)
tx(s, "Php 6,000", cols_x[5] + Inches(0.05), ty + Inches(0.05),
   cols_w[5] - Inches(0.08), Inches(0.26), size=10, bold=True, color=AMBER)

footer(s)


# ── SLIDE 4 — WEEK 1 (W25): TIKTOK ONLY ─────────────────────────────────────
s = add_slide(); bg(s)
gold_bar(s)
rect(s, 0, Inches(1.1), Inches(0.08), Inches(0.52), TIKRED)
tx(s, "Week 1 — W25 · Jun 15–21 · TikTok Only", Inches(0.2), Inches(1.06),
   Inches(12.8), Inches(0.62), size=28, bold=True, color=WHITE)
tx(s, "Goal: Learn TikTok Promote · establish baseline cost-per-view and cost-per-follower",
   Inches(0.22), Inches(1.72), Inches(12.8), Inches(0.3), size=10, color=GRAY, italic=True)
rect(s, Inches(0.2), Inches(1.8), Inches(12.9), Pt(2), TIKRED)

# Budget breakdown
rect(s, Inches(0.3), Inches(1.96), Inches(6.2), Inches(0.34), TIKRED)
tx(s, "🎵  TIKTOK PROMOTE — Php 2,000 total", Inches(0.45), Inches(2.0),
   Inches(5.8), Inches(0.28), size=10, bold=True, color=WHITE)

posts_w1 = [
    ("MON · Jun 16", "Claude o Gemini: Kailan Mo Gagamitin?",
     "Php 350/day × 2 days", "Php 700", "Jun 17–18"),
    ("WED · Jun 18", "Gumawa ng Resume Gamit ang Claude",
     "Php 350/day × 2 days", "Php 700", "Jun 19–20"),
    ("FRI · Jun 20", "Father's Day Para Sa Php 2,000 — Tito AI Tries",
     "Php 300/day × 2 days", "Php 600", "Jun 21–22"),
]
for i, (day, topic, rate, total, dates) in enumerate(posts_w1):
    y = Inches(2.38 + i * 0.82)
    rect(s, Inches(0.3), y, Inches(6.2), Inches(0.72), DARK)
    rect(s, Inches(0.3), y, Pt(4), Inches(0.72), TIKRED)
    tx(s, day, Inches(0.48), y + Inches(0.08), Inches(1.5), Inches(0.26),
       size=9, bold=True, color=TIKRED)
    tx(s, topic, Inches(0.48), y + Inches(0.36), Inches(5.6), Inches(0.28),
       size=9, color=WHITE)
    tx(s, rate, Inches(2.6), y + Inches(0.08), Inches(2.2), Inches(0.26),
       size=9, color=GRAY)
    rect(s, Inches(4.9), y + Inches(0.1), Inches(1.4), Inches(0.5), DKDARK)
    tx(s, total, Inches(4.95), y + Inches(0.17), Inches(1.3), Inches(0.32),
       size=13, bold=True, color=LGREEN, align=PP_ALIGN.CENTER)

# Total
rect(s, Inches(0.3), Inches(4.86), Inches(6.2), Inches(0.42), GREEN)
tx(s, "W25 TOTAL: Php 2,000", Inches(0.45), Inches(4.93), Inches(5.7), Inches(0.28),
   size=11, bold=True, color=WHITE)

# Setup guide
rect(s, Inches(7.0), Inches(1.96), Inches(6.0), Inches(0.34), TIKRED)
tx(s, "HOW TO SET UP — TikTok Promote", Inches(7.15), Inches(2.0),
   Inches(5.7), Inches(0.28), size=10, bold=True, color=WHITE)

steps = [
    ("STEP 1", "Open TikTok app → go to the posted video"),
    ("STEP 2", "Tap the share icon (arrow) → tap \"Promote\""),
    ("STEP 3", "Goal: select \"More video views\" (NOT followers — views are cheaper and drive algorithm which brings followers)"),
    ("STEP 4", "Audience: select \"Automatic\" — Smart targeting outperforms manual on new accounts"),
    ("STEP 5", "Duration: 2 days · Budget: Php 300–350/day · Confirm payment"),
    ("STEP 6", "Start: morning after posting (not same night — let organic play first for 8–12 hrs)"),
]
for i, (lbl, step) in enumerate(steps):
    y = Inches(2.38 + i * 0.75)
    rect(s, Inches(7.0), y, Inches(6.0), Inches(0.65), DKDARK if i % 2 == 0 else DARK)
    rect(s, Inches(7.0), y, Inches(0.9), Inches(0.65), TIKRED)
    tx(s, lbl, Inches(7.06), y + Inches(0.16), Inches(0.82), Inches(0.3),
       size=7.5, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    tx(s, step, Inches(7.98), y + Inches(0.08), Inches(4.8), Inches(0.5),
       size=8.5, color=LGRAY)

# KPI targets
rect(s, Inches(0.3), Inches(5.36), Inches(12.7), Inches(0.3), DKDARK)
tx(s, "W25 TIKTOK TARGETS (after 3 boosts):   Reach 9,000+   Views 15,000+   New followers 60–120   Cost per follow < Php 25",
   Inches(0.5), Inches(5.42), Inches(12.3), Inches(0.24), size=8.5, color=AMBER, bold=True)

footer(s)


# ── SLIDE 5 — WEEK 2 (W26): TIKTOK + INSTAGRAM ───────────────────────────────
s = add_slide(); bg(s)
gold_bar(s)
rect(s, 0, Inches(1.1), Inches(0.08), Inches(0.52), IGPUR)
tx(s, "Week 2 — W26 · Jun 22–28 · TikTok + Instagram", Inches(0.2), Inches(1.06),
   Inches(12.8), Inches(0.62), size=28, bold=True, color=WHITE)
tx(s, "Goal: Apply W25 learnings · add Instagram Boost · compare cost-per-follow across two platforms",
   Inches(0.22), Inches(1.72), Inches(12.8), Inches(0.3), size=10, color=GRAY, italic=True)
rect(s, Inches(0.2), Inches(1.8), Inches(12.9), Pt(2), IGPUR)

# TikTok column
rect(s, Inches(0.3), Inches(1.96), Inches(5.9), Inches(0.34), TIKRED)
tx(s, "🎵 TikTok Promote — Php 1,300", Inches(0.45), Inches(2.0),
   Inches(5.6), Inches(0.28), size=10, bold=True, color=WHITE)

tiktok_w2 = [
    ("MON · Jun 22", "Ang Sabi Nila: Pang-Matalino Lang Iyan",
     "Php 350/day × 2 days", "Php 700", "Jun 23–24"),
    ("FRI · Jun 27", "1 Buwan Kasama Tito AI — Ang Resulta",
     "Php 300/day × 2 days", "Php 600", "Jun 28–29"),
]
for i, (day, topic, rate, total, dates) in enumerate(tiktok_w2):
    y = Inches(2.38 + i * 0.82)
    rect(s, Inches(0.3), y, Inches(5.9), Inches(0.72), DARK)
    rect(s, Inches(0.3), y, Pt(4), Inches(0.72), TIKRED)
    tx(s, day, Inches(0.48), y + Inches(0.08), Inches(1.5), Inches(0.26),
       size=9, bold=True, color=TIKRED)
    tx(s, topic, Inches(0.48), y + Inches(0.36), Inches(4.2), Inches(0.28),
       size=9, color=WHITE)
    tx(s, rate, Inches(0.48), y + Inches(0.08), Inches(2.5), Inches(0.24),
       size=8, color=GRAY)
    rect(s, Inches(4.5), y + Inches(0.1), Inches(1.5), Inches(0.5), DKDARK)
    tx(s, total, Inches(4.55), y + Inches(0.17), Inches(1.4), Inches(0.32),
       size=13, bold=True, color=LGREEN, align=PP_ALIGN.CENTER)

# IG column
rect(s, Inches(6.7), Inches(1.96), Inches(6.3), Inches(0.34), IGPUR)
tx(s, "📸 Instagram Boost — Php 700", Inches(6.85), Inches(2.0),
   Inches(6.0), Inches(0.28), size=10, bold=True, color=WHITE)

rect(s, Inches(6.7), Inches(2.38), Inches(6.3), Inches(0.72), DARK)
rect(s, Inches(6.7), Inches(2.38), Pt(4), Inches(0.72), IGPUR)
tx(s, "WED · Jun 25", Inches(6.88), Inches(2.46), Inches(1.8), Inches(0.26),
   size=9, bold=True, color=IGPUR)
tx(s, "Gemini para sa Guro", Inches(6.88), Inches(2.74), Inches(5.9), Inches(0.28),
   size=9, color=WHITE)
tx(s, "Php 350/day × 2 days", Inches(6.88), Inches(2.46), Inches(2.8), Inches(0.24),
   size=8, color=GRAY)
rect(s, Inches(11.3), Inches(2.48), Inches(1.5), Inches(0.5), DKDARK)
tx(s, "Php 700", Inches(11.35), Inches(2.55), Inches(1.4), Inches(0.32),
   size=13, bold=True, color=LGREEN, align=PP_ALIGN.CENTER)

# IG setup
rect(s, Inches(6.7), Inches(3.26), Inches(6.3), Inches(0.28), DKDARK)
tx(s, "HOW TO SET UP — Instagram Boost", Inches(6.85), Inches(3.3),
   Inches(6.0), Inches(0.22), size=9, bold=True, color=IGPUR)
ig_steps = [
    ("1", "Open Instagram → go to the posted Reel or carousel"),
    ("2", "Tap \"Boost Post\" button below the post"),
    ("3", "Goal: select \"More profile visits\" — drives follow intent best"),
    ("4", "Audience: \"Automatic\" (let IG optimize) → Philippines auto-detected"),
    ("5", "Duration: 2 days · Budget: Php 350/day · Tap \"Boost\""),
    ("6", "Check results in \"Boosted Posts\" inside Instagram Insights"),
]
for i, (num, step) in enumerate(ig_steps):
    y = Inches(3.6 + i * 0.48)
    rect(s, Inches(6.7), y, Inches(6.3), Inches(0.42), DKDARK if i % 2 == 0 else DARK)
    rect(s, Inches(6.7), y, Inches(0.36), Inches(0.42), IGPUR)
    tx(s, num, Inches(6.72), y + Inches(0.1), Inches(0.3), Inches(0.24),
       size=8, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    tx(s, step, Inches(7.1), y + Inches(0.07), Inches(5.7), Inches(0.3),
       size=8.5, color=LGRAY)

# Totals
rect(s, Inches(0.3), Inches(4.12), Inches(5.9), Inches(0.38), GREEN)
tx(s, "TikTok: Php 1,300", Inches(0.45), Inches(4.18), Inches(5.5), Inches(0.26),
   size=10, bold=True, color=WHITE)
rect(s, Inches(6.7), Inches(4.12), Inches(6.3), Inches(0.38), IGPUR)
tx(s, "Instagram: Php 700", Inches(6.85), Inches(4.18), Inches(5.9), Inches(0.26),
   size=10, bold=True, color=WHITE)

rect(s, Inches(0.3), Inches(5.36), Inches(12.7), Inches(0.3), DKDARK)
tx(s, "W26 TARGETS:   TikTok 6,000+ views · IG 1,500+ reach · New followers 80–150 combined · Compare CPF across platforms",
   Inches(0.5), Inches(5.42), Inches(12.3), Inches(0.24), size=8.5, color=AMBER, bold=True)
tx(s, "W26 TOTAL: Php 2,000",
   Inches(0.5), Inches(5.74), Inches(12.3), Inches(0.28), size=11, bold=True, color=LGREEN)

footer(s)


# ── SLIDE 6 — WEEK 3 (W27): ALL 3 PLATFORMS ──────────────────────────────────
s = add_slide(); bg(s)
gold_bar(s)
rect(s, 0, Inches(1.1), Inches(0.08), Inches(0.52), FBBLUE)
tx(s, "Week 3 — W27 · Jun 29–Jul 5 · All 3 Platforms", Inches(0.2), Inches(1.06),
   Inches(12.8), Inches(0.62), size=28, bold=True, color=WHITE)
tx(s, "Goal: Full 3-platform push · compare results · decide where to scale budget in July",
   Inches(0.22), Inches(1.72), Inches(12.8), Inches(0.3), size=10, color=GRAY, italic=True)
rect(s, Inches(0.2), Inches(1.8), Inches(12.9), Pt(2), FBBLUE)

platforms_w3 = [
    ("🎵 TikTok Promote", TIKRED, "MON · Jun 30", "July Teaser — Ano ang Susunod?",
     "Php 300/day × 2 days", "Php 600", "Jul 1–2",
     "Video views · Automatic audience · Start Jul 1 morning"),
    ("📸 Instagram Boost", IGPUR, "FRI · Jul 4", "TBD — Friday Story / Inspiration",
     "Php 300/day × 2 days", "Php 600", "Jul 5–6",
     "Profile visits · Automatic audience · Start Jul 5 morning"),
    ("📘 Facebook Boost", FBBLUE, "WED · Jul 2", "TBD — Wednesday Demo / Tutorial",
     "Php 400/day × 2 days", "Php 800", "Jul 3–4",
     "Reach + Page likes · PH 22–45 · Tech + Freelancing interests"),
]

for i, (plat_label, plat_col, day, topic, rate, total, dates, obj) in enumerate(platforms_w3):
    x = Inches(0.3 + i * 4.36)
    y = Inches(1.96)
    rect(s, x, y, Inches(4.1), Inches(3.6), DARK)
    rect(s, x, y, Inches(4.1), Pt(4), plat_col)

    tx(s, plat_label, x + Inches(0.12), y + Inches(0.1), Inches(3.8), Inches(0.3),
       size=10, bold=True, color=plat_col)
    rect(s, x + Inches(0.12), y + Inches(0.5), Inches(3.8), Inches(0.3), DKDARK)
    tx(s, total, x + Inches(0.18), y + Inches(0.55), Inches(3.6), Inches(0.22),
       size=13, bold=True, color=LGREEN, align=PP_ALIGN.CENTER)
    tx(s, day, x + Inches(0.12), y + Inches(0.92), Inches(3.8), Inches(0.26),
       size=9, bold=True, color=plat_col)
    tx(s, topic, x + Inches(0.12), y + Inches(1.22), Inches(3.8), Inches(0.38),
       size=9, color=WHITE)
    tx(s, rate, x + Inches(0.12), y + Inches(1.64), Inches(3.8), Inches(0.26),
       size=8.5, color=GOLD)
    tx(s, f"Boost: {dates}", x + Inches(0.12), y + Inches(1.92), Inches(3.8), Inches(0.26),
       size=8.5, color=GRAY)
    tx(s, obj, x + Inches(0.12), y + Inches(2.2), Inches(3.8), Inches(0.55),
       size=8.5, color=LGRAY, italic=True)

# FB warning
rect(s, Inches(0.3), Inches(5.66), Inches(12.7), Inches(0.62), RGBColor(0x7F, 0x1D, 0x1D))
rect(s, Inches(0.3), Inches(5.66), Pt(5), Inches(0.62), RED)
tx(s, "⚠️  BEFORE WEEK 3: Facebook Page required to run any paid boost. Convert personal FB profiles to a Facebook Page at facebook.com/pages/create  →  \"Business or brand.\"  Personal profiles CANNOT boost or access analytics.",
   Inches(0.52), Inches(5.72), Inches(12.1), Inches(0.5), size=9, color=WHITE, bold=True)

# Total
rect(s, Inches(0.3), Inches(6.34), Inches(12.7), Inches(0.36), GREEN)
tx(s, "W27 TOTAL: Php 2,000  ·  TikTok Php 600  ·  Instagram Php 600  ·  Facebook Php 800  ·  3-Week Grand Total: Php 6,000",
   Inches(0.5), Inches(6.4), Inches(12.3), Inches(0.28), size=10, bold=True, color=WHITE)

footer(s)


# ── SLIDE 7 — BUDGET SUMMARY ─────────────────────────────────────────────────
s = add_slide(); bg(s)
gold_bar(s)
slide_hdr(s, "Budget Summary — 3 Weeks", "Php 6,000 total · Php 2,000/week · progressive platform ramp-up")

# Summary table
cols = [Inches(1.2), Inches(2.5), Inches(2.5), Inches(2.5), Inches(1.6), Inches(1.8), Inches(1.2)]
xs = [Inches(0.3)]
for c in cols[:-1]:
    xs.append(xs[-1] + c)

hdrs2 = ["Week", "TikTok", "Instagram", "Facebook", "Weekly Total", "New Followers Target", "# Platforms"]
for j, (hdr, x, w) in enumerate(zip(hdrs2, xs, cols)):
    rect(s, x, Inches(1.96), w, Inches(0.38), DARK)
    tx(s, hdr, x + Inches(0.06), Inches(2.0), w - Inches(0.06), Inches(0.28),
       size=8.5, bold=True, color=GOLD)

rows_budget = [
    ("W25\nJun 15–21", "Php 2,000\n(3 posts × TikTok)", "—", "—", "Php 2,000", "60–120", "1"),
    ("W26\nJun 22–28", "Php 1,300\n(2 posts × TikTok)", "Php 700\n(1 post × IG)", "—", "Php 2,000", "80–150", "2"),
    ("W27\nJun 29–Jul 5", "Php 600\n(1 post × TikTok)", "Php 600\n(1 post × IG)", "Php 800\n(1 post × FB)", "Php 2,000", "100–180", "3"),
]
row_cols = [TIKRED, IGPUR, FBBLUE]
for i, row in enumerate(rows_budget):
    y = Inches(2.42 + i * 1.0)
    for j, (val, x, w) in enumerate(zip(row, xs, cols)):
        bg_c = DKDARK if i % 2 == 0 else DARK
        rect(s, x, y, w, Inches(0.86), bg_c)
        val_col = WHITE
        if j == 0:
            val_col = row_cols[i]
        elif j == 4:
            val_col = LGREEN
        elif j == 1 and val != "—":
            val_col = TIKRED
        elif j == 2 and val != "—":
            val_col = IGPUR
        elif j == 3 and val != "—":
            val_col = FBBLUE
        elif val == "—":
            val_col = GRAY
        tx(s, val, x + Inches(0.06), y + Inches(0.14),
           w - Inches(0.08), Inches(0.6),
           size=9, bold=(j in [0, 4]), color=val_col)

# Grand total row
y_gt = Inches(2.42 + 3 * 1.0)
rect(s, Inches(0.3), y_gt, sum(cols), Inches(0.42), GREEN)
tx(s, "GRAND TOTAL", xs[0] + Inches(0.06), y_gt + Inches(0.1),
   cols[0] - Inches(0.08), Inches(0.28), size=9, bold=True, color=WHITE)
tx(s, "Php 3,900", xs[1] + Inches(0.06), y_gt + Inches(0.1),
   cols[1] - Inches(0.08), Inches(0.28), size=9, bold=True, color=TIKRED)
tx(s, "Php 1,300", xs[2] + Inches(0.06), y_gt + Inches(0.1),
   cols[2] - Inches(0.08), Inches(0.28), size=9, bold=True, color=IGPUR)
tx(s, "Php 800", xs[3] + Inches(0.06), y_gt + Inches(0.1),
   cols[3] - Inches(0.08), Inches(0.28), size=9, bold=True, color=FBBLUE)
tx(s, "Php 6,000", xs[4] + Inches(0.06), y_gt + Inches(0.1),
   cols[4] - Inches(0.08), Inches(0.28), size=11, bold=True, color=AMBER)
tx(s, "240–450", xs[5] + Inches(0.06), y_gt + Inches(0.1),
   cols[5] - Inches(0.08), Inches(0.28), size=9, bold=True, color=LGREEN)

# Scale rule
rect(s, Inches(0.3), Inches(6.1), Inches(12.7), Inches(0.88), DKDARK)
rect(s, Inches(0.3), Inches(6.1), Pt(4), Inches(0.88), GOLD)
tx(s, "SCALE RULE — WEEK 4+", Inches(0.5), Inches(6.16), Inches(4.0), Inches(0.26),
   size=9, bold=True, color=GOLD)
tx(s, "If any post earns 50+ new followers → extend that post 2 more days at same daily rate\nIf cost-per-follow drops below Php 12 on any platform → increase that platform's weekly budget by Php 400\nPlatform with lowest cost-per-follow gets biggest budget allocation in July",
   Inches(0.5), Inches(6.42), Inches(12.4), Inches(0.5), size=8.5, color=LGRAY)

footer(s)


# ── SLIDE 8 — KPIs & SCALE RULES ─────────────────────────────────────────────
s = add_slide(); bg(s)
gold_bar(s)
slide_hdr(s, "KPIs & Scale Rules", "Track weekly · pull every Sunday · share screenshots with Jeff")

# KPI table per platform
kpi_plats = [
    ("TikTok", TIKRED, [
        ("Reach per boosted post", "3,000+", "6,000+"),
        ("Video views per post", "5,000+", "12,000+"),
        ("New followers (3 posts)", "60–120", "200+"),
        ("Cost per follow", "< Php 25", "< Php 15"),
        ("Watch completion rate", "> 35%", "> 50%"),
    ]),
    ("Instagram", IGPUR, [
        ("Reach per boosted post", "2,000+", "5,000+"),
        ("Profile visits per post", "200+", "600+"),
        ("New followers (per boost)", "20–40", "100+"),
        ("Cost per follow", "< Php 25", "< Php 15"),
        ("Saves per post", "20+", "80+"),
    ]),
    ("Facebook", FBBLUE, [
        ("Reach per boosted post", "2,500+", "6,000+"),
        ("New Page likes per boost", "20–40", "100+"),
        ("Cost per Page like", "< Php 25", "< Php 15"),
        ("Link clicks (to IG/TikTok)", "50+", "200+"),
        ("Active (starts W27 only)", "—", "—"),
    ]),
]

for i, (plat, plat_col, kpis) in enumerate(kpi_plats):
    x = Inches(0.3 + i * 4.36)
    rect(s, x, Inches(1.96), Inches(4.1), Inches(0.34), plat_col)
    tx(s, plat, x + Inches(0.12), Inches(2.0), Inches(3.8), Inches(0.26),
       size=10, bold=True, color=WHITE)
    for j, (metric, w1_target, w3_target) in enumerate(kpis):
        y = Inches(2.36 + j * 0.58)
        row_bg = DKDARK if j % 2 == 0 else DARK
        rect(s, x, y, Inches(4.1), Inches(0.52), row_bg)
        tx(s, metric, x + Inches(0.1), y + Inches(0.06), Inches(2.2), Inches(0.26),
           size=8, color=LGRAY)
        tx(s, w1_target, x + Inches(2.35), y + Inches(0.08), Inches(0.8), Inches(0.26),
           size=8.5, bold=True, color=LGREEN, align=PP_ALIGN.CENTER)
        tx(s, w3_target, x + Inches(3.2), y + Inches(0.08), Inches(0.8), Inches(0.26),
           size=8.5, bold=True, color=GOLD, align=PP_ALIGN.CENTER)
    # Sub-header
    rect(s, x, Inches(2.36), Inches(4.1), Inches(0.22), plat_col)
    tx(s, "Metric", x + Inches(0.1), Inches(2.39), Inches(2.2), Inches(0.18),
       size=7, bold=True, color=WHITE)
    tx(s, "W1 Target", x + Inches(2.35), Inches(2.39), Inches(0.8), Inches(0.18),
       size=7, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    tx(s, "W3 Target", x + Inches(3.2), Inches(2.39), Inches(0.8), Inches(0.18),
       size=7, bold=True, color=WHITE, align=PP_ALIGN.CENTER)

# Where to pull
rect(s, Inches(0.3), Inches(5.34), Inches(12.7), Inches(0.52), DARK)
tx(s, "WHERE TO PULL RESULTS",
   Inches(0.5), Inches(5.4), Inches(3.0), Inches(0.22), size=8, bold=True, color=GOLD)
tx(s, "TikTok: Creator Center → Analytics + Promote tab  ·  Instagram: Professional Dashboard → Boosted post results  ·  Facebook: Business Suite → Insights",
   Inches(0.5), Inches(5.62), Inches(12.2), Inches(0.22), size=8.5, color=LGRAY)

# Scale decision rules
rect(s, Inches(0.3), Inches(5.94), Inches(12.7), Inches(0.88), DKDARK)
rect(s, Inches(0.3), Inches(5.94), Pt(4), Inches(0.88), GOLD)
tx(s, "SCALE RULES AFTER W27", Inches(0.5), Inches(6.0), Inches(4.0), Inches(0.26),
   size=9, bold=True, color=GOLD)
scale_rules = [
    "50+ followers from a single boost → extend 2 more days at same daily rate",
    "Cost-per-follow < Php 12 on any platform → add Php 400 to that platform's weekly budget",
    "Platform with lowest CPF gets biggest share of July budget (min Php 800, max Php 1,500/week)",
    "Any post with < 20 followers after boost → swap platform or slot next week",
]
for i, rule in enumerate(scale_rules):
    tx(s, f"▸  {rule}", Inches(0.5), Inches(6.28 + i * 0.18), Inches(12.3), Inches(0.18),
       size=8, color=LGRAY)

footer(s)


# Save PPTX
prs.save(OUT_PPTX)
print(f"✓ PPTX saved: {OUT_PPTX} ({slide_n[0]} slides)")


# ────────────────────────────────────────────────────────────────────────────
# PDF via reportlab
# ────────────────────────────────────────────────────────────────────────────
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable, KeepTogether, PageBreak)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT

C_NAVY  = colors.HexColor("#0A0F1E")
C_GOLD  = colors.HexColor("#F59E0B")
C_TEAL  = colors.HexColor("#0D9488")
C_WHITE = colors.white
C_GRAY  = colors.HexColor("#9CA3AF")
C_LGRAY = colors.HexColor("#E5E7EB")
C_DARK  = colors.HexColor("#111827")
C_DK2   = colors.HexColor("#0D1626")
C_RED   = colors.HexColor("#DC2626")
C_GREEN = colors.HexColor("#059669")
C_LGRN  = colors.HexColor("#10B981")
C_PINK  = colors.HexColor("#E879F9")
C_BLUE  = colors.HexColor("#93C5FD")
C_AMBER = colors.HexColor("#FCD34D")
C_TIK   = colors.HexColor("#FF0050")
C_IGP   = colors.HexColor("#C13B84")
C_FBB   = colors.HexColor("#1877F2")

styles = getSampleStyleSheet()

def S(name, **kw):
    base = styles.get(name, styles["Normal"])
    return ParagraphStyle(name + str(id(kw)), parent=base, **kw)

H1  = S("Normal", fontSize=24, leading=30, fontName="Helvetica-Bold",
         textColor=C_WHITE, backColor=C_NAVY)
H2  = S("Normal", fontSize=14, leading=18, fontName="Helvetica-Bold", textColor=C_GOLD)
H3  = S("Normal", fontSize=10, leading=13, fontName="Helvetica-Bold", textColor=C_GOLD)
BODY= S("Normal", fontSize=9,  leading=13, fontName="Helvetica", textColor=C_DARK)
SM  = S("Normal", fontSize=7.5,leading=11, fontName="Helvetica", textColor=colors.HexColor("#6B7280"))
ITA = S("Normal", fontSize=8.5,leading=12, fontName="Helvetica-Oblique",
         textColor=colors.HexColor("#6B7280"))
C_T = S("Normal", fontSize=9,  leading=12, fontName="Helvetica", textColor=C_TEAL)

def hr(color=C_GOLD, t=1):
    return HRFlowable(width="100%", thickness=t, color=color, spaceAfter=5, spaceBefore=2)

def sec(title, subtitle=None):
    out = [Spacer(1, 0.2*cm), Paragraph(title, H2)]
    if subtitle:
        out.append(Paragraph(subtitle, ITA))
    out.append(hr())
    return out

def bul(text, col=C_TEAL):
    return Paragraph(f'<font color="#{col.hexval()[2:]}">▸</font>  {text}', BODY)

story = []

# ── COVER ─────────────────────────────────────────────────────────────────────
story.append(Spacer(1, 1.5*cm))
cov = Table([[
    Paragraph("<b>TITO AI</b>", S("Normal", fontSize=34, fontName="Helvetica-Bold",
                                   textColor=C_GOLD, leading=40)),
],[
    Paragraph("@TitoAIPH", S("Normal", fontSize=18, fontName="Helvetica-Bold",
                               textColor=C_WHITE, leading=22)),
],[
    Paragraph("Content Plan &amp; Boost Budget", S("Normal", fontSize=16,
               fontName="Helvetica-Bold", textColor=C_LGRAY, leading=20)),
],[
    Paragraph("W25–W27 · June–July 2026  ·  3 Weeks · 9 Posts · Php 6,000 Total",
              S("Normal", fontSize=10, fontName="Helvetica", textColor=C_GRAY, leading=14)),
],[
    Spacer(1, 0.3*cm),
],[
    Paragraph("Progressive Boost Ramp: TikTok → TikTok + Instagram → All 3 Platforms",
              S("Normal", fontSize=10, fontName="Helvetica-Oblique",
                textColor=C_AMBER, leading=13)),
],[
    Spacer(1, 0.4*cm),
],[
    Paragraph("Prepared by Jeff de las Armas  ·  June 2026",
              S("Normal", fontSize=8, fontName="Helvetica", textColor=C_GRAY, leading=11)),
]], colWidths=[15*cm])
cov.setStyle(TableStyle([
    ("BACKGROUND", (0,0),(-1,-1), C_NAVY),
    ("TOPPADDING", (0,0),(-1,-1), 6), ("BOTTOMPADDING",(0,0),(-1,-1),6),
    ("LEFTPADDING",(0,0),(-1,-1), 16), ("RIGHTPADDING",(0,0),(-1,-1),16),
    ("LINEBELOW",(0,1),(-1,1),2,C_GOLD),
]))
story.append(cov)
story.append(Spacer(1,0.8*cm))

# ── PLATFORM RAMP OVERVIEW ────────────────────────────────────────────────────
story += sec("Strategy Overview", "Start with one platform · build data · layer in more each week")

ramp_data = [
    [Paragraph(h, S("Normal",fontSize=8,fontName="Helvetica-Bold",textColor=C_WHITE,leading=11))
     for h in ["Week", "Dates", "Platforms Active", "Why", "Budget"]],
    *[
        [Paragraph(wk, S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=col,leading=12)),
         Paragraph(dates, BODY),
         Paragraph(plats, S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=col,leading=12)),
         Paragraph(why, BODY),
         Paragraph(bgt, S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=C_LGRN,leading=12))]
        for wk, dates, plats, why, bgt, col in [
            ("W25", "Jun 15–21", "TikTok only",
             "Learn TikTok Promote mechanics. Establish baseline CPV + CPF data. Lowest risk.",
             "Php 2,000", C_TIK),
            ("W26", "Jun 22–28", "TikTok + Instagram",
             "Add IG Boost with lessons from W25. Test two platforms simultaneously.",
             "Php 2,000", C_IGP),
            ("W27", "Jun 29–Jul 5", "TikTok + Instagram + Facebook",
             "Full 3-platform push. Requires Facebook Page (convert profiles before this week).",
             "Php 2,000", C_FBB),
        ]
    ],
    [Paragraph("TOTAL", S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=C_WHITE,leading=12)),
     Paragraph("3 weeks", BODY), Paragraph("9 posts boosted", BODY),
     Paragraph("Progressive · data-driven", BODY),
     Paragraph("Php 6,000", S("Normal",fontSize=10,fontName="Helvetica-Bold",textColor=C_AMBER,leading=13))],
]
rt = Table(ramp_data, colWidths=[1.6*cm, 2.2*cm, 3.6*cm, 5.4*cm, 2.2*cm])
rt.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,0),C_DARK), ("BACKGROUND",(0,4),(-1,4),C_GREEN),
    ("ROWBACKGROUNDS",(0,1),(-1,3),[C_DK2, C_DARK, C_DK2]),
    ("TOPPADDING",(0,0),(-1,-1),4), ("BOTTOMPADDING",(0,0),(-1,-1),4),
    ("LEFTPADDING",(0,0),(-1,-1),5), ("GRID",(0,0),(-1,-1),0.25,C_DK2),
    ("VALIGN",(0,0),(-1,-1),"TOP"),
]))
story.append(rt)
story.append(Spacer(1,0.4*cm))

# ── 9-POST CALENDAR ───────────────────────────────────────────────────────────
story += sec("3-Week Content Calendar", "9 posts · Mon/Wed/Fri each week · drop 7:00–8:00 PM PHT")

cal_data = [
    [Paragraph(h, S("Normal",fontSize=8,fontName="Helvetica-Bold",textColor=C_WHITE,leading=11))
     for h in ["Week", "Day", "Date", "Topic", "Boost Platform", "Budget", "Boost Dates"]],
    *[
        [Paragraph(wk, S("Normal",fontSize=8.5,fontName="Helvetica-Bold",textColor=wc,leading=11)),
         Paragraph(day, S("Normal",fontSize=8.5,fontName="Helvetica-Bold",textColor=C_GOLD,leading=11)),
         Paragraph(date, BODY),
         Paragraph(topic, BODY),
         Paragraph(plat, S("Normal",fontSize=8.5,fontName="Helvetica-Bold",textColor=pc,leading=11)),
         Paragraph(bgt, S("Normal",fontSize=8.5,fontName="Helvetica-Bold",textColor=C_LGRN,leading=11)),
         Paragraph(bdates, SM)]
        for wk,wc,day,date,topic,plat,pc,bgt,bdates in [
            ("W25",C_TIK,"MON","Jun 16","Claude o Gemini: Kailan Mo Gagamitin?","TikTok",C_TIK,"Php 700","Jun 17–18"),
            ("W25",C_TIK,"WED","Jun 18","Gumawa ng Resume Gamit ang Claude","TikTok",C_TIK,"Php 700","Jun 19–20"),
            ("W25",C_TIK,"FRI","Jun 20","Father's Day Para Sa Php 2,000 — Tito AI Tries","TikTok",C_TIK,"Php 600","Jun 21–22"),
            ("W26",C_IGP,"MON","Jun 22","Ang Sabi Nila: Pang-Matalino Lang Iyan","TikTok",C_TIK,"Php 700","Jun 23–24"),
            ("W26",C_IGP,"WED","Jun 25","Gemini para sa Guro","Instagram",C_IGP,"Php 700","Jun 26–27"),
            ("W26",C_IGP,"FRI","Jun 27","1 Buwan Kasama Tito AI — Ang Resulta","TikTok",C_TIK,"Php 600","Jun 28–29"),
            ("W27",C_FBB,"MON","Jun 30","July Teaser — Ano ang Susunod?","TikTok",C_TIK,"Php 600","Jul 1–2"),
            ("W27",C_FBB,"WED","Jul 2","TBD — Wednesday Demo","Facebook",C_FBB,"Php 800","Jul 3–4"),
            ("W27",C_FBB,"FRI","Jul 4","TBD — Friday Story","Instagram",C_IGP,"Php 600","Jul 5–6"),
        ]
    ],
    [Paragraph("TOTAL",S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=C_WHITE,leading=12)),
     Paragraph("—",BODY), Paragraph("9 posts",BODY), Paragraph("—",BODY),
     Paragraph("3 platforms",BODY),
     Paragraph("Php 6,000",S("Normal",fontSize=10,fontName="Helvetica-Bold",textColor=C_AMBER,leading=13)),
     Paragraph("—",BODY)],
]
cal_t = Table(cal_data, colWidths=[1.0*cm, 1.0*cm, 1.4*cm, 4.8*cm, 2.2*cm, 1.4*cm, 1.7*cm])
cal_t.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,0),C_DARK), ("BACKGROUND",(0,10),(-1,10),C_GREEN),
    ("ROWBACKGROUNDS",(0,1),(-1,9),[C_DK2,C_DARK]*5),
    ("TOPPADDING",(0,0),(-1,-1),4), ("BOTTOMPADDING",(0,0),(-1,-1),4),
    ("LEFTPADDING",(0,0),(-1,-1),4), ("GRID",(0,0),(-1,-1),0.25,C_DK2),
    ("VALIGN",(0,0),(-1,-1),"TOP"),
]))
story.append(cal_t)
story.append(Spacer(1,0.4*cm))

# ── BUDGET BREAKDOWN ─────────────────────────────────────────────────────────
story += sec("Budget Breakdown by Week & Platform")

for wk_name, wk_col, wk_posts, wk_total, note in [
    ("WEEK 1 — W25 (Jun 15–21) · TikTok Only", C_TIK, [
        ("Mon Jun 16", "Claude o Gemini: Kailan Mo Gagamitin?", "TikTok Promote", "Php 350/day × 2 days", "Php 700", "Jun 17–18"),
        ("Wed Jun 18", "Gumawa ng Resume Gamit ang Claude",     "TikTok Promote", "Php 350/day × 2 days", "Php 700", "Jun 19–20"),
        ("Fri Jun 20", "Father's Day Para Sa Php 2,000",        "TikTok Promote", "Php 300/day × 2 days", "Php 600", "Jun 21–22"),
    ], "Php 2,000", "Goal: Video views · Automatic audience · Start boost morning after posting"),
    ("WEEK 2 — W26 (Jun 22–28) · TikTok + Instagram", C_IGP, [
        ("Mon Jun 22", "Ang Sabi Nila: Pang-Matalino Lang",     "TikTok Promote", "Php 350/day × 2 days", "Php 700", "Jun 23–24"),
        ("Wed Jun 25", "Gemini para sa Guro",                    "Instagram Boost", "Php 350/day × 2 days","Php 700", "Jun 26–27"),
        ("Fri Jun 27", "1 Buwan Kasama Tito AI",                 "TikTok Promote", "Php 300/day × 2 days", "Php 600", "Jun 28–29"),
    ], "Php 2,000", "Apply W25 learnings · TikTok objective: Video views · Instagram objective: Profile visits"),
    ("WEEK 3 — W27 (Jun 29–Jul 5) · All 3 Platforms", C_FBB, [
        ("Mon Jun 30", "July Teaser",                            "TikTok Promote", "Php 300/day × 2 days", "Php 600", "Jul 1–2"),
        ("Wed Jul 2",  "TBD — Wednesday Demo",                   "Facebook Boost", "Php 400/day × 2 days", "Php 800", "Jul 3–4"),
        ("Fri Jul 4",  "TBD — Friday Story",                     "Instagram Boost","Php 300/day × 2 days", "Php 600", "Jul 5–6"),
    ], "Php 2,000", "⚠️ Facebook Page required before boosting — convert personal profiles at facebook.com/pages/create"),
]:
    story.append(KeepTogether([
        Paragraph(wk_name, S("Normal",fontSize=10,fontName="Helvetica-Bold",textColor=wk_col,leading=13)),
        Paragraph(note, ITA),
    ]))
    wk_data = [
        [Paragraph(h, S("Normal",fontSize=8,fontName="Helvetica-Bold",textColor=C_WHITE,leading=11))
         for h in ["Day", "Post", "Platform", "Rate", "Total", "Boost Dates"]],
        *[
            [Paragraph(d,BODY),Paragraph(t,BODY),
             Paragraph(p,S("Normal",fontSize=8.5,fontName="Helvetica-Bold",textColor=wk_col,leading=11)),
             Paragraph(r,SM),
             Paragraph(tot,S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=C_LGRN,leading=11)),
             Paragraph(bd,SM)]
            for d,t,p,r,tot,bd in wk_posts
        ],
        [Paragraph("",BODY),Paragraph("",BODY),Paragraph("",BODY),
         Paragraph("Weekly Total",S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=C_WHITE,leading=12)),
         Paragraph(wk_total,S("Normal",fontSize=10,fontName="Helvetica-Bold",textColor=C_AMBER,leading=13)),
         Paragraph("",BODY)],
    ]
    wt = Table(wk_data, colWidths=[2.0*cm, 4.5*cm, 2.8*cm, 2.5*cm, 1.5*cm, 2.2*cm])
    wt.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,0),C_DARK),
        ("BACKGROUND",(0,len(wk_posts)+1),(-1,len(wk_posts)+1),C_GREEN),
        ("ROWBACKGROUNDS",(0,1),(-1,len(wk_posts)),[C_DK2,C_DARK]*3),
        ("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4),
        ("LEFTPADDING",(0,0),(-1,-1),5),("GRID",(0,0),(-1,-1),0.25,C_DK2),
        ("VALIGN",(0,0),(-1,-1),"TOP"),
    ]))
    story.append(wt)
    story.append(Spacer(1,0.3*cm))

# ── KPIs ─────────────────────────────────────────────────────────────────────
story += sec("KPIs to Track Weekly", "Pull every Sunday · share screenshots with Jeff")

kpi_pdf = [
    [Paragraph(h, S("Normal",fontSize=8,fontName="Helvetica-Bold",textColor=C_WHITE,leading=11))
     for h in ["Metric", "Platform", "W1 Target", "W3 Target"]],
    *[
        [Paragraph(m,BODY),
         Paragraph(p,S("Normal",fontSize=8.5,fontName="Helvetica-Bold",textColor=pc,leading=11)),
         Paragraph(t1,S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=C_LGRN,leading=12)),
         Paragraph(t3,S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=C_GOLD,leading=12))]
        for m,p,pc,t1,t3 in [
            ("Reach per boosted post", "TikTok", C_TIK, "3,000+", "6,000+"),
            ("Video views per post",   "TikTok", C_TIK, "5,000+", "12,000+"),
            ("New followers (3 posts)", "TikTok", C_TIK, "60–120", "200+"),
            ("Cost per follow",        "TikTok", C_TIK, "< Php 25", "< Php 15"),
            ("Reach per boost",        "Instagram", C_IGP, "2,000+", "5,000+"),
            ("New followers (per post)","Instagram",C_IGP, "20–40", "100+"),
            ("Cost per follow",        "Instagram", C_IGP, "< Php 25", "< Php 15"),
            ("Reach per boost",        "Facebook", C_FBB, "2,500+", "6,000+"),
            ("New Page likes (per post)","Facebook",C_FBB,"20–40", "100+"),
            ("Cost per Page like",     "Facebook", C_FBB, "< Php 25", "< Php 15"),
        ]
    ],
]
kpi_t = Table(kpi_pdf, colWidths=[5.5*cm, 2.8*cm, 2.8*cm, 4.4*cm])
kpi_t.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,0),C_DARK),
    ("ROWBACKGROUNDS",(0,1),(-1,-1),[C_DK2,C_DARK]*6),
    ("TOPPADDING",(0,0),(-1,-1),4),("BOTTOMPADDING",(0,0),(-1,-1),4),
    ("LEFTPADDING",(0,0),(-1,-1),5),("GRID",(0,0),(-1,-1),0.25,C_DK2),
    ("VALIGN",(0,0),(-1,-1),"TOP"),
]))
story.append(kpi_t)
story.append(Spacer(1,0.3*cm))

# Scale rules
story.append(Paragraph("Scale Rules — Week 4+", H3))
for rule in [
    "50+ followers from a single boost → extend that post 2 more days at same daily rate",
    "Cost-per-follow drops below Php 12 → increase that platform's weekly budget by Php 400",
    "Platform with lowest CPF gets biggest July budget allocation (min Php 800/week)",
    "Any post with < 20 followers after boost → swap platform or content slot next week",
]:
    story.append(bul(rule, C_GOLD))

story.append(Spacer(1, 0.8*cm))
story.append(Paragraph(
    "Tito AI @TitoAIPH · Content Plan &amp; Boost Budget W25–W27 · Prepared by Jeff de las Armas · June 2026",
    S("Normal", fontSize=7, fontName="Helvetica", textColor=C_GRAY,
      leading=10, alignment=TA_CENTER)))

doc = SimpleDocTemplate(OUT_PDF, pagesize=A4,
                        leftMargin=1*cm, rightMargin=1*cm,
                        topMargin=1.2*cm, bottomMargin=1.2*cm,
                        title="Tito AI Content Plan & Boost Budget W25-W27",
                        author="Jeff de las Armas")
doc.build(story)
print(f"✓ PDF  saved: {OUT_PDF}")
