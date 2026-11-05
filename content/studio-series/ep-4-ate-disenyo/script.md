# Ep 4/7 — Ate Disenyo, ang Content Creator

**Series:** Ang Team ni Tito AI · **Length:** ≈26s spoken · **Words:** 67 · **Growth job:** FOLLOW
**Voice:** Jeff (or a voice Jeff approves). Timing at ≈2.55 words/s; re-time captions to the real take.
**Drop:** TBD. Nothing is scheduled.

## Voiceover (exact)

> Isang file, limang slides.
> Kumusta, mga Pamangkin!
> Si Ate Disenyo ang taga-design.
> Ginagawa niyang carousel file ang script: headline, body, at kung aling chibi pose ang gagamitin.
> Ang Studio ang nagre-render ng slides.
> Tatlo hanggang pitong slide ang puwede, lima ang karaniwan.
> May rule: kapag gawa-gawa lang ang halimbawa, kailangan ng label.
> Halimbawa ng label: "Fictional practice example."
> Follow ka sa Tito AI.
> Susunod: si Kuya Kamera.

## Timed script

| Time | Voice | On-screen caption | Visual |
|---|---|---|---|
| 0:00–0:01.6 | Isang file, limang slides. (hook) | ISANG FILE, LIMANG SLIDES | A: Ate Disenyo with her palette beside a wall of five blank slide cards; Tito next to her |
| 0:01.6–0:02.7 | Kumusta, mga Pamangkin! | Kumusta, mga Pamangkin! | A |
| 0:02.7–0:04.7 | Si Ate Disenyo ang taga-design. | Ep 4/7 · Ate Disenyo · Content Creator | A |
| 0:04.7–0:10.6 | Ginagawa niyang carousel file ang script… | Script → carousel file: headline, body, chibi pose | B: she touches each blank card with her brush |
| 0:10.6–0:12.9 | Ang Studio ang nagre-render ng slides. | Ang Studio ang nagre-render | B: the cards glow softly |
| 0:12.9–0:16.5 | Tatlo hanggang pitong slide ang puwede, lima ang karaniwan. | 3–7 slides · 5 ang karaniwan | C: cards add and remove to show a range, settling at five |
| 0:16.5–0:22.7 | May rule… Halimbawa ng label: "Fictional practice example." | Gawa-gawa? Lagyan ng label: "Fictional practice example" | C: a small blank tag attaches to a card; Tito points |
| 0:22.7–0:24.7 | Follow ka sa Tito AI. | Follow ka sa Tito AI | D: both wave |
| 0:24.7–0:26.3 | Susunod: si Kuya Kamera. | Susunod: Kuya Kamera | D, small "Illustration" tag |

## What's true here (source)
- Carousel route: `carousel.json` per `studio/carousel-schema.md`: 3–7 slides (5 standard), fields include `headline`, `body`, `chibi`, `label`. Studio renders 1080×1350 PNGs with chibi, logo and page dots. `label` is required whenever a scenario is fictional; the schema's example label is "Fictional practice example."
- The other part of her job (`tito-content-creator`): writes a ChatGPT-ready slide pack. The video covers only the carousel route.

## Can't do yet
- She doesn't call ChatGPT; Jeff generates the slide-pack images himself. Chibi poses are limited to `wave`, `teach`, `surprised`, `wave-screen`, `none`. She can't capture real AI output screenshots.

## Notes for Jeff
- I did not claim that every slide shows the "Fictional practice example" label. Only the rule and the schema's example label are stated.
- "Ate Disenyo" is two roles in the repo (the writer and the render step). The video covers the carousel route only.
