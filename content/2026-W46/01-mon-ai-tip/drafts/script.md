# W46 Mon AI Tip — "Buy 1 Take 1 Mo… Lugi Pala?"

**Slot:** `01-mon-ai-tip` · **Drop:** Mon Nov 9, 2026 · 8:00 PM PHT
**Format:** 5-slide carousel, 1080×1350 · **Growth job:** SAVE
**Tool:** Gemini free (primary) · Claude free (fallback) · no paid tools
**Hook:** "Buy 1 Take 1 mo… lugi pala?"
**Status:** DRAFT for Jeff's approval. Prompt UNTESTED. S4 is a human-written sample, not model output.

Palette: cream `#FFF8E7` bg, marigold `#FFB800`, coral `#FF6B4A`, deep teal `#0D6B63`, navy `#0A0F1E` text. No small white text on coral. Footer: Tito AI logo + 5 pips.

---

## S1 — HOOK
**Chibi:** `surprised` (hero size), eyes on a coral "−₱20" sticker.

**On-slide text**
- Headline: **BUY 1 TAKE 1 MO… LUGI PALA?**
- Subline: I-check muna ang promo bago i-post.
- Tag (small): *Fictional practice example*

**Visual:** coral "−₱20" sticker over a simple dried-mango pack icon. If an image is generated, label it "illustrative."

---

## S2 — PROBLEM (fictional inputs)
**Chibi:** `teach` (small, corner).

**On-slide text**
- Headline: **MASARAP ANG PROMO KUNG TUBO PA.**
- Tag: *Fictional practice example — dried mango seller*
- Box:
  - Presyo: ₱120 / 200g pack
  - Puhunan: ₱70 / pack (kasama packaging)
  - Promo: Buy 1 Take 1
- Body: Madaling mag-isip ng promo. Mahirap kapag hindi kinuwenta.
- Footnote: Hindi pa kasama ang delivery at platform fee.

---

## S3 — PROMPT
**Chibi:** none, or tiny `teach` in the corner.

**On-slide text**
- Headline: **COPY-PASTE SA GEMINI O CLAUDE (LIBRE)**
- Prompt block (trimmed to fit; full version is below and goes in the caption/comment if needed):

```
Ikaw ang tagasuri ng promo para sa maliit kong negosyo. Numbers lang na ibibigay ko ang gamitin mo; huwag mag-imbento.

Produkto: [produkto]
Presyo ng benta bawat piraso: ₱[__]
Puhunan bawat piraso (kasama packaging): ₱[__]
Promo na gusto kong subukan: [hal. Buy 1 Take 1]

Gawin:
1. Ipakita step-by-step ang kita, gastos, at tubo kada order, may promo vs. walang promo.
2. Sabihin kung tubo pa o lugi.
3. Magbigay ng 2 mas ligtas na bersyon ng promo, kasama ang computation.
```
- Tag (required): **Hindi pa nasubukan ang prompt na ito. Subukan mo at i-check ang math.**
- Small line: Gamitin ang sarili mong numbers. Huwag mag-paste ng contracts o detalye ng customer.

**Full prompt (for caption/comment; adds task 4):**

```
Ikaw ang tagasuri ng promo para sa maliit kong negosyo. Numbers lang na ibibigay ko ang gamitin mo; huwag mag-imbento.

Produkto: [produkto]
Presyo ng benta bawat piraso: ₱[__]
Puhunan bawat piraso (kasama packaging): ₱[__]
Promo na gusto kong subukan: [hal. Buy 1 Take 1]

Gawin:
1. Ipakita step-by-step ang kita, gastos, at tubo kada order, may promo vs. walang promo.
2. Sabihin kung tubo pa o lugi.
3. Magbigay ng 2 mas ligtas na bersyon ng promo, kasama ang computation.
4. Kung may kulang na numero (delivery, platform fee), itanong muna sa akin.
```

*If Jeff runs it and records the run, change the tag to "Nasubukan ko noong [date]. Isang test lang, puwedeng iba ang resulta."*

---

## S4 — RESULT
**Chibi:** none (let the numbers lead).

> **[PLACEHOLDER — paste real output]** Preferred: Jeff's real Gemini/Claude run (exact excerpt or screenshot, with date and model label). If it was not run, use the human-written table below and keep its label. If the AI gets any number wrong, show that honestly with the human correction.

**Fallback version (current draft): human-written**

- Headline: **BUY 1 TAKE 1 = −₱20 KADA SET**
- Label (required, visible): **Human-written illustrative example — hindi output ng AI.**
- Tag: *Fictional practice example*

| Promo | Customer pays | Puhunan | Tubo / lugi |
|---|---|---|---|
| Walang promo (1 pack) | ₱120 | ₱70 | **+₱50** |
| **Buy 1 Take 1** (2 packs) | ₱120 | ₱140 | **−₱20 (LUGI)** |

**Mas ligtas na options**
- ₱10 off kada pack: ₱110 − ₱70 = **+₱40 kada pack**
- 3 packs for ₱330: ₱330 − ₱210 = **+₱120 kada set** (₱40 kada pack)

- Footer line: Calculator mo pa rin ang final check. Hindi pa kasama ang delivery at platform fee.

---

## S5 — RECAP + SAVE CTA
**Chibi:** `wave`.

**On-slide text**
- Headline: **3 HAKBANG BAGO MAG-PROMO**
  1. Ilagay ang presyo at puhunan.
  2. Ilagay ang promo.
  3. I-check ang math.
- Big CTA (the only ask): **I-SAVE PARA MAGAMIT MO.**
- Sign-off (small): Follow @TitoAIPH — Tito AI, AI Para Sa Ating Lahat.

---

## Arithmetic check (done twice)
- Walang promo: 120 − 70 = **50** ✔
- Buy 1 Take 1: customer pays 120 for 2 packs. Cost 2 × 70 = **140**. 120 − 140 = **−20** ✔
- ₱10 off: 120 − 10 = 110. 110 − 70 = **40** per pack ✔
- 3 for ₱330: cost 3 × 70 = **210**. 330 − 210 = **120** per set; 120 ÷ 3 = **40** per pack ✔

---

## Facts for Jeff to check
1. **Prompt is untested.** Run it in free Gemini (signed-out if possible) by Fri Nov 6 and note the model label shown. Verify each number against the table above.
2. **S4 is a placeholder.** If you use your real run, quote it exactly (no edits), add the date and "isang test lang, puwedeng iba ang resulta," and remove the human-written label. If the AI errs, show the error and the correction.
3. **Free access:** confirm on capture day that there is no paid plan or trial upsell. I did not state any daily limits on the slides, only "libre."
4. **All numbers (₱120, ₱70) are invented practice inputs.** No real shop, client, or result is claimed. Fictional labels are on S1, S2, S4, and in each caption.
5. **Delivery and platform fees are left out on purpose** and disclosed on S2 and S4. No legal, DTI, or tax claims are made.
6. **CTA convention:** Brief says save-only. S5 carries a small follow sign-off naming Tito AI, as requested, but captions use only the save CTA. Cut the sign-off line if you want a strict one-ask slide.
7. **Hashtags:** CLAUDE.md says 8–15, but the brief asked for exactly five per platform (matching recent posts). Confirm that is still your preference.
8. **Hypothesis (from brief):** saves per 1,000 views should beat W45 Mon and W44 Mon. Pull fresh baselines before Nov 9. No boost without fresh organic data.
9. Chibi is a presenter, not a real owner or client. Use the approved clean-shaven transparent poses from `docs/assets/avatars/`.
