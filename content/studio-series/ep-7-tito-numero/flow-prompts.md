# Ep 7/7 — Flow prompts (Tito Numero, analyst)

**Target:** 4 shots × 8s = 32s, trimmed to ≈28s. Silent clips.
**Characters:** Tito AI chibi (left) + Tito Numero (right, chart).

## Flow settings
Flow → **Frames** mode · Veo 3.1 Lite · 9:16 · x1 · **"Return silent videos" ON**. Gemini Videos only after the day's Flow credits run out.

## Start frame
- Duo image of Tito + Tito Numero beside a board with a blank bar chart and a calendar of seven blank squares. Build it with the start-frame prompt in `../character-sheets.md`. Save as `docs/assets/avatars/studio-team/start-ep7.png`.
- Check hands, elbows, facial hair and 3D-toy look before spending credits. No numbers or letters on the chart.

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
Tito Numero stands beside a board with a blank bar chart, a small rolled chart in one hand, and smiles calmly; Tito stands next to him and looks at the board, then at the camera. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Tito Numero keeps exactly the look of the start frame (salt-and-pepper hair, rectangular glasses, navy vest, teal tie, no facial hair). The chart and calendar show only blank shapes, no numbers or readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot B — extend A
```
Tito Numero points at the board and colored bars grow upward on the chart, one by one. Gentle camera push-in. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Tito Numero keeps exactly the look of the start frame (salt-and-pepper hair, rectangular glasses, navy vest, teal tie, no facial hair). The chart and calendar show only blank shapes, no numbers or readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot C — extend B
```
The last few squares of the seven-square calendar fade softly; Tito Numero shakes his head gently, "need fresher data." A small rocket shape rests on the board and Tito Numero lays a calm open hand over it like a pause sign. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Tito Numero keeps exactly the look of the start frame (salt-and-pepper hair, rectangular glasses, navy vest, teal tie, no facial hair). The rocket and calendar show no numbers or readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot D — extend C
```
Tito Numero hands the rolled chart to Tito, who takes it, nods, and gives a thumbs up. Both smile and wave at the camera. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Tito Numero keeps exactly the look of the start frame (salt-and-pepper hair, rectangular glasses, navy vest, teal tie, no facial hair). No numbers or readable text anywhere. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

## Acceptance checklist (after every clip)
- [ ] Soft painterly 2D, same room and style as the start frame; no 3D-toy look
- [ ] Tito: clean-shaven, white crew-neck tee, jeans, white sneakers, black watch (left wrist), bead bracelet
- [ ] Tito Numero matches his reference (glasses, vest, tie); no facial hair or style drift on either character
- [ ] Smooth rounded elbows; **scrub every arm movement** (pointing, hand over the rocket, handing over the chart, thumbs up)
- [ ] Five fingers each, nothing melted
- [ ] Chart, calendar and rocket show only blank shapes; no numbers or readable text
- [ ] No captions, voice, music, sound, logos or real brands; no extra people

Reject on any miss; note the last good timestamp if only the end drifts.

## Save path and handoff
1. Download as `docs/media/studio-series/ep-7-tito-numero/ep-7-flow-raw.mp4`.
2. Ping Claude Code with the path for trim, voice, loudnorm (I=-14, TP=-1.5), captions and the finale line.
3. Final: `docs/media/studio-series/ep-7-tito-numero/ep-7-final.mp4` after Jeff approves. Nothing is posted or scheduled.
