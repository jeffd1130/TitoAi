# Ep 4/7 — Flow prompts (Ate Disenyo, content creator)

**Target:** 4 shots × 8s = 32s, trimmed to ≈26s. Silent clips.
**Characters:** Tito AI chibi (left) + Ate Disenyo (right, palette).

## Flow settings
Flow → **Frames** mode · Veo 3.1 Lite · 9:16 · x1 · **"Return silent videos" ON**. Gemini Videos only after the day's Flow credits run out.

## Start frame
- Duo image of Tito + Ate Disenyo in front of a studio wall with five blank slide cards. Build it with the start-frame prompt in `../character-sheets.md`. Save as `docs/assets/avatars/studio-team/start-ep4.png`.
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
Ate Disenyo stands beside a wall of five blank slide cards, holding her paint palette and brush; Tito stands next to her, looks at the cards, then smiles at the camera. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Ate Disenyo keeps exactly the look of the start frame (chin-length bob, coral headband, coral smock, palette and brush). Cards show only blank colored shapes, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot B — extend A
```
She touches each blank card gently with her brush and each one glows softly in turn, as if filling with color. Tito watches and nods. Gentle camera push-in. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Ate Disenyo keeps exactly the look of the start frame (chin-length bob, coral headband, coral smock, palette and brush). Cards show only blank colored shapes, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot C — extend B
```
Two cards slide away and two slide in again, and the wall settles back to five cards. Ate Disenyo then attaches a small blank tag to one card; Tito points at the tag and nods. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Ate Disenyo keeps exactly the look of the start frame (chin-length bob, coral headband, coral smock, palette and brush). The tag and cards stay blank, no readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot D — extend C
```
Ate Disenyo gives a cheerful wave with her brush hand while holding the palette in the other; Tito waves at the camera too. The five cards glow softly behind them. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Ate Disenyo keeps exactly the look of the start frame (chin-length bob, coral headband, coral smock, palette and brush). No readable text anywhere. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

## Acceptance checklist (after every clip)
- [ ] Soft painterly 2D, same room and style as the start frame; no 3D-toy look
- [ ] Tito: clean-shaven, white crew-neck tee, jeans, white sneakers, black watch (left wrist), bead bracelet
- [ ] Ate Disenyo matches her reference (bob, coral headband, smock); no style drift or facial hair on either character
- [ ] Smooth rounded elbows; **scrub every arm movement** (brush touches, tagging a card, waving)
- [ ] Palette and brush stay in her hands; five fingers each, nothing melted
- [ ] Cards and tag show only blank shapes; no readable text
- [ ] No captions, voice, music, sound, logos or real brands; no extra people

Reject on any miss; note the last good timestamp if only the end drifts.

## Save path and handoff
1. Download as `docs/media/studio-series/ep-4-ate-disenyo/ep-4-flow-raw.mp4`.
2. Ping Claude Code with the path for trim, voice, loudnorm (I=-14, TP=-1.5), captions and next-episode text.
3. Final: `docs/media/studio-series/ep-4-ate-disenyo/ep-4-final.mp4` after Jeff approves. Nothing is posted or scheduled.
