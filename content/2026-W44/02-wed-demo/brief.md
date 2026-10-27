# W44 Wednesday · VA Handoff Checklist: Bago Ipadala

**Drop:** Wednesday, Oct 28, 2026 · 7:00 PM PHT · **Slot:** `02-wed-demo` (Demo Carousel, 5 slides, 1080x1350)
**Status:** brief only. No assets, captions, or Canva design yet. Source: `docs/schedule.json` (W44 Wed) and `content/strategy/2026-10-19-va-freelancer-content-pivot.md` (W44 mini-arc: "VA handoff checklist: file naming, fact check, final approval").

## Working title
**"VA Handoff Checklist: Bago Ipadala"**
Slide 1 Taglish hook options (lead with the task, not "Kumusta"):
- A: "Tapos na ang post. Ipapadala mo na ba? Teka, 3 check muna."
- B: "Ang file mo: 'final_FINAL2.png'. Alin ang totoong final?"
Recommend A for the cover, B as the S2 problem line.

## Pillar + persona
- Pillar: Demo (Wednesday skill progression); educational, 30% of mix. Strategy ladder: everyday task, free prompt, visible output and its mistakes, human-corrected sample.
- Persona: **Aspiring VA / beginner freelancer** (named fictional persona, e.g. "Ana", clearly labeled fictional). Regular Pinoys stay welcome: frame as "kahit sino na nagpapasa ng gawa sa iba" (students, ate/kuya helping a negosyo).
- Not job advice: no income, hiring, or client-landing promises. No implication that commenters get work.

## Fictional practice scenario (label on S2 and caption: "Fictional practice example")
Fictional shop **"Linis Express Laundry"** (not a real business). Owner sent Ana these facts only:
- Wash and fold: PHP [price TBD by owner, shown as "P__" in the sample]
- Pickup/delivery: [TBD]
- Promo: "Libreng pickup sa 3 kilo pataas", valid Nov 1-7 (practice facts only)

Ana's draft Facebook post contains one invented claim (e.g., "same-day delivery") that is NOT in the owner's facts. This is the "catch" of the demo. Use placeholders instead of invented prices. Do not use any real shop, client, or seminar attendee.

## Tool + exact prompt to test
- Tool: **Gemini free chat** (gemini.google.com). Gemini is the tool already used in prior Tito AI demos. Availability: Google/PH press report the Gemini app is available in the Philippines and the base app is free (see sources). Specific free-tier limits in PH were NOT confirmed. Jeff must test signed-out/free on the capture day.
- One tool, one use case, one prompt.

**Prompt (copy-ready; UNTESTED):**
```
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
```
Test input draft (Jeff pastes, fictional): "Libreng pickup sa 3 kilo pataas, Nov 1-7! Same-day delivery, P__ lang per kilo." Expected catch: "same-day delivery" has no source. Record the actual output; do not quote anything not actually returned.

## File-naming rule to teach (S2/S3)
Pattern: `Client_Item_YYYY-MM-DD_v01_STATUS`
- Bad: `final final2 (1).png`
- Good: `LinisExpress_PromoPost_2026-11-01_v02_FOR-APPROVAL.png`
Rules shown: no spaces, ISO-style date so files sort in order, version with leading zero (v01, v02), one clear status word (DRAFT / FOR-APPROVAL / APPROVED). Basis: common file-naming guidance (no spaces/special characters, sortable dates, leading-zero versions). The pattern is one sensible convention, not a universal standard; say "isang paraan" not "the rule."

## Slide-by-slide outline (S1 hook to S5 CTA)
Bright pilot palette (new work): cream `#FFF8E7` bg, marigold `#FFB800`, coral `#FF6B4A`, deep teal `#0D6B63`, navy `#0A0F1E` text. Avoid small white text on coral. Logo: `docs/assets/logo-horizontal-light.png` (cream) or navy-transparent variant. Footer logo + 5 pips. 1080x1350. Chibi from `docs/assets/avatars/`; do not repeat the full character on every slide.

| Slide | Content | Chibi |
|---|---|---|
| S1 Hook | "Tapos na ang post. Ipapadala mo na? 3 check muna." Cover with checklist icon, small "Fictional practice example" tag. | **wave** |
| S2 Setup | Problem: scattered files and one unverified claim. Show messy name `final final2 (1).png` vs `LinisExpress_PromoPost_2026-11-01_v02_FOR-APPROVAL.png`. Label: Check 1 = Pangalan ng file. Show the 3 owner facts. | **surprised** |
| S3 Prompt | Check 2 = Fact check. The exact prompt above in a legible block (trim to fit; keep the "source facts lang" line). | **teach** |
| S4 Output | Real Gemini output screenshot or exact excerpt from Jeff's test showing the "same-day delivery" flagged WALANG SOURCE. Check 3 = Approval handoff: the 3-line message. Mark any human edits clearly as "human-edited." If the AI misses the claim or invents one, show that honestly (strategy: AI mistake then human correction is the memorable part). | none or small teach |
| S5 CTA | Recap the 3 checks in one line each. "Save mo ito bago ka magpadala." One CTA: **Save**. Closer: "Tito AI, AI Para Sa Ating Lahat." | **wave** |

Optional comment-keyword alternative: **BRIEF** (for next fictional practice scenario), per strategy memo. Use only one CTA per post. Recommend Save since W44 Mon already asks for a comment/choice style action; confirm with Jeff.

## Proof needed (Jeff must capture)
1. A real Gemini run of the prompt on the test draft (screenshot of the output for S4, signed-out/free if possible; note date and that outputs can vary).
2. Screenshot or recorded excerpt of Gemini's claim list showing which claim was flagged WALANG SOURCE.
3. Confirm the final handoff message wording after Jeff's edits (label human-written parts).
4. Date of the test run for the caption/script note ("isang test lang, puwedeng iba ang resulta").

## Caption notes (for the later caption step, not produced here)
TikTok short, 8 hashtags per CLAUDE.md platform rule vs. recent W43/W44 posts using exactly five per platform. CLAUDE.md says 8-15 with `#TitoAIPH #MgaPamangkin #AIParaSaAtin`; recent practice is five. Flag: confirm hashtag count with Jeff. IG medium, FB story-length. Max 3 emoji. One CTA.

## Risks / flags
- **Prompt untested.** Do not publish an output claim until Jeff runs it. Recent runs hit auth/availability problems (Oct 16 Gemini unavailable; Oct 26 local Claude Code OAuth expired). Have a fallback tool or label S4 as "human-written illustrative example" as W44 Mon did.
- **Free-tier limits in PH not verified** from an official Google page; confirm on capture day. Sources found only say the app is available in PH and the base app is free.
- **Fictional labeling:** "Linis Express Laundry" and "Ana" must be labeled fictional on S2 and in the caption. No income, job, or client promises. No invented client results.
- **Repetition:** W44 Mon already covers "messy input to organized output" (bakery notes). Keep this post about *review and handoff* (naming, claim check, approval), not summarizing notes. Avoid bakery, turon, and print-shop scenarios already used. Do not reuse the W38 Wed follow-up-email angle.
- **Privacy:** instruct viewers to remove private client details before pasting into any AI tool.
- **Seminar/attendee footage:** none used; chibi/logo only. Chibi is a presenter character, not a real VA or client.
- **Performance context:** no fresh organic baseline since Sep 14; no boost recommended. Not checked: latest `reports/` file (directory listing unavailable in this run), prior W41-W43 briefs (only some existed).
- Source-strategy mismatch note: strategy memo calls for a "three-post mini-plan" demo on W43 Wed; this slot follows the W44 mini-arc line instead, as set in `schedule.json`.

## Sources
- Gemini PH availability/adoption (base app free; limits not confirmed): https://unbox.ph/news/gemini-report-southeast-asia-2026/ and https://mb.com.ph/2026/07/15/googles-gemini-app-doubles-its-user-base-in-southeast-asia-philippines-leads-the-region-in-adoption-among-female-users
- File naming guidance (no spaces, sortable dates, leading-zero versions): https://resourcespace.com/blog/file-naming-conventions
- Strategy: `content/strategy/2026-10-19-va-freelancer-content-pivot.md`
- Avatar/palette rules: `brand/tito-ai-chibi-avatar.md`
