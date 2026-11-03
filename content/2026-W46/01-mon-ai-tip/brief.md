# W46 Monday AI Tip — “Buy 1 Take 1 Mo, Lugi Pala?”

**Slot:** `01-mon-ai-tip` · **Week:** 2026-W46
**Drop:** Monday, Nov 9, 2026 · 8:00 PM PHT
**Format:** 5-slide AI Tip carousel, 1080×1350. Not a video; no Flow credits needed.
**Status:** Brief only. No assets, captions, Canva design, or schedule entry yet. Jeff approves before any posting.
**Platforms:** TikTok, Instagram, Facebook (native upload each, separate captions).

## Working title / hook (Taglish)
**“Buy 1 Take 1 Mo… Lugi Pala?”**
- Cover line (recommended): **“Promo mo, tubo pa ba o lugi na?”**
- Alt cover: “Bago ka mag-promo, i-check muna sa AI ang numbers.”
- Template-style alt: “Alam mo ba na pwede mong i-check kung lugi ang promo mo bago mag-post?” Do not add a time claim like “in 1 minute” unless Jeff times it.

## Pillar + persona
- **Pillar:** AI Tip (educational, about 30% of the mix), with the entertainment hook of a familiar Pinoy promo going wrong.
- **Persona:** Small-business owners first: online sellers, sari-sari, food, services. Anyone who runs a promo qualifies.
- **Growth job (one):** **SAVE.** CTA: “I-save para magamit mo.”

## Why this angle (repeat check)
Read: `CLAUDE.md`, `docs/schedule.json` (through W45 Mon), the Oct 20 small-business plan, and the W43–W45 captions/briefs.

| Already used | This post |
|---|---|
| Turon product captions (W43 Mon) | Not about writing captions |
| Print-shop buyer question (W43 Wed) | Not a buyer question |
| Three-shot content plan (W43 Fri) | Not content planning |
| Bakery notes to action list (W44 Mon) | Not organizing notes; it is a number check |
| “HM po?” price reply (W45 Mon) | Not a customer reply. It is owner-side: checking a promo's profit before announcing it |
| W42 Wed “Magkano po?” and W44 Wed VA handoff | Different task; no fact-check-a-draft pattern |

- A scan of `schedule.json` and `content/` found no earlier post about promos, discounts, or profit checks. Matches in `content/` were incidental words.
- The last four small-business posts were all reply/writing/organizing tasks. This one moves to **money math**, a new task type.
- The Oct 20 plan says to lead with a concrete business question or visible AI mistake, and to close with one specific ask. Here the “visible mistake” is the owner's promo losing money.

## Tool
**Gemini free chat** (gemini.google.com) is the primary tool, since earlier Tito AI demos used signed-out Gemini Flash-Lite. **Claude free** (claude.ai) is the fallback. ChatGPT is not needed.
- Claude: the Philippines is listed on Anthropic's supported-countries page, whose opening paragraph covers Claude.ai (https://www.anthropic.com/supported-countries). Anthropic says a free tier exists but limits vary (https://support.anthropic.com/en/articles/8325607-is-there-still-a-free-version-of-claude).
- Gemini: PH availability is supported by press reports (https://unbox.ph/news/gemini-report-southeast-asia-2026/, https://mb.com.ph/2026/07/15/googles-gemini-app-doubles-its-user-base-in-southeast-asia-philippines-leads-the-region-in-adoption-among-female-users). Google's help page I fetched did not list countries or pricing.
- **Free-tier limits are not verified from an official source.** Third-party sources conflict. Do not state daily limits on slides. Say only “libre ang basic na version.” Jeff confirms on capture day.

## Exact prompt (copy-ready — **UNTESTED**)
Mark slide 3 and the caption: **“Hindi pa nasubukan ang prompt na ito. Subukan mo at i-check ang math.”** Remove the label only if Jeff actually runs it and the run is recorded.

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

**Slide-3 trim** (if the full prompt will not fit legibly): keep the “huwag mag-imbento” line, the four input lines, and tasks 1–3. Put the full prompt in the caption.

## Fictional practice example (label on S2, S4, and caption: “Fictional practice example”)
Fictional online seller of dried mangoes. **All numbers below are invented practice inputs, not real results or a real shop.**
- Presyo: ₱120 per 200g pack
- Puhunan: ₱70 per pack, including packaging
- Promo to test: **Buy 1 Take 1**

**Reference math (hand-calculated; use to check any AI output):**

| Promo | Customer pays | Seller cost | Tubo/lugi |
|---|---|---|---|
| Walang promo (1 pack) | ₱120 | ₱70 | **+₱50** |
| **Buy 1 Take 1** (2 packs) | ₱120 | ₱140 | **−₱20 (lugi)** |
| ₱10 off per pack | ₱110 | ₱70 | +₱40 per pack |
| 3 packs for ₱330 | ₱330 | ₱210 | +₱120 per set (₱40 per pack) |

Delivery and platform fees are intentionally left out so the math stays simple. S2 or S4 should say “hindi pa kasama ang delivery at platform fee.”

## Slide-by-slide outline
Pilot palette: cream `#FFF8E7` bg, marigold `#FFB800`, coral `#FF6B4A`, deep teal `#0D6B63`, navy `#0A0F1E` text. No small white text on coral. Footer: Tito AI logo (`docs/assets/logo-horizontal-light.png` or `logo-horizontal-dark-transparent.png`) plus 5 pips. Chibi poses from `docs/assets/avatars/` (`tito-ai-chibi-wave.png`, `-teach.png`, `-surprised.png`). Use the approved clean-shaven transparent versions. Do not put the full chibi on every slide.

| Slide | Content | Chibi |
|---|---|---|
| **S1 Hook** | “Buy 1 Take 1 mo… lugi pala?” Subline: “I-check muna ang promo bago i-post.” Small tag: “Fictional practice example.” Visual: coral “−₱20” sticker over a simple mango-pack icon or illustration. If an image is generated, label it illustrative. | **surprised** (hero size) |
| **S2 Problem** | “Masarap ang promo kung tubo pa.” Show the fictional inputs: Presyo ₱120, Puhunan ₱70, Promo: Buy 1 Take 1. Line: “Madaling mag-isip ng promo. Mahirap kapag hindi kinuwenta.” Footnote: “Hindi pa kasama ang delivery at platform fee.” | **teach** (small) |
| **S3 Prompt** | “Copy-paste ito sa Gemini o Claude (libre).” Prompt block (trimmed per above). Tag: **“Hindi pa nasubukan — i-check ang math.”** (or “Nasubukan ko noong [date]” if run) | none, or small corner chibi |
| **S4 Result** | **Preferred:** exact excerpt or screenshot from Jeff's real run, showing the with/without-promo computation and the lugi call. **Fallback (if the run fails):** the reference-math table, labeled **“Human-written illustrative example, hindi output ng AI.”** Title: “Buy 1 Take 1 = −₱20 kada set.” Show the two safer options. Add “Calculator mo pa rin ang final check.” | none (let the output lead) |
| **S5 CTA** | Recap: “1. Ilagay ang presyo at puhunan 2. Ilagay ang promo 3. I-check ang math.” Big CTA: **“I-save para magamit mo.”** Closer: “Tito AI — AI Para Sa Ating Lahat.” | **wave** |

One CTA only (save). Do not stack follow, comment, or DM asks. The brand closer is a sign-off, not a second ask.

## Hypothesis (testable)
**If** the cover opens with a familiar Pinoy promo that turns out to lose money (“Buy 1 Take 1 mo… lugi pala?”) and the post gives one reusable copy-ready prompt with a single “i-save” CTA, **then** saves per 1,000 views should be higher than on W45 Mon (“HM po?”, follow CTA) and W44 Mon (messy notes), **because** a number-check template is something an owner returns to before each promo, while the last four posts were one-time writing tasks.
- **Variables vs. last post:** hook type (loss/mistake vs. buyer phrase), task type (money math vs. reply), CTA (save vs. follow).
- **Measure at 24h and 72h:** views, saves, shares, comments, follows, saves per 1,000 views, follows per 1,000 views, and watch/drop-off where the platform shows it.
- **Baselines:** the latest report in `reports/` is Sep 21 (a plan, not a metrics pull), and the last metrics pull I found is Sep 14. Jeff should pull fresh numbers before Nov 9 and set any threshold himself. W45 Mon is only `ready` in `schedule.json`, not confirmed posted. If it never went live, compare against the most recent posted small-business post instead.
- **Caveat:** one post cannot isolate hook vs. topic vs. CTA. Read it as a directional signal, and do not duplicate-upload to test.
- No growth, virality, or follower gain is promised. No boost without fresh organic data.

## Proof Jeff must capture (by Fri Nov 6, D-3)
1. Run the prompt in free Gemini (signed-out if possible, noting the model label shown). Use the fictional mango inputs and Buy 1 Take 1.
2. Screenshot or exact excerpt of the output for S4, plus the date and “isang test lang, puwedeng iba ang resulta.”
3. **Check every number** against the reference table above or a calculator. If the AI gets the math wrong or invents fees, show that honestly. A visible mistake plus a human correction is on-strategy.
4. If the run fails (auth, limits, region), use the S4 fallback and keep the untested labels.
5. Confirm free access on the capture day: no paid plan, no trial upsell.

## Risks / flags
- **Prompt untested.** Several recent runs failed (Gemini unavailable Oct 16, Claude Code OAuth expired Oct 26). No AI output may be claimed on slides or in captions unless it was actually returned.
- **AI arithmetic can be wrong.** The prompt asks for step-by-step work, and S4/S5 say the owner double-checks with a calculator. Do not let any slide imply AI math is guaranteed.
- **Invented numbers.** ₱120/₱70 are fictional practice inputs, labeled on S2, S4, and in the caption. Do not present them as typical prices, costs, or margins. No real shop, client, customer quote, or result.
- **No legal/regulatory claims** about promos, DTI permits, taxes, or platform fee rates. Platform fees vary and are not stated. Ask the owner to add their own.
- **Repetition:** the “customer reply / small business” cluster (W42 Wed, W43 Wed, W45 Mon) is crowded. This post differs in task (owner math) and hook. Avoid bakery, turon, print-shop, banana-chips, and laundry scenarios. Do not turn S3 into a “reply to customer” prompt.
- **Free-tool limits** are unverified (see Tool). Say only “libre.”
- **Privacy:** tell owners to use their own numbers but avoid pasting supplier contracts or customer details. One short line on S3 or in the caption is enough.
- **Seminar/attendee footage:** none. Chibi and logo only, and the chibi is a presenter, not a real owner or client.
- **Convention conflicts to confirm with Jeff:** (a) CLAUDE.md calls for 8–15 hashtags including `#TitoAIPH #MgaPamangkin #AIParaSaAtin`, while recent drafts used exactly five per platform; (b) the CTA is save-only here, whereas the standard video closer asks for a follow.
- **Production note:** I can't create empty folders with the tools available. `raw/`, `drafts/`, and `approved/` will be created when Jeff or the next production step adds files.
- No Canva, Telegram, Buffer, or `schedule.json` changes were made.

## Timeline (PHT)
- Fri Nov 6, 9:00 AM: D-3, capture the Gemini run and screenshot.
- Sat Nov 7: D-2, build slides, captions (TikTok short / IG medium / FB story-length, max 3 emoji), and Canva design.
- Sun Nov 8: D-1, send to Jeff for approval.
- Mon Nov 9, 8:00 PM: drop. Jeff seeds the first comment within 5 minutes and replies in the first hour.

## Sources
- Claude supported countries: https://www.anthropic.com/supported-countries
- Claude free tier: https://support.anthropic.com/en/articles/8325607-is-there-still-a-free-version-of-claude
- Gemini PH availability: https://unbox.ph/news/gemini-report-southeast-asia-2026/ and https://mb.com.ph/2026/07/15/googles-gemini-app-doubles-its-user-base-in-southeast-asia-philippines-leads-the-region-in-adoption-among-female-users
- Gemini limits (official page; contents not retrieved): https://support.google.com/gemini/answer/16275805
- Strategy: `content/strategy/2026-10-20-small-business-follower-plan.md`
- Avatar/palette rules: `brand/tito-ai-chibi-avatar.md`
