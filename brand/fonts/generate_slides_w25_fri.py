#!/usr/bin/env python3
"""Generate Tito AI W25 Friday slides — 1080×1350 (4:5 Instagram).
Topic: Nanay + AI — Ganito Namin Ginagamit sa Bahay
Format: Story / Inspiration
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
    draw.rectangle([0, 0, W, 8], fill=PINK)
    draw.rectangle([0, H-BOTTOM, W, H], fill=DARK)
    pink_line(draw, 60, H-BOTTOM, W-60)
    paste_logo(img, f"{BASE}/files2/logo-horizontal.png", 280, 60, H-240)
    for i in range(1, total+1):
        cx = W - 70 - (total - i) * 24
        cy = H - 55
        r  = 8 if i == slide_num else 5
        draw.ellipse([cx-r, cy-r, cx+r, cy+r], fill=PINK if i==slide_num else (40,50,70))
    return img, draw

# ── SLIDE 1 — HOOK ──────────────────────────────────────────────────────────
def slide_01():
    img, draw = base(1)
    draw.text((60, 90),  "TAKOT",  font=font("bebas", 140), fill=WHITE)
    draw.text((60, 238), "SA",     font=font("bebas",  80), fill=GRAY)
    draw.text((60, 308), "AI.",    font=font("bebas", 130), fill=PINK)
    gold_line(draw, 60, 448, 560)
    f = font("dmsans", 42)
    draw_text_block(draw, wrap_text(draw, "Kilala ko siya —", f, W-120), f, 60, 474, WHITE)
    draw_text_block(draw, wrap_text(draw, "nanay, luto-laba-trabaho.", f, W-120), f, 60, 528, TEAL)
    # corner dots
    for row in range(4):
        for col in range(4):
            x2 = W-110 - col*36
            y2 = 474 + row*36
            draw.ellipse([x2-4, y2-4, x2+4, y2+4], fill=(232, 121, 249, 60))
    img.save(f"{OUT_DIR}/slide-01-hook.png"); print("✓ Slide 1")

# ── SLIDE 2 — HER WORLD ──────────────────────────────────────────────────────
def slide_02():
    img, draw = base(2)
    draw.text((60, 110), "ANG",     font=font("bebas", 80),  fill=PINK)
    draw.text((60, 186), "KANYANG", font=font("bebas", 90),  fill=WHITE)
    draw.text((60, 274), "MUNDO",   font=font("bebas", 100), fill=WHITE)
    gold_line(draw, 60, 390, 600)
    f = font("dmsans", 40)
    y = 428
    items = [
        ("Luto. Laba. Budget ng pamilya.", WHITE),
        ("Trabaho. Homework ng mga bata.", WHITE),
        ("24 oras — hindi sapat.", GOLD),
        ("At takot pa sa teknolohiya.", GRAY),
    ]
    for text, col in items:
        draw.ellipse([60, y+14, 76, y+30], fill=PINK)
        draw.text((96, y), text, font=f, fill=col)
        bbox = draw.textbbox((0,0), text, font=f)
        y += (bbox[3]-bbox[1]) + 22
    gold_line(draw, 60, y+20, W-60)
    draw_text_block(draw,
        wrap_text(draw, "Pamilyar ba ito sa inyo?", font("dmsans", 36), W-120),
        font("dmsans", 36), 60, y+44, TEAL)
    img.save(f"{OUT_DIR}/slide-02-mundo.png"); print("✓ Slide 2")

# ── SLIDE 3 — THE MOMENT ─────────────────────────────────────────────────────
def slide_03():
    img, draw = base(3)
    draw.text((60, 110), "30",        font=font("bebas", 140), fill=GOLD)
    draw.text((60, 258), "SEGUNDO.",  font=font("bebas", 90),  fill=WHITE)
    teal_line(draw, 60, 364, 500)
    pill(draw, "claude.ai — libre, nasa phone na", font("dmsans", 28), W//2, 414, (20,30,50), TEAL)

    box_y = 454
    draw.rounded_rectangle([50, box_y, W-50, box_y+310], radius=12, fill=(20, 30, 50))
    draw.rounded_rectangle([50, box_y, W-50, box_y+310], radius=12, outline=TEAL, width=1)
    draw.text((70, box_y+14), "claude.ai", font=font("dmsans", 24), fill=TEAL)

    prompt_lines = [
        "Ano ang pwedeng ulam namin",
        "para sa isang linggo —",
        "Php 1,500 budget, 4 na tao?",
    ]
    fp = font("dmsans", 32)
    py2 = box_y + 52
    for line in prompt_lines:
        draw.text((70, py2), line, font=fp, fill=WHITE)
        bbox = draw.textbbox((0,0), line, font=fp)
        py2 += (bbox[3]-bbox[1]) + 8

    draw.rectangle([50, box_y+264, W-50, box_y+265], fill=(40,50,70))
    draw.text((70, box_y+272), "✓  Claude: Narito ang inyong meal plan...", font=font("dmsans", 26), fill=GOLD)

    img.save(f"{OUT_DIR}/slide-03-momento.png"); print("✓ Slide 3")

# ── SLIDE 4 — THE WIN ────────────────────────────────────────────────────────
def slide_04():
    img, draw = base(4)
    draw.text((60, 110), "ANG",    font=font("bebas", 80),  fill=GOLD)
    draw.text((60, 186), "RESULTA", font=font("bebas", 100), fill=WHITE)
    gold_line(draw, 60, 302, W-60)
    f = font("dmsans", 38)
    y = 342
    items = [
        ("7-day meal plan. Kumpleto.", GREEN),
        ("May grocery list pa. Ayon sa budget.", WHITE),
        ("Natipid ng Php 300.", GREEN),
        ("Masaya ang mga bata sa pagkain.", WHITE),
    ]
    for text, col in items:
        draw.ellipse([60, y+14, 76, y+30], fill=GREEN)
        draw.text((96, y), text, font=f, fill=col)
        bbox = draw.textbbox((0,0), text, font=f)
        y += (bbox[3]-bbox[1]) + 20
    gold_line(draw, 60, y+16, W-60)
    # quote
    draw.rounded_rectangle([50, y+36, W-50, y+136], radius=10, fill=(20,30,50))
    fq = font("lora", 32)
    lines = wrap_text(draw, '"Bakit hindi ko \'to sinubukan noon?"', fq, W-140)
    qy = y+52
    for line in lines:
        draw.text((70, qy), line, font=fq, fill=PINK)
        bbox = draw.textbbox((0,0), line, font=fq)
        qy += (bbox[3]-bbox[1]) + 6
    draw.text((70, qy+4), "— ang sabi niya sa akin", font=font("dmsans", 26), fill=GRAY)
    img.save(f"{OUT_DIR}/slide-04-resulta.png"); print("✓ Slide 4")

# ── SLIDE 5 — CTA ────────────────────────────────────────────────────────────
def slide_05():
    img, draw = base(5)
    draw.text((60, 110), "I-TRY",   font=font("bebas", 110), fill=WHITE)
    draw.text((60, 218), "MO RIN.", font=font("bebas", 110), fill=PINK)
    gold_line(draw, 60, 338, W-60)
    draw_text_block(draw,
        wrap_text(draw, "Pumunta sa claude.ai — libre. I-type ang tanong mo, kahit sa Tagalog.", font("dmsans", 40), W-120),
        font("dmsans", 40), 60, 362, WHITE)
    gold_line(draw, 60, 540, W-60)
    draw.text((60, 562), "Libre. Walang download.", font=font("dmsans", 36), fill=TEAL)
    draw_text_block(draw,
        wrap_text(draw, "@tito.aiph — AI Para Sa Ating Lahat", font("dmsans", 34), W-120),
        font("dmsans", 34), 60, 612, GRAY)
    img.save(f"{OUT_DIR}/slide-05-cta.png"); print("✓ Slide 5")

if __name__ == "__main__":
    slide_01(); slide_02(); slide_03(); slide_04(); slide_05()
    print(f"\nAll 5 slides → {W}×{H} (4:5) → {OUT_DIR}")
