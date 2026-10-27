# ChatGPT Slide Pack — W44 Wed · VA Handoff Checklist: Bago Ipadala

Drop: Wed Oct 28, 2026 · 7:00 PM PHT · DRAFT, not approved, not posted.
Source: `drafts/script.md` · Slide 4 = PLACEHOLDER for real Gemini output (prompt UNTESTED).

---

## 1. Upload first (attach all in the ChatGPT chat before the master prompt)
- `docs/assets/avatars/tito-ai-chibi-wave.png` (S1, S5)
- `docs/assets/avatars/tito-ai-chibi-surprised.png` (S2)
- `docs/assets/avatars/tito-ai-chibi-teach.png` (S3, small on S4)
- `docs/assets/logo-horizontal-light.png` — transparent, navy "TITO" + gold "AI" (cream slides: S1, S3, S4)
- `docs/assets/logo-horizontal-gold-transparent.png` — transparent, all-navy wordmark (marigold slides: S2, S5)

Do NOT use `docs/assets/logo-horizontal.png` — it has an opaque dark box.

---

## 2. Master prompt (paste first, once)

```
I'm making a 5-slide Instagram/TikTok carousel for "Tito AI", a Filipino AI-education brand. I attached 3 chibi character PNGs (wave, surprised, teach) and 2 transparent Tito AI logos (LIGHT = navy TITO + gold AI, for cream slides; GOLD-TRANSPARENT = all-navy wordmark, for marigold slides). I'll ask for one slide at a time. Keep every slide visually consistent.

FORMAT
- 1080 x 1350 px, portrait 4:5. One slide per image.

PALETTE (use only these colors)
- Cream #FFF8E7 (background)
- Marigold #FFB800 (background or accent)
- Coral #FF6B4A (accent only; never put small white text on coral)
- Deep teal #0D6B63 (accent, buttons, outlines)
- Navy #0A0F1E (ALL text)
- White #FFFFFF (cards only)

STYLE
- Bright, warm, friendly, editorial. NOT dark mode, NOT techy, NOT cartoonish-chaotic.
- Headlines: bold condensed all-caps display font in the style of Bebas Neue, large, top-left aligned.
- Body text: clean sans-serif in the style of DM Sans, easy to read at phone size.
- Generous margins (about 80 px), lots of breathing room, nothing crowded.

FOOTER (same on every slide)
- Bottom-left: the attached logo I name for that slide, about 68 px tall, unmodified, transparent (no box behind it).
- Bottom-right: 5 small pip dots in a row. The dot matching the slide number is filled navy #0A0F1E; the other 4 are small navy outlines.

CHARACTER
- Use the attached chibi image EXACTLY as given. Do not redesign, redraw, restyle or change it. Keep: clean-shaven face, no hanging belt strap, tablet back facing the viewer, same outfit, same proportions. Only scale and place it. I'll say which pose per slide.

TEXT RULES (very important)
- Put on the slide ONLY the exact text inside quotes or code lines I give you, word for word, character for character. Do not translate, rewrite, shorten, add, or "improve" anything. Keep Filipino/Taglish spelling, punctuation and capitalization exactly.
- My layout instructions are for you, not for the slide. Never print them.
- Do NOT invent any AI output, screenshots, numbers, or extra labels.
- Spell-check against my text after rendering.

Confirm you understand, then wait for Slide 1.
```

---

## 3. Slide prompts (send one at a time, in order)

### Slide 1 — Hook (background: CREAM #FFF8E7, chibi: WAVE, logo: LIGHT)

```
Slide 1 of 5. Cream background (#FFF8E7). Use the attached WAVE chibi, placed bottom-right, large (about 40% of slide height), not covering text.

Exact text, navy, top-left:
HEADLINE (huge, Bebas-style, up to 3 lines, with a short coral #FF6B4A underline bar beneath):
Tapos na ang post. Ipapadala mo na ba?

BODY (medium, DM Sans, below headline):
Teka, 3 check muna.

Small tag (pill with deep teal #0D6B63 outline, small navy text, near the top-right corner):
Fictional practice example

Visual: one simple flat checklist icon (clipboard with three ticks, marigold and deep teal), placed mid-left under the body text. No other text.
Footer: LIGHT logo bottom-left, 5 pips bottom-right with pip 1 filled navy.
```

### Slide 2 — Setup (background: MARIGOLD #FFB800, chibi: SURPRISED, logo: GOLD-TRANSPARENT)

```
Slide 2 of 5. Marigold background (#FFB800). Use the attached SURPRISED chibi, small, bottom-right above the footer.

Exact text, navy:
HEADLINE (big, Bebas-style, top-left, navy underline bar beneath):
Check 1: Pangalan ng file

BODY:
Si Ana (fictional) ay may draft post para sa Linis Express Laundry (fictional practice example). Ganito ang file niya:

Then two white file-name cards stacked, monospace-looking navy text:
Card A — coral #FF6B4A outline, small label above it "Hindi malinaw:", card text: final final2 (1).png
Card B — deep teal #0D6B63 outline, small label above it "Mas malinaw:", card text: LinisExpress_PromoPost_2026-11-01_v02_FOR-APPROVAL.png

Small line below the cards:
Isang paraan lang ito: walang space, petsang madaling i-sort, v01/v02, isang status (DRAFT / FOR-APPROVAL / APPROVED).

Boxed note (white rounded box, thin navy border, box title "Owner's facts only"):
Promo: "Libreng pickup sa 3 kilo pataas," Nov 1-7 · Presyo: P__ (TBD) · Delivery: TBD

Clear label (white pill, deep teal outline) near the top-right:
Fictional practice example

Footer: GOLD-TRANSPARENT logo bottom-left, 5 pips bottom-right with pip 2 filled navy. If space is tight, shrink body text slightly but never cut or change words.
```

### Slide 3 — Prompt (background: CREAM #FFF8E7, chibi: TEACH, logo: LIGHT)

```
Slide 3 of 5. Cream background (#FFF8E7). Use the attached TEACH chibi, small, top-right beside the headline.

Exact text, navy:
HEADLINE (big, Bebas-style, top-left, deep teal #0D6B63 underline bar):
Check 2: Fact check

BODY:
Ipa-QA muna sa libreng AI chat. Source facts lang ang gamitin.

PROMPT BLOCK: a white rounded card with a thin deep teal border, monospace-style navy text, left-aligned, small but legible, containing EXACTLY these lines:

Role: ikaw ang QA checker ko bago ako magpadala ng gawa sa client.
Source facts lang ang gamitin mo (huwag mag-assume):
- Negosyo: Linis Express Laundry (practice example)
- Promo: Libreng pickup sa 3 kilo pataas, Nov 1-7
- Presyo at delivery time: HINDI pa kumpirmado
Draft ko:
"[ipaste ang draft post dito]"
Gawin:
1) Ilista ang bawat claim sa draft at i-mark kung SUPPORTED o WALANG SOURCE.
2) Para sa WALANG SOURCE, sabihin kung ano ang itatanong ko sa owner.
3) Gumawa ng 3-line handoff message para sa approval, nakalagay ang file name at mga TBD.

Small line under the card:
Tanggalin muna ang private details ng client bago mag-paste sa kahit anong AI tool.

Footer: LIGHT logo bottom-left, 5 pips bottom-right with pip 3 filled navy. Copy the prompt character-for-character; if space is tight, reduce font size, never remove lines.
```

### Slide 4 — Output PLACEHOLDER (background: CREAM #FFF8E7, chibi: small TEACH or none, logo: LIGHT)

Do NOT ask ChatGPT to write or imagine Gemini's answer. This slide is a labeled empty zone; Jeff drops the real screenshot in later (Canva/Photoshop) after running the exact Slide 3 prompt in Gemini.

```
Slide 4 of 5. Cream background (#FFF8E7). Optionally the attached TEACH chibi, very small, top-right. Skip the chibi if it crowds the layout.

Exact text, navy:
HEADLINE (big, Bebas-style, top-left, coral #FF6B4A underline bar):
Check 3: Approval handoff

SMALL LINE under the headline (DM Sans, small):
Test draft (fictional): "Libreng pickup sa 3 kilo pataas, Nov 1-7! Same-day delivery, P__ lang per kilo."

MAIN ELEMENT: a large EMPTY rectangle (about 920 x 680 px, centered below the small line) with a dashed navy border, white fill, rounded corners. This is a screenshot zone. Inside it, ONLY this centered text in bold Bebas-style, navy:
PASTE REAL OUTPUT HERE

Do NOT put any sample answer, claim list, questions, handoff message, fake chat UI, or lorem ipsum inside the box. Leave it otherwise completely empty so I can paste a real screenshot over it.

Footer: LIGHT logo bottom-left, 5 pips bottom-right with pip 4 filled navy.
```

Jeff's S4 fill-in notes (not for ChatGPT):
- Run the **exact Slide 3 prompt** in Gemini (signed-out/free if possible) with the test draft pasted in. Paste the real answer (screenshot or exact excerpt). Show: (a) claim list SUPPORTED / WALANG SOURCE, (b) question for owner, (c) 3-line handoff message.
- Label any edit by Jeff as "human-edited". If Gemini misses "same-day delivery" or invents a claim, show it honestly plus the human correction.
- Add test date + "isang test lang, puwedeng iba ang resulta."
- Fallback if Gemini unavailable: label slide "Human-written illustrative example, hindi AI output."

### Slide 5 — CTA (background: MARIGOLD #FFB800, chibi: WAVE, logo: GOLD-TRANSPARENT)

```
Slide 5 of 5. Marigold background (#FFB800). Use the attached WAVE chibi, bottom-right, large-ish, not covering text.

Exact text, navy:
HEADLINE (huge, Bebas-style, top-left, navy underline bar):
3 check bago ipadala

LIST: three rows. Each row starts with a navy circle badge showing the number (1, 2, 3) in cream. The row text after the badge is exactly:
Row 1: Pangalan ng file: malinaw at madaling hanapin.
Row 2: Fact check: may source ba ang bawat claim?
Row 3: Approval: ipadala ang handoff message, hintayin ang OK.
(Do not print "Row 1/2/3" and do not add a second number before the text.)

CTA (bold, large, inside a deep teal #0D6B63 rounded button shape with cream #FFF8E7 text):
I-save mo ito bago ka magpadala.

Closer (medium, below the CTA):
Tito AI, AI Para Sa Ating Lahat.

Small note (tiny, bottom, above footer):
Walang income, trabaho, o client promises.

Footer: GOLD-TRANSPARENT logo bottom-left, 5 pips bottom-right with pip 5 filled navy.
```

---

## 4. Fix-it prompts (paste when needed)

**Misspelled / altered text**
```
The text on this slide doesn't match my script. Regenerate the same slide with the same layout and colors, but use EXACTLY the text I gave you, word for word, with the same Filipino spelling and punctuation. Do not add, remove, or rephrase anything. The wrong part was: [paste what's wrong].
```

**Character drift**
```
The chibi character changed. Use the attached [wave/surprised/teach] PNG exactly as uploaded: clean-shaven, no hanging belt strap, tablet back facing the viewer, same outfit and proportions. Do not redraw it, only place and scale it. Keep everything else on the slide the same.
```

**Wrong aspect ratio / size**
```
This must be exactly 1080 x 1350 px, portrait 4:5. Regenerate the same slide at that size, with 80 px margins, logo bottom-left and the 5 pips bottom-right fully inside the frame. No cropping of text.
```

**Off-palette colors or logo box**
```
Use only the palette from my master prompt: cream #FFF8E7, marigold #FFB800, coral #FF6B4A, deep teal #0D6B63, navy #0A0F1E text, white cards. The logo must be the attached transparent file with no box or background behind it. Regenerate the same slide with those fixes only.
```

---

## 5. After ChatGPT
1. Download the 5 PNGs and save to `docs/slides/W44-wed/s1.png … s5.png`.
2. S4: overlay the real Gemini screenshot on the "PASTE REAL OUTPUT HERE" zone (remove the label text once filled), add test date + "isang test lang, puwedeng iba ang resulta."
3. Check S1/S2 carry the "Fictional practice example" label and S5 has the no-income/job/client-promise note.
4. Fill the `[Jeff: ...]` production notes in all three captions.
5. Confirm CTA = Save, then send for approval. No posting until Jeff approves.
