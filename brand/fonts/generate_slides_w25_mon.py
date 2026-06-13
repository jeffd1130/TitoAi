#!/usr/bin/env python3
"""Generate Tito AI W25 Monday slides — 1080×1350 (4:5 Instagram)."""

from PIL import Image, ImageDraw, ImageFont
import os

BASE     = "/Users/jeff/Documents/Claude/TItoAi"
FONT_DIR = f"{BASE}/brand/fonts"
OUT_DIR  = f"{BASE}/content/2026-W25/01-mon-ai-tip/carousel"
os.makedirs(OUT_DIR, exist_ok=True)

NAVY  = (10, 15, 30)
GOLD  = (245, 158, 11)
TEAL  = (13, 148, 136)
WHITE = (249, 250, 251)
GRAY  = (156, 163, 175)
DARK  = (17, 24, 39)
PURPLE = (139, 92, 246)

W, H = 1080, 1350
BOTTOM = 280

def font(name, size):
    return ImageFont.truetype({
        "bebas":  f"{FONT_DIR}/BebasNeue-Regular.ttf",
        "dmsans": f"{FONT_DIR}/DMSans-Regular.ttf",
        "lora":   f"{FONT_DIR}/Lora-Bold.ttf",
    }[name], size)

def wrap_text(draw, text, fnt, max_width):
    words = text.split()
    lines, line = [], ""
    for word in words:
        test = (line + " " + word).strip()
        if draw.textlength(test, font=fnt) <= max_width:
            line = test
        else:
            if line: lines.append(line)
            line = word
    if line: lines.append(line)
    return lines

def draw_text_block(draw, lines, fnt, x, y, color, line_gap=10):
    for line in lines:
        draw.text((x, y), line, font=fnt, fill=color)
        bbox = draw.textbbox((0, 0), line, font=fnt)
        y += (bbox[3] - bbox[1]) + line_gap
    return y

def paste_logo(img, logo_path, target_w, pos_x, pos_y):
    logo = Image.open(logo_path).convert("RGBA")
    ratio = target_w / logo.width
    logo = logo.resize((target_w, int(logo.height * ratio)), Image.LANCZOS)
    img.paste(logo, (pos_x, pos_y), logo)

def gold_line(draw, x1, y, x2, thick=3):
    draw.rectangle([x1, y, x2, y + thick], fill=GOLD)

def teal_line(draw, x1, y, x2, thick=3):
    draw.rectangle([x1, y, x2, y + thick], fill=TEAL)

def pill(draw, text, fnt, cx, cy, bg, fg, px=26, py=12):
    tw = int(draw.textlength(text, font=fnt))
    tb = draw.textbbox((0, 0), text, font=fnt)
    th = tb[3] - tb[1]
    draw.rounded_rectangle([cx-tw//2-px, cy-th//2-py, cx+tw//2+px, cy+th//2+py], radius=46, fill=bg)
    draw.text((cx-tw//2, cy-th//2), text, font=fnt, fill=fg)

def base(slide_num, total=5):
    img  = Image.new("RGB", (W, H), NAVY)
    draw = ImageDraw.Draw(img)
    draw.rectangle([0, 0, W, 8], fill=GOLD)
    draw.rectangle([0, H-BOTTOM, W, H], fill=DARK)
    gold_line(draw, 60, H-BOTTOM, W-60)
    paste_logo(img, f"{BASE}/files2/logo-horizontal.png", 280, 60, H-240)
    for i in range(1, total+1):
        cx = W - 70 - (total - i) * 24
        cy = H - 55
        r  = 8 if i == slide_num else 5
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=GOLD if i==slide_num else (40,50,70))
    return img, draw

# ── SLIDE 1 — HOOK ──────────────────────────────────────────────────────────
def slide_01():
    img, draw = base(1)
    draw.text((60, 110), "CLAUDE", font=font("bebas", 110), fill=TEAL)
    draw.text((60, 218), "O", font=font("bebas", 80), fill=WHITE)
    draw.text((60, 290), "GEMINI?", font=font("bebas", 110), fill=GOLD)
    gold_line(draw, 60, 418, 560)
    f = font("dmsans", 44)
    draw_text_block(draw, wrap_text(draw, "Alin ang mas tama?", f, W-120), f, 60, 444, WHITE)
    # quote block
    draw.rounded_rectangle([50, 560, W-50, 720], radius=12, fill=(20, 30, 50))
    draw.rounded_rectangle([50, 560, W-50, 720], radius=12, outline=(245,158,11,60), width=1)
    fq = font("lora", 30)
    lines = wrap_text(draw, '"Claude gives more accurate answers. Gemini gives inaccuracies..."', fq, W-140)
    y = 580
    for line in lines:
        draw.text((70, y), line, font=fq, fill=GRAY)
        bbox = draw.textbbox((0,0), line, font=fq)
        y += (bbox[3]-bbox[1]) + 8
    draw.text((70, y+10), "— AV Leeneaux, Pamangkin", font=font("dmsans", 26), fill=GOLD)
    img.save(f"{OUT_DIR}/slide-01-hook.png"); print("✓ Slide 1")

# ── SLIDE 2 — CLAUDE ────────────────────────────────────────────────────────
def slide_02():
    img, draw = base(2)
    draw.text((60, 110), "SI", font=font("bebas", 80), fill=WHITE)
    draw.text((60, 186), "CLAUDE", font=font("bebas", 120), fill=TEAL)
    teal_line(draw, 60, 322, 480)
    pill(draw, "mas malalim na reasoning", font("dmsans", 30), W//2, 378, (20,30,50), TEAL)
    f = font("dmsans", 38)
    y = 420
    items = [
        ("Analysis at pag-explain.", WHITE),
        ("Mahabang dokumento.", WHITE),
        ("Komplikadong tanong.", WHITE),
        ("Mas consistent na sagot.", TEAL),
    ]
    for text, col in items:
        draw.ellipse([60, y+14, 76, y+30], fill=TEAL)
        draw.text((96, y), text, font=f, fill=col)
        bbox = draw.textbbox((0,0), text, font=f)
        y += (bbox[3]-bbox[1]) + 20
    gold_line(draw, 60, y+16, W-60)
    draw_text_block(draw, wrap_text(draw, "Kailangan ng malalim na sagot? Claude.", font("dmsans", 36), W-120), font("dmsans", 36), 60, y+38, GOLD)
    img.save(f"{OUT_DIR}/slide-02-claude.png"); print("✓ Slide 2")

# ── SLIDE 3 — GEMINI ─────────────────────────────────────────────────────────
def slide_03():
    img, draw = base(3)
    draw.text((60, 110), "SI", font=font("bebas", 80), fill=WHITE)
    draw.text((60, 186), "GEMINI", font=font("bebas", 120), fill=GOLD)
    gold_line(draw, 60, 322, 480)
    pill(draw, "mas updated na impormasyon", font("dmsans", 30), W//2, 378, (20,30,50), GOLD)
    f = font("dmsans", 38)
    y = 420
    items = [
        ("Trends at current events.", WHITE),
        ("Pinakabagong balita.", WHITE),
        ("Real-time na impormasyon.", WHITE),
        ("Quick na sagot sa web.", GOLD),
    ]
    for text, col in items:
        draw.ellipse([60, y+14, 76, y+30], fill=GOLD)
        draw.text((96, y), text, font=f, fill=col)
        bbox = draw.textbbox((0,0), text, font=f)
        y += (bbox[3]-bbox[1]) + 20
    gold_line(draw, 60, y+16, W-60)
    draw_text_block(draw, wrap_text(draw, "Kailangan ng latest info? Gemini.", font("dmsans", 36), W-120), font("dmsans", 36), 60, y+38, TEAL)
    img.save(f"{OUT_DIR}/slide-03-gemini.png"); print("✓ Slide 3")

# ── SLIDE 4 — COMBO ──────────────────────────────────────────────────────────
def slide_04():
    img, draw = base(4)
    draw.text((60, 110), "ANG", font=font("bebas", 80), fill=WHITE)
    draw.text((60, 186), "POWER", font=font("bebas", 100), fill=GOLD)
    draw.text((60, 286), "COMBO", font=font("bebas", 100), fill=TEAL)
    gold_line(draw, 60, 396, W-60)
    # step 1
    draw.rounded_rectangle([50, 420, W-50, 510], radius=10, fill=(20,30,50))
    draw.text((70, 436), "1", font=font("bebas", 50), fill=GOLD)
    draw.text((120, 446), "Gemini — i-research ang latest trends", font=font("dmsans", 32), fill=WHITE)
    # arrow
    draw.text((W//2 - 10, 515), "↓", font=font("dmsans", 36), fill=GRAY)
    # step 2
    draw.rounded_rectangle([50, 550, W-50, 640], radius=10, fill=(20,30,50))
    draw.text((70, 566), "2", font=font("bebas", 50), fill=TEAL)
    draw.text((120, 576), "I-copy ang results", font=font("dmsans", 32), fill=WHITE)
    # arrow
    draw.text((W//2 - 10, 645), "↓", font=font("dmsans", 36), fill=GRAY)
    # step 3
    draw.rounded_rectangle([50, 680, W-50, 770], radius=10, fill=(20,30,50))
    draw.text((70, 696), "3", font=font("bebas", 50), fill=GOLD)
    draw.text((120, 706), "Claude — deeper analysis + action plan", font=font("dmsans", 32), fill=WHITE)
    gold_line(draw, 60, 790, W-60)
    draw.text((60, 812), "Libre ang dalawa. Magkasama,", font=font("dmsans", 36), fill=WHITE)
    draw.text((60, 856), "mas makapangyarihan.", font=font("dmsans", 36), fill=GOLD)
    img.save(f"{OUT_DIR}/slide-04-combo.png"); print("✓ Slide 4")

# ── SLIDE 5 — CTA ────────────────────────────────────────────────────────────
def slide_05():
    img, draw = base(5)
    draw.text((60, 110), "MAY", font=font("bebas", 80), fill=WHITE)
    draw.text((60, 186), "TANONG", font=font("bebas", 100), fill=GOLD)
    draw.text((60, 284), "KA RIN?", font=font("bebas", 100), fill=WHITE)
    gold_line(draw, 60, 394, W-60)
    draw_text_block(draw, wrap_text(draw, "I-comment mo — baka maging next post mo 'yan.", font("dmsans", 40), W-120), font("dmsans", 40), 60, 416, WHITE)
    gold_line(draw, 60, 560, W-60)
    draw.text((60, 582), "Libre. Walang bayad.", font=font("dmsans", 36), fill=TEAL)
    draw_text_block(draw, wrap_text(draw, "@tito.aiph — AI Para Sa Ating Lahat 🇵🇭", font("dmsans", 34), W-120), font("dmsans", 34), 60, 632, GRAY)
    # credit
    draw.rounded_rectangle([50, 700, W-50, 760], radius=10, fill=(20,30,50))
    draw.text((70, 718), "Inspired by AV Leeneaux · @avdejesus", font=font("dmsans", 28), fill=GOLD)
    img.save(f"{OUT_DIR}/slide-05-cta.png"); print("✓ Slide 5")

if __name__ == "__main__":
    slide_01(); slide_02(); slide_03(); slide_04(); slide_05()
    print(f"\nAll 5 slides → {W}×{H} (4:5) → {OUT_DIR}")
