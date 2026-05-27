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
| D-3 | Raw assets | Tito AI | Drop videos/photos into `content/<week>/<slot>/raw/` |
| D-2 | Design | Jeff | Run `produce-week` or per-slot skill → Canva video design + caption generated |
| D-1 | Approval | Tito AI | Review via **Canva edit link sent by Telegram** — approve or request changes |
| D-0 | Posting | Tito AI | Publish at the PHT drop time |

Approval is done directly in Canva. After each production run, send the Canva edit URL to chat ID `8325608814` via `@titoaiph_bot`.

---

## GitHub Pages hub

The channel hub lives at **`https://jeffd1130.github.io/TitoAi/`**

- Source: `docs/index.html` + `docs/assets/*.png` in the `main` branch `/docs` folder
- **Not just approval** — full hub with: About / This Week spotlight / June 2026 content calendar / Approval links
- Sections: About (Joseph + pillars + voice + brand), Current Week, June Calendar (W23–W27), Approval
- Rebuilt manually or via `update-approval-page` skill after each production run

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

- `Videos/Intro/Intro_raw/` — 25 MP4 clips for the origin story (all uploaded to Canva library)
- Organized by content type going forward: `Videos/<content-type>/`
- Prefer MP4 over MOV. Target files under 100 MB for Canva compatibility.
- For cover graphics: use `.jpg` still frames extracted from the video
- Local files have no public URL — use catbox.moe to get a public URL before uploading to Canva: `curl -F "reqtype=fileupload" -F "fileToUpload=@file.mp4" https://catbox.moe/user/api.php`

---

## Tools

- **Canva MCP** — required. Generate cover graphics, upload media assets, export previews. If not connected, stop and tell Jeff.
- **GitHub** — repo `jeffd1130/TitoAi` (main branch). Auto-push hook in `.claude/settings.json` fires on Write/Edit when Claude Code is opened from this project directory.
- **GitHub Pages** — approval site at `https://jeffd1130.github.io/TitoAi/`. Source: main branch `/docs` folder.
- **Telegram bot** — `@titoaiph_bot` (bot ID: 8960239761). Token: `8960239761:AAFKehuxbPQTkB81CnGY3QtSf1JMFUe2qIg`. Jeff's chat ID: `8325608814` (@JeffD331). Use `parse_mode=HTML` always (never Markdown — URL underscores break). Send approval notifications to chat ID `8325608814`.

## Video production

**Multi-scene video assembly process (Canva MCP):**
1. Create or identify a base 1-page design with logo placed
2. `copy-design` once per scene — copies share the same element IDs as the source
3. `start-editing-transaction` → `perform-editing-operations` (`update_fill`) → `commit-editing-transaction` on each copy to swap the video clip
4. `merge-designs` to combine into one multi-page design — **one operation per call only** (API limitation); append scenes sequentially using `modify_existing_design`
5. Send final edit URL via Telegram

**Canva limitations:**
- `merge-designs` supports only 1 operation per API call — loop it for multiple scenes
- No `add_page` operation in `perform-editing-operations` — must use `merge-designs` to add pages
- Video clip timing/duration must be set manually in Canva UI after assembly

## Intro video assets (Origin Story — Video 1)

**Finished export:** `Finished/Tito Ai Intro.mp4` (255MB · 6-scene · 1080×1920 · ready to post)
**Post design (approval draft):** `DAHKj9hQPYw` — edit: `https://www.canva.com/d/ldOIk0NrlQiKFWq`
**Drop:** Friday May 29, 2026 · 7:00 PM PHT · **Status: Draft — pending Joseph approval**
**Captions:** Platform-specific captions written (TikTok/IG/FB) — see session history or regenerate via `caption-library`

**Merged 6-scene assembly:** `DAHKkLR22UY` — edit: `https://www.canva.com/d/RE4msPrzxaRZycB`
**Base design (Cisco/SV shot):** `DAHKkEMsz4Q`

**Canva clip asset IDs (all 1080×1920 portrait clips — best for TikTok):**
| Asset ID | File | Duration |
|----------|------|----------|
| VAHKkEhGlWg | 20260523_154923 | 22s |
| VAHKkJsIpeQ | 20260523_155118 | 27s |
| VAHKkDoPRn8 | 20260523_160038 | 6s (Cisco building) |
| VAHKkEQX24I | 20260523_160003 | 27s |
| VAHKkDL0DPM | 20260523_160309 | 44s |
| VAHKkL8wtNw | 20260523_160430 | 42s |
| VAHKkCoOz4U | 20260523_160843 | 34s |
| VAHKkIdIItE | 20260523_160953 | 13s |
| VAHKkCuHXAM | 20260523_161216 | 62s |
| VAHKkCKBcb0 | 20260523_161444 | 18s |
| VAHKkDKjLBM | 20260523_183134 | 20s |
| VAHKkPX4kwE | 20260523_183236 | 32s |
| VAHKkLX9OtI | 20260523_183311 | 27s |

Full 25-clip asset map (including 720×1280 and landscape) in `content/2026-W21/03-fri-inspiration/drafts/draft.md`.

---

## June 2026 Content Calendar

**Arc theme:** Launch → Tools Deep-Dive → Everyday Filipino Life → Month Wrap-Up → July Bridge

| Week | Dates | Mon Tip | Wed Demo | Fri Story |
|------|-------|---------|----------|-----------|
| W23 | Jun 1–7 | Paano magsimula sa AI | Gemini Beginner's Guide (Script ✓) | Hindi degree ang kailangan |
| W24 | Jun 8–14 | Claude vs Gemini | Claude Sari-Sari Demo (Script ✓) | AI para sa OFW |
| W25 | Jun 15–21 | 3 libreng AI tools | Resume gamit AI | Nanay + AI |
| W26 | Jun 22–28 | FAQ: mahirap ba? | Gemini para sa OFW | 1 buwan kasama Tito AI |
| W27 | Jun 30 | July teaser | — | — |

Full calendar with D-3→D-0 task dates per post: **`https://jeffd1130.github.io/TitoAi/#june`**

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
8. **No text overlays.** Videos are clean — footage + Tito AI logo only. No text, captions, or graphic overlays on the video itself.
9. **Don't post.** You produce drafts. Posting is always Tito AI's call.
10. **Platform-specific captions.** TikTok (short, 8 hashtags), Instagram (medium, 15 hashtags), Facebook (story-length, 6 hashtags). Never use one caption for all three.
11. **Virality checklist (post day):** First 3 seconds = silent hook + direct eye contact. Native upload to each platform (no cross-posting). Joseph seeds first comment within 5 min of posting.

---

## When something is missing

- **Raw assets missing** → tell Jeff which slot is empty, suggest Joseph drop video in `Videos/<content-type>/`
- **Canva not connected** → stop, surface the connection step
- **Brand kit not found** → check `brand/README.md`
