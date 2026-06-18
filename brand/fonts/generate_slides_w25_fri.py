#!/usr/bin/env python3
"""Generate Tito AI W25 Friday slides — 1080×1350 (4:5 Instagram).
Topic: Tito AI Tries — Father's Day Para Sa Php 2,000
Format: Challenge / Tito AI Tries
"""

from PIL import Image, ImageDraw, ImageFont
import os

BASE     = "/Users/jeff/Documents/Claude/TItoAi"
FONT_DIR = f"{BASE}/brand/fonts"
OUT_DIR  = f"{BASE}/content/2026-W25/03-fri-inspiration/carousel"
os.makedirs(OUT_DIR, exist_ok=True)

NAVY  = (10, 15, 30)
GOLD  = (245, 158, 11)
TEAL  = (13, 148, 136)
WHITE = (249, 250, 251)
GRAY  = (156, 163, 175)
DARK  = (17, 24, 39)
PINK  = (232, 121, 249)
GREEN = (16, 185, 129)

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

def pink_line(draw, x1, y, x2, thick=3):
    draw.rectangle([x1, y, x2, y + thick], fill=PINK)

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

# ── SLIDE 1 — HOOK / CHALLENGE ───────────────────────────────────────────────
def slide_01():
    img, draw = base(1)
    draw.text((60, 90),  "PHP 2,000.", font=font("bebas", 110), fill=GOLD)
    draw.text((60, 200), "FATHER'S",  font=font("bebas", 110), fill=WHITE)
    draw.text((60, 308), "DAY.",      font=font("bebas", 130), fill=WHITE)
    gold_line(draw, 60, 448, 560)
    f = font("dmsans", 42)
    draw_text_block(draw, wrap_text(draw, "Kayang-kaya ba ni Claude?", f, W-120), f, 60, 474, TEAL)
    # TITO AI TRIES badge
    draw.rounded_rectangle([50, 560, 420, 618], radius=30, fill=(40, 30, 10))
    draw.rounded_rectangle([50, 560, 420, 618], radius=30, outline=GOLD, width=2)
    draw.text((70, 572), "TITO AI TRIES", font=font("dmsans", 28), fill=GOLD)
    # corner dots
    for row in range(4):
        for col in range(4):
            x2 = W-110 - col*36
            y2 = 474 + row*36
            draw.ellipse([x2-4, y2-4, x2+4, y2+4], fill=(245, 158, 11, 60))
    img.save(f"{OUT_DIR}/slide-01-hook.png"); print("✓ Slide 1")

# ── SLIDE 2 — THE CHALLENGE ───────────────────────────────────────────────────
def slide_02():
    img, draw = base(2)
    draw.text((60, 110), "ANG",     font=font("bebas", 80),  fill=GOLD)
    draw.text((60, 186), "HAMON",   font=font("bebas", 110), fill=WHITE)
    gold_line(draw, 60, 312, 580)
    f = font("dmsans", 40)
    y = 350
    items = [
        ("Hapunan para sa 6 na tao.", WHITE),
        ("May sorpresa para sa tatay.", WHITE),
        ("Lahat sa Php 2,000.", GOLD),
        ("30 segundo lang ang ibinigay ko.", TEAL),
    ]
    for text, col in items:
        draw.ellipse([60, y+14, 76, y+30], fill=GOLD)
        draw.text((96, y), text, font=f, fill=col)
        bbox = draw.textbbox((0,0), text, font=f)
        y += (bbox[3]-bbox[1]) + 22
    gold_line(draw, 60, y+20, W-60)
    draw_text_block(draw,
        wrap_text(draw, "Tinanong ko si Claude. Libre.", font("dmsans", 38), W-120),
        font("dmsans", 38), 60, y+44, WHITE)
    img.save(f"{OUT_DIR}/slide-02-hamon.png"); print("✓ Slide 2")

# ── SLIDE 3 — THE PROMPT ─────────────────────────────────────────────────────
def slide_03():
    img, draw = base(3)
    draw.text((60, 110), "ANG",      font=font("bebas", 80),  fill=TEAL)
    draw.text((60, 186), "PROMPT",   font=font("bebas", 100), fill=WHITE)
    teal_line(draw, 60, 302, 480)
    pill(draw, "claude.ai — libre, walang download", font("dmsans", 28), W//2, 352, (20,30,50), TEAL)

    box_y = 390
    draw.rounded_rectangle([50, box_y, W-50, box_y+330], radius=12, fill=(20, 30, 50))
    draw.rounded_rectangle([50, box_y, W-50, box_y+330], radius=12, outline=TEAL, width=1)
    draw.text((70, box_y+14), "claude.ai", font=font("dmsans", 24), fill=TEAL)

    prompt_lines = [
        "Mag-plan ng Father's Day",
        "celebration — Php 2,000 budget,",
        "6 na tao, hapunan sa bahay.",
        "May sorpresa para sa tatay.",
        "I-breakdown ang gastos.",
    ]
    fp = font("dmsans", 30)
    py2 = box_y + 52
    for line in prompt_lines:
        draw.text((70, py2), line, font=fp, fill=WHITE)
        bbox = draw.textbbox((0,0), line, font=fp)
        py2 += (bbox[3]-bbox[1]) + 8

    draw.rectangle([50, box_y+290, W-50, box_y+291], fill=(40,50,70))
    draw.text((70, box_y+298), "✓  Claude: Narito ang inyong plano...", font=font("dmsans", 26), fill=GOLD)

    img.save(f"{OUT_DIR}/slide-03-prompt.png"); print("✓ Slide 3")

# ── SLIDE 4 — THE OUTPUT ─────────────────────────────────────────────────────
def slide_04():
    img, draw = base(4)
    draw.text((60, 110), "ANG",    font=font("bebas", 80),  fill=GREEN)
    draw.text((60, 186), "RESULTA", font=font("bebas", 100), fill=WHITE)
    gold_line(draw, 60, 302, W-60)
    f = font("dmsans", 36)
    y = 342
    items = [
        ("Menu para sa 6: liempo, pancit, leche flan.", GREEN),
        ("May grocery list. May breakdown.", WHITE),
        ("Php 1,847 ang total.", GREEN),
        ("May Php 153 pa na natira.", GOLD),
        ("Sorpresa: video message ng mga anak.", WHITE),
        ("Libre. Walang gastos.", TEAL),
    ]
    for text, col in items:
        draw.ellipse([60, y+12, 74, y+26], fill=GREEN)
        draw.text((92, y), text, font=f, fill=col)
        bbox = draw.textbbox((0,0), text, font=f)
        y += (bbox[3]-bbox[1]) + 18
    gold_line(draw, 60, y+12, W-60)
    draw_text_block(draw,
        wrap_text(draw, "Ang tatay mo? Iyak siya niyan.", font("lora", 34), W-120),
        font("lora", 34), 60, y+32, PINK)
    img.save(f"{OUT_DIR}/slide-04-resulta.png"); print("✓ Slide 4")

# ── SLIDE 5 — CTA ────────────────────────────────────────────────────────────
def slide_05():
    img, draw = base(5)
    draw.text((60, 110), "I-COMMENT:",   font=font("bebas", 86),  fill=WHITE)
    draw.text((60, 198), "ANG BUDGET",   font=font("bebas", 100), fill=GOLD)
    draw.text((60, 296), "MO",           font=font("bebas", 100), fill=GOLD)
    gold_line(draw, 60, 406, W-60)
    draw_text_block(draw,
        wrap_text(draw, "Padalhan kita ng Father's Day plan para sa budget mo. Libre rin.", font("dmsans", 38), W-120),
        font("dmsans", 38), 60, 430, WHITE)
    gold_line(draw, 60, 590, W-60)
    draw.text((60, 612), "Maligayang Father's Day!", font=font("dmsans", 36), fill=TEAL)
    draw_text_block(draw,
        wrap_text(draw, "@tito.aiph — AI Para Sa Ating Lahat", font("dmsans", 32), W-120),
        font("dmsans", 32), 60, 660, GRAY)
    img.save(f"{OUT_DIR}/slide-05-cta.png"); print("✓ Slide 5")

if __name__ == "__main__":
    slide_01(); slide_02(); slide_03(); slide_04(); slide_05()
    print(f"\nAll 5 slides → {W}×{H} (4:5) → {OUT_DIR}")
