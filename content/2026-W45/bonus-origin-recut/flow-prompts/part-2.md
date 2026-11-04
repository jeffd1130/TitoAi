# Part 2 — "Website? AI ang tinanong ko." (target 30.0s) — Google Flow prompts

**Source of truth:** `content/2026-W45/bonus-origin-recut/gemini-plan.md` (Part 2 redo section + acceptance check). The first Flow cut (`part-2-chibi-flow.mp4`) is **REJECTED** (3D-toy style, stubble, puppet elbows). Do not reuse it.
**Run date:** Nov 4 (50 free Flow credits that day). Owner after download: Claude Code. Jeff approves.

## Device note
Part 1's final cut uses the **tablet on its stand**, and this redo starts from a Part 1 frame, so every prompt says "tablet." The older plan text for Parts 3–5 says "laptop"; confirm Jeff wants the tablet to stay consistent.

## Flow settings
Flow (flow.google.com) → **Frames** mode (not Ingredients) · Veo 3.1 Lite · 9:16 · x1 · **"Return silent videos" ON** (turning it off failed at the audio step once) · no Ingredient reference needed in Frames mode.

## Starting point (shot A is already done)
- Start frame source: `w44-friday-motion-sample/public/origin-gemini-part-1-unpatched.mp4` at **18.5s** (seated at the desk, smiling, tablet on its stand).
- Shot A was generated Nov 3 and **matches Part 1** (same room, face, soft arms, screen facing the viewer): `docs/media/tito-ai-origin-recut/flow-part-2/test-frames-style-match.mp4`. In Flow it is the tile **"Character picking up tablet"**.
- **Do not re-run A.** The exact A prompt wasn't recorded in the plan, so don't try to reproduce it. Open that tile and use **Extend** for B, C, D.
- Check the last frame of A before D: if he is already holding the tablet, change D to "raises the tablet toward the camera."

If you ever need to re-extract the frame (run from `/Users/jeff/Documents/Claude/TItoAi`):
```
ffmpeg -ss 18.5 -i w44-friday-motion-sample/public/origin-gemini-part-1-unpatched.mp4 -frames:v 1 -q:v 2 docs/media/tito-ai-origin-recut/flow-part-2/start-frame-part1-18.5s.png
```

## Credit budget (10 credits per 8s clip or extend · 50 free per day · no rollover)
| Shot | Action | Credits |
|---|---|---|
| A | Already done Nov 3 (last 10 credits) | 0 today |
| B | Extend | 10 |
| C | Extend | 10 |
| D | Extend | 10 |
| **Subtotal** | | **30** |
| Spare | 20 = two re-rolls of a rejected extend | 20 |

Four clips ≈ 32s; Claude Code trims to 30.0s. Flow video may be blocked at peak (about 10 PM–1 AM PHT), so run it earlier in the day. Don't spend credits on a clip that fails the check below; re-roll only that extend. If the credits run out, switch to Gemini Videos (resets Nov 4, 1:52 PM PHT).

## Style line (already inside every prompt below; keep it intact if you edit)
> Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet screen faces the viewer, stays fully in frame, and shows only a simple pretend website with no real brands or logos. No captions, voice, dialogue, music or sound. No extra people.

(The plan's style line ended in "…"; I filled the gap with the clean-shaven and wardrobe details from the character rules. The old "warm 3D illustrated style" wording is deliberately dropped because it caused the drift.)

## Extend prompts

### Shot B — extend the "Character picking up tablet" clip
```
Evening falls: the window turns to a starry night and the desk lamp switches on. He yawns, leans in and types a question on the tablet. Soft glowing blank chat bubbles (no readable text) float up from the screen; he reads them and gives an "aha" nod. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet screen faces the viewer, stays fully in frame, and shows only a simple pretend website with no real brands or logos. No captions, voice, dialogue, music or sound. No extra people.
```

### Shot C — extend B
```
He keeps reading, smiles with relief, and taps the screen as the pretend website comes together. Gentle camera push-in. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet screen faces the viewer, stays fully in frame, and shows only a simple pretend website with no real brands or logos. No captions, voice, dialogue, music or sound. No extra people.
```

### Shot D — extend C
```
He picks up the tablet, shows the finished pretend website to the camera, and gives a thumbs up. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet screen faces the viewer, stays fully in frame, and shows only a simple pretend website with no real brands or logos. No captions, voice, dialogue, music or sound. No extra people.
```

## Acceptance checklist (check every extend before spending the next 10 credits)
- [ ] Same soft painterly 2D style and beige room as Part 1; no 3D-toy look.
- [ ] Clean-shaven in every frame (no stubble, beard, mustache); plain white crew-neck tee, no collar or buttons.
- [ ] Smooth rounded elbows with no hard corners in any frame. **Scrub the clip around every arm movement** (typing, tapping, thumbs up, lifting the tablet).
- [ ] Tablet screen faces the viewer and the whole tablet stays in frame.
- [ ] Screen shows only a pretend website; chat bubbles are blank; no real brands, logos or readable text.
- [ ] Hands correct (five fingers, no melting), no extra people.
- [ ] No captions, voice, music or sound (silent).
- [ ] Night transition in B looks natural (window → stars, lamp on), not a cut to a new scene.

Reject on any miss. If only the end drifts, tell Claude Code the usable timestamp; it can trim there.

## Save path and handoff
1. Download the extended clip from Flow as `docs/media/tito-ai-origin-recut/flow-part-2/part-2-flow-redo-raw.mp4`.
2. Ping Claude Code with that path. It will: trim to 30.0s, save the silent copy to `w44-friday-motion-sample/public/origin-gemini-part-2.mp4` (and remove `2` from `STILL_PARTS` in `src/OriginChibiGemini.tsx`), add the original Part 2 audio, loudnorm (I=-14, TP=-1.5), add captions plus hook/next-part text, render, and update the review page.
3. Final lands at `docs/media/tito-ai-origin-recut/part-2-chibi-gemini.mp4` after Jeff approves. Nothing is posted or scheduled.
