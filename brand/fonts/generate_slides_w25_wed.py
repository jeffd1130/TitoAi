#!/usr/bin/env python3
"""Generate Tito AI W25 Wednesday slides — 1080×1350 (4:5 Instagram).
Topic: Resume gamit si Claude — Sa 2 Minuto Lang
"""

from PIL import Image, ImageDraw, ImageFont
import os

BASE     = "/Users/jeff/Documents/Claude/TItoAi"
FONT_DIR = f"{BASE}/brand/fonts"
OUT_DIR  = f"{BASE}/content/2026-W25/02-wed-demo/carousel"
os.makedirs(OUT_DIR, exist_ok=True)

NAVY  = (10, 15, 30)
GOLD  = (245, 158, 11)
TEAL  = (13, 148, 136)
WHITE = (249, 250, 251)
GRAY  = (156, 163, 175)
DARK  = (17, 24, 39)
RED   = (220, 38, 38)
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
    draw.text((60, 90),  "RESUME",    font=font("bebas", 140), fill=WHITE)
    draw.text((60, 236), "SA",        font=font("bebas",  80), fill=GRAY)
    draw.text((60, 308), "2 MINUTO",  font=font("bebas", 110), fill=GOLD)
    gold_line(draw, 60, 430, 560)
    f = font("dmsans", 44)
    draw_text_block(draw, wrap_text(draw, "Gamitin natin si Claude —", f, W-120), f, 60, 456, WHITE)
    draw_text_block(draw, wrap_text(draw, "libre — para ayusin ang CV mo.", f, W-120), f, 60, 514, TEAL)
    # corner dots
    for row in range(4):
        for col in range(4):
            x2 = W-110 - col*36
            y2 = 460 + row*36
            draw.ellipse([x2-4, y2-4, x2+4, y2+4], fill=(13, 148, 136, 80))
    img.save(f"{OUT_DIR}/slide-01-hook.png"); print("✓ Slide 1")

# ── SLIDE 2 — PROBLEMA ──────────────────────────────────────────────────────
def slide_02():
    img, draw = base(2)
    draw.text((60, 110), "ANG",       font=font("bebas", 80),  fill=GOLD)
    draw.text((60, 186), "PROBLEMA",  font=font("bebas", 100), fill=WHITE)
    gold_line(draw, 60, 302, 600)
    f = font("dmsans", 40)
    y = 340
    items = [
        ("10 segundo lang ang binibigay ng recruiter.", WHITE),
        ("Mahirap magsulat ng resume sa Ingles.", WHITE),
        ("Hindi alam ang tamang format.", WHITE),
        ("Walang pera para sa resume writer.", GOLD),
    ]
    for text, col in items:
        draw.ellipse([60, y+14, 76, y+30], fill=RED)
        draw.text((96, y), text, font=f, fill=col)
        bbox = draw.textbbox((0,0), text, font=f)
        y += (bbox[3]-bbox[1]) + 22
    gold_line(draw, 60, y+20, W-60)
    draw_text_block(draw,
        wrap_text(draw, "Pamilyar ba? May libreng solusyon na.", font("dmsans", 36), W-120),
        font("dmsans", 36), 60, y+44, GRAY)
    img.save(f"{OUT_DIR}/slide-02-problema.png"); print("✓ Slide 2")

# ── SLIDE 3 — SOLUSYON (DEMO) ────────────────────────────────────────────────
def slide_03():
    img, draw = base(3)
    draw.text((60, 110), "ANG",      font=font("bebas", 80),  fill=TEAL)
    draw.text((60, 186), "SOLUSYON", font=font("bebas", 100), fill=WHITE)
    teal_line(draw, 60, 302, 500)
    pill(draw, "claude.ai — libre, walang download", font("dmsans", 30), W//2, 358, (20,30,50), TEAL)

    # mock terminal / chat block
    box_y = 398
    draw.rounded_rectangle([50, box_y, W-50, box_y+360], radius=12, fill=(20, 30, 50))
    draw.rounded_rectangle([50, box_y, W-50, box_y+360], radius=12, outline=TEAL, width=1)
    draw.text((70, box_y+14), "claude.ai", font=font("dmsans", 24), fill=TEAL)

    prompt_lines = [
        "Trabaho ko: Customer Service Rep,",
        "5 taon na, BPO company.",
        "",
        "Gumawa ng professional resume —",
        "summary, skills, at experience",
        "bullets. Sa Tagalog kung pwede.",
    ]
    fp = font("dmsans", 30)
    py2 = box_y + 52
    for line in prompt_lines:
        col = GRAY if line == "" else WHITE
        draw.text((70, py2), line, font=fp, fill=col)
        bbox = draw.textbbox((0,0), line if line else "X", font=fp)
        py2 += (bbox[3]-bbox[1]) + 8

    draw.rectangle([50, box_y+320, W-50, box_y+321], fill=(40,50,70))
    draw.text((70, box_y+328), "✓  Claude: Narito ang iyong resume...", font=font("dmsans", 26), fill=GOLD)

    img.save(f"{OUT_DIR}/slide-03-solusyon.png"); print("✓ Slide 3")

# ── SLIDE 4 — ANG OUTPUT ─────────────────────────────────────────────────────
def slide_04():
    img, draw = base(4)
    draw.text((60, 110), "ANG",     font=font("bebas", 80),  fill=TEAL)
    draw.text((60, 186), "OUTPUT",  font=font("bebas", 110), fill=GOLD)
    gold_line(draw, 60, 308, W-60)
    f = font("dmsans", 38)
    y = 348
    items = [
        ("Professional summary. Handa na.", GREEN),
        ("Skills section — buo at maayos.", WHITE),
        ("Experience bullets — maganda sulat.", WHITE),
        ("Sa Tagalog pa kung gusto mo.", TEAL),
        ("Sa loob ng 2 minuto lang.", GOLD),
    ]
    for text, col in items:
        draw.ellipse([60, y+14, 76, y+30], fill=GREEN)
        draw.text((96, y), text, font=f, fill=col)
        bbox = draw.textbbox((0,0), text, font=f)
        y += (bbox[3]-bbox[1]) + 20
    gold_line(draw, 60, y+16, W-60)
    draw_text_block(draw,
        wrap_text(draw, "Hindi na kailangan ng resume writer.", font("dmsans", 36), W-120),
        font("dmsans", 36), 60, y+38, WHITE)
    img.save(f"{OUT_DIR}/slide-04-output.png"); print("✓ Slide 4")

# ── SLIDE 5 — CTA ────────────────────────────────────────────────────────────
def slide_05():
    img, draw = base(5)
    draw.text((60, 110), "I-COMMENT:",    font=font("bebas", 86),  fill=WHITE)
    draw.text((60, 198), "ANG TRABAHO",   font=font("bebas", 100), fill=GOLD)
    draw.text((60, 296), "MO",            font=font("bebas", 100), fill=GOLD)
    gold_line(draw, 60, 406, W-60)
    draw_text_block(draw,
        wrap_text(draw, "Padalhan kita ng exact na prompt para sa iyong resume. Libre rin.", font("dmsans", 40), W-120),
        font("dmsans", 40), 60, 430, WHITE)
    gold_line(draw, 60, 600, W-60)
    draw.text((60, 622), "Libre. Walang bayad.", font=font("dmsans", 36), fill=TEAL)
    draw_text_block(draw,
        wrap_text(draw, "@tito.aiph — AI Para Sa Ating Lahat", font("dmsans", 34), W-120),
        font("dmsans", 34), 60, 672, GRAY)
    img.save(f"{OUT_DIR}/slide-05-cta.png"); print("✓ Slide 5")

if __name__ == "__main__":
    slide_01(); slide_02(); slide_03(); slide_04(); slide_05()
    print(f"\nAll 5 slides → {W}×{H} (4:5) → {OUT_DIR}")
