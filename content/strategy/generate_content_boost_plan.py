#!/usr/bin/env python3
"""
Tito AI — Content Plan & Boost Budget Deck
W26–W28 · June–July 2026
Clean redesign: spacious rows, 3-4 columns max, no tiny text boxes
"""

from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_AUTO_SIZE

OUT_PPTX = "/Users/jeff/Documents/Claude/TItoAi/content/strategy/TitoAI-ContentBoostPlan-W26-W28.pptx"
OUT_PDF  = "/Users/jeff/Documents/Claude/TItoAi/content/strategy/TitoAI-ContentBoostPlan-W26-W28.pdf"

# ── Colours ───────────────────────────────────────────────────────────────────
NAVY   = RGBColor(0x0A, 0x0F, 0x1E)
GOLD   = RGBColor(0xF5, 0x9E, 0x0B)
TEAL   = RGBColor(0x0D, 0x94, 0x88)
WHITE  = RGBColor(0xFF, 0xFF, 0xFF)
GRAY   = RGBColor(0x9C, 0xA3, 0xAF)
LGRAY  = RGBColor(0xE5, 0xE7, 0xEB)
DARK   = RGBColor(0x11, 0x18, 0x27)
DKDARK = RGBColor(0x0D, 0x16, 0x26)
GREEN  = RGBColor(0x06, 0x5F, 0x46)
LGREEN = RGBColor(0x10, 0xB9, 0x81)
AMBER  = RGBColor(0xFC, 0xD3, 0x4D)
TIKRED = RGBColor(0xFF, 0x00, 0x50)
IGPUR  = RGBColor(0xC1, 0x3B, 0x84)
FBBLUE = RGBColor(0x18, 0x77, 0xF2)
RED2   = RGBColor(0xDC, 0x26, 0x26)

# ── Layout ────────────────────────────────────────────────────────────────────
W    = Inches(13.33)
H    = Inches(7.5)
CTOP = Inches(1.95)          # content top
CBOT = Inches(6.82)          # content bottom (footer starts 7.06")
CL   = Inches(0.35)          # left margin
CW   = Inches(12.63)         # content width  (CL to CL+CW = 12.98" ≤ 13.33")
PAD  = Inches(0.14)          # inner padding

prs = Presentation()
prs.slide_width  = W
prs.slide_height = H
BLANK = prs.slide_layouts[6]
_sn = [0]

# ── Helpers ───────────────────────────────────────────────────────────────────
def slide():
    _sn[0] += 1
    return prs.slides.add_slide(BLANK)

def bg(s, c=NAVY):
    f = s.background.fill; f.solid(); f.fore_color.rgb = c

def rect(s, l, t, w, h, c, border=None):
    sh = s.shapes.add_shape(1, l, t, w, h)
    sh.fill.solid(); sh.fill.fore_color.rgb = c
    sh.line.fill.background() if not border else None
    if border: sh.line.color.rgb = border; sh.line.width = Pt(1)
    return sh

def tx(s, text, l, t, w, h, sz=11, bold=False, color=WHITE,
       align=PP_ALIGN.LEFT, italic=False):
    tb = s.shapes.add_textbox(l, t, w, h)
    tf = tb.text_frame
    tf.word_wrap = True
    tf.auto_size = MSO_AUTO_SIZE.TEXT_TO_FIT_SHAPE
    p = tf.paragraphs[0]; p.alignment = align
    r = p.add_run(); r.text = text
    r.font.size = Pt(sz); r.font.bold = bold
    r.font.italic = italic; r.font.color.rgb = color
    r.font.name = "Arial"
    return tb

def gold_bar(s):
    rect(s, 0, 0, W, Pt(6), GOLD)

def footer(s):
    rect(s, 0, H - Inches(0.42), W, Inches(0.42), DARK)
    tx(s, "Tito AI @TitoAIPH  ·  Content Boost Plan  ·  W26–W28  ·  June–July 2026",
       Inches(0.4), H - Inches(0.39), Inches(9.5), Inches(0.34), sz=8, color=GRAY)
    tx(s, str(_sn[0]), W - Inches(0.6), H - Inches(0.39), Inches(0.4),
       Inches(0.34), sz=8, color=GOLD, align=PP_ALIGN.RIGHT)

def hdr(s, title, sub="", accent=GOLD):
    rect(s, 0, Inches(1.06), Inches(0.08), Inches(0.52), accent)
    tx(s, title, Inches(0.26), Inches(1.04), Inches(12.8), Inches(0.6),
       sz=26, bold=True, color=WHITE)
    if sub:
        tx(s, sub, Inches(0.28), Inches(1.68), Inches(12.8), Inches(0.26),
           sz=9, italic=True, color=GRAY)
    rect(s, Inches(0.26), Inches(1.80), Inches(12.8), Pt(2), accent)

def card_row(s, y, h, bg_c, border_c, col1, col2, col3="", col4="",
             w1=Inches(2.5), w2=Inches(7.0), w3=Inches(1.7), w4=Inches(1.43),
             sz1=10, sz2=10, sz3=10, sz4=11,
             c1=LGRAY, c2=WHITE, c3=LGRAY, c4=LGREEN, bold4=True):
    rect(s, CL, y, CW, h, bg_c)
    rect(s, CL, y, Pt(5), h, border_c)
    tx(s, col1, CL + PAD + Inches(0.06), y + PAD * 0.6, w1 - PAD * 2, h - PAD,
       sz=sz1, color=c1)
    tx(s, col2, CL + w1 + PAD, y + PAD * 0.6, w2 - PAD * 2, h - PAD,
       sz=sz2, bold=True, color=c2)
    if col3:
        rect(s, CL + w1 + w2, y + Inches(0.12), w3 - Inches(0.1), h - Inches(0.24), border_c)
        tx(s, col3, CL + w1 + w2 + Inches(0.04), y + Inches(0.16),
           w3 - Inches(0.18), h - Inches(0.3), sz=sz3, bold=True, color=WHITE,
           align=PP_ALIGN.CENTER)
    if col4:
        tx(s, col4, CL + w1 + w2 + w3 + PAD * 0.5, y + PAD * 0.6,
           w4 - PAD, h - PAD, sz=sz4, bold=bold4, color=c4,
           align=PP_ALIGN.CENTER)

def step_row(s, y, h, num, text, accent=TEAL):
    rect(s, CL, y, CW, h, DKDARK)
    rect(s, CL, y, Inches(0.38), h, accent)
    tx(s, str(num), CL + Inches(0.05), y + PAD * 0.5, Inches(0.30), h - PAD * 0.5,
       sz=11, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    tx(s, text, CL + Inches(0.46), y + PAD * 0.5, CW - Inches(0.54), h - PAD * 0.5,
       sz=10, color=LGRAY)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 1 — COVER
# ═══════════════════════════════════════════════════════════════════════════════
s = slide(); bg(s); gold_bar(s)
rect(s, 0, H - Inches(2.0), W, Inches(2.0), DARK)

tx(s, "CONTENT PLAN & BOOST BUDGET  ·  W26–W28  ·  JUNE–JULY 2026",
   Inches(0.6), Inches(0.42), Inches(12), Inches(0.36), sz=9, bold=True, color=GOLD)
tx(s, "Tito AI", Inches(0.6), Inches(0.86), Inches(12), Inches(1.0),
   sz=62, bold=True, color=WHITE)
tx(s, "@TitoAIPH", Inches(0.6), Inches(1.80), Inches(12), Inches(0.55),
   sz=34, bold=True, color=GOLD)
tx(s, "3 weeks  ·  9 posts  ·  Php 6,000 total  ·  Launch Jun 22, 2026",
   Inches(0.6), Inches(2.48), Inches(12), Inches(0.40), sz=16, color=LGRAY)

rect(s, Inches(0.6), Inches(3.06), Inches(0.7), Pt(4), GOLD)

for i, (wk, dates, plats, col) in enumerate([
    ("Week 1  W26", "Jun 22–28",    "TikTok only",         TIKRED),
    ("Week 2  W27", "Jun 29–Jul 5", "TikTok + Instagram",  IGPUR),
    ("Week 3  W28", "Jul 6–12",     "All 3 platforms",     FBBLUE),
]):
    bx = Inches(0.6 + i * 4.24)
    rect(s, bx, Inches(3.22), Inches(4.04), Inches(0.82), DARK)
    rect(s, bx, Inches(3.22), Inches(4.04), Pt(4), col)
    tx(s, wk,    bx + Inches(0.14), Inches(3.28), Inches(2.2), Inches(0.28),
       sz=9, bold=True, color=col)
    tx(s, dates, bx + Inches(2.3), Inches(3.28), Inches(1.6), Inches(0.28),
       sz=9, color=GRAY)
    tx(s, plats, bx + Inches(0.14), Inches(3.58), Inches(3.8), Inches(0.34),
       sz=12, bold=True, color=WHITE)

for i, (lbl, val) in enumerate([
    ("TOTAL BUDGET",  "Php 6,000"),
    ("LAUNCH DATE",   "Jun 22, 2026"),
    ("PURPOSE",       "Followers + Views"),
]):
    bx = Inches(0.6 + i * 4.24)
    tx(s, lbl, bx, H - Inches(1.72), Inches(4.0), Inches(0.22),
       sz=7.5, bold=True, color=GRAY)
    tx(s, val, bx, H - Inches(1.44), Inches(4.0), Inches(0.34),
       sz=13, bold=True, color=WHITE)

footer(s)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 2 — TARGET MARKET
# ═══════════════════════════════════════════════════════════════════════════════
s = slide(); bg(s); gold_bar(s)
hdr(s, "Target Market — Mga Pamangkin",
    "Everyday Filipinos · Age 22–45 · Philippines · Taglish-speaking")

ONE_LBL = '"The warm, relatable Tito who teaches everyday Filipinos to use AI — for free — before it replaces their job."'
rect(s, CL, CTOP, CW, Inches(0.42), DKDARK)
rect(s, CL, CTOP, Pt(5), Inches(0.42), GOLD)
tx(s, ONE_LBL, CL + PAD, CTOP + Inches(0.08), CW - PAD * 2, Inches(0.28),
   sz=9.5, italic=True, color=AMBER)

CARD_H  = Inches(0.82)
CARD_GAP = Inches(0.055)
segments = [
    (GOLD,   "FREELANCERS",     "1.5M+ in PH (PIDS)",
     "Fear: clients will replace them with AI. Need: faster proposals, better outputs, competitive edge."),
    (TEAL,   "GURO / TEACHERS", "900K+ DepEd public school",
     "Fear: curriculum disruption. Need: lesson plans in 2 min, grading, parent communication. One guro → 40 families."),
    (TIKRED, "BPO WORKERS",     "1.9M employees (BSP 2025)",
     "Fear: automation layoffs. Need to upskill NOW — fastest-adopting segment for AI education content."),
    (IGPUR,  "NANAYS / TATAYS", "Millions of Filipino parents",
     "Fear: being left behind. Need: family budgeting, homework help, meal planning, household productivity."),
    (FBBLUE, "SME OWNERS",      "Only 14.9% use AI tools",
     "Fear: losing to AI-enabled competition. Need: marketing, customer service, operations automation."),
]
for i, (col, seg, stat, desc) in enumerate(segments):
    y = CTOP + Inches(0.42) + CARD_GAP + i * (CARD_H + CARD_GAP)
    rect(s, CL, y, CW, CARD_H, DARK)
    rect(s, CL, y, Pt(5), CARD_H, col)
    tx(s, seg,  CL + PAD, y + Inches(0.08), Inches(2.6), Inches(0.28),
       sz=11, bold=True, color=col)
    tx(s, stat, CL + Inches(2.8), y + Inches(0.10), Inches(3.0), Inches(0.26),
       sz=9, color=GRAY)
    tx(s, desc, CL + PAD, y + Inches(0.38), CW - PAD * 2, Inches(0.36),
       sz=9.5, color=LGRAY)

footer(s)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 3 — STRATEGY OVERVIEW
# ═══════════════════════════════════════════════════════════════════════════════
s = slide(); bg(s); gold_bar(s)
hdr(s, "3-Week Boost Strategy",
    "Php 2,000/week  ·  3 posts/week  ·  progressive platform ramp  ·  launch Jun 22")

PHASE_W = Inches(4.07)
PHASE_GAP = Inches(0.18)
PHASE_H = Inches(4.42)

for i, (col, wk, dates, plat, posts, desc, bgt) in enumerate([
    (TIKRED,
     "WEEK 1 — W26", "Jun 22–28",
     "TikTok Only",
     ["MON Jun 22  · Ang Sabi Nila: Pang-Matalino",
      "WED Jun 25  · Gemini para sa Guro",
      "FRI Jun 27  · 1 Buwan Kasama Tito AI"],
     "Learn TikTok Promote mechanics. Establish baseline cost-per-view and cost-per-follow before adding more platforms.",
     "Php 2,000"),
    (IGPUR,
     "WEEK 2 — W27", "Jun 29–Jul 5",
     "TikTok + Instagram",
     ["MON Jun 30  · July Teaser",
      "WED Jul 2   · TBD — Wednesday Demo",
      "FRI Jul 4   · TBD — Friday Story"],
     "Add Instagram Boost. Compare cost-per-follow across two platforms using real W26 data to decide budget split.",
     "Php 2,000"),
    (FBBLUE,
     "WEEK 3 — W28", "Jul 6–12",
     "All 3 Platforms",
     ["MON Jul 7   · TBD — Monday AI Tip",
      "WED Jul 9   · TBD — Wednesday Demo",
      "FRI Jul 11  · TBD — Friday Story"],
     "Full push across TikTok, Instagram, and Facebook. ⚠️ Facebook Page required before this week.",
     "Php 2,000"),
]):
    bx = CL + i * (PHASE_W + PHASE_GAP)
    by = CTOP
    rect(s, bx, by, PHASE_W, PHASE_H, DARK)
    rect(s, bx, by, PHASE_W, Pt(5), col)
    tx(s, wk,   bx + PAD, by + Inches(0.10), PHASE_W - PAD * 2, Inches(0.28),
       sz=10, bold=True, color=col)
    tx(s, dates, bx + PAD, by + Inches(0.38), PHASE_W - PAD * 2, Inches(0.22),
       sz=9, color=GRAY)
    rect(s, bx + PAD, by + Inches(0.66), PHASE_W - PAD * 2, Inches(0.34), col)
    tx(s, plat, bx + PAD, by + Inches(0.70), PHASE_W - PAD * 2, Inches(0.28),
       sz=11, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    for j, post in enumerate(posts):
        py = by + Inches(1.08) + j * Inches(0.50)
        rect(s, bx + PAD, py, PHASE_W - PAD * 2, Inches(0.44), DKDARK)
        tx(s, post, bx + PAD + Inches(0.06), py + Inches(0.08),
           PHASE_W - PAD * 2 - Inches(0.1), Inches(0.30), sz=8.5, color=LGRAY)
    rect(s, bx + PAD, by + Inches(2.64), PHASE_W - PAD * 2, Pt(1), col)
    tx(s, desc, bx + PAD, by + Inches(2.72), PHASE_W - PAD * 2, Inches(1.26),
       sz=8.5, italic=True, color=GRAY)
    rect(s, bx + PAD, by + PHASE_H - Inches(0.42), PHASE_W - PAD * 2, Inches(0.36), col)
    tx(s, bgt, bx + PAD, by + PHASE_H - Inches(0.40), PHASE_W - PAD * 2, Inches(0.32),
       sz=14, bold=True, color=WHITE, align=PP_ALIGN.CENTER)

footer(s)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 4 — 9-POST CONTENT CALENDAR
# ═══════════════════════════════════════════════════════════════════════════════
s = slide(); bg(s); gold_bar(s)
hdr(s, "9-Post Content Calendar",
    "Mon / Wed / Fri  ·  drop 7–8 PM PHT  ·  boost starts morning after posting")

# 4 columns: Date+Week | Topic | Platform | Budget
C_WIDS = [Inches(2.3), Inches(6.7), Inches(2.14), Inches(1.49)]
C_XS   = [CL]
for cw in C_WIDS[:-1]: C_XS.append(C_XS[-1] + cw)

HDR_H = Inches(0.36)
ROW_H = Inches(0.48)
TOT_H = Inches(0.34)

# Header
for lbl, x, w in zip(["Week · Date", "Topic", "Platform", "Budget"], C_XS, C_WIDS):
    rect(s, x, CTOP, w, HDR_H, GREEN)
    tx(s, lbl, x + PAD, CTOP + Inches(0.08), w - PAD * 2, HDR_H - Inches(0.1),
       sz=9.5, bold=True, color=WHITE)

posts_cal = [
    ("W26 · Jun 22", "MON", "Ang Sabi Nila: Pang-Matalino Lang Iyan", "TikTok",  TIKRED, "Php 700"),
    ("W26 · Jun 25", "WED", "Gemini para sa Guro",                    "TikTok",  TIKRED, "Php 700"),
    ("W26 · Jun 27", "FRI", "1 Buwan Kasama Tito AI — Ang Resulta",   "TikTok",  TIKRED, "Php 600"),
    ("W27 · Jun 30", "MON", "July Teaser — Ano ang Susunod?",         "TikTok",  TIKRED, "Php 700"),
    ("W27 · Jul 2",  "WED", "TBD — Wednesday Demo",                   "Instagram",IGPUR, "Php 700"),
    ("W27 · Jul 4",  "FRI", "TBD — Friday Story",                     "TikTok",  TIKRED, "Php 600"),
    ("W28 · Jul 7",  "MON", "TBD — Monday AI Tip",                    "TikTok",  TIKRED, "Php 600"),
    ("W28 · Jul 9",  "WED", "TBD — Wednesday Demo",                   "Facebook",FBBLUE, "Php 800"),
    ("W28 · Jul 11", "FRI", "TBD — Friday Story",                     "Instagram",IGPUR, "Php 600"),
]
for i, (wkdate, day, topic, plat, pc, bgt) in enumerate(posts_cal):
    y = CTOP + HDR_H + i * ROW_H
    rb = DKDARK if i % 2 == 0 else DARK
    wk_col = TIKRED if "W26" in wkdate else (IGPUR if "W27" in wkdate else FBBLUE)
    for x, w in zip(C_XS, C_WIDS):
        rect(s, x, y, w, ROW_H, rb)
    rect(s, C_XS[0], y, Pt(4), ROW_H, wk_col)
    tx(s, wkdate, C_XS[0] + PAD, y + Inches(0.06), C_WIDS[0] - PAD * 2, ROW_H - Inches(0.1),
       sz=9, bold=True, color=wk_col)
    tx(s, f"{day}  ·  {topic}", C_XS[1] + PAD, y + Inches(0.06),
       C_WIDS[1] - PAD * 2, ROW_H - Inches(0.1), sz=9.5, color=WHITE)
    rect(s, C_XS[2] + Inches(0.12), y + Inches(0.09),
         C_WIDS[2] - Inches(0.24), ROW_H - Inches(0.18), pc)
    tx(s, plat, C_XS[2] + Inches(0.12), y + Inches(0.12),
       C_WIDS[2] - Inches(0.24), ROW_H - Inches(0.22),
       sz=9, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    tx(s, bgt, C_XS[3] + PAD * 0.5, y + Inches(0.08),
       C_WIDS[3] - PAD, ROW_H - Inches(0.12),
       sz=10, bold=True, color=LGREEN, align=PP_ALIGN.CENTER)

# Total row
ty = CTOP + HDR_H + 9 * ROW_H
for x, w in zip(C_XS, C_WIDS):
    rect(s, x, ty, w, TOT_H, GREEN)
tx(s, "9 posts  ·  3 weeks", C_XS[0] + PAD, ty + Inches(0.07),
   C_WIDS[0] + C_WIDS[1] - PAD * 2, TOT_H - Inches(0.10), sz=10, bold=True, color=WHITE)
tx(s, "Php 6,000", C_XS[3] + PAD * 0.5, ty + Inches(0.06),
   C_WIDS[3] - PAD, TOT_H - Inches(0.08), sz=11, bold=True, color=AMBER,
   align=PP_ALIGN.CENTER)

footer(s)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 5 — WEEK 1: W26 TIKTOK ONLY
# ═══════════════════════════════════════════════════════════════════════════════
s = slide(); bg(s); gold_bar(s)
hdr(s, "Week 1 — W26  ·  Jun 22–28  ·  TikTok Only",
    "Learn TikTok Promote mechanics · establish baseline CPV + CPF · Php 2,000", accent=TIKRED)

# Post table
POST_HDR_H = Inches(0.34)
POST_ROW_H = Inches(0.78)
POST_TOT_H = Inches(0.34)

PC_WIDS = [Inches(2.1), Inches(6.5), Inches(2.3), Inches(1.73)]
PC_XS   = [CL]
for cw in PC_WIDS[:-1]: PC_XS.append(PC_XS[-1] + cw)

rect(s, CL, CTOP, CW, POST_HDR_H, TIKRED)
for lbl, x, w in zip(["Drop Date", "Post / Topic", "Platform", "Budget"], PC_XS, PC_WIDS):
    tx(s, lbl, x + PAD, CTOP + Inches(0.07), w - PAD * 2, POST_HDR_H - Inches(0.1),
       sz=9.5, bold=True, color=WHITE)

w1_posts = [
    ("MON · Jun 22", "Ang Sabi Nila: Pang-Matalino Lang Iyan", "TikTok Promote", "Php 700", "Jun 23–24"),
    ("WED · Jun 25", "Gemini para sa Guro",                    "TikTok Promote", "Php 700", "Jun 26–27"),
    ("FRI · Jun 27", "1 Buwan Kasama Tito AI — Ang Resulta",   "TikTok Promote", "Php 600", "Jun 28–29"),
]
for i, (day, topic, plat, bgt, bdates) in enumerate(w1_posts):
    y = CTOP + POST_HDR_H + i * POST_ROW_H
    rb = DKDARK if i % 2 == 0 else DARK
    for x, w in zip(PC_XS, PC_WIDS): rect(s, x, y, w, POST_ROW_H, rb)
    rect(s, PC_XS[0], y, Pt(4), POST_ROW_H, TIKRED)
    tx(s, day,   PC_XS[0] + PAD, y + Inches(0.08), PC_WIDS[0] - PAD * 2,
       Inches(0.28), sz=10, bold=True, color=TIKRED)
    tx(s, f"Boost: {bdates}", PC_XS[0] + PAD, y + Inches(0.42), PC_WIDS[0] - PAD * 2,
       Inches(0.26), sz=8.5, color=GRAY)
    tx(s, topic, PC_XS[1] + PAD, y + Inches(0.16), PC_WIDS[1] - PAD * 2,
       POST_ROW_H - Inches(0.26), sz=11, bold=True, color=WHITE)
    rect(s, PC_XS[2] + Inches(0.14), y + Inches(0.16), PC_WIDS[2] - Inches(0.28),
         Inches(0.44), TIKRED)
    tx(s, plat, PC_XS[2] + Inches(0.14), y + Inches(0.18), PC_WIDS[2] - Inches(0.28),
       Inches(0.42), sz=9, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    tx(s, "Php 350/day × 2" if bgt == "Php 700" else "Php 300/day × 2",
       PC_XS[2] + Inches(0.14), y + Inches(0.64), PC_WIDS[2] - Inches(0.28),
       Inches(0.22), sz=7.5, color=GRAY, align=PP_ALIGN.CENTER)
    tx(s, bgt, PC_XS[3] + PAD * 0.5, y + Inches(0.18),
       PC_WIDS[3] - PAD, Inches(0.40), sz=14, bold=True, color=LGREEN,
       align=PP_ALIGN.CENTER)

# Total row
pt_y = CTOP + POST_HDR_H + 3 * POST_ROW_H
for x, w in zip(PC_XS, PC_WIDS): rect(s, x, pt_y, w, POST_TOT_H, GREEN)
tx(s, "W26 WEEK TOTAL", PC_XS[0] + PAD, pt_y + Inches(0.07),
   Inches(6.0), POST_TOT_H - Inches(0.10), sz=10, bold=True, color=WHITE)
tx(s, "Php 2,000", PC_XS[3] + PAD * 0.5, pt_y + Inches(0.06),
   PC_WIDS[3] - PAD, POST_TOT_H - Inches(0.08), sz=11, bold=True, color=AMBER,
   align=PP_ALIGN.CENTER)

# Setup steps
SETUP_Y = CTOP + POST_HDR_H + 3 * POST_ROW_H + POST_TOT_H + Inches(0.14)
STEP_H  = Inches(0.34)

rect(s, CL, SETUP_Y, CW, Inches(0.30), DKDARK)
rect(s, CL, SETUP_Y, Pt(5), Inches(0.30), TEAL)
tx(s, "HOW TO BOOST ON TIKTOK PROMOTE", CL + PAD, SETUP_Y + Inches(0.07),
   CW - PAD * 2, Inches(0.22), sz=9, bold=True, color=TEAL)

steps_w1 = [
    "Open TikTok app → tap the posted video → tap Share (arrow) → tap \"Promote\"",
    "Goal: select \"More video views\" — views drive the algorithm and bring organic followers",
    "Audience: Automatic · Duration: 2 days · Budget: Php 300–350/day · confirm payment",
    "Start: morning AFTER posting — let it run organically for 8–12 hours first for best results",
]
for i, step in enumerate(steps_w1):
    step_row(s, SETUP_Y + Inches(0.30) + i * STEP_H, STEP_H, i + 1, step, TIKRED)

footer(s)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 6 — WEEK 2: W27 TIKTOK + INSTAGRAM
# ═══════════════════════════════════════════════════════════════════════════════
s = slide(); bg(s); gold_bar(s)
hdr(s, "Week 2 — W27  ·  Jun 29–Jul 5  ·  TikTok + Instagram",
    "Apply W26 learnings · add Instagram Boost · compare cost-per-follow · Php 2,000", accent=IGPUR)

# Post table (same structure)
rect(s, CL, CTOP, CW, POST_HDR_H, IGPUR)
for lbl, x, w in zip(["Drop Date", "Post / Topic", "Platform", "Budget"], PC_XS, PC_WIDS):
    tx(s, lbl, x + PAD, CTOP + Inches(0.07), w - PAD * 2, POST_HDR_H - Inches(0.1),
       sz=9.5, bold=True, color=WHITE)

w2_posts = [
    ("MON · Jun 30", "July Teaser — Ano ang Susunod?",  "TikTok Promote",  TIKRED, "Php 700", "Jul 1–2"),
    ("WED · Jul 2",  "TBD — Wednesday Demo",            "Instagram Boost", IGPUR,  "Php 700", "Jul 3–4"),
    ("FRI · Jul 4",  "TBD — Friday Story",              "TikTok Promote",  TIKRED, "Php 600", "Jul 5–6"),
]
for i, (day, topic, plat, pc, bgt, bdates) in enumerate(w2_posts):
    y = CTOP + POST_HDR_H + i * POST_ROW_H
    rb = DKDARK if i % 2 == 0 else DARK
    for x, w in zip(PC_XS, PC_WIDS): rect(s, x, y, w, POST_ROW_H, rb)
    rect(s, PC_XS[0], y, Pt(4), POST_ROW_H, pc)
    tx(s, day,   PC_XS[0] + PAD, y + Inches(0.08), PC_WIDS[0] - PAD * 2,
       Inches(0.28), sz=10, bold=True, color=pc)
    tx(s, f"Boost: {bdates}", PC_XS[0] + PAD, y + Inches(0.42), PC_WIDS[0] - PAD * 2,
       Inches(0.26), sz=8.5, color=GRAY)
    tx(s, topic, PC_XS[1] + PAD, y + Inches(0.16), PC_WIDS[1] - PAD * 2,
       POST_ROW_H - Inches(0.26), sz=11, bold=True, color=WHITE)
    rect(s, PC_XS[2] + Inches(0.14), y + Inches(0.16), PC_WIDS[2] - Inches(0.28),
         Inches(0.44), pc)
    tx(s, plat, PC_XS[2] + Inches(0.14), y + Inches(0.18), PC_WIDS[2] - Inches(0.28),
       Inches(0.42), sz=9, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    tx(s, bgt, PC_XS[3] + PAD * 0.5, y + Inches(0.18),
       PC_WIDS[3] - PAD, Inches(0.40), sz=14, bold=True, color=LGREEN,
       align=PP_ALIGN.CENTER)

pt_y = CTOP + POST_HDR_H + 3 * POST_ROW_H
for x, w in zip(PC_XS, PC_WIDS): rect(s, x, pt_y, w, POST_TOT_H, GREEN)
tx(s, "W27 WEEK TOTAL  ·  TikTok Php 1,300  +  Instagram Php 700",
   PC_XS[0] + PAD, pt_y + Inches(0.07), Inches(9.0), POST_TOT_H - Inches(0.10),
   sz=10, bold=True, color=WHITE)
tx(s, "Php 2,000", PC_XS[3] + PAD * 0.5, pt_y + Inches(0.06),
   PC_WIDS[3] - PAD, POST_TOT_H - Inches(0.08), sz=11, bold=True, color=AMBER,
   align=PP_ALIGN.CENTER)

# Two-column setup guide
SETUP_Y2 = CTOP + POST_HDR_H + 3 * POST_ROW_H + POST_TOT_H + Inches(0.14)
COL_W2   = Inches(6.16)
COL_GAP2 = Inches(0.31)

for col_i, (col_c, title, steps) in enumerate([
    (TIKRED, "TikTok Promote — same as Week 1", [
        "Goal: Video views · Audience: Automatic",
        "Duration: 2 days · Php 350/day for Mon post, Php 300/day for Fri",
        "If W26 CPF was < Php 20, increase Mon to Php 400/day",
    ]),
    (IGPUR, "Instagram Boost — NEW this week", [
        "Open Instagram post → tap \"Boost Post\" → Goal: More profile visits",
        "Audience: Automatic · Duration: 2 days · Php 350/day",
        "Check results in Instagram Insights → Boosted post tab after 48 hrs",
    ]),
]):
    cx = CL + col_i * (COL_W2 + COL_GAP2)
    rect(s, cx, SETUP_Y2, COL_W2, Inches(0.30), col_c)
    tx(s, title, cx + PAD, SETUP_Y2 + Inches(0.07), COL_W2 - PAD * 2, Inches(0.22),
       sz=9, bold=True, color=WHITE)
    for j, step in enumerate(steps):
        sy = SETUP_Y2 + Inches(0.30) + j * STEP_H
        rect(s, cx, sy, COL_W2, STEP_H, DKDARK if j % 2 == 0 else DARK)
        rect(s, cx, sy, Inches(0.34), STEP_H, col_c)
        tx(s, str(j + 1), cx + Inches(0.04), sy + PAD * 0.5,
           Inches(0.28), STEP_H - PAD * 0.5, sz=10, bold=True, color=WHITE,
           align=PP_ALIGN.CENTER)
        tx(s, step, cx + Inches(0.42), sy + PAD * 0.5,
           COL_W2 - Inches(0.50), STEP_H - PAD * 0.5, sz=9.5, color=LGRAY)

footer(s)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 7 — WEEK 3: W28 ALL 3 PLATFORMS
# ═══════════════════════════════════════════════════════════════════════════════
s = slide(); bg(s); gold_bar(s)
hdr(s, "Week 3 — W28  ·  Jul 6–12  ·  All 3 Platforms",
    "Full push · compare CPF across platforms · decide July budget · FB Page required", accent=FBBLUE)

# 3 platform cards side by side
CARD3_W = Inches(4.07)
CARD3_H = Inches(2.74)
CARD3_GAP = Inches(0.18)

for i, (pc, plat, day, topic, rate, bgt, bdates, obj) in enumerate([
    (TIKRED, "TikTok Promote",  "MON · Jul 7",  "TBD — Monday AI Tip",
     "Php 300/day × 2 days", "Php 600", "Jul 8–9",
     "Goal: Video views · Automatic audience · Start Jul 8 morning"),
    (FBBLUE, "Facebook Boost",  "WED · Jul 9",  "TBD — Wednesday Demo",
     "Php 400/day × 2 days", "Php 800", "Jul 10–11",
     "Goal: Reach + Page likes · Philippines 22–45 · Tech/Freelancing interests"),
    (IGPUR,  "Instagram Boost", "FRI · Jul 11", "TBD — Friday Story",
     "Php 300/day × 2 days", "Php 600", "Jul 12–13",
     "Goal: Profile visits · Automatic audience · Start Jul 12 morning"),
]):
    cx = CL + i * (CARD3_W + CARD3_GAP)
    rect(s, cx, CTOP, CARD3_W, CARD3_H, DARK)
    rect(s, cx, CTOP, CARD3_W, Pt(5), pc)
    tx(s, plat, cx + PAD, CTOP + Inches(0.08), CARD3_W - PAD * 2, Inches(0.28),
       sz=11, bold=True, color=pc)
    rect(s, cx + PAD, CTOP + Inches(0.42), CARD3_W - PAD * 2, Inches(0.42), pc)
    tx(s, bgt, cx + PAD, CTOP + Inches(0.44), CARD3_W - PAD * 2, Inches(0.38),
       sz=18, bold=True, color=WHITE, align=PP_ALIGN.CENTER)
    tx(s, day,   cx + PAD, CTOP + Inches(0.94), CARD3_W - PAD * 2, Inches(0.26),
       sz=10, bold=True, color=pc)
    tx(s, topic, cx + PAD, CTOP + Inches(1.22), CARD3_W - PAD * 2, Inches(0.36),
       sz=10, color=WHITE)
    tx(s, rate,  cx + PAD, CTOP + Inches(1.64), CARD3_W - PAD * 2, Inches(0.24),
       sz=9, color=AMBER)
    tx(s, f"Boost: {bdates}", cx + PAD, CTOP + Inches(1.92), CARD3_W - PAD * 2,
       Inches(0.24), sz=9, color=GRAY)
    tx(s, obj, cx + PAD, CTOP + Inches(2.22), CARD3_W - PAD * 2, Inches(0.44),
       sz=8.5, italic=True, color=LGRAY)

# Warning + total + scale note
WY = CTOP + CARD3_H + Inches(0.12)
rect(s, CL, WY, CW, Inches(0.52), RGBColor(0x7F, 0x1D, 0x1D))
rect(s, CL, WY, Pt(5), Inches(0.52), RED2)
tx(s, "⚠️  BEFORE WEEK 3: Facebook Page required. "
      "Go to facebook.com/pages/create → Business or brand. "
      "Personal profiles cannot run paid boosts or access analytics.",
   CL + PAD, WY + Inches(0.08), CW - PAD * 2, Inches(0.38),
   sz=10, bold=True, color=WHITE)

TY3 = WY + Inches(0.52) + Inches(0.10)
rect(s, CL, TY3, CW, Inches(0.38), GREEN)
tx(s, "W28 TOTAL:  Php 2,000   ·   TikTok Php 600  +  Facebook Php 800  +  Instagram Php 600   ·   3-Week Grand Total: Php 6,000",
   CL + PAD, TY3 + Inches(0.08), CW - PAD * 2, Inches(0.26),
   sz=10, bold=True, color=WHITE)

SY3 = TY3 + Inches(0.38) + Inches(0.08)
rect(s, CL, SY3, CW, Inches(0.36), DKDARK)
rect(s, CL, SY3, Pt(5), Inches(0.36), GOLD)
tx(s, "After W28: compare CPF across all 3 platforms → winner gets biggest July budget. "
      "Scale rule: CPF < Php 12 → add Php 400/week to that platform.",
   CL + PAD, SY3 + Inches(0.08), CW - PAD * 2, Inches(0.24),
   sz=9, color=AMBER)

footer(s)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 8 — BUDGET SUMMARY
# ═══════════════════════════════════════════════════════════════════════════════
s = slide(); bg(s); gold_bar(s)
hdr(s, "Budget Summary — 3 Weeks",
    "Php 6,000 total  ·  W26 TikTok  →  W27 TikTok+IG  →  W28 All 3")

# 4-column table: Week | TikTok | Instagram | Facebook
BS_WIDS = [Inches(2.5), Inches(3.3), Inches(3.3), Inches(3.53)]
BS_XS   = [CL]
for cw in BS_WIDS[:-1]: BS_XS.append(BS_XS[-1] + cw)
BS_HDR  = Inches(0.34)
BS_ROW  = Inches(0.96)
BS_TOT  = Inches(0.38)

for lbl, x, w in zip(["Week", "TikTok", "Instagram", "Facebook"], BS_XS, BS_WIDS):
    rect(s, x, CTOP, w, BS_HDR, DARK)
    tx(s, lbl, x + PAD, CTOP + Inches(0.08), w - PAD * 2, BS_HDR - Inches(0.1),
       sz=10, bold=True, color=GOLD)

bsrows = [
    (TIKRED, "W26  Jun 22–28",
     "Php 2,000\n3 posts · TikTok Promote only", TIKRED,
     "—", GRAY,
     "—", GRAY,
     "Php 2,000"),
    (IGPUR, "W27  Jun 29–Jul 5",
     "Php 1,300\n2 posts · TikTok Promote", TIKRED,
     "Php 700\n1 post · Instagram Boost", IGPUR,
     "—", GRAY,
     "Php 2,000"),
    (FBBLUE, "W28  Jul 6–12",
     "Php 600\n1 post · TikTok Promote", TIKRED,
     "Php 600\n1 post · Instagram Boost", IGPUR,
     "Php 800\n1 post · Facebook Boost", FBBLUE,
     "Php 2,000"),
]
for i, (wkc, wk, tk, tc, ig, ic, fb, fc, tot) in enumerate(bsrows):
    y = CTOP + BS_HDR + i * BS_ROW
    rb = DKDARK if i % 2 == 0 else DARK
    for x, w in zip(BS_XS, BS_WIDS): rect(s, x, y, w, BS_ROW, rb)
    rect(s, BS_XS[0], y, Pt(5), BS_ROW, wkc)
    tx(s, wk, BS_XS[0] + PAD, y + Inches(0.22), BS_WIDS[0] - PAD * 2, Inches(0.50),
       sz=10, bold=True, color=wkc)
    for val, col, x, w in [(tk, tc, BS_XS[1], BS_WIDS[1]),
                            (ig, ic, BS_XS[2], BS_WIDS[2]),
                            (fb, fc, BS_XS[3], BS_WIDS[3])]:
        if val != "—":
            lines = val.split("\n")
            tx(s, lines[0], x + PAD, y + Inches(0.14), w - PAD * 2, Inches(0.36),
               sz=14, bold=True, color=LGREEN)
            if len(lines) > 1:
                tx(s, lines[1], x + PAD, y + Inches(0.52), w - PAD * 2, Inches(0.36),
                   sz=9, color=col)
        else:
            tx(s, "—", x + PAD, y + Inches(0.34), w - PAD * 2, Inches(0.26),
               sz=14, color=GRAY)

# Total row
ty8 = CTOP + BS_HDR + 3 * BS_ROW
for x, w in zip(BS_XS, BS_WIDS): rect(s, x, ty8, w, BS_TOT, GREEN)
tx(s, "3-WEEK GRAND TOTAL", BS_XS[0] + PAD, ty8 + Inches(0.09),
   Inches(5.0), BS_TOT - Inches(0.12), sz=10, bold=True, color=WHITE)
tx(s, "Php 3,900", BS_XS[1] + PAD, ty8 + Inches(0.08), BS_WIDS[1] - PAD * 2,
   BS_TOT - Inches(0.10), sz=11, bold=True, color=TIKRED)
tx(s, "Php 1,300", BS_XS[2] + PAD, ty8 + Inches(0.08), BS_WIDS[2] - PAD * 2,
   BS_TOT - Inches(0.10), sz=11, bold=True, color=IGPUR)
tx(s, "Php 800", BS_XS[3] + PAD, ty8 + Inches(0.08), BS_WIDS[3] - PAD * 2,
   BS_TOT - Inches(0.10), sz=11, bold=True, color=FBBLUE)

# Scale rules
SY8 = ty8 + BS_TOT + Inches(0.16)
rect(s, CL, SY8, CW, Inches(0.28), DKDARK)
rect(s, CL, SY8, Pt(5), Inches(0.28), GOLD)
tx(s, "SCALE RULES — WEEK 4+ (July)", CL + PAD, SY8 + Inches(0.06),
   Inches(5.0), Inches(0.20), sz=8.5, bold=True, color=GOLD)
srules = [
    "Single post earns 25+ followers  →  extend that post 2 more days at the same daily rate",
    "Cost-per-follow drops below Php 30  →  increase that platform's weekly budget by Php 400",
    "Platform with lowest CPF across W26–W28  →  gets the biggest share of July budget",
]
for i, rule in enumerate(srules):
    ry = SY8 + Inches(0.28) + i * Inches(0.36)
    rect(s, CL, ry, CW, Inches(0.34), DKDARK if i % 2 == 0 else DARK)
    tx(s, rule, CL + PAD, ry + Inches(0.07), CW - PAD * 2, Inches(0.24),
       sz=9.5, color=LGRAY)

footer(s)


# ═══════════════════════════════════════════════════════════════════════════════
# SLIDE 9 — KPIs & TRACKING
# ═══════════════════════════════════════════════════════════════════════════════
s = slide(); bg(s); gold_bar(s)
hdr(s, "KPIs to Track Weekly",
    "Baseline: IG 1,031 views · 389 reached (organic) · targets based on PH market rates for new accounts")

# Baseline context bar
rect(s, CL, CTOP, CW, Inches(0.32), RGBColor(0x1C, 0x1F, 0x2E))
rect(s, CL, CTOP, Pt(5), Inches(0.32), AMBER)
tx(s, "ORGANIC BASELINE (before boost)  ·  Instagram: 1,031 total views · 389 accounts reached · ~200–350 views/Reel  "
      "·  TikTok: pending  ·  New account — boost targets set conservatively",
   CL + PAD, CTOP + Inches(0.07), CW - PAD * 2, Inches(0.22), sz=8.5, color=AMBER)

# 4-column KPI table: Metric | TikTok | Instagram | Facebook
KW = [Inches(3.86), Inches(2.9), Inches(2.9), Inches(2.97)]
KX = [CL]
for cw in KW[:-1]: KX.append(KX[-1] + cw)
KHH = Inches(0.34)
KRH = Inches(0.38)
KTY = CTOP + Inches(0.32) + Inches(0.08)   # table starts after baseline bar

for lbl, x, w, c in zip(["Metric", "TikTok", "Instagram", "Facebook"],
                          KX, KW, [GOLD, TIKRED, IGPUR, FBBLUE]):
    rect(s, x, KTY, w, KHH, DARK)
    tx(s, lbl, x + PAD, KTY + Inches(0.08), w - PAD * 2, KHH - Inches(0.1),
       sz=10, bold=True, color=c)

# Realistic KPIs for a new PH account with Php 300-400/day boost budget
# IG organic: ~200-350 views/post · Php 300/day TikTok → ~800-2,000 views/day · PH CPM Php 30-80
kpi_rows = [
    ("Reach per boosted post",     "600–1,500",       "400–900",          "500–1,200"),
    ("Views per boosted post",     "800–2,000",       "300–700",          "N/A"),
    ("New followers per boost",    "5–20",            "3–12",             "10–25 page likes"),
    ("Cost per follow",            "Php 35–90",       "Php 60–110",       "Php 35–80"),
    ("Watch completion (W1)",      "15–30%",          "20–35%",           "N/A"),
    ("W3 CPF target (goal)",       "< Php 45",        "< Php 65",         "< Php 55"),
]
for i, (metric, tk, ig, fb) in enumerate(kpi_rows):
    y = KTY + KHH + i * KRH
    rb = DKDARK if i % 2 == 0 else DARK
    for x, w in zip(KX, KW): rect(s, x, y, w, KRH, rb)
    rect(s, KX[0], y, Pt(4), KRH, TEAL)
    tx(s, metric, KX[0] + PAD, y + Inches(0.12), KW[0] - PAD * 2, KRH - Inches(0.18),
       sz=10, color=LGRAY)
    for val, x, w, c in [(tk, KX[1], KW[1], TIKRED),
                          (ig, KX[2], KW[2], IGPUR),
                          (fb, KX[3], KW[3], FBBLUE)]:
        tx(s, val, x + PAD, y + Inches(0.12), w - PAD * 2, KRH - Inches(0.18),
           sz=10, bold=True, color=c, align=PP_ALIGN.CENTER)

# Where to pull
WP_Y = KTY + KHH + 6 * KRH + Inches(0.12)
rect(s, CL, WP_Y, CW, Inches(0.34), DKDARK)
rect(s, CL, WP_Y, Pt(5), Inches(0.34), TEAL)
tx(s, "WHERE TO PULL  ·  "
      "TikTok: Creator Center → Analytics + Promote tab   "
      "Instagram: Professional Dashboard → Boosted post   "
      "Facebook: Business Suite → Page Insights",
   CL + PAD, WP_Y + Inches(0.07), CW - PAD * 2, Inches(0.24), sz=9, color=LGRAY)

# Engagement checklist
CH_Y = WP_Y + Inches(0.34) + Inches(0.10)
checks = [
    "Reply to ALL comments within first 1 hour of posting",
    "Pin first comment within 5 min — tip or claude.ai link",
    "Upload natively to each platform — never use TikTok cross-post link",
    "End every video with a YES/NO question to drive comment rate",
]
rect(s, CL, CH_Y, CW, Inches(0.28), DKDARK)
rect(s, CL, CH_Y, Pt(5), Inches(0.28), GOLD)
tx(s, "POST-DAY CHECKLIST", CL + PAD, CH_Y + Inches(0.06), Inches(4.0), Inches(0.20),
   sz=8.5, bold=True, color=GOLD)
for i, chk in enumerate(checks):
    cy = CH_Y + Inches(0.28) + i * Inches(0.28)
    rect(s, CL, cy, CW, Inches(0.26), DKDARK if i % 2 == 0 else DARK)
    tx(s, f"☐  {chk}", CL + PAD, cy + Inches(0.07), CW - PAD * 2, Inches(0.22),
       sz=9.5, color=LGRAY)

footer(s)


# ── Save PPTX ─────────────────────────────────────────────────────────────────
prs.save(OUT_PPTX)
print(f"✓ PPTX  {_sn[0]} slides → {OUT_PPTX}")


# ═══════════════════════════════════════════════════════════════════════════════
# PDF — ReportLab
# ═══════════════════════════════════════════════════════════════════════════════
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm
from reportlab.lib import colors
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable, KeepTogether)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_CENTER

C_NAVY = colors.HexColor("#0A0F1E"); C_GOLD = colors.HexColor("#F59E0B")
C_TEAL = colors.HexColor("#0D9488"); C_WHITE= colors.white
C_GRAY = colors.HexColor("#9CA3AF"); C_LG   = colors.HexColor("#E5E7EB")
C_DARK = colors.HexColor("#111827"); C_DK2  = colors.HexColor("#0D1626")
C_GRN  = colors.HexColor("#059669"); C_LGRN = colors.HexColor("#10B981")
C_AMBE = colors.HexColor("#FCD34D"); C_TIK  = colors.HexColor("#FF0050")
C_IGP  = colors.HexColor("#C13B84"); C_FBB  = colors.HexColor("#1877F2")
C_RED  = colors.HexColor("#DC2626")

styles = getSampleStyleSheet()
def S(name, **kw):
    return ParagraphStyle(name + str(id(kw)),
                          parent=styles.get(name, styles["Normal"]), **kw)

H2   = S("Normal", fontSize=14, leading=18, fontName="Helvetica-Bold", textColor=C_GOLD)
H3   = S("Normal", fontSize=10, leading=13, fontName="Helvetica-Bold", textColor=C_GOLD)
BODY = S("Normal", fontSize=9,  leading=13, fontName="Helvetica",      textColor=C_DARK)
SM   = S("Normal", fontSize=7.5,leading=11, fontName="Helvetica",      textColor=colors.HexColor("#6B7280"))
ITA  = S("Normal", fontSize=8.5,leading=12, fontName="Helvetica-Oblique",
          textColor=colors.HexColor("#6B7280"))

def hr(c=C_GOLD, t=1):
    return HRFlowable(width="100%", thickness=t, color=c, spaceAfter=4, spaceBefore=2)

def sec(title, sub=None):
    out = [Spacer(1, 0.2*cm), Paragraph(title, H2)]
    if sub: out.append(Paragraph(sub, ITA))
    out.append(hr())
    return out

def bul(text, c=C_TEAL):
    return Paragraph(
        f'<font color="#{c.hexval()[2:]}">▸</font>  {text}', BODY)

def ptbl(data, widths, hdr_bg=C_DARK, tot_i=None):
    t = Table(data, colWidths=widths)
    cmds = [
        ("BACKGROUND", (0,0), (-1,0), hdr_bg),
        ("ROWBACKGROUNDS", (0,1), (-1,-1), [C_DK2, C_DARK]),
        ("TOPPADDING",    (0,0), (-1,-1), 5),
        ("BOTTOMPADDING", (0,0), (-1,-1), 5),
        ("LEFTPADDING",   (0,0), (-1,-1), 6),
        ("RIGHTPADDING",  (0,0), (-1,-1), 6),
        ("GRID",          (0,0), (-1,-1), 0.25, C_DK2),
        ("VALIGN",        (0,0), (-1,-1), "TOP"),
    ]
    if tot_i:
        cmds.append(("BACKGROUND", (0, tot_i), (-1, tot_i), C_GRN))
    t.setStyle(TableStyle(cmds))
    return t

story = []

# Cover
story.append(Spacer(1, 0.8*cm))
cvd = [
    [Paragraph("<b>TITO AI — @TitoAIPH</b>",
               S("Normal",fontSize=28,fontName="Helvetica-Bold",textColor=C_GOLD,leading=34))],
    [Paragraph("Content Boost Plan  ·  W26–W28  ·  June–July 2026",
               S("Normal",fontSize=14,fontName="Helvetica-Bold",textColor=C_WHITE,leading=18))],
    [Paragraph("3 weeks  ·  9 posts  ·  Php 6,000 total  ·  Launch: Jun 22, 2026",
               S("Normal",fontSize=10,fontName="Helvetica",textColor=C_LG,leading=13))],
    [Spacer(1,0.2*cm)],
    [Paragraph("Progressive ramp:  W26 TikTok only  →  W27 TikTok + Instagram  →  W28 All 3 platforms",
               S("Normal",fontSize=9,fontName="Helvetica-Oblique",textColor=C_AMBE,leading=12))],
    [Spacer(1,0.2*cm)],
    [Paragraph('"The warm, relatable Tito who teaches everyday Filipinos to use AI for free — before it replaces their job."',
               S("Normal",fontSize=9,fontName="Helvetica-Oblique",textColor=C_AMBE,leading=12))],
]
ct = Table(cvd, colWidths=[15*cm])
ct.setStyle(TableStyle([
    ("BACKGROUND",(0,0),(-1,-1),C_NAVY),
    ("TOPPADDING",(0,0),(-1,-1),7),("BOTTOMPADDING",(0,0),(-1,-1),7),
    ("LEFTPADDING",(0,0),(-1,-1),16),("LINEBELOW",(0,1),(-1,1),2,C_GOLD),
]))
story.append(ct); story.append(Spacer(1,0.5*cm))

# Target Market
story += sec("Target Market — Mga Pamangkin", "Who we reach · why they follow")
seg_data = [
    [Paragraph(h, S("Normal",fontSize=8.5,fontName="Helvetica-Bold",textColor=C_WHITE,leading=11))
     for h in ["Audience", "Size", "Fear / Need", "Why They Follow"]],
    *[
        [Paragraph(f'<font color="#{c.hexval()[2:]}">{seg}</font>',
                   S("Normal",fontSize=9.5,fontName="Helvetica-Bold",textColor=c,leading=12)),
         Paragraph(size, BODY), Paragraph(fn, BODY), Paragraph(why, BODY)]
        for seg, c, size, fn, why in [
            ("Freelancers",     C_GOLD,  "1.5M+",      "Client AI replacement",   "Real Php output demos, job-specific hooks"),
            ("Guro / Teachers", C_TEAL,  "900K+ DepEd","Admin + curriculum overload","Lesson plans in 2 min; one guro = 40 families"),
            ("BPO Workers",     C_TIK,   "1.9M",       "Automation layoffs",      "Fear + upskill solution in same video"),
            ("Nanays / Tatays", C_IGP,   "Millions",   "Left behind, no time",    "Family budget demos, everyday use cases"),
            ("SME Owners",      C_FBB,   "14.9% use AI","Losing to competition",  "Real business wins with Php budgets"),
        ]
    ],
]
story.append(ptbl(seg_data, [3.0*cm, 1.8*cm, 3.8*cm, 6.4*cm]))
story.append(Spacer(1,0.3*cm))

# Strategy
story += sec("3-Week Boost Strategy",
             "Php 2,000/week · 3 posts/week · progressive platform ramp · launch Jun 22")
strat_data = [
    [Paragraph(h, S("Normal",fontSize=8.5,fontName="Helvetica-Bold",textColor=C_WHITE,leading=11))
     for h in ["Week", "Dates", "Platforms", "Posts", "Budget"]],
    *[
        [Paragraph(f'<font color="#{c.hexval()[2:]}">{wk}</font>',
                   S("Normal",fontSize=10,fontName="Helvetica-Bold",textColor=c,leading=13)),
         Paragraph(dates, BODY),
         Paragraph(f'<font color="#{c.hexval()[2:]}">{plat}</font>',
                   S("Normal",fontSize=10,fontName="Helvetica-Bold",textColor=c,leading=13)),
         Paragraph(posts, BODY),
         Paragraph(bgt, S("Normal",fontSize=11,fontName="Helvetica-Bold",textColor=C_LGRN,leading=14))]
        for wk, c, dates, plat, posts, bgt in [
            ("W26",C_TIK,"Jun 22–28","TikTok only",
             "Mon: Ang Sabi Nila\nWed: Gemini para sa Guro\nFri: 1 Buwan Kasama Tito AI","Php 2,000"),
            ("W27",C_IGP,"Jun 29–Jul 5","TikTok + Instagram",
             "Mon: July Teaser\nWed: TBD Demo\nFri: TBD Story","Php 2,000"),
            ("W28",C_FBB,"Jul 6–12","All 3 platforms",
             "Mon: TBD Tip\nWed: TBD Demo\nFri: TBD Story","Php 2,000"),
        ]
    ],
    [Paragraph("TOTAL",S("Normal",fontSize=10,fontName="Helvetica-Bold",textColor=C_WHITE,leading=13)),
     Paragraph("3 weeks",BODY), Paragraph("3 platforms",BODY),
     Paragraph("9 posts",BODY),
     Paragraph("Php 6,000",S("Normal",fontSize=12,fontName="Helvetica-Bold",textColor=C_AMBE,leading=15))],
]
story.append(ptbl(strat_data, [1.5*cm, 2.6*cm, 3.5*cm, 4.9*cm, 2.5*cm], tot_i=4))
story.append(Spacer(1,0.3*cm))

# Calendar
story += sec("9-Post Content Calendar", "Mon/Wed/Fri · drop 7–8 PM PHT · boost starts morning after")
cal_data = [
    [Paragraph(h, S("Normal",fontSize=8.5,fontName="Helvetica-Bold",textColor=C_WHITE,leading=11))
     for h in ["Week · Date", "Day · Topic", "Platform", "Budget", "Boost Dates"]],
    *[
        [Paragraph(f'<font color="#{wc.hexval()[2:]}">{wkd}</font>',
                   S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=wc,leading=12)),
         Paragraph(f"<b>{day}</b>  {topic}", BODY),
         Paragraph(f'<font color="#{pc.hexval()[2:]}">{plat}</font>',
                   S("Normal",fontSize=9.5,fontName="Helvetica-Bold",textColor=pc,leading=12)),
         Paragraph(bgt, S("Normal",fontSize=10,fontName="Helvetica-Bold",textColor=C_LGRN,leading=13)),
         Paragraph(bd, SM)]
        for wkd,wc,day,topic,plat,pc,bgt,bd in [
            ("W26 · Jun 22",C_TIK,"MON","Ang Sabi Nila: Pang-Matalino Lang Iyan","TikTok",C_TIK,"Php 700","Jun 23–24"),
            ("W26 · Jun 25",C_TIK,"WED","Gemini para sa Guro","TikTok",C_TIK,"Php 700","Jun 26–27"),
            ("W26 · Jun 27",C_TIK,"FRI","1 Buwan Kasama Tito AI — Ang Resulta","TikTok",C_TIK,"Php 600","Jun 28–29"),
            ("W27 · Jun 30",C_IGP,"MON","July Teaser — Ano ang Susunod?","TikTok",C_TIK,"Php 700","Jul 1–2"),
            ("W27 · Jul 2", C_IGP,"WED","TBD — Wednesday Demo","Instagram",C_IGP,"Php 700","Jul 3–4"),
            ("W27 · Jul 4", C_IGP,"FRI","TBD — Friday Story","TikTok",C_TIK,"Php 600","Jul 5–6"),
            ("W28 · Jul 7", C_FBB,"MON","TBD — Monday AI Tip","TikTok",C_TIK,"Php 600","Jul 8–9"),
            ("W28 · Jul 9", C_FBB,"WED","TBD — Wednesday Demo","Facebook",C_FBB,"Php 800","Jul 10–11"),
            ("W28 · Jul 11",C_FBB,"FRI","TBD — Friday Story","Instagram",C_IGP,"Php 600","Jul 12–13"),
        ]
    ],
    [Paragraph("TOTAL",S("Normal",fontSize=10,fontName="Helvetica-Bold",textColor=C_WHITE,leading=13)),
     Paragraph("9 posts · 3 weeks",BODY), Paragraph("3 platforms",BODY),
     Paragraph("Php 6,000",S("Normal",fontSize=11,fontName="Helvetica-Bold",textColor=C_AMBE,leading=14)),
     Paragraph("",BODY)],
]
story.append(ptbl(cal_data, [2.2*cm,5.2*cm,2.4*cm,1.6*cm,2.6*cm], tot_i=10))
story.append(Spacer(1,0.3*cm))

# Budget
story += sec("Budget Breakdown by Week")
for wk_lbl, wkc, rows, wk_tot, note in [
    ("WEEK 1 — W26 (Jun 22–28) · TikTok Only · Php 2,000", C_TIK, [
        ("Mon Jun 22","Ang Sabi Nila: Pang-Matalino Lang Iyan","TikTok Promote","Php 350/day × 2","Php 700","Jun 23–24"),
        ("Wed Jun 25","Gemini para sa Guro","TikTok Promote","Php 350/day × 2","Php 700","Jun 26–27"),
        ("Fri Jun 27","1 Buwan Kasama Tito AI — Ang Resulta","TikTok Promote","Php 300/day × 2","Php 600","Jun 28–29"),
    ], "Php 2,000", "Goal: Video views · Automatic audience · Start boost morning after each post"),
    ("WEEK 2 — W27 (Jun 29–Jul 5) · TikTok + Instagram · Php 2,000", C_IGP, [
        ("Mon Jun 30","July Teaser — Ano ang Susunod?","TikTok Promote","Php 350/day × 2","Php 700","Jul 1–2"),
        ("Wed Jul 2","TBD — Wednesday Demo","Instagram Boost","Php 350/day × 2","Php 700","Jul 3–4"),
        ("Fri Jul 4","TBD — Friday Story","TikTok Promote","Php 300/day × 2","Php 600","Jul 5–6"),
    ], "Php 2,000", "Apply W26 data · TikTok: video views · Instagram: profile visits"),
    ("WEEK 3 — W28 (Jul 6–12) · All 3 Platforms · Php 2,000", C_FBB, [
        ("Mon Jul 7","TBD — Monday AI Tip","TikTok Promote","Php 300/day × 2","Php 600","Jul 8–9"),
        ("Wed Jul 9","TBD — Wednesday Demo","Facebook Boost","Php 400/day × 2","Php 800","Jul 10–11"),
        ("Fri Jul 11","TBD — Friday Story","Instagram Boost","Php 300/day × 2","Php 600","Jul 12–13"),
    ], "Php 2,000", "⚠️ Facebook Page required before boosting"),
]:
    story.append(KeepTogether([
        Paragraph(wk_lbl, S("Normal",fontSize=10,fontName="Helvetica-Bold",
                              textColor=wkc,leading=13)),
        Paragraph(note, ITA),
    ]))
    wd = [
        [Paragraph(h,S("Normal",fontSize=8,fontName="Helvetica-Bold",textColor=C_WHITE,leading=11))
         for h in ["Day","Topic","Platform","Rate","Total","Boost"]],
        *[[Paragraph(d,BODY),Paragraph(t,BODY),
           Paragraph(f'<font color="#{wkc.hexval()[2:]}">{p}</font>',
                     S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=wkc,leading=11)),
           Paragraph(r,SM),
           Paragraph(tot,S("Normal",fontSize=10,fontName="Helvetica-Bold",textColor=C_LGRN,leading=13)),
           Paragraph(b,SM)]
          for d,t,p,r,tot,b in rows],
        [Paragraph("",BODY),Paragraph("",BODY),Paragraph("",BODY),
         Paragraph("Week Total",S("Normal",fontSize=9,fontName="Helvetica-Bold",textColor=C_WHITE,leading=12)),
         Paragraph(wk_tot,S("Normal",fontSize=11,fontName="Helvetica-Bold",textColor=C_AMBE,leading=14)),
         Paragraph("",BODY)],
    ]
    wt = Table(wd, colWidths=[2.2*cm,4.8*cm,2.8*cm,2.2*cm,1.6*cm,2.4*cm])
    wt.setStyle(TableStyle([
        ("BACKGROUND",(0,0),(-1,0),C_DARK),
        ("BACKGROUND",(0,len(rows)+1),(-1,len(rows)+1),C_GRN),
        ("ROWBACKGROUNDS",(0,1),(-1,len(rows)),[C_DK2,C_DARK]),
        ("TOPPADDING",(0,0),(-1,-1),5),("BOTTOMPADDING",(0,0),(-1,-1),5),
        ("LEFTPADDING",(0,0),(-1,-1),5),("GRID",(0,0),(-1,-1),0.25,C_DK2),
        ("VALIGN",(0,0),(-1,-1),"TOP"),
    ]))
    story.append(wt); story.append(Spacer(1,0.25*cm))

# KPIs
story += sec("KPIs to Track Weekly", "Pull every Sunday · share screenshots with Jeff")
kpi_d = [
    [Paragraph(h,S("Normal",fontSize=8.5,fontName="Helvetica-Bold",textColor=C_WHITE,leading=11))
     for h in ["Metric","TikTok Target","Instagram Target","Facebook Target"]],
    *[
        [Paragraph(m,BODY),
         Paragraph(tk,S("Normal",fontSize=9.5,fontName="Helvetica-Bold",textColor=C_TIK,leading=12)),
         Paragraph(ig,S("Normal",fontSize=9.5,fontName="Helvetica-Bold",textColor=C_IGP,leading=12)),
         Paragraph(fb,S("Normal",fontSize=9.5,fontName="Helvetica-Bold",textColor=C_FBB,leading=12))]
        for m,tk,ig,fb in [
            ("Reach per boosted post","600–1,500","400–900","500–1,200"),
            ("Views per boosted post","800–2,000","300–700","N/A"),
            ("New followers per boost","5–20","3–12","10–25 page likes"),
            ("Cost per follow (W1)","Php 35–90","Php 60–110","Php 35–80"),
            ("W3 CPF target (goal)","< Php 45","< Php 65","< Php 55"),
        ]
    ],
]
story.append(ptbl(kpi_d, [4.2*cm,3.6*cm,3.6*cm,3.6*cm]))
story.append(Spacer(1,0.2*cm))

story.append(Paragraph("Scale Rules — Week 4+ (July)", H3))
for rule in [
    "25+ followers from a single boost → extend that post 2 more days at same daily rate",
    "Cost-per-follow drops below Php 30 → increase that platform's weekly budget by Php 400",
    "Platform with lowest CPF → gets biggest July budget allocation",
]:
    story.append(bul(rule, C_GOLD))

story.append(Spacer(1,0.6*cm))
story.append(Paragraph(
    "Tito AI @TitoAIPH  ·  Content Boost Plan W26–W28  ·  Prepared by Jeff de las Armas  ·  June 2026",
    S("Normal",fontSize=7,fontName="Helvetica",textColor=C_GRAY,leading=10,alignment=TA_CENTER)))

doc = SimpleDocTemplate(OUT_PDF, pagesize=A4,
                        leftMargin=1*cm, rightMargin=1*cm,
                        topMargin=1.2*cm, bottomMargin=1.2*cm,
                        title="Tito AI Content Boost Plan W26-W28",
                        author="Jeff de las Armas")
doc.build(story)
print(f"✓ PDF  → {OUT_PDF}")
