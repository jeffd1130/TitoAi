# Part 3 — "Wala akong background." (target 27.5s) — Google Flow prompts

**Source of truth:** `content/2026-W45/bonus-origin-recut/gemini-plan.md` (Part 3 shot beats, style-match redo, acceptance check). Same Frames-from-Part-1 method as Part 2. Run **after Part 2 passes** (plan: about one part per day, so Nov 5). Owner after download: Claude Code. Jeff approves.

## Beats split into four 8s clips
The plan lists three beats (A/B/C). Flow clips are 8s, and 27.5s needs four, so **I split the plan's beat C into C and D**. The wording below is the plan's, divided; D is the plan's "rolls up his sleeves… confident thumbs up."

## Device note
Plan text for Part 3 says "laptop." This redo starts from Part 1's **tablet** frame, so the prompts say "tablet" to avoid drift. Confirm with Jeff.

## Flow settings
Flow (flow.google.com) → **Frames** mode · Veo 3.1 Lite · 9:16 · x1 · **"Return silent videos" ON**.

## Start frame for shot A
Primary: Part 1 at **18.5s** (seated at the desk, smiling, tablet on its stand). Starting from Part 1 again, rather than Part 2's end, keeps the style anchor from drifting.
```
ffmpeg -ss 18.5 -i w44-friday-motion-sample/public/origin-gemini-part-1-unpatched.mp4 -frames:v 1 -q:v 2 docs/media/tito-ai-origin-recut/flow-part-3/start-frame-part1-18.5s.png
```
(Run from `/Users/jeff/Documents/Claude/TItoAi`; create the `flow-part-3/` folder first.)
Fallback if you want continuity: the last frame of the approved Part 2 clip, `ffmpeg -sseof -0.1 -i <part-2-raw> -frames:v 1 start-frame-part2-last.png`.

In Flow: Frames → upload the PNG as the **start frame** → paste shot A → Generate.

## Credit budget (10 credits per 8s clip or extend · 50 free per day · no rollover)
| Shot | Action | Credits |
|---|---|---|
| A | Frames-mode generate | 10 |
| B | Extend | 10 |
| C | Extend | 10 |
| D | Extend | 10 |
| **Subtotal** | | **40** |
| Spare | 10 = one re-roll | 10 |

Four clips ≈ 32s; Claude Code trims to 27.5s. Avoid peak (about 10 PM–1 AM PHT). Don't spend on a clip that fails the check; re-roll only the failing step. Out of credits → Gemini Videos.

## Prompts

### Shot A — Frames mode (start frame above)
```
A blank notification card pops up on the tablet screen. He looks surprised, eyebrows up, and scratches his head. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet screen faces the viewer, stays fully in frame, and shows only a simple pretend website with no real brands or logos. No captions, voice, dialogue, music or sound. No extra people.
```

### Shot B — extend A
```
Simple floating "</>" code symbols and question marks swirl around him. He looks confused and sighs. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet screen faces the viewer, stays fully in frame, and shows only a simple pretend website with no real brands or logos. No captions, voice, dialogue, music or sound. No extra people.
```

### Shot C — extend B
```
The symbols fade. He starts typing a question on the tablet. Soft glowing blank chat bubbles (no readable text) float up from the screen and answer him; he reads them and nods. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet screen faces the viewer, stays fully in frame, and shows only a simple pretend website with no real brands or logos. No captions, voice, dialogue, music or sound. No extra people.
```

### Shot D — extend C
```
He nods with determination, pushes up his T-shirt sleeves, and gives a confident thumbs up to the camera. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet screen faces the viewer, stays fully in frame, and shows only a simple pretend website with no real brands or logos. No captions, voice, dialogue, music or sound. No extra people.
```
If the sleeve-push makes elbows go angular, re-roll D as "He nods with determination and gives a confident thumbs up" only.

## Acceptance checklist (every clip, before the next 10 credits)
- [ ] Same soft painterly 2D style and beige room as Part 1; no 3D-toy look.
- [ ] Clean-shaven in every frame; plain white crew-neck tee (no collar/buttons).
- [ ] Smooth rounded elbows, no hard corners in any frame. **Scrub around every arm movement** (head scratch, typing, sleeve push, thumbs up).
- [ ] Tablet screen faces the viewer; whole tablet in frame.
- [ ] Notification card and chat bubbles are blank; no real brands, logos or readable text. The "</>" and "?" symbols are simple shapes, not words.
- [ ] Hands correct, no extra people.
- [ ] Silent: no captions, voice, music or sound.

Reject on any miss; tell Claude Code the last good timestamp if only the end drifts.

## Save path and handoff
1. Download as `docs/media/tito-ai-origin-recut/flow-part-3/part-3-flow-raw.mp4`.
2. Ping Claude Code. It trims to 27.5s, saves the silent copy to `w44-friday-motion-sample/public/origin-gemini-part-3.mp4`, adds the original Part 3 audio, loudnorm (I=-14, TP=-1.5), captions plus hook/next-part text, renders `OriginChibiGeminiP3`, and updates the review page.
3. Final: `docs/media/tito-ai-origin-recut/part-3-chibi-gemini.mp4` after Jeff approves. Nothing is posted or scheduled.
