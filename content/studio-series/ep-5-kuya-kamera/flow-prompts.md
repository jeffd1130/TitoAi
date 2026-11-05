# Ep 5/7 — Flow prompts (Kuya Kamera, video render)

**Target:** 4 shots × 8s = 32s, trimmed to ≈27s. Silent clips.
**Characters:** Tito AI chibi (left) + Kuya Kamera (right, blank clapperboard).

## Flow settings
Flow → **Frames** mode · Veo 3.1 Lite · 9:16 · x1 · **"Return silent videos" ON**. Gemini Videos only after the day's Flow credits run out.

## Start frame
- Duo image of Tito + Kuya Kamera in a small video corner with an empty film-strip slot and a level meter made of blank colored bars. Build it with the start-frame prompt in `../character-sheets.md`. Save as `docs/assets/avatars/studio-team/start-ep5.png`.
- Check hands, elbows, facial hair and 3D-toy look before spending credits. The clapperboard must be blank.

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
Kuya Kamera holds his blank clapperboard and grins while Tito stands beside him; an empty film-strip slot glows softly next to them. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Kuya Kamera keeps exactly the look of the start frame (navy cap, teal hoodie, blank clapperboard, no facial hair). The clapperboard and screens show no writing or readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot B — extend A
```
Kuya Kamera snaps the clapperboard shut; a short film clip, shown as a soft glowing frame, drops into the empty slot. A bar meter of colored bars next to it rises and settles to an even level. Gentle camera push-in. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Kuya Kamera keeps exactly the look of the start frame (navy cap, teal hoodie, blank clapperboard, no facial hair). The clapperboard, clip frame and meter show no writing or readable text. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot C — extend B
```
The film-strip slot empties again. Kuya Kamera gently shakes his head at the empty slot; Tito shrugs with a small smile, then lifts a glowing film clip in both hands, as if he made it himself. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Kuya Kamera keeps exactly the look of the start frame (navy cap, teal hoodie, blank clapperboard, no facial hair). No writing or readable text anywhere. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

### Shot D — extend C
```
Tito holds the clip up and studies it closely; Kuya Kamera gives a thumbs up with his free hand, and both wave at the camera. Keep the EXACT same soft, painterly 2D-illustrated Tito AI chibi and the same style, colors and room as the start frame: smooth, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. Tito is completely clean-shaven, in a plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist and bead bracelet. Kuya Kamera keeps exactly the look of the start frame (navy cap, teal hoodie, blank clapperboard, no facial hair). No writing or readable text anywhere. No captions, voice, dialogue, music or sound. No logos or real brands. No extra people.
```

## Acceptance checklist (after every clip)
- [ ] Soft painterly 2D, same room and style as the start frame; no 3D-toy look
- [ ] Tito: clean-shaven, white crew-neck tee, jeans, white sneakers, black watch (left wrist), bead bracelet
- [ ] Kuya Kamera matches his reference (cap, hoodie, no facial hair); no style drift on either character
- [ ] Smooth rounded elbows; **scrub every arm movement** (clapper snap, lifting the clip, thumbs up)
- [ ] Clapperboard stays blank; five fingers each, nothing melted
- [ ] Clip frame and meter show only blank shapes; no readable text
- [ ] No captions, voice, music, sound, logos or real brands; no extra people

Reject on any miss; note the last good timestamp if only the end drifts.

## Save path and handoff
1. Download as `docs/media/studio-series/ep-5-kuya-kamera/ep-5-flow-raw.mp4`.
2. Ping Claude Code with the path for trim, voice, loudnorm (I=-14, TP=-1.5), captions and next-episode text.
3. Final: `docs/media/studio-series/ep-5-kuya-kamera/ep-5-final.mp4` after Jeff approves. Nothing is posted or scheduled.
