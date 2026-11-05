# Ep 2/7 — Flow prompts (Tita Saliksik, researcher)

**Target:** 4 shots × 8s = 32s, trimmed to ≈28s. Silent clips.
**Characters:** Tito AI chibi (left) + Tita Saliksik (right, magnifier). Both must match their approved reference images.

## Flow settings
Flow → **Frames** mode · Veo 3.1 Lite · 9:16 · x1 · **"Return silent videos" ON**. Gemini Videos only after the day's Flow credits run out.

## Start frame
- Duo image of Tito + Tita Saliksik at a wall calendar of blank squares with paper stacks on the desk. Build it with the start-frame prompt in `../character-sheets.md` from the two approved references. Save as `docs/assets/avatars/studio-team/start-ep2.png`.
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
Tita Saliksik studies a wall calendar of blank squares through her magnifying glass while Tito stands beside her, curious, and then looks at the camera. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Tita Saliksik keeps exactly the look of the start frame (round glasses, low bun, teal cardigan, magnifying glass). The calendar shows only blank squares, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot B — extend A
```
Tita Saliksik places small blank colored cards into the calendar squares, one by one, while Tito watches and nods. Gentle camera push-in. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Tita Saliksik keeps exactly the look of the start frame (round glasses, low bun, teal cardigan, magnifying glass). The calendar shows only blank squares, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot C — extend B
```
Tita Saliksik flips through a stack of blank papers on the desk, then holds one sheet up beside her magnifying glass. Tito leans in and nods. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Tita Saliksik keeps exactly the look of the start frame (round glasses, low bun, teal cardigan, magnifying glass). Papers show only blank lines, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot D — extend C
```
Tita Saliksik folds the sheet and hands it to Tito, who takes it with both hands. They both smile and wave at the camera. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Tita Saliksik keeps exactly the look of the start frame (round glasses, low bun, teal cardigan, magnifying glass). No readable text anywhere. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

## Acceptance checklist (after every clip)
- [ ] Soft painterly 2D, same room and style as the start frame; no 3D-toy look
- [ ] Tito: clean-shaven, white crew-neck tee, jeans, white sneakers, black watch (left wrist), bead bracelet
- [ ] Tita Saliksik matches her reference (glasses, low bun, teal cardigan); no stubble or style drift on either character
- [ ] Smooth rounded elbows; **scrub every arm movement** (placing cards, flipping papers, handing the sheet)
- [ ] Magnifier stays in her hand; hands have five fingers, nothing melted
- [ ] Calendar and papers show only blank shapes; no readable text
- [ ] No captions, voice, music, sound, logos or real brands; no extra people

Reject on any miss; note the last good timestamp if only the end drifts.

## Save path and handoff
1. Download as `docs/media/studio-series/ep-2-tita-saliksik/ep-2-flow-raw.mp4`.
2. Ping Claude Code with the path for trim, voice, loudnorm (I=-14, TP=-1.5), captions and next-episode text.
3. Final: `docs/media/studio-series/ep-2-tita-saliksik/ep-2-final.mp4` after Jeff approves. Nothing is posted or scheduled.
