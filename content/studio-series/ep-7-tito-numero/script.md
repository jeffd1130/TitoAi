# Ep 7/7 — Tito Numero, ang Analyst

**Series:** Ang Team ni Tito AI (finale) · **Length:** ≈28s spoken · **Words:** 71 · **Growth job:** FOLLOW
**Voice:** Jeff (or a voice Jeff approves). Timing at ≈2.55 words/s; re-time captions to the real take.
**Drop:** TBD. Nothing is scheduled.

## Voiceover (exact)

> Numbers muna, bago boost.
> Kumusta, mga Pamangkin!
> Si Tito Numero ang analyst.
> Binabasa niya ang metrics mula sa TikTok Studio at Meta Business Suite.
> Kapag lampas isang linggo na ang data, hihingi siya ng bago.
> Noong Nov 5, ang boost call: hindi pa, kulang pa ang ebidensya.
> Gumagawa siya ng weekly check and balance, pero ako pa rin ang magpapasya.
> Follow ka sa Tito AI. Salamat sa pagkilala sa buong team.

## Timed script

| Time | Voice | On-screen caption | Visual |
|---|---|---|---|
| 0:00–0:01.6 | Numbers muna, bago boost. (hook) | NUMBERS MUNA, BAGO BOOST | A: Tito Numero beside a board with a blank bar chart, rolled chart in his hand; Tito next to him |
| 0:01.6–0:02.7 | Kumusta, mga Pamangkin! | Kumusta, mga Pamangkin! | A |
| 0:02.7–0:04.7 | Si Tito Numero ang analyst. | Ep 7/7 · Tito Numero · Analyst | A |
| 0:04.7–0:09.4 | Binabasa niya ang metrics mula sa TikTok Studio at Meta Business Suite. | Binabasa ang metrics: TikTok Studio · Meta Business Suite | B: colored bars grow on the blank chart as he points |
| 0:09.4–0:13.7 | Kapag lampas isang linggo na ang data, hihingi siya ng bago. | Lampas 7 araw? Hihingi ng bagong data | B → C: seven blank calendar squares; the last ones fade, he shakes his head |
| 0:13.7–0:18.4 | Noong Nov 5, ang boost call: hindi pa, kulang pa ang ebidensya. | Nov 5 boost call: hindi pa | C: a small rocket shape rests with a gentle "pause" hand-sign over it |
| 0:18.4–0:23.5 | Gumagawa siya ng weekly check and balance, pero ako pa rin ang magpapasya. | Weekly check & balance · Si Jeff ang nagpapasya | D: he hands the rolled chart to Tito; Tito nods |
| 0:23.5–0:27.8 | Follow ka sa Tito AI. Salamat sa pagkilala sa buong team. | Follow ka sa Tito AI | D: both wave; (optional) the other six characters appear in a final still, only if Jeff has approved all references |

## What's true here (source)
- `tito-analyst`: reads the newest `reports/data/*-metrics.json` (TikTok Studio and Meta Business Suite pulls); says so if older than 7 days; writes `reports/<date>-weekly-checkbalance.md`; boost recommendations need current organic data. Source: `.claude/agents/tito-analyst.md`.
- Concrete example: `reports/2026-11-05-weekly-checkbalance.md` §4 "Boost call: **No.**" The best organic post had 8 interactions, so nothing was strong enough to amplify. The video says only the decision, not the numbers.

## Can't do yet
- He can't open a browser; Claude Code pulls the data first. He never estimates missing numbers. He can't boost or post.

## Notes for Jeff
- I did not verify whether Tito Numero (the agent) or Claude Code wrote the Nov 5 report. The line says "ang boost call" (the report's decision), not "he wrote it." Confirm before posting.
- No views, follows or results are quoted. This is a "no claims" episode by design.
- "Meta Business Suite" and "TikTok Studio" appear as spoken/caption text only, never as logos in Flow clips.
- The Nov 5 boost call is a dated decision, so it may be old by posting time; consider "Noong Nov 5" → the latest report's boost call when you approve.
- Series finale: no next-episode cue, so the end line is "Salamat sa pagkilala sa buong team."
