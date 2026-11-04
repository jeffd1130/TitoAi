# Part 4 — "Trial and error? Oo naman." (target 25.5s) — Google Flow prompts

**Source of truth:** `content/2026-W45/bonus-origin-recut/gemini-plan.md` (Part 4 shot beats, style-match redo, acceptance check). Same Frames-from-Part-1 method. Run **after Part 3 passes** (about Nov 6). Owner after download: Claude Code. Jeff approves.

## Beats split into four 8s clips
The plan lists A/B/C. Three clips give about 24s (short of 25.5s), so **I split the plan's beat C into C (closes the tablet, walks to the door) and D (steps outside, looks around amazed)**. D is also the setting change, which is where drift is most likely.

## Device note
Plan text says "laptop… closes the laptop, tucks it under his arm." Starting from Part 1's **tablet** frame, the prompts say "tablet," and "closes" becomes "picks up." Confirm with Jeff.

## Flow settings
Flow (flow.google.com) → **Frames** mode · Veo 3.1 Lite · 9:16 · x1 · **"Return silent videos" ON**.

## Start frame for shot A
Part 1 at **18.5s** (seated at the desk, smiling, tablet on its stand).
```
ffmpeg -ss 18.5 -i w44-friday-motion-sample/public/origin-gemini-part-1-unpatched.mp4 -frames:v 1 -q:v 2 docs/media/tito-ai-origin-recut/flow-part-4/start-frame-part1-18.5s.png
```
(Run from `/Users/jeff/Documents/Claude/TItoAi`; create `flow-part-4/` first.) Fallback: last frame of the approved Part 3 clip. In Flow: Frames → upload as **start frame** → paste shot A.

## Credit budget (10 credits per 8s clip or extend · 50 free per day · no rollover)
| Shot | Action | Credits |
|---|---|---|
| A | Frames-mode generate | 10 |
| B | Extend | 10 |
| C | Extend | 10 |
| D | Extend | 10 |
| **Subtotal** | | **40** |
| Spare | 10 = one re-roll | 10 |

Four clips ≈ 32s; Claude Code trims to 25.5s, so there is about 6.5s of slack to cut the weakest moments. Avoid peak (about 10 PM–1 AM PHT). If C or D drifts, you can stop at the doorway and Claude Code will hold the last good frame; tell it the timestamp. Out of credits → Gemini Videos.

## Prompts

### Shot A — Frames mode (start frame above)
```
On the tablet screen a pretend website layout is being built; one colorful block wobbles and falls off. He laughs and playfully covers his face with one hand. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet screen faces the viewer, stays fully in frame, and shows only a simple pretend website with no real brands or logos. No captions, voice, dialogue, music or sound. No extra people.
```

### Shot B — extend A
```
He tries again, typing quickly. The layout snaps into place with a small sparkle, and he cheers with both arms raised. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet screen faces the viewer, stays fully in frame, and shows only a simple pretend website with no real brands or logos. No captions, voice, dialogue, music or sound. No extra people.
```
Both arms up is the elbow-risk moment: scrub it. If it goes angular, re-roll with "he cheers with one fist raised."

### Shot C — extend B
```
He picks up the tablet, tucks it under his arm, stands up and walks toward the door, smiling. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet stays fully in frame as he carries it. No captions, voice, dialogue, music or sound. No extra people.
```

### Shot D — extend C (outdoor)
```
He steps out onto a sunny, generic tech-campus street with trees and glass buildings (no logos or company names, no readable signs) and looks around, amazed, the tablet still under his arm. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style and colors as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. No captions, voice, dialogue, music or sound. No extra people; empty or softly blurred background only.
```
(The beige room no longer applies outdoors; the style, colors and character must still match.)

## Acceptance checklist (every clip, before the next 10 credits)
- [ ] Same soft painterly 2D style as Part 1 in every shot; beige room in A–C; no 3D-toy look.
- [ ] Clean-shaven in every frame; plain white crew-neck tee.
- [ ] Smooth rounded elbows, no hard corners. **Scrub around every arm movement** (face cover, both-arms cheer, tucking the tablet).
- [ ] Tablet screen faces the viewer and stays in frame in A–B; tablet is carried under the arm in C–D.
- [ ] The wobbling block and layout are simple pretend shapes; no real brands, logos or readable text.
- [ ] Street in D has no logos, company names or readable signs, and no extra people.
- [ ] Hands correct. Silent: no captions, voice, music or sound.
- [ ] Door/exit in C is a smooth move, not a jump cut to a different room.

Reject on any miss; tell Claude Code the last good timestamp if only the end drifts.

## Save path and handoff
1. Download as `docs/media/tito-ai-origin-recut/flow-part-4/part-4-flow-raw.mp4`.
2. Ping Claude Code. It trims to 25.5s, saves the silent copy to `w44-friday-motion-sample/public/origin-gemini-part-4.mp4`, adds the original Part 4 audio, loudnorm (I=-14, TP=-1.5), captions plus hook/next-part text, renders `OriginChibiGeminiP4`, and updates the review page.
3. Final: `docs/media/tito-ai-origin-recut/part-4-chibi-gemini.mp4` after Jeff approves. **Keep the last frame of the approved clip**; Part 5 starts from it. Nothing is posted or scheduled.
