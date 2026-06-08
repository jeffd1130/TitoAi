#!/usr/bin/env python3
"""Generate Tito AI branded carousel slides for W24 Monday post."""

from PIL import Image, ImageDraw, ImageFont
import os

# ── Paths ──────────────────────────────────────────────────────────────────
BASE = "/Users/jeff/Documents/Claude/TItoAi"
FONT_DIR = f"{BASE}/brand/fonts"
OUT_DIR = f"{BASE}/content/2026-W24/01-mon-ai-tip/carousel"
os.makedirs(OUT_DIR, exist_ok=True)

# ── Brand colors ───────────────────────────────────────────────────────────
NAVY   = (10, 15, 30)       # #0A0F1E
GOLD   = (245, 158, 11)     # #F59E0B
TEAL   = (13, 148, 136)     # #0D9488
WHITE  = (249, 250, 251)    # #F9FAFB
GRAY   = (156, 163, 175)    # #9CA3AF
DARK   = (17, 24, 39)       # #111827 — card bg

# ── Canvas size ────────────────────────────────────────────────────────────
W, H = 1080, 1920

# ── Fonts ──────────────────────────────────────────────────────────────────
def font(name, size):
    paths = {
        "bebas":  f"{FONT_DIR}/BebasNeue-Regular.ttf",
        "dmsans": f"{FONT_DIR}/DMSans-Regular.ttf",
        "lora":   f"{FONT_DIR}/Lora-Bold.ttf",
    }
    return ImageFont.truetype(paths[name], size)

# ── Helpers ────────────────────────────────────────────────────────────────
def wrap_text(draw, text, fnt, max_width):
    """Word-wrap text to fit within max_width pixels."""
    words = text.split()
    lines, line = [], ""
    for word in words:
        test = (line + " " + word).strip()
        if draw.textlength(test, font=fnt) <= max_width:
            line = test
        else:
            if line:
                lines.append(line)
            line = word
    if line:
        lines.append(line)
    return lines

def draw_text_block(draw, lines, fnt, x, y, color, line_gap=12):
    """Draw multiple lines, return final y."""
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=color)
        bbox = draw.textbbox((0, 0), line, font=fnt)
        y += (bbox[3] - bbox[1]) + line_gap
    return y

def paste_logo(img, logo_path, target_w, pos_x, pos_y, anchor="left"):
    """Paste logo scaled to target_w. anchor: left | center."""
    logo = Image.open(logo_path).convert("RGBA")
    ratio = target_w / logo.width
    new_h = int(logo.height * ratio)
    logo = logo.resize((target_w, new_h), Image.LANCZOS)
    if anchor == "center":
        pos_x = pos_x - target_w // 2
    img.paste(logo, (pos_x, pos_y), logo)
    return new_h

def draw_gold_line(draw, x1, y, x2, thick=3):
    draw.rectangle([x1, y, x2, y + thick], fill=GOLD)

def draw_pill(draw, text, fnt, cx, cy, bg, fg, pad_x=28, pad_y=12):
    """Draw a rounded-rect pill label centered at (cx, cy)."""
    tw = int(draw.textlength(text, font=fnt))
    tb = draw.textbbox((0, 0), text, font=fnt)
    th = tb[3] - tb[1]
    rx0 = cx - tw // 2 - pad_x
    ry0 = cy - th // 2 - pad_y
    rx1 = cx + tw // 2 + pad_x
    ry1 = cy + th // 2 + pad_y
    draw.rounded_rectangle([rx0, ry0, rx1, ry1], radius=50, fill=bg)
    draw.text((cx - tw // 2, ry0 + pad_y), text, font=fnt, fill=fg)

def slide_base(slide_num, total=5):
    """Create base canvas with background, top bar, bottom logo area."""
    img = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(img)

    # Gold top bar
    draw.rectangle([0, 0, W, 8], fill=GOLD)

    # Subtle dark card zone — bottom 400px
    draw.rectangle([0, H - 400, W, H], fill=DARK)

    # Gold separator line above bottom zone
    draw_gold_line(draw, 60, H - 400, W - 60)

    # Logo — horizontal, bottom left
    paste_logo(img, f"{BASE}/files2/logo-horizontal.png",
               target_w=320, pos_x=60, pos_y=H - 340)

    # Slide counter pills — bottom right
    fnt_sm = font("dmsans", 26)
    for i in range(1, total + 1):
        cx = W - 80 - (total - i) * 26
        cy = H - 80
        col = GOLD if i == slide_num else (40, 50, 70)
        r = 9 if i == slide_num else 6
        draw.ellipse([cx - r, cy - r, cx + r, cy + r], fill=col)

    return img, draw

# ══════════════════════════════════════════════════════════════════════════
# SLIDE 1 — HOOK
# ══════════════════════════════════════════════════════════════════════════
def slide_01():
    img, draw = slide_base(1)

    # Big question — Bebas Neue
    f_big  = font("bebas", 160)
    f_sub  = font("bebas", 80)
    f_body = font("dmsans", 46)

    # "CLAUDE" in white
    draw.text((60, 220), "CLAUDE", font=f_big, fill=WHITE)
    # "O" in gold, smaller
    draw.text((60, 380), "o", font=f_sub, fill=GOLD)
    # "GEMINI?" in white
    draw.text((60, 440), "GEMINI?", font=f_big, fill=WHITE)

    # Gold accent line
    draw_gold_line(draw, 60, 640, 420)

    # Subheadline
    f_sub2 = font("dmsans", 52)
    lines = wrap_text(draw, "Heto ang totoong sagot —", f_sub2, W - 120)
    y = draw_text_block(draw, lines, f_sub2, 60, 680, WHITE, line_gap=14)
    lines2 = wrap_text(draw, "libre ang dalawa.", f_sub2, W - 120)
    draw_text_block(draw, lines2, f_sub2, 60, y + 4, GOLD, line_gap=14)

    # Decorative teal dot grid (bottom right of text area)
    for row in range(4):
        for col in range(4):
            x = W - 120 - col * 40
            y2 = 700 + row * 40
            draw.ellipse([x-5, y2-5, x+5, y2+5], fill=(13, 148, 136, 80))

    img.save(f"{OUT_DIR}/slide-01-hook.png")
    print("✓ Slide 1 saved")

# ══════════════════════════════════════════════════════════════════════════
# SLIDE 2 — GEMINI
# ══════════════════════════════════════════════════════════════════════════
def slide_02():
    img, draw = slide_base(2)

    f_num   = font("bebas", 100)
    f_title = font("bebas", 160)
    f_url   = font("dmsans", 44)
    f_body  = font("dmsans", 52)
    f_tag   = font("dmsans", 38)

    # Number
    draw.text((60, 200), "1.", font=f_num, fill=GOLD)

    # GEMINI
    draw.text((60, 290), "GEMINI", font=f_title, fill=WHITE)

    # Gold underline
    draw_gold_line(draw, 60, 460, 560)

    # URL pill
    draw_pill(draw, "gemini.google.com", font("dmsans", 38),
              cx=W // 2, cy=560, bg=(20, 30, 50), fg=TEAL,
              pad_x=30, pad_y=14)

    # Bullet points
    bullets = [
        ("May Gmail ka?", WHITE),
        ("May access ka na agad.", GOLD),
        ("Mabilis na sagot.", WHITE),
        ("Translation · Research.", WHITE),
    ]
    y = 660
    for text, col in bullets:
        # Dot
        draw.ellipse([60, y + 18, 76, y + 34], fill=GOLD)
        draw.text((96, y), text, font=f_body, fill=col)
        bbox = draw.textbbox((0, 0), text, font=f_body)
        y += (bbox[3] - bbox[1]) + 22

    # LIBRE badge
    draw_gold_line(draw, 60, y + 20, W - 60)
    draw.text((60, y + 40), "LIBRE.", font=font("bebas", 130), fill=GOLD)

    img.save(f"{OUT_DIR}/slide-02-gemini.png")
    print("✓ Slide 2 saved")

# ══════════════════════════════════════════════════════════════════════════
# SLIDE 3 — CLAUDE
# ══════════════════════════════════════════════════════════════════════════
def slide_03():
    img, draw = slide_base(3)

    f_num   = font("bebas", 100)
    f_title = font("bebas", 160)
    f_body  = font("dmsans", 52)

    # Number
    draw.text((60, 200), "2.", font=f_num, fill=GOLD)

    # CLAUDE
    draw.text((60, 290), "CLAUDE", font=f_title, fill=WHITE)

    # Teal underline
    draw.rectangle([60, 460, 560, 463], fill=TEAL)

    # URL pill
    draw_pill(draw, "claude.ai", font("dmsans", 38),
              cx=W // 2, cy=560, bg=(20, 30, 50), fg=TEAL,
              pad_x=30, pad_y=14)

    # Bullet points
    bullets = [
        ("Para sa mahabang trabaho.", WHITE),
        ("Sulat · Proposal.", GOLD),
        ("Pag-analyze ng dokumento.", WHITE),
        ("Mas malalim. Mas maingat.", WHITE),
    ]
    y = 660
    for text, col in bullets:
        draw.ellipse([60, y + 18, 76, y + 34], fill=TEAL)
        draw.text((96, y), text, font=f_body, fill=col)
        bbox = draw.textbbox((0, 0), text, font=f_body)
        y += (bbox[3] - bbox[1]) + 22

    img.save(f"{OUT_DIR}/slide-03-claude.png")
    print("✓ Slide 3 saved")

# ══════════════════════════════════════════════════════════════════════════
# SLIDE 4 — LIBRE ANG DALAWA
# ══════════════════════════════════════════════════════════════════════════
def slide_04():
    img, draw = slide_base(4)

    f_big  = font("bebas", 130)
    f_mid  = font("bebas", 90)
    f_body = font("dmsans", 52)
    f_sm   = font("dmsans", 44)

    # Headline
    draw.text((60, 200), "LIBRE", font=f_big, fill=GOLD)
    draw.text((60, 336), "ANG", font=f_mid, fill=WHITE)
    draw.text((60, 426), "DALAWA.", font=f_big, fill=WHITE)

    draw_gold_line(draw, 60, 590, W - 60)

    # Compare block
    comp = [
        ("Gemini", "gemini.google.com", GOLD),
        ("Claude", "claude.ai", TEAL),
    ]
    y = 630
    for label, url, col in comp:
        # Label
        draw.text((60, y), label, font=font("bebas", 80), fill=col)
        draw.text((60 + int(draw.textlength(label, font=font("bebas", 80))) + 20, y + 16),
                  url, font=font("dmsans", 40), fill=GRAY)
        y += 100

    draw_gold_line(draw, 60, y + 20, W - 60)

    # Body text
    body = "Hindi ka magkamali sa isa man. Subukan mo — ikaw ang makakaalam."
    lines = wrap_text(draw, body, f_sm, W - 120)
    draw_text_block(draw, lines, f_sm, 60, y + 48, WHITE, line_gap=14)

    img.save(f"{OUT_DIR}/slide-04-libre.png")
    print("✓ Slide 4 saved")

# ══════════════════════════════════════════════════════════════════════════
# SLIDE 5 — CTA
# ══════════════════════════════════════════════════════════════════════════
def slide_05():
    img, draw = slide_base(5)

    f_big  = font("bebas", 110)
    f_mid  = font("bebas", 80)
    f_body = font("dmsans", 52)
    f_sm   = font("dmsans", 44)

    # Instruction
    draw.text((60, 200), "I-COMMENT:", font=f_big, fill=WHITE)

    # C o G big
    draw.text((60, 316), "C", font=font("bebas", 280), fill=TEAL)
    draw.text((310, 420), "o", font=font("bebas", 150), fill=GRAY)
    draw.text((460, 316), "G", font=font("bebas", 280), fill=GOLD)

    draw_gold_line(draw, 60, 660, W - 60)

    # C = Claude / G = Gemini
    draw.text((60, 690), "C  =  Claude", font=f_body, fill=TEAL)
    draw.text((60, 760), "G  =  Gemini", font=f_body, fill=GOLD)

    draw_gold_line(draw, 60, 840, W - 60)

    # Follow line
    follow = "@tito.aiph — AI Para Sa Ating Lahat 🇵🇭"
    lines = wrap_text(draw, follow, f_sm, W - 120)
    draw_text_block(draw, lines, f_sm, 60, 870, WHITE, line_gap=14)

    img.save(f"{OUT_DIR}/slide-05-cta.png")
    print("✓ Slide 5 saved")

# ── Run ────────────────────────────────────────────────────────────────────
if __name__ == "__main__":
    slide_01()
    slide_02()
    slide_03()
    slide_04()
    slide_05()
    print("\nAll 5 slides generated →", OUT_DIR)
