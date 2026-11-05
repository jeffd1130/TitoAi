# Ep 6/7 — Lola Suri, ang QA

**Series:** Ang Team ni Tito AI · **Length:** ≈28s spoken · **Words:** 72 · **Growth job:** FOLLOW
**Voice:** Jeff (or a voice Jeff approves). Timing at ≈2.55 words/s; re-time captions to the real take.
**Drop:** TBD. Nothing is scheduled.

## Voiceover (exact)

> Hindi nag-eedit si Lola.
> Kumusta, mga Pamangkin!
> Si Lola Suri ang QA namin.
> Read-only siya: binabasa ang PNG, verdict lang ang ibinibigay: Pass, o Fix na may numbered list.
> Sa W46 Monday carousel, slide 4, nakita niyang naiwan sa dulo ng linya ang plus at minus, kaya hindi malinis basahin ang mga numero.
> Hindi niya inayos; nilista lang ang fix.
> Ako pa rin ang mag-aapprove.
> Follow ka sa Tito AI.
> Susunod: si Tito Numero.

## Timed script

| Time | Voice | On-screen caption | Visual |
|---|---|---|---|
| 0:00–0:01.6 | Hindi nag-eedit si Lola. (hook) | HINDI NAG-EEDIT SI LOLA | A: Lola Suri holds her clipboard, hands visible and empty of any pen; Tito beside her |
| 0:01.6–0:02.7 | Kumusta, mga Pamangkin! | Kumusta, mga Pamangkin! | A |
| 0:02.7–0:05.1 | Si Lola Suri ang QA namin. | Ep 6/7 · Lola Suri · QA | A |
| 0:05.1–0:11.4 | Read-only siya: binabasa ang PNG, verdict lang ang ibinibigay: Pass, o Fix na may numbered list. | Read-only · VERDICT: PASS o FIX · numbered list | B: she reads a printed slide without touching it; a green and a yellow flag pop up on her clipboard |
| 0:11.4–0:20.4 | Sa W46 Monday carousel, slide 4, nakita niyang naiwan sa dulo ng linya ang plus at minus, kaya hindi malinis basahin ang mga numero. | Nilista ni Lola: W46 Mon · slide 4 · naiwan ang + at − sa dulo ng linya | C: illustrated slide mock-up (no readable real text) with a "+" and "−" circled at line ends; label "Illustration" |
| 0:20.4–0:23.1 | Hindi niya inayos; nilista lang ang fix. | Walang edit. Fix list lang. | C: she ticks a numbered list on the clipboard, pen-free |
| 0:23.1–0:25.2 | Ako pa rin ang mag-aapprove. | Si Jeff pa rin ang nag-aapprove | D: she hands the clipboard to Tito; he nods and thumbs up |
| 0:25.2–0:27.2 | Follow ka sa Tito AI. | Follow ka sa Tito AI | D |
| 0:27.2–0:28.8 | Susunod: si Tito Numero. | Susunod: Tito Numero | D, small "Illustration" tag |

## What's true here (source)
- **Example (verified by Jeff, from the Nov 3–5 production sessions, recorded in Lola Suri's QA reports):** while reviewing the W46 Monday carousel slide 4, Lola Suri read the rendered PNG and flagged that the plus and minus signs were stranded at line ends (e.g. "= +" on one line, "₱40 kada pack" on the next), so the numbers did not read cleanly. The script says only what she flagged, not any result. I did not re-open the QA reports in this edit.
- `tito-qa` is read-only (tools: Read, Glob, Grep). Output: `VERDICT: PASS` or `FIX` with a numbered fix list; she never edits. Source: `.claude/agents/tito-qa.md`.
- The slide visual in segment C is an illustrated mock-up. Do not show or invent real slide text; if Jeff wants the real slide, use the actual W46 Mon slide 4 PNG as it was rendered.
- The flag colors are visual shorthand, not a color code from the repo.

## Can't do yet
- She can't fix anything; she only reports. Her verdict is a review, not approval. Jeff decides.

## Backup example (not used)
Later review (Nov 18–27): Lola Suri flagged a scorecard line on W48 Wed slide 4 that broke and stranded a dot. Swap in for the W46 line only if Jeff prefers it.
