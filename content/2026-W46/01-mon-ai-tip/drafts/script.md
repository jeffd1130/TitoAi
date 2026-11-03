# W46 Mon AI Tip — "Buy 1 Take 1 Mo… Lugi Pala?"

**Slot:** `01-mon-ai-tip` · **Drop:** Mon Nov 9, 2026 · 8:00 PM PHT
**Format:** 5-slide carousel, 1080×1350 · **Growth job:** SAVE
**Tool:** Gemini free (primary) · Claude free (fallback) · no paid tools
**Hook:** "Buy 1 Take 1 mo… lugi pala?"
**Status:** DRAFT for Jeff's approval. Prompt UNTESTED. S4 is a human-written sample, not model output.
**Source of truth for on-slide text:** `drafts/carousel.json` (this script mirrors it).

Palette: cream `#FFF8E7` bg, marigold `#FFB800`, coral `#FF6B4A`, deep teal `#0D6B63`, navy `#0A0F1E` text. No small white text on coral. Footer: Tito AI logo + 5 pips.

---

## S1 — HOOK (cream)
**Chibi:** `surprised` (hero size), eyes on a coral "−₱20" sticker.

**On-slide text**
- Kicker: FICTIONAL PRACTICE EXAMPLE
- Headline: **Buy 1 Take 1** *mo… Lugi pala?*
- Body: TITO AI TIP: I‑check muna ang promo bago i‑post.

**Visual:** coral "−₱20" sticker over a simple dried-mango pack icon. If an image is generated, label it "illustrative."

---

## S2 — PROBLEM (marigold)
**Chibi:** `teach` (small, corner).

**On-slide text**
- Kicker: FICTIONAL PRACTICE EXAMPLE
- Headline: **Masarap ang promo kung tubo pa.**
- Body: Dried mango seller. Kasama na ang packaging sa puhunan. Madaling mag‑isip ng promo, mahirap kapag hindi kinuwenta.
- List:
  - Presyo: ₱120 / 200g pack
  - Puhunan: ₱70 / pack
  - Promo: Buy 1 Take 1

---

## S3 — PROMPT (cream)
**Chibi:** none.

**On-slide text**
- Headline: **Copy-paste sa libreng AI**
- Body (untested tag + privacy line): Hindi pa nasubukan ang prompt na ito. Sarili mong numbers lang; huwag mag‑paste ng detalye ng customer.
- Prompt block (shortened, exactly as on the slide):

```
Ikaw ang tagasuri ng promo ng maliit kong negosyo. Numbers ko lang ang gamitin mo.
Produkto: [produkto]
Presyo bawat piraso: ₱[__]
Puhunan bawat piraso: ₱[__]
Promo: [hal. Buy 1 Take 1]

Gawin:
1. Ipakita ang kita, gastos at tubo, may promo vs. walang.
2. Sabihin kung tubo pa o lugi.
3. Magbigay ng 2 mas ligtas na promo, may computation.
```

The fuller prompt (with the "itanong muna sa akin kung may kulang" line) lives in `captions.md` as the optional first comment.

*If Jeff runs it and records the run, change the tag to "Nasubukan ko noong [date]. Isang test lang, puwedeng iba ang resulta."*

---

## S4 — RESULT (cream)
**Chibi:** none (let the numbers lead).

> **[PLACEHOLDER — paste real output]** Preferred: Jeff's real Gemini/Claude run (exact excerpt or screenshot, with date and model label). If it was not run, keep the human-written rows below and their label. If the AI gets any number wrong, show that honestly with the human correction.

**Current draft: human-written**

- Kicker: FICTIONAL · HUMAN-WRITTEN, HINDI OUTPUT NG AI
- Headline: **Buy 1 Take 1 = −₱20 kada set**
- Body: Calculator mo pa rin ang final check. Hindi pa kasama ang delivery at platform fee.
- Rows (one formula per line):
  - Walang promo: ₱120 − ₱70 = +₱50
  - Buy 1 Take 1: ₱120 − ₱140 = −₱20
  - ₱10 off kada pack: ₱110 − ₱70 = +₱40
  - 3 packs ₱330: ₱330 − ₱210 = +₱120 / set

---

## S5 — RECAP + SAVE CTA (marigold)
**Chibi:** `wave`.

**On-slide text**
- Headline: **3 hakbang bago mag‑promo**
  1. Ilagay ang presyo at puhunan.
  2. Ilagay ang promo.
  3. I‑check ang math.
- Sign-off: Tito AI — AI Para Sa Ating Lahat.
- Big CTA (the only ask): **I-SAVE PARA MAGAMIT MO.**

No "Follow" wording on this slide.

---

## Arithmetic check (done twice)
- Walang promo: 120 − 70 = **50** ✔
- Buy 1 Take 1: customer pays 120 for 2 packs. Cost 2 × 70 = **140**. 120 − 140 = **−20** ✔
- ₱10 off: 120 − 10 = 110. 110 − 70 = **40** per pack ✔
- 3 for ₱330: cost 3 × 70 = **210**. 330 − 210 = **120** per set; 120 ÷ 3 = **40** per pack ✔

---

## Facts for Jeff to check
1. **Prompt is untested.** Run it in free Gemini by Fri Nov 6 and record the model label shown and the date, before replacing S4. Verify each number against the rows above.
2. **S4 is a placeholder.** If you use your real run, quote it exactly (no edits), add the date and "isang test lang, puwedeng iba ang resulta," and remove the human-written label. If the AI errs, show the error and the correction.
3. **Free access:** confirm on the day of posting that Gemini/Claude are still free with no paid plan or trial upsell. The slides say only "libreng AI," with no limits stated.
4. **Mango prices (₱120 / ₱70) are fictional practice inputs.** No real shop, client, or result is claimed. Fictional labels are on S1, S2, S4, and in each caption.
5. **Delivery and platform fees are left out on purpose** and disclosed on S4. No legal, DTI, or tax claims are made.
6. **Hashtags:** CLAUDE.md says 8–15, but the brief asked for exactly five per platform (matching recent posts). Confirm that is still your preference.
7. **Hypothesis (from brief):** saves per 1,000 views should beat W45 Mon and W44 Mon. Pull fresh baselines before Nov 9. No boost without fresh organic data.
8. Chibi is a presenter, not a real owner or client. Use the approved clean-shaven transparent poses from `docs/assets/avatars/`.
