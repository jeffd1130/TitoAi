# Ep 5/7 — Kuya Kamera, ang Video Render

**Series:** Ang Team ni Tito AI · **Length:** ≈27s spoken · **Words:** 69 · **Growth job:** FOLLOW
**Voice:** Jeff (or a voice Jeff approves). Timing at ≈2.55 words/s; re-time captions to the real take.
**Drop:** TBD. Nothing is scheduled.

## Voiceover (exact)

> Walang clip, walang render.
> Kumusta, mga Pamangkin!
> Si Kuya Kamera ang video renderer.
> Binubuo niya ang clip at audio sa Remotion.
> Sa bawat video, pareho ang lakas ng audio na pinupuntirya niya.
> Pero hindi siya gumagawa ng clip. Ako ang gumagawa nito sa Flow, mano-mano.
> Kaya kapag wala pang clip, hindi siya makakapag-render.
> May frame strip para i-check ko ang chibi.
> Follow ka sa Tito AI.
> Susunod: si Lola Suri.

## Timed script

| Time | Voice | On-screen caption | Visual |
|---|---|---|---|
| 0:00–0:01.6 | Walang clip, walang render. (hook) | WALANG CLIP, WALANG RENDER | A: Kuya Kamera holds his blank clapperboard; an empty film-strip slot glows beside him; Tito next to him |
| 0:01.6–0:02.7 | Kumusta, mga Pamangkin! | Kumusta, mga Pamangkin! | A |
| 0:02.7–0:05.1 | Si Kuya Kamera ang video renderer. | Ep 5/7 · Kuya Kamera · Video Render | A |
| 0:05.1–0:07.8 | Binubuo niya ang clip at audio sa Remotion. | Binubuo ang clip at audio sa Remotion | B: he snaps the clapperboard; a clip drops into the slot |
| 0:07.8–0:12.2 | Pareho ang lakas ng audio… | Pantay na lakas ng audio sa bawat video | B: a bar-meter of colored bars levels out |
| 0:12.2–0:17.3 | Pero hindi siya gumagawa ng clip… mano-mano. | Hindi siya gumagawa ng clip. Si Jeff, mano-mano sa Flow | C: slot empties; Tito shrugs, then lifts a film clip in his hands |
| 0:17.3–0:20.4 | Kaya kapag wala pang clip… | Walang clip = walang render | C: Kuya Kamera shakes his head gently at the empty slot |
| 0:20.4–0:23.5 | May frame strip para i-check ko ang chibi. | Frame strip: i-check ang chibi | D: Tito holds the clip up and studies it; Kuya Kamera gives a thumbs up |
| 0:23.5–0:25.5 | Follow ka sa Tito AI. | Follow ka sa Tito AI | D |
| 0:25.5–0:27.1 | Susunod: si Lola Suri. | Susunod: Lola Suri | D, small "Illustration" tag |

## What's true here (source)
- `video-producer`: renders a Remotion composition and levels the audio (ffmpeg loudnorm, -14 LUFS). Source: `studio/server.js` agent list, `studio/README.md`.
- Video tab has a Frame strip "to check that the chibi matches before approving." Source: README.
- Video generation is manual; Flow/Gemini have no free API; Parts 3–5 render only after the clip is saved in `w44-friday-motion-sample/public/`. Source: README.

## Can't do yet
- **He can't generate Flow or Gemini clips; Jeff makes those by hand.** He only renders compositions that already exist, and **no Remotion composition exists for this series yet** (see the series-plan decision).

## Notes for Jeff
- "Frame strip" is a Studio Video-tab tool, not part of Kuya Kamera's agent definition. The script says "may frame strip" (the Studio has one), not that he does it.
- If you don't want to name "Remotion" for a general audience, swap to "sa Studio."
