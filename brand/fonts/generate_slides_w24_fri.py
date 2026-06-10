#!/usr/bin/env python3
"""Generate Tito AI W24 Friday slides — 1080×1350 (4:5 Instagram)."""

from PIL import Image, ImageDraw, ImageFont
import os

BASE     = "/Users/jeff/Documents/Claude/TItoAi"
FONT_DIR = f"{BASE}/brand/fonts"
OUT_DIR  = f"{BASE}/content/2026-W24/03-fri-inspiration/carousel"
os.makedirs(OUT_DIR, exist_ok=True)

NAVY  = (10, 15, 30)
GOLD  = (245, 158, 11)
TEAL  = (13, 148, 136)
WHITE = (249, 250, 251)
GRAY  = (156, 163, 175)
DARK  = (17, 24, 39)
RED   = (220, 38, 38)

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
    draw.text((60, 110), "ANG",       font=font("bebas", 80),  fill=GOLD)
    draw.text((60, 186), "TRABAHO",   font=font("bebas", 110), fill=WHITE)
    draw.text((60, 294), "MO...",     font=font("bebas", 110), fill=WHITE)
    gold_line(draw, 60, 420, 560)
    f = font("dmsans", 52)
    draw.text((60, 446), "Safe pa ba?", font=f, fill=TEAL)
    # tension dots
    for row in range(3):
        for col in range(4):
            x2 = W-100 - col*36
            y2 = 520 + row*36
            draw.ellipse([x2-4, y2-4, x2+4, y2+4], fill=(245,158,11,60))
    img.save(f"{OUT_DIR}/slide-01-hook.png"); print("✓ Slide 1")

# ── SLIDE 2 — TAKOT ──────────────────────────────────────────────────────────
def slide_02():
    img, draw = base(2)
    draw.text((60, 110), "ANG",    font=font("bebas", 80),  fill=RED)
    draw.text((60, 186), "TAKOT",  font=font("bebas", 110), fill=WHITE)
    gold_line(draw, 60, 312, 500)
    # quote block
    draw.rounded_rectangle([50, 350, W-50, 620], radius=12, fill=(20, 30, 50))
    draw.rounded_rectangle([50, 350, W-50, 620], radius=12, outline=(245,158,11,80), width=1)
    f = font("lora", 36)
    lines = wrap_text(draw, '"Tito, palalabasin na ba ako ng trabaho ko dahil sa AI?"', f, W-140)
    y = 370
    for line in lines:
        draw.text((70, y), line, font=f, fill=WHITE)
        bbox = draw.textbbox((0,0), line, font=f)
        y += (bbox[3]-bbox[1]) + 10
    draw.text((70, y+14), "— Mga Pamangkin", font=font("dmsans", 30), fill=GRAY)
    f2 = font("dmsans", 40)
    y2 = draw_text_block(draw, wrap_text(draw, "Alam ko ang takot na 'yan.", f2, W-120), f2, 60, 650, TEAL)
    draw_text_block(draw, wrap_text(draw, "Kaya nandito tayo.", f2, W-120), f2, 60, y2+14, WHITE)
    img.save(f"{OUT_DIR}/slide-02-takot.png"); print("✓ Slide 2")

# ── SLIDE 3 — TOTOO ──────────────────────────────────────────────────────────
def slide_03():
    img, draw = base(3)
    draw.text((60, 110), "ANG",    font=font("bebas", 80),  fill=TEAL)
    draw.text((60, 186), "TOTOO",  font=font("bebas", 110), fill=WHITE)
    teal_line(draw, 60, 312, 480)
    f = font("dmsans", 40)
    y = 350
    lines1 = wrap_text(draw, "Hindi ka pinalalayas ng AI.", f, W-120)
    y = draw_text_block(draw, lines1, f, 60, y, GOLD, line_gap=8)
    y += 20
    lines2 = wrap_text(draw, "Pinalalayas ka ng taong", f, W-120)
    y = draw_text_block(draw, lines2, f, 60, y, WHITE, line_gap=8)
    lines3 = wrap_text(draw, "gumagamit ng AI —", f, W-120)
    y = draw_text_block(draw, lines3, f, 60, y+8, WHITE, line_gap=8)
    lines4 = wrap_text(draw, "at hindi ka pa gumagamit.", f, W-120)
    y = draw_text_block(draw, lines4, f, 60, y+8, RED, line_gap=8)
    gold_line(draw, 60, y+28, W-60)
    draw_text_block(draw, wrap_text(draw, "'Yan ang totoong panganib.", font("dmsans", 36), W-120), font("dmsans", 36), 60, y+50, GRAY)
    img.save(f"{OUT_DIR}/slide-03-totoo.png"); print("✓ Slide 3")

# ── SLIDE 4 — SOLUSYON ───────────────────────────────────────────────────────
def slide_04():
    img, draw = base(4)
    draw.text((60, 110), "ANG",       font=font("bebas", 80),  fill=GOLD)
    draw.text((60, 186), "GAWIN",     font=font("bebas", 110), fill=WHITE)
    draw.text((60, 294), "MO NGAYON", font=font("bebas",  70), fill=TEAL)
    gold_line(draw, 60, 382, W-60)
    f = font("dmsans", 38)
    y = 418
    items = [
        ("Gumamit ng Claude o Gemini.", WHITE),
        ("I-type ang trabaho mo.", WHITE),
        ("Humingi ng tulong — libre.", GOLD),
        ("Maging mas mahusay kaysa dati.", TEAL),
    ]
    for text, col in items:
        draw.ellipse([60, y+14, 76, y+30], fill=GOLD)
        draw.text((96, y), text, font=f, fill=col)
        bbox = draw.textbbox((0,0), text, font=f)
        y += (bbox[3]-bbox[1]) + 22
    gold_line(draw, 60, y+16, W-60)
    draw_text_block(draw, wrap_text(draw, "Hindi ka nila pinalitan. Ginagawa ka nilang mas magaling.", font("dmsans", 34), W-120), font("dmsans", 34), 60, y+38, WHITE)
    img.save(f"{OUT_DIR}/slide-04-solusyon.png"); print("✓ Slide 4")

# ── SLIDE 5 — CTA ────────────────────────────────────────────────────────────
def slide_05():
    img, draw = base(5)
    draw.text((60, 110), "I-FOLLOW:", font=font("bebas", 86), fill=WHITE)
    draw.text((60, 198), "@TITO.AIPH", font=font("bebas", 100), fill=GOLD)
    gold_line(draw, 60, 350, W-60)
    draw_text_block(draw, wrap_text(draw, "Dito tayo matututo nang sama-sama.", font("dmsans", 40), W-120), font("dmsans", 40), 60, 372, WHITE)
    gold_line(draw, 60, 490, W-60)
    draw.text((60, 512), "Libre. Walang bayad.", font=font("dmsans", 38), fill=TEAL)
    draw.text((60, 564), "Hakbang-hakbang.", font=font("dmsans", 38), fill=TEAL)
    draw_text_block(draw, wrap_text(draw, "@tito.aiph — AI Para Sa Ating Lahat 🇵🇭", font("dmsans", 34), W-120), font("dmsans", 34), 60, 624, GRAY)
    img.save(f"{OUT_DIR}/slide-05-cta.png"); print("✓ Slide 5")

if __name__ == "__main__":
    slide_01(); slide_02(); slide_03(); slide_04(); slide_05()
    print(f"\nAll 5 slides → {W}×{H} (4:5) → {OUT_DIR}")
