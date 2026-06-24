# Tito AI — Social Media Content System

Weekly content production for **@TitoAIPH** — a Filipino AI education channel by Jeff de las Armas.

> *"AI Para Sa Ating Lahat" — Kumusta mga Pamangkin!*

## What this repo does

Automates the D-3 → D-0 content production workflow:
1. Jeff drops video/photo assets into `content/<week>/<slot>/raw/`
2. Jeff runs the production skills → Canva cover graphics + Taglish captions + approval page
3. Jeff reviews at the GitHub Pages approval site
4. Jeff publishes to TikTok, Facebook, and Instagram Reels

## Approval site

**`https://jeffd1130.github.io/TitoAi/`**

## Weekly schedule

| Day (PHT) | Content | Drop Time |
|-----------|---------|-----------|
| Monday | AI Tip Reel | 8:00 PM PHT |
| Wednesday | Demo / Tutorial | 7:00 PM PHT |
| Friday | Story / Inspiration | 7:00 PM PHT |

## Directory structure

```
brand/           ← Brand reference: colors, fonts, logos, captions
content/         ← Weekly production folders (YYYY-W##)
docs/            ← GitHub Pages approval site
files/           ← Platform profile images (v1)
files2/          ← Brand assets: logos, cover, manifesto, scripts
Videos/          ← Local media source
  Intro/         ← Launch video assets
```

## Open this project

```bash
cd ~/Documents/Claude/TItoAi && claude
```

Then say: **"produce this week"** or **"weekly status"**

---

*Tito AI · @TitoAIPH · San Jose, CA · AI Para Sa Ating Lahat*
