# Part 5 — "AI ang tulong, tao ang galaw." (target 29.5s) — Google Flow prompts

**Source of truth:** `content/2026-W45/bonus-origin-recut/gemini-plan.md` (Part 5 shot beats, style-match redo, acceptance check). Run **after Part 4 passes** (about Nov 7). Owner after download: Claude Code. Jeff approves.

## Beats split into four 8s clips
The plan lists A/B/C. For 29.5s I split the plan's beat B into **B (sits at the café table, opens the tablet) and C (types; pretend content calendar fills)**, and keep the plan's beat C as **D (turns to camera, waves goodbye, points "follow")**. Wording is the plan's, divided.

## Device note
Plan text says "closed laptop" and "opens the laptop." Prompts use the **tablet** from Part 1's reference: "carrying the tablet" and "props up the tablet." Confirm with Jeff.

## Flow settings
Flow (flow.google.com) → **Frames** mode · Veo 3.1 Lite · 9:16 · x1 · **"Return silent videos" ON**.

## Start frame for shot A (different from Parts 2–4)
Shot A is outdoors, so start from the **last frame of the approved Part 4 clip** (him on the sunny street, tablet under his arm). The Part 1 desk frame doesn't contain a street.
```
ffmpeg -sseof -0.1 -i docs/media/tito-ai-origin-recut/flow-part-4/part-4-flow-raw.mp4 -frames:v 1 -q:v 2 docs/media/tito-ai-origin-recut/flow-part-5/start-frame-part4-last.png
```
(Run from `/Users/jeff/Documents/Claude/TItoAi`; create `flow-part-5/` first. If you trimmed Part 4, use the last good frame.)
Fallback if Part 4's last frame looks off-style: use the Part 1 frame at 18.5s (`ffmpeg -ss 18.5 -i w44-friday-motion-sample/public/origin-gemini-part-1-unpatched.mp4 -frames:v 1 -q:v 2 …`) and change A to start with him standing up from the desk. Note that this shifts the setting change into A.

## Credit budget (10 credits per 8s clip or extend · 50 free per day · no rollover)
| Shot | Action | Credits |
|---|---|---|
| A | Frames-mode generate | 10 |
| B | Extend | 10 |
| C | Extend | 10 |
| D | Extend | 10 |
| **Subtotal** | | **40** |
| Spare | 10 = one re-roll | 10 |

Four clips ≈ 32s; Claude Code trims to 29.5s. Avoid peak (about 10 PM–1 AM PHT). Out of credits → Gemini Videos.

## Style line (inside every prompt)
This part is mostly outdoors, so the "beige room" phrase is dropped and the style, colors and character carry the match.

## Prompts

### Shot A — Frames mode (start frame above)
```
He walks along the sunny street carrying the tablet under one arm, smiling and waving at the camera. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style and colors as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Generic sunny street with trees and glass buildings, no logos, company names or readable signs. No captions, voice, dialogue, music or sound. No extra people; empty or softly blurred background only.
```

### Shot B — extend A
```
He sits down at an outdoor café table and props up the tablet. Its screen faces the viewer and shows a simple pretend social-media content calendar grid (colored blocks, no readable text, no real brands or logos). Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style and colors as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. No café name, signs or logos. No captions, voice, dialogue, music or sound. No extra people; empty or softly blurred background only.
```

### Shot C — extend B
```
He types happily on the tablet. Colorful blocks fill the pretend content calendar grid one by one. The tablet screen faces the viewer and stays fully in frame. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style and colors as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. No readable text, real brands or logos. No captions, voice, dialogue, music or sound. No extra people; empty or softly blurred background only.
```

### Shot D — extend C
```
He turns to the camera, gives a warm smile, waves goodbye, and points at the camera as if saying "follow." Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style and colors as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet stays on the table, screen toward the viewer. No captions, voice, dialogue, music or sound. No extra people; empty or softly blurred background only.
```

## Acceptance checklist (every clip, before the next 10 credits)
- [ ] Same soft painterly 2D style, colors and character as Part 1 (not a 3D-toy look), even outdoors.
- [ ] Clean-shaven in every frame; plain white crew-neck tee, jeans, white sneakers.
- [ ] Smooth rounded elbows, no hard corners. **Scrub around every arm movement** (wave, typing, point).
- [ ] Tablet screen faces the viewer in B–D and stays in frame; calendar is colored blocks only.
- [ ] No real brands, logos, signs, café names or readable text.
- [ ] Hands correct, no extra people.
- [ ] Silent: no captions, voice, music or sound.
- [ ] Start of A continues smoothly from Part 4's last frame (same street, same pose).
- [ ] Ends on a clean "follow" point to camera for the closer.

Reject on any miss; tell Claude Code the last good timestamp if only the end drifts.

## Save path and handoff
1. Download as `docs/media/tito-ai-origin-recut/flow-part-5/part-5-flow-raw.mp4`.
2. Ping Claude Code. It trims to 29.5s, saves the silent copy to `w44-friday-motion-sample/public/origin-gemini-part-5.mp4`, adds the original Part 5 audio, loudnorm (I=-14, TP=-1.5), captions plus hook/next-part text, renders `OriginChibiGeminiP5`, and updates the review page.
3. Final: `docs/media/tito-ai-origin-recut/part-5-chibi-gemini.mp4` after Jeff approves. Nothing is posted or scheduled.
