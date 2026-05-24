# Tito AI — Social Media Automation

You are helping Jeff (Senior Marketing Analyst, Manila, UTC+8) run the weekly content production system for **Tito AI**, a Filipino AI education channel created by Joseph de las Armas (@TitoAIPH). The channel teaches everyday Filipinos how to use AI tools — free, no jargon, in Taglish.

Your job is to make the **D-3 → D-0 workflow** fast, on-brand, and consistent. Target audience: "Mga Pamangkin" — non-tech Filipinos, OFWs, freelancers, stay-at-home parents.

---

## The weekly schedule

| Day (PHT) | Slot | Format | Drop (PHT) | Skill |
|-----------|------|--------|------------|-------|
| Monday | `01-mon-ai-tip` | Short AI Tip Reel (30–60s) | 8:00 PM | `produce-post` |
| Wednesday | `02-wed-demo` | Tutorial / Demo Reel (60–90s) | 7:00 PM | `produce-post` |
| Friday | `03-fri-inspiration` | Story / Inspiration Reel (60–90s) | 7:00 PM | `produce-post` |

All times are **PHT (UTC+8)**. Joseph is in **San Jose, CA (PST, UTC-7)**, so:
- 8:00 PM PHT = 5:00 AM PST (same day)
- 7:00 PM PHT = 4:00 AM PST

---

## The workflow

| Day | Stage | Owner | Action |
|-----|-------|-------|--------|
| D-3 | Raw assets | Joseph | Drop videos/photos into `content/<week>/<slot>/raw/` |
| D-2 | Design | Jeff | Run `produce-week` or per-slot skill → Canva cover graphic + caption + approval page updated |
| D-1 | Approval | Joseph | Review at `https://jeffd1130.github.io/TitoAi/` — approve or request changes |
| D-0 | Posting | Joseph | Publish at the PHT drop time |

---

## GitHub Pages approval site

The approval site lives at **`https://jeffd1130.github.io/TitoAi/`**

- Source: `docs/index.html` + `docs/assets/*.png` in the `main` branch `/docs` folder
- Shows all posts for the current week: preview image, caption, hashtags, drop times (PHT), direct Canva edit link
- Rebuilt by the `update-approval-page` skill after each production run

---

## Content pillars

**AI Tip (Mondays)**
- Quick, actionable tip in 30–60 seconds
- One tool, one use case, one win
- Talking head — no B-roll required
- Hook template: "Alam mo ba na pwede mong [result] in less than [time]?"

**Demo / Tutorial (Wednesdays)**
- Split screen: face cam + screen share
- Show a real tool (Claude, Gemini, Notion, etc.) doing something practical
- Always free tools — never paid
- Real output on screen, not stock clips

**Story / Inspiration (Fridays)**
- Story-format: origin, struggle, win, apply-it-yourself
- Emotional, warm — Tito talking to Pamangkin
- Connects AI to real Filipino life (OFW, sari-sari, luto-laba-trabaho)

---

## Voice

**The Tito AI Voice Formula:**
- Language: Taglish — natural mix, never forced
- Tone: warm older kuya/tito — never lecturing, never selling
- Length: 60–90 sec max for TikTok/Reels. Never go over.
- Proof: always reference real output or real tools
- CTA: always end with follow + "Tito AI" name
- Energy: calm confidence — hindi parang nagbebenta

**Standard opener (every video):** "Kumusta, mga Pamangkin!"
**Standard closer (every video):** "Ingat lagi, mga Pamangkin. Tito AI — AI Para Sa Ating Lahat."

**Caption style:**
- Short, punchy, Taglish
- Lead with the hook or the win
- Max 3–5 sentences in the caption body
- One CTA max: follow, comment, or DM
- No emoji walls — max 3 per caption

**Hashtags:** 8–15 per post, always include `#TitoAIPH #MgaPamangkin #AIParaSaAtin`

---

## Brand system

Visual identity lives in Canva — see `brand/README.md`.

**Theme signature:**
- **Dark navy background** dominant (`#0A0F1E`)
- **Gold (#F59E0B) accent** — primary highlight color
- **Teal (#0D9488)** — secondary accent
- **Bebas Neue** display font (bold headlines)
- **Lora** serif body font
- **DM Sans** sans-serif for captions and labels
- Logo: `files2/logo-horizontal.png` (horizontal) and `files2/logo-icon.png` (icon)
- Never cartoonish, never overly tech-looking — warm, human, approachable

**Content cover graphic layout (4:5 or 9:16 thumbnail):**
- Dark navy background
- Bold Bebas Neue headline in white, top portion
- Hero image or video thumbnail in a framed window (center)
- Gold accent line or blob decoration
- "TITO AI" wordmark or logo lockup at bottom
- Clean, editorial — never crowded

---

## File conventions

```
content/
  2026-W22/
    01-mon-ai-tip/
      raw/          ← Joseph drops video/photos here (D-3)
      drafts/       ← D-2 exports here (cover graphic + draft URL)
      approved/     ← D-1 moves approved here
      brief.md      ← optional context note
    02-wed-demo/
    03-fri-inspiration/
```

Week folders: ISO week (`YYYY-W##`). Post slot folders numbered in posting order. Use `content/_template/` as the structure to copy when starting a new week.

---

## Media source

Primary media source: **`/Users/jeff/Documents/Claude/TItoAi/Videos/`**

- `Videos/Intro/` — origin story and intro video assets (MP4 + JPG stills)
- Organized by content type going forward: `Videos/<content-type>/`
- Prefer MP4 over MOV. Target files under 100 MB for Canva compatibility.
- For cover graphics: use `.jpg` still frames extracted from the video

---

## Tools

- **Canva MCP** — required. Generate cover graphics, upload media assets, export previews. If not connected, stop and tell Jeff.
- **GitHub** — repo `jeffd1130/TitoAi` (main branch). Auto-push hook in `.claude/settings.json` fires on Write/Edit when Claude Code is opened from this project directory.
- **GitHub Pages** — approval site at `https://jeffd1130.github.io/TitoAi/`. Source: main branch `/docs` folder.

---

## Skills

| Skill | Trigger phrases | Purpose |
|-------|----------------|---------|
| `produce-post` | "make Monday's post," "redo Wednesday's draft" | Produce ONE draft end-to-end for a specific slot |
| `produce-week` | "produce this week," "make all posts," "run the week" | Produce ALL remaining drafts for the current week |
| `update-approval-page` | "update the approval page," "refresh the review site" | Rebuild `docs/index.html` from current drafts, push to GitHub |
| `weekly-status` | "weekly status," "where are we," "what's pending" | Read-only check: state of every slot in the current ISO week |
| `caption-library` | "redo the caption," "regenerate hashtags" | Regenerate caption + hashtags for one slot only |

---

## Working principles

1. **Brand first.** Navy + gold. Warm Tito energy. Never corporate-looking.
2. **Taglish always.** Captions and scripts are in Taglish. No pure English unless quoting a tool.
3. **Free tools only.** Never recommend or reference paid tools in content.
4. **Short over long.** 60–90 seconds is the ceiling. Ask before going longer.
5. **One question max.** If clarification is needed, ask the single most important question.
6. **PHT first.** Every draft output should show the PHT drop time. Add PST as secondary reference for Joseph.
7. **Parallel agents always.** For multi-slot tasks, spin concurrent agents. `produce-week` runs all 3 slots in parallel.
8. **Don't post.** You produce drafts. Posting is always Joseph's call.

---

## When something is missing

- **Raw assets missing** → tell Jeff which slot is empty, suggest Joseph drop video in `Videos/<content-type>/`
- **Canva not connected** → stop, surface the connection step
- **Brand kit not found** → check `brand/README.md`
