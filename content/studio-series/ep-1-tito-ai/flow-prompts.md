# Ep 1/7 — Flow prompts (Tito AI, chief of staff)

**Target:** 4 shots × 8s = 32s, trimmed to ≈27s to fit the voice. Silent clips; voice and captions are added later.
**Characters:** Tito AI chibi only (no agent character in this episode).

## Flow settings
Flow (flow.google.com) → **Frames** mode · Veo 3.1 Lite · 9:16 · x1 · **"Return silent videos" ON** · no Ingredient needed in Frames mode.
Gemini Videos only after the day's Flow credits run out.

## Start frame
- Image: approved Tito chibi at his desk with the tablet (screen facing the viewer) and six small blank glowing cards floating around it. Make it from `docs/assets/avatars/tito-ai-chibi-wave-screen.png` using the start-frame prompt in `../character-sheets.md`. Save as `docs/assets/avatars/studio-team/start-ep1.png`.
- Check it against the checklist below **before** spending credits.

## Credit math
| Shot | Action | Credits |
|---|---|---|
| A | Generate from start frame | 10 |
| B | Extend | 10 |
| C | Extend | 10 |
| D | Extend | 10 |
| **Total** | | **40** |
| Spare | 10 of the day's 50 = one re-roll of a rejected clip | 10 |

Run earlier in the day; Flow may be blocked about 10 PM–1 AM PHT. Re-roll only the clip that failed. If credits run out, switch to Gemini.

## Prompts

### Shot A — generate from the start frame
```
Tito sits at his desk, smiles and waves at the camera. Six small, blank, softly glowing cards float gently around the tablet. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Completely clean-shaven, plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. The tablet screen faces the viewer and shows only blank colored shapes, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot B — extend A
```
He talks to the tablet and the six cards slide into a row, lighting up one by one from left to right, like a team starting in order. Gentle camera push-in. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Completely clean-shaven, plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. The tablet screen faces the viewer and shows only blank colored shapes, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot C — extend B
```
He taps one glowing card; it flips and turns into a neat stack of five blank slides. He nods, pleased. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Completely clean-shaven, plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. The tablet screen faces the viewer and shows only blank colored shapes, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot D — extend C
```
He raises one open hand like a "wait, I decide" gesture, then gives a thumbs up and waves at the camera. The cards settle softly behind him. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Completely clean-shaven, plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. The tablet screen faces the viewer and shows only blank colored shapes, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

## Acceptance checklist (after every clip, before the next 10 credits)
- [ ] Same soft painterly 2D style and room as the start frame; no 3D-toy look
- [ ] Clean-shaven in every frame; plain white crew-neck tee, jeans, white sneakers, black watch (left wrist), bead bracelet
- [ ] Smooth rounded elbows, no hard corners; **scrub around every arm movement** (waving, tapping, thumbs up)
- [ ] Tablet screen faces the viewer and stays in frame; screen shows only blank shapes
- [ ] Hands: five fingers, nothing melted; no extra people
- [ ] No captions, voice, music or sound; no logos or real brands; no readable text
- [ ] Cards don't morph into letters or numbers

Reject on any miss. If only the end drifts, note the usable timestamp so it can be trimmed there.

## Save path and handoff
1. Download as `docs/media/studio-series/ep-1-tito-ai/ep-1-flow-raw.mp4` (create the folder).
2. Ping Claude Code with the path. It will trim to the voice length, add the voice take, loudnorm (I=-14, TP=-1.5), captions, hook and next-episode text.
3. Final goes to `docs/media/studio-series/ep-1-tito-ai/ep-1-final.mp4` only after Jeff approves. Nothing is posted or scheduled.
