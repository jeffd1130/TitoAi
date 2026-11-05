# Ep 3/7 — Flow prompts (Kuya Sulat, scriptwriter)

**Target:** 4 shots × 8s = 32s, trimmed to ≈26s. Silent clips.
**Characters:** Tito AI chibi (left) + Kuya Sulat (right, pen).

## Flow settings
Flow → **Frames** mode · Veo 3.1 Lite · 9:16 · x1 · **"Return silent videos" ON**. Gemini Videos only after the day's Flow credits run out.

## Start frame
- Duo image of Tito + Kuya Sulat at a writing desk with three blank scrolls/cards (one with a dotted outline). Build it with the start-frame prompt in `../character-sheets.md`. Save as `docs/assets/avatars/studio-team/start-ep3.png`.
- Check hands, elbows, facial hair and 3D-toy look before spending credits.

## Credit math
| Shot | Action | Credits |
|---|---|---|
| A | Generate from start frame | 10 |
| B | Extend | 10 |
| C | Extend | 10 |
| D | Extend | 10 |
| **Total** | | **40** |
| Spare | one re-roll of a rejected clip | 10 |

## Prompts

### Shot A — generate from the start frame
```
Kuya Sulat writes smoothly with his pen on a blank scroll while Tito stands beside him, watching, then glances at the camera. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Kuya Sulat keeps exactly the look of the start frame (side-swept black hair, marigold sweater vest, pen, no facial hair). Scrolls show only blank lines, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot B — extend A
```
Three blank cards slide out from the scroll and settle in a row on the desk, one after another. Kuya Sulat taps each with his pen; Tito nods. Gentle camera push-in. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Kuya Sulat keeps exactly the look of the start frame (side-swept black hair, marigold sweater vest, pen, no facial hair). Cards show only blank lines, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot C — extend B
```
One card has a dotted outline and an empty middle. Kuya Sulat taps it with his pen and shakes his head gently, "not yet," while Tito points at it and nods. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Kuya Sulat keeps exactly the look of the start frame (side-swept black hair, marigold sweater vest, pen, no facial hair). The dotted card stays blank, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot D — extend C
```
Kuya Sulat gives a thumbs up with one hand while the other holds the pen; Tito gives a thumbs up too, and both wave at the camera. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Kuya Sulat keeps exactly the look of the start frame (side-swept black hair, marigold sweater vest, pen, no facial hair). No readable text anywhere. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

## Acceptance checklist (after every clip)
- [ ] Soft painterly 2D, same room and style as the start frame; no 3D-toy look
- [ ] Tito: clean-shaven, white crew-neck tee, jeans, white sneakers, black watch (left wrist), bead bracelet
- [ ] Kuya Sulat matches his reference; no facial hair appears on either character
- [ ] Smooth rounded elbows; **scrub every arm movement** (writing, tapping, thumbs up) and the pen hand
- [ ] Pen stays in hand; five fingers each, nothing melted
- [ ] Scrolls and cards show only blank shapes; no readable text
- [ ] No captions, voice, music, sound, logos or real brands; no extra people

Reject on any miss; note the last good timestamp if only the end drifts.

## Save path and handoff
1. Download as `docs/media/studio-series/ep-3-kuya-sulat/ep-3-flow-raw.mp4`.
2. Ping Claude Code with the path for trim, voice, loudnorm (I=-14, TP=-1.5), captions and next-episode text.
3. Final: `docs/media/studio-series/ep-3-kuya-sulat/ep-3-final.mp4` after Jeff approves. Nothing is posted or scheduled.
