# Ep 6/7 — Flow prompts (Lola Suri, QA)

**Target:** 4 shots × 8s = 32s, trimmed to ≈27s. Silent clips.
**Characters:** Tito AI chibi (left) + Lola Suri (right, checklist clipboard, no pen).

## Flow settings
Flow → **Frames** mode · Veo 3.1 Lite · 9:16 · x1 · **"Return silent videos" ON**. Gemini Videos only after the day's Flow credits run out.

## Start frame
- Duo image of Tito + Lola Suri at a reading table with a stack of blank papers and three small blank flags (green, yellow, red). Build it with the start-frame prompt in `../character-sheets.md`. Save as `docs/assets/avatars/studio-team/start-ep6.png`.
- Check hands, elbows, facial hair and 3D-toy look before spending credits. She must hold **no pen**, since she's read-only.

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
Lola Suri stands holding her clipboard, hands visible and no pen anywhere, and looks kindly at the camera; Tito stands beside her. A stack of blank papers sits on the table. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Lola Suri keeps exactly the look of the start frame (silver bun, large square glasses, navy cardigan with marigold brooch, clipboard). Papers and clipboard show only blank lines and checkmarks, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot B — extend A
```
Lola Suri reads down the stack of blank papers with her eyes only, without touching them. Three small blank flags (green, yellow, red) pop up softly on her clipboard, one after another. Gentle camera push-in. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Lola Suri keeps exactly the look of the start frame (silver bun, large square glasses, navy cardigan with marigold brooch, clipboard, no pen). Papers and flags show no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot C — extend B
```
Lola Suri raises the red flag and shakes her head gently, "not this one." Then checkmarks appear one by one down her clipboard as she nods. Tito watches closely. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Lola Suri keeps exactly the look of the start frame (silver bun, large square glasses, navy cardigan with marigold brooch, clipboard, no pen). Clipboard shows only blank lines and checkmarks, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot D — extend C
```
Lola Suri hands the clipboard to Tito with both hands. Tito takes it, nods, and gives a thumbs up; both smile and wave at the camera. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Lola Suri keeps exactly the look of the start frame (silver bun, large square glasses, navy cardigan with marigold brooch, no pen). No readable text anywhere. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

## Acceptance checklist (after every clip)
- [ ] Soft painterly 2D, same room and style as the start frame; no 3D-toy look
- [ ] Tito: clean-shaven, white crew-neck tee, jeans, white sneakers, black watch (left wrist), bead bracelet
- [ ] Lola Suri matches her reference (silver bun, square glasses, cardigan, brooch); no pen appears; no facial hair or style drift on either character
- [ ] Smooth rounded elbows; **scrub every arm movement** (raising the flag, handing over the clipboard, thumbs up)
- [ ] Five fingers each, nothing melted; clipboard stays in frame
- [ ] Papers, flags and clipboard show only blank lines, ticks and shapes; no readable text
- [ ] No captions, voice, music, sound, logos or real brands; no extra people

Reject on any miss; note the last good timestamp if only the end drifts.

## Save path and handoff
1. Download as `docs/media/studio-series/ep-6-lola-suri/ep-6-flow-raw.mp4`.
2. Ping Claude Code with the path for trim, voice, loudnorm (I=-14, TP=-1.5), captions and next-episode text.
3. Final: `docs/media/studio-series/ep-6-lola-suri/ep-6-final.mp4` after Jeff approves. Nothing is posted or scheduled.
