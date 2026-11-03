# Tito AI carousel spec (`carousel.json`)

Tito AI Studio renders this file into branded 1080×1350 PNG slides: the pilot palette, the approved chibi, the logo and page dots. Use it whenever a post is a carousel, or as the **fallback when video can't be made** (no Flow/Gemini credits).

Save it as `content/<YYYY-W##>/<slot>/drafts/carousel.json`. Write the captions next to it in `drafts/captions.md`, using sections `## TikTok`, `## Instagram`, `## Facebook` and `## Seed comment`.

```json
{
  "title": "W46 Mon · Short title for the approval list",
  "series": "W46 · Monday 8:00 PM PHT",
  "captions": "content/2026-W46/01-mon-ai-tip/drafts/captions.md",
  "slides": [
    {
      "bg": "cream",
      "kicker": "TITO AI TIP",
      "headline": "Main line, short",
      "highlight": "Second line in color",
      "body": "One or two short Taglish sentences.",
      "chibi": "wave",
      "label": "Fictional practice example"
    },
    { "bg": "marigold", "headline": "The problem", "body": "…", "chibi": "surprised" },
    { "bg": "cream", "headline": "Copy this prompt", "prompt": "Exact prompt text the viewer can copy…", "chibi": "teach" },
    { "bg": "cream", "headline": "What you get", "list": ["Point one", "Point two", "Point three"], "chibi": "none" },
    { "bg": "marigold", "headline": "Save mo ito", "body": "…", "cta": "I-save para sa susunod", "chibi": "wave" }
  ]
}
```

## Fields per slide
- `bg`: `cream` (default), `marigold` or `navy`.
- `kicker`: small label at the top (optional).
- `headline`: the main line. Keep it to 6–8 words; it's set big and in capitals.
- `highlight`: an optional second headline line in an accent color.
- `body`: 1–2 short sentences.
- `list`: up to 4 short points, shown with numbered badges. Don't number the text yourself.
- `prompt`: a prompt shown in a white "copy this" card. It must be exactly the prompt from the script.
- `cta`: one call-to-action button (use it on the last slide only).
- `chibi`: `wave`, `teach`, `surprised`, `wave-screen` or `none`. Vary the pose per slide.
- `label`: a small tag such as "Fictional practice example" or "Illustration". It's required whenever a scenario is fictional.

## Rules
- Use 3–7 slides (5 is standard): hook → problem → prompt → result → CTA.
- Write in Taglish, free tools only, and never invent results. If the AI output hasn't been tested, say so or leave it out.
- One CTA per post, and five hashtags per platform in `captions.md`.
