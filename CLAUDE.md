# Tito AI — Social Media Automation

You are helping Jeff (Senior Marketing Analyst, Manila, UTC+8) run the weekly content production system for **Tito AI**, a Filipino AI education channel created by Jeff de las Armas (@TitoAIPH). The channel teaches everyday Filipinos how to use AI tools — free, no jargon, in Taglish.

Your job is to make the **D-3 → D-0 workflow** fast, on-brand, and consistent. Target audience: "Mga Pamangkin" — everyday Filipinos: freelancers, guro/teachers, BPO workers, nanays/tatays, small business owners.

---

## The weekly schedule

| Day (PHT) | Slot | Format | Drop (PHT) | Skill |
|-----------|------|--------|------------|-------|
| Monday | `01-mon-ai-tip` | Short AI Tip Reel (30–60s) | 8:00 PM | `produce-post` |
| Wednesday | `02-wed-demo` | Tutorial / Demo Reel (60–90s) | 7:00 PM | `produce-post` |
| Friday | `03-fri-inspiration` | Story / Inspiration Reel (60–90s) | 7:00 PM | `produce-post` |

All times are **PHT (UTC+8)**. Jeff is based in Manila (PHT, UTC+8) — his Mac runs on local PHT time, so no timezone conversion is needed between drop times and system/cron time.

---

## The workflow

| Day | Stage | Owner | Action |
|-----|-------|-------|--------|
| D-3 | Raw assets | Tito AI | Drop videos/photos into `content/<week>/<slot>/raw/` |
| D-2 | Script + Design | Jeff | Write script → save as `.md` + `.html` in `drafts/` → copy HTML to `docs/scripts/` → run `produce-week` or per-slot skill → Canva cover + caption generated |
| D-1 | Approval | Tito AI | Review via **Canva edit link + script link sent by Telegram** — approve or request changes |
| D-0 | Posting | Tito AI | Schedule in **Buffer** at the PHT drop time → publish |

After each production run, send the Canva edit URL + script link to chat ID `8325608814` via `@titoaiph_bot`. Use `parse_mode=HTML` always.

---

## GitHub Pages hub

The channel hub lives at **`https://jeffd1130.github.io/TitoAi/`**

- Source: `docs/` folder in `main` branch — GitHub Pages serves everything under `docs/`
- **`docs/index.html`** — Content Hub: Current week highlighted (gold), Next week (teal), Upcoming, Completed archive section. Data-driven from `docs/schedule.json`.
- **Scripts** — `docs/scripts/<week>-<slot>-script.html`. Copy template from any existing script file.

**`docs/` directory structure:**
```
docs/
  index.html          ← Content Hub (current/next/upcoming + archive links)
  links.html          ← All Canva + GitHub Pages links
  timeline.html       ← Full content timeline (rendered from schedule.json)
  schedule.json       ← Single source of truth for timeline + hub
  assets/             ← Logo files
  scripts/            ← All production scripts (W##-slot-script.html)
  slides/             ← Carousel PNGs (W##-mon/, W##-fri/ etc.)
  archive/            ← Completed weeks W21–W25 (moved here when shipped)
    index.html        ← Archive index page
    W22-captions.html
    W24-*.html
    W25-*.html
    niche-plan.html
    fathers-day-greeting.html
  renders/            ← Solo render HTML files (production artifacts, not published)
```

**Current/Next/Upcoming weeks (as of Jul 7, 2026):**
| Role | Week | Dates |
|------|------|-------|
| Current (highlighted in hub) | W28 | Jul 6–12 |
| Next | W29 | Jul 13–19 |
| Upcoming | W30 | Jul 20–26 |

**Key live URLs:**
| Page | URL |
|------|-----|
| Content Hub | `https://jeffd1130.github.io/TitoAi/` |
| All Links | `https://jeffd1130.github.io/TitoAi/links.html` |
| Timeline | `https://jeffd1130.github.io/TitoAi/timeline.html` |
| Archive | `https://jeffd1130.github.io/TitoAi/archive/` |
| Niche Plan | `https://jeffd1130.github.io/TitoAi/archive/niche-plan.html` |

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
- Connects AI to real Filipino life (sari-sari, luto-laba-trabaho, paaralan, negosyo)

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
      raw/          ← Jeff drops video/photos here (D-3)
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
- **Buffer** — Social scheduling for IG + FB + TikTok. Workspace: `jeffd321@live.com` at buffer.com. @TitoAIPH connected on Instagram, Facebook Page, and TikTok. Use for scheduling posts after approval.
- **Telegram bot** — `@titoaiph_bot` (bot ID: 8960239761). Token: `8960239761:AAFKehuxbPQTkB81CnGY3QtSf1JMFUe2qIg`. Jeff's chat ID: `8325608814` (@JeffD331). Use `parse_mode=HTML` always (never Markdown — URL underscores break). Send approval notifications to chat ID `8325608814`.

## Carousel slide production (PNG → Canva)

Use this process for any carousel post (Mon AI tip, etc.) that needs custom-designed slides.

**Step 1 — Build render HTML**
- File: `/private/tmp/claude-501/…/scratchpad/w##-slides-render.html` (scratchpad, not committed)
- Load Bebas Neue + DM Sans via Google Fonts link
- Each `.slide` = 1080×1350px, `#0A0F1E` background
- Title block: `.t-line` at 118px Bebas Neue — `.t-gold` (#F59E0B), `.t-white`, `.t-teal` (#0D9488)
- Gold divider: `width:100%; height:3px; background: linear-gradient(90deg, #F59E0B 0%, rgba(245,158,11,.15) 100%)`
- Footer: `docs/assets/logo-horizontal.png` at left (height:68px), 5 `.pip` dots at right (active pip = gold)
- Logo src during render: `http://localhost:8765/assets/logo-horizontal.png` (served by HTTP server)

**Step 2 — Render each slide in isolation (REQUIRED)**
- **Do NOT screenshot from the stacked multi-slide render HTML.** `scrollIntoView` + viewport resize does not reliably capture just the target slide — content ends up misaligned (too high or too low) in the final PNG.
- **Create one solo HTML per slide** (or one per batch): `body{width:1080px;height:1350px;overflow:hidden}` — a single `.slide` div, no padding/gap/stack.
- Example solo file: `docs/w##-fri-s5-solo.html` — only slide 5, body locked to 1080×1350.
- Navigate directly to the solo file; the full slide fills the viewport with zero offset.

```bash
# Kill any existing server on 8765, then start fresh
lsof -ti:8765 | xargs kill -9 2>/dev/null; cd /Users/jeff/Documents/Claude/TItoAi/docs && python3 -m http.server 8765 &
```
- Resize viewport FIRST (`browser_resize 1080×1350`), THEN navigate — never resize after navigate (resets scroll).
- Screenshot saves to home dir by default — `mv ~/filename.png docs/slides/W##-xxx/`

**Step 3 — Name and store PNGs**
```
docs/slides/W##-mon/
  slide-01-hook.png
  slide-02-[name].png
  slide-03-[name].png
  slide-04-[name].png
  slide-05-cta.png
```

**Step 4 — Upload to Canva + update design**
1. Get public URL for each PNG: `curl -F "reqtype=fileupload" -F "fileToUpload=@file.png" https://catbox.moe/user/api.php`
   - **If catbox.moe times out:** commit PNGs to GitHub and use `https://raw.githubusercontent.com/jeffd1130/TitoAi/main/docs/slides/W##-xxx/slide-0n-name.png`
2. `upload-asset-from-url` for each PNG → get asset IDs
3. `start-editing-transaction` on the carousel design ID
4. `perform-editing-operations` — **all pages can be updated in ONE call** (not one call per page). `page_index` is a **TOP-LEVEL parameter** of the API call (the first page being updated); all page operations go in the single `operations` array. For each slide, use 3 operations together: `update_fill` (swap image) + `position_element` (top:0, left:0) + `resize_element` (width:1080, height:1350). The position + resize snaps the element to fill the frame and prevents inherited offset from the base design.
5. `commit-editing-transaction`
6. **MUST call `get-design` after commit** → use the returned `edit_url` shortlink (never use design_id directly)
7. **Always send** the `edit_url` (from `get-design`) + GitHub Pages carousel preview link to Telegram chat `8325608814` immediately after every Canva pipeline — do not wait to be asked.

**Step 5 — Update docs**
- `docs/slides/W##-mon/*.png` → referenced in carousel HTML and captions HTML as `slides/W##-mon/slide-0n-name.png`
- Update `docs/W##-mon-carousel.html`: replace CSS slide blocks with `<img>` tags referencing the PNGs
- Add Canva block in captions HTML with fresh edit URL from `get-design`
- Update `docs/links.html` W## section with new Canva URL

**Canva carousel design IDs:**
| Week | Design ID | Notes |
|------|-----------|-------|
| W26 Mon | `DAHNQUaAqEQ` | "Ang Sabi Nila" · 5 slides · Updated Jun 22 |
| W26 Wed | `DAHNc6_o6mg` | "Gemini para sa Guro" · 5 slides · Jun 24 |
| W26 Fri | `DAHNoxGHZaQ` | "Nagbabago. Kaya Mo Pa Ba?" · 5 slides · edit: `https://www.canva.com/d/JzWEuWM_q3ybfdc` |
| W27 Fri | `DAHNpfOSrz8` | "Ang Taong Nagsimula Kahapon" · 5 slides · edit: `https://www.canva.com/d/NQZGhE40QTzJKTn` |
| W28 Wed | `DAHO3k_NSmo` | "Gemini — Libre sa Gmail Mo" · 5 slides · edit: `https://www.canva.com/d/uWe0RDgpBkdRRvk` |
| W29 Mon | `DAHPQnSy4aQ` | "Email Drafting — Hayaan ang AI" · 5 slides · edit: `https://www.canva.com/d/MSAgpCJrYKHgUNo` |

---

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
- No rename/title operation available via MCP — rename manually in Canva UI if needed

## Intro video assets (Origin Story — Video 1)

**Finished export:** `Finished/Tito Ai Intro.mp4` (255MB · 6-scene · 1080×1920 · ready to post)
**Post design (approval draft):** `DAHKj9hQPYw` — edit: `https://www.canva.com/d/ldOIk0NrlQiKFWq`
**Drop:** Friday May 29, 2026 · 7:00 PM PHT · **Status: Draft — pending Jeff approval**
**Captions:** `content/2026-W22/03-fri-inspiration/drafts/captions.md` · W22 approval page: `https://jeffd1130.github.io/TitoAi/W22-captions.html`

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

## June–July 2026 Content Calendar

**Arc theme (W28+):** Real Stories · AI from Jeff's actual life and clients

| Week | Dates | Mon Tip (8 PM PHT) | Wed Demo (7 PM PHT) | Fri Story (7 PM PHT) |
|------|-------|--------------------|---------------------|----------------------|
| W25 | Jun 15–21 | 3 libreng AI tools | Resume gamit AI | **Father's Day — Tito AI Tries: Php 2,000** (Captions ✓) |
| W26 ⭐ | Jun 22–28 | Ang Sabi Nila: Pang-Matalino Lang Iyan | Gemini para sa Guro | 1 Buwan Kasama Tito AI — Ang Resulta |
| W27 ⭐ | Jun 29–Jul 5 | July na! Dalawang Feature (Claude Projects + Gemini Deep Research) ✅ | **Claude Projects — I-Setup Natin ang Iyong Trabaho Space** ✅ posted Jul 1 | Ang Taong Nagsimula Kahapon — May Kalamangan Na · drops Jul 3 7 PM ✅ ready |
| W28 | Jul 6–12 | Paano Makipag-usap sa AI nang Mas Epektibo (draft) | **Gemini sa Gmail — Libre sa Gmail Mo** · 60–75s · script + captions ready ⭐ boost | **Story S1E1** — Dalawang Linggo. Isang Website. At Tatay Pa Rin Ako. · script + captions ready · drops Jul 11 7 PM |
| W29 | Jul 13–19 | Email Drafting — Hayaan ang AI (script + captions ready) | Resume at Cover Letter — Claude ang Gagawa · VA persona · script + captions ready ✅ | **Story S1E2** — Ang Restaurant sa Clark na Nagbago (Pares angle) |
| W30 | Jul 20–26 | TBD tip | TBD demo | **Story S1E3** — Tatay. Analyst. Trainer. Sa Iisang Araw. (household dad) |
| W31 | Jul 27–Aug 2 | TBD tip | TBD demo | **Story S1E4** — Ang BJJ Champion at ang Marketing Analyst na Nasa Manila (full Cobrinha deep dive) |

## Friday Story Series — Season 1: "Ang Buhay na Pinabilis ng AI"

Jeff's real stories used as Friday inspiration content. Each episode is a true story from Jeff's actual work — no fabrication.

| Ep | Week | Title | Story |
|----|------|-------|-------|
| S1E1 | W28 Fri Jul 11 | Dalawang Linggo. Isang Website. At Tatay Pa Rin Ako. | Jeff builds client website in 20-min stolen moments while doing dad duties. Gemini for site outline → Claude for copy. Script + captions ready. |
| S1E2 | W29 Fri Jul 18 | Ang Restaurant sa Clark na Nagbago | Pares Clark (Golden Gate 78) — small Filipino restaurant using AI for bookkeeping and ops. |
| S1E3 | W30 Fri Jul 25 | Tatay. Analyst. Trainer. Sa Iisang Araw. | Jeff as household dad in Manila juggling 4 client businesses using AI tools. |
| S1E4 | W31 Fri Aug 1 | Ang BJJ Champion at ang Marketing Analyst na Nasa Manila | Full Cobrinha LA story — how the remote content production system works. |

**Story format:** 60–90s · emotional hook → real situation → AI as the solution → apply it yourself → Tito AI closer
**Source material:** Real details from Jeff's work — never invent quotes, outcomes, or metrics
**Client references:** Cobrinha = Alliance Cobrinha LA (BJJ, LA) · Pares = The Original Pares Clark (restaurant, Philippines)

⭐ W26 = **boost launch week** · Php 2,000/week · TikTok only → TikTok+IG (W27) → All 3 (W28)

**Boost plan deck:** `content/strategy/TitoAI-ContentBoostPlan-W26-W28.pptx` / `.pdf`

**W25 Fri approval page:** `https://jeffd1130.github.io/TitoAi/W25-fri-captions.html`

**CJEF Day 1 AI Training (Jul 6, 2026):** First corporate/school training conducted. ~12 participants — guro, admin, school directors. Tools: Claude + Gemini (free). Full day. Certificate ceremony. Assets in `/Users/jeff/Documents/Claude/TitoAI-Training/CJEF_Day1/` — 10 photos + 3 videos (~30s each). Special post published Jul 6 with "TRAINING" CTA for lead gen. Slides: `/Users/jeff/Documents/Claude/TitoAI-Training/slides/CJF_AllRoles_Slides.html`.

**Post-level engagement audit (Jul 1, 2026):** `reports/2026-07-01-ig-tiktok-post-mapping.md` — full IG (17) + TikTok (19) post mapping. Two standing insights applied going forward:
1. **Post once, pin immediately on TikTok — never duplicate-post.** All 3 top-viewed TikTok posts (784/761/630 views) are pinned copies, beating their unpinned duplicate 2–4x every time.
2. **Named-persona, step-by-step free-tool demos are the top-proven format** ("Mga Guro" post: 784 TikTok / 297–304 IG). Route boost budget to posts matching this shape (e.g. W27 Wed, W28 Wed) over untested formats.

**Weekly check & balance (Jul 6, 2026):** `reports/2026-07-06-weekly-checkbalance.md` — automation/repo health normal (clean git state, up to date with origin). Account-health pull (IG + TikTok follower/engagement check) could not be completed this cycle — browser control was unavailable in the automated run context. W28 Wed boost confirmed per the standing insight above; re-pull W27 post-level metrics next time account access is available to validate the boosted-Wed outcome before repeating the pattern for W29.

**Routine health check (Jul 9, 2026):** `reports/2026-07-09-health-check.md` — repo/automation normal. IG: 70 followers, 90-day views 2,152. TikTok: 146 followers, last-7-days views down 37.8% WoW but profile views +200% and branded search queries appearing ("tito ai story," "claude resume"). Flag: the "Claude Projects" script was duplicate-posted 4x (Jun 30–Jul 3) despite the no-duplicate rule, and its best result was an **unpinned** copy (678 views/24 likes) — first case where pinning didn't win. Treat as a one-off until more data confirms; don't revise the pin-first rule yet. W28 Wed boost post ("Gemini sa Gmail," pinned Jul 8) at only 195 views ~1 day in — recheck after 48–72h.

**Weekly check & balance (Jul 13, 2026):** `reports/2026-07-13-weekly-checkbalance.md` — repo/automation normal, W29 Mon synced into schedule.json (was still a TBD placeholder despite script+captions already existing). Account-health pull failed for a **second consecutive cycle** — no browser access in the automated run context — so W28 Wed boost outcome and W28 Fri Story S1E1 engagement remain unconfirmed. W29 Wed recommended for a conservative TikTok-only boost (matches proven named-persona demo shape) rather than repeating "All Platforms," pending that confirmation. Priority for next cycle: re-pull IG + TikTok metrics as soon as browser/account access is available — nearly two weeks of engagement data is now unverified.

**Live update (Jul 14, 2026):** See §5 of `reports/2026-07-13-weekly-checkbalance.md`. IG 90-day views up to 2,348 (from 2,152). TikTok 152 followers/252 likes. Confirmed W28 Fri Story S1E1 live (541 views, pinned) and W29 Mon (185 views, pinned, posted same day). **Standing "pin wins" insight is now in question** — ranked by views, the 2 pinned posts sit at #4 and #10 of 10; the top 3 spots are all unpinned, including the W27 Wed "Claude Projects" duplicate (684 views, still growing) that Jul 9's report flagged as a one-off exception. Do not treat pin-vs-unpinned as settled — next cycle should identify the two unidentified top-viewed posts (768, 654) before revising the rule either way.

---

## Niche & Growth Strategy

Full strategy doc: `content/strategy/niche-and-growth-plan.md` · HTML: `https://jeffd1130.github.io/TitoAi/niche-plan.html`

**Niche:** "The warm, relatable Tito who teaches everyday Filipinos to use AI for free — before it replaces their job."

**Target audience:** Freelancers (1.5M+) · Guro/Teachers (900K+) · BPO workers · Nanays/tatays · Small business owners

**Primary tools featured in all content:** Claude (claude.ai) + Gemini (gemini.google.com) — both free. Never reference paid tools.

**Content pillars:**
- Mon Tips → Quick AI win (tool demo, 30–60s)
- Wed Demos → Freelancer / Guro Upgrade (60–90s tutorial)
- Fri Stories → Family & Everyday Filipino Life
- Evergreen → BPO / Workforce Survival + Negosyante series

**Hook rule:** Hook must land in second 1 — never open with "Kumusta" first.

**Algorithm:** End every video with a YES/NO or choice question. Reply to comments in first hour. Pin first comment within 5 min.

---

## Content timeline

`docs/schedule.json` is the single source of truth for the published timeline (`docs/timeline.html` renders from it). Whenever a post's status, title, date, link, or boost changes — or a new week/post is added — update `docs/schedule.json` to match, keeping the schema in `docs/timeline-README.md`. Set `"updated"` to today's date. Do NOT edit `timeline.html`. Commit and push so GitHub Pages republishes.

**Live URL:** `https://jeffd1130.github.io/TitoAi/timeline.html`

---

## Automation — Tito AI Daily Routine

All scripts live in `automation/`. They run via Mac crontab. Jeff's Mac runs on local PHT (UTC+8) time, so cron times below are direct PHT wall-clock values — no offset conversion needed.

| Script | Purpose | Fires (Manila time) |
|--------|---------|-------------------|
| `tito-summary.py` | Daily status: current/next/upcoming weeks + today's drops | 10:00 AM daily |
| `tito-record.py` | D-3 recording reminder: what to film, specs, where to save | 9:00 AM — Fri / Sun / Tue |
| `tito-create.py` | D-2 content creation reminder: script + captions + Canva, links to produce-post | 9:00 AM — Sat / Mon / Wed |
| `tito-weekly.py` | Saturday production overview: shows what still needs work for next 2 weeks | 9:00 AM Saturday |
| `tito-remind.py` | Drop-day reminder: 1hr before each post with pre-post checklist | 7:00 PM Mon / 7:00 PM Wed / 7:00 PM Fri |

**Setup:**
```bash
bash automation/setup-cron.sh      # install all cron jobs
```

**Log:** `/tmp/titoai-cron.log`

**Note:** `automation/setup-wake.sh` is deprecated — no longer needed. The Mac runs on Manila time (PHT, UTC+8), so all reminders fire during normal waking hours and no wake-scheduling is needed.

**Telegram bot:** `@titoaiph_bot` (token in scripts). Always use curl or `urllib` — never the MCP Telegram tool (wired to Cobrinha bot, not Tito AI).

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

1. **No fabrication.** Never invent quotes, comments, metrics, follower reactions, or events. If a script element requires a real detail that isn't confirmed, keep it general or flag it to Jeff.
2. **Brand first.** Navy + gold. Warm Tito energy. Never corporate-looking.
2. **Taglish always.** Captions and scripts are in Taglish. No pure English unless quoting a tool.
3. **Free tools only.** Never recommend or reference paid tools in content.
4. **Short over long.** 60–90 seconds is the ceiling. Ask before going longer.
5. **One question max.** If clarification is needed, ask the single most important question.
6. **PHT first.** Every draft output should show the PHT drop time. Jeff is based in Manila, so PHT is his local time — no secondary timezone reference is needed.
7. **Parallel agents always.** For multi-slot tasks, spin concurrent agents. `produce-week` runs all 3 slots in parallel.
8. **No text overlays.** Videos are clean — footage + Tito AI logo only. No text, captions, or graphic overlays on the video itself.
9. **Don't post.** You produce drafts. Posting is always Tito AI's call.
10. **Platform-specific captions.** TikTok (short, 8 hashtags), Instagram (medium, 15 hashtags), Facebook (story-length, 6 hashtags). Never use one caption for all three.
11. **Virality checklist (post day):** First 3 seconds = silent hook + direct eye contact. Native upload to each platform (no cross-posting). Jeff seeds first comment within 5 min of posting.

---

## When something is missing

- **Raw assets missing** → tell Jeff which slot is empty, suggest Jeff drop video in `Videos/<content-type>/`
- **Canva not connected** → stop, surface the connection step
- **Brand kit not found** → check `brand/README.md`
