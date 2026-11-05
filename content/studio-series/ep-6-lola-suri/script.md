# Ep 6/7 — Lola Suri, ang QA

**Series:** Ang Team ni Tito AI · **Length:** ≈27s spoken · **Words:** 70 · **Growth job:** FOLLOW
**Voice:** Jeff (or a voice Jeff approves). Timing at ≈2.55 words/s; re-time captions to the real take.
**Drop:** TBD. Nothing is scheduled.

## Voiceover (exact)

> Hindi nag-eedit si Lola.
> Kumusta, mga Pamangkin!
> Si Lola Suri ang QA namin.
> Read-only siya: hindi niya binabago ang file, ibinibigay lang niya ang verdict.
> Pass, Fix Needed, o Blocked.
> Blocker sa kanya ang pekeng AI output at ang gawa-gawang halimbawa na walang label.
> Sinusuri rin niya ang hashtag at kung isa lang ang CTA.
> Pero ako pa rin ang mag-aapprove.
> Follow ka sa Tito AI.
> Susunod: si Tito Numero.

## Timed script

| Time | Voice | On-screen caption | Visual |
|---|---|---|---|
| 0:00–0:01.6 | Hindi nag-eedit si Lola. (hook) | HINDI NAG-EEDIT SI LOLA | A: Lola Suri holds her clipboard, hands visible and empty of any pen; Tito beside her |
| 0:01.6–0:02.7 | Kumusta, mga Pamangkin! | Kumusta, mga Pamangkin! | A |
| 0:02.7–0:05.1 | Si Lola Suri ang QA namin. | Ep 6/7 · Lola Suri · QA | A |
| 0:05.1–0:09.8 | Read-only siya… ibinibigay lang niya ang verdict. | Read-only: verdict lang, walang edit | B: she reads a stack of blank papers without touching them |
| 0:09.8–0:11.8 | Pass, Fix Needed, o Blocked. | PASS · FIX NEEDED · BLOCKED | B: three blank colored flags (green, yellow, red) pop up on her clipboard |
| 0:11.8–0:17.3 | Blocker sa kanya ang pekeng AI output… walang label. | Blocker: pekeng AI output · halimbawang walang label | C: she raises the red flag and shakes her head gently |
| 0:17.3–0:21.6 | Sinusuri rin niya ang hashtag at kung isa lang ang CTA. | Sinusuri rin: hashtag · isang CTA lang | C: she ticks checkmarks down her clipboard |
| 0:21.6–0:23.9 | Pero ako pa rin ang mag-aapprove. | Si Jeff pa rin ang nag-aapprove | D: she hands the clipboard to Tito; he nods and thumbs up |
| 0:23.9–0:25.9 | Follow ka sa Tito AI. | Follow ka sa Tito AI | D |
| 0:25.9–0:27.5 | Susunod: si Tito Numero. | Susunod: Tito Numero | D, small "Illustration" tag |

## What's true here (source)
- `tito-qa` is read-only (tools: Read, Glob, Grep). Output: `VERDICT: PASS | FIX NEEDED | BLOCKED`. Blockers include fake or invented AI output and fictional scenarios not labeled as practice. Fixes include wrong hashtag count, more than one CTA, more than 3 emoji, chibi drift. Source: `.claude/agents/tito-qa.md`.
- The on-screen flags are just visual shorthand for the three verdicts. Not a color code from the repo.

## Can't do yet
- She can't fix anything; she only reports. Her verdict is a review, not approval. Jeff decides.

## Concrete-example status: NOT VERIFIED — Jeff to confirm
You suggested "Lola Suri caught the S4 table wrapping issues in the Nov 18–27 carousels." I found no record of that in the repo (the W47/W48 scripts mention non-breaking hyphens "so they don't wrap," but nothing says who caught what). The main script uses her rule instead. If you confirm it happened, swap the blocker line (6th line) for this alternate (≈72 words total):

> Alternate line: **Nahuli ni Lola sa S4 ng mga carousel ko ang table na hindi tama ang pagkakabalot.**

Do not use the alternate unless it really happened.
