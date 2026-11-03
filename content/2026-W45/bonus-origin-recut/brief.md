# Tito AI — Origin-story recut (approval draft)

Source: `/Users/jeff/Downloads/Tito AI 1.mp4` (2:47.95, 1440×2560, HEVC/AAC, created May 26, 2026 per file metadata). This is a recut of Jeff's own footage and original voice, not a new event or new testimonial. Source captions are already burned in. No Meta, Google, NetApp, or other company affiliation or endorsement is claimed merely because their signage appears in the footage.

## The five parts

| Part | Source range | Export length | Story beat | Opening hook |
|---|---|---:|---|---|
| 1 | 00:07.4–00:37.0 | 29.6s | Household dad + side hustle + Silicon Valley question | Tatay, nasa Silicon Valley? |
| 2 | 00:38.0–01:08.0 | 30.0s | Need a website; asks Claude; uses Claude and Gemini | Website? AI ang tinanong ko. |
| 3 | 01:11.5–01:39.0 | 27.5s | No web-development background; social-media opportunity; learning | Wala akong background. |
| 4 | 01:40.0–02:05.5 | 25.5s | Experimenting and asking better questions | Trial and error? Oo naman. |
| 5 | 02:13.5–02:43.0 | 29.5s | Journey, social-media plans, follow invitation | AI ang tulong, tao ang galaw. |

Each export is 1080×1920 H.264 MP4 with original voice, source subtitles, Tito AI logo, approved chibi, a three-second hook label, and a last-seconds next-part cue. Original intro/filler and redundant location footage were omitted. There is no newly voiced line, fabricated result, or added company claim. These are review drafts, not posted or scheduled.

## Growth hypothesis and release test

The older video delays the personal hook and runs almost three minutes. A clear first-frame identity question plus self-contained short chapters may increase watch completion and follows; this is a test, not a virality guarantee. The latest verified numerical account report is Sep 14, so there is no current baseline for these clips. Post Part 1 natively only after Jeff approves it, then compare 2-second hold, average watch time, completion rate, shares, comments, and follows per 1,000 views with the original where comparable. If the clip earns attention but not follows, revise the next-part cue before releasing the rest. Space installments rather than posting five near-duplicates at once. Do not boost until organic response is visible.

TikTok says user interactions, including watch time, are important recommendation signals: https://support.tiktok.com/en/using-tiktok/exploring-videos/how-tiktok-recommends-content . This supports testing retention; it does not imply that any cut will go viral.

## Production / verification

- Reproducible overlays: `render-overlays.swift`; video edit: `render.sh`.
- Files: `docs/media/tito-ai-origin-recut/part-1.mp4` through `part-5.mp4`.
- Captions: `captions.md` and the GitHub Pages approval page.
- Every part was rendered with its original audio track and inspected for 1080×1920 geometry, duration, subtitles, logo, hook, cue, and chibi. Jeff should listen through each cut before approving publication to catch any spoken syllable clipped at a chapter boundary.

## Chibi version status (Nov 3, 2026, owner: Claude Code)

- Part 1 (FINAL, Jeff chose the Gemini cut on Nov 3): `docs/media/tito-ai-origin-recut/part-1-chibi-final.mp4` + `part-1-chibi-cover.jpg`. Gemini animation with the tablet (glitches cut), Jeff's voice, captions, about -14 LUFS.
- Part 1 alternate: `part-1-chibi-laptop.mp4` (laptop chibi stills) + `part-1-chibi-cover.jpg`. Gemini chibi animation, Jeff's uncut voice, recovered subtitles, hook/cue lifted above the bottom UI, about -14 LUFS. Tablet glitches at about 21s and 23.5s replaced with clean cuts. Captions: `captions.md`.
- Part 2 (FINAL, Nov 3): `docs/media/tito-ai-origin-recut/part-2-chibi-flow.mp4` + cover. Google Flow, Veo 3.1 Lite: one 8s clip plus 3 extends, trimmed to 30.0s, with the same tablet chibi reference and ChatGPT prompt format as Part 1 and the old video's audio. The tablet is briefly edge-on while he walks (~9s) and set down between ~21–24s; it never shows its back. Raw scene and shot A: `flow-part-2/`.
- Part 2 alternate: `part-2-chibi-laptop.mp4` (laptop stills).
- Parts 3–5: pending Gemini; see `gemini-plan.md`.
- Rejected: `tito-ai-chibi-gemini-part-2-raw.mp4` (chibi drifted: stubble, collared shirt).
- Rules: same clean-shaven white-tee chibi in every shot; the laptop and its pretend website stay fully in frame.
