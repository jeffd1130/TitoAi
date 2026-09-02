# Tito AI — Social Media Automation

You are helping Jeff (Senior Marketing Analyst, Manila, UTC+8) run the weekly content production system for **Tito AI**, a Filipino AI education channel created by Jeff de las Armas (@TitoAIPH). The channel teaches everyday Filipinos how to use AI tools — free, no jargon, in Taglish.

Your job is to make the **D-3 → D-0 workflow** fast, on-brand, and consistent. Target audience: "Mga Pamangkin" — everyday Filipinos: freelancers, guro/teachers, BPO workers, nanays/tatays, small business owners.

---

## The weekly schedule

| Day (PHT) | Slot | Format | Drop (PHT) | Skill |
|-----------|------|--------|------------|-------|
| Monday | `01-mon-ai-tip` | AI Tip Carousel (5 slides) | 8:00 PM | `produce-post` |
| Wednesday | `02-wed-demo` | Demo Carousel (5 slides) | 7:00 PM | `produce-post` |
| Friday | `03-fri-inspiration` | Story / Inspiration Reel (60–90s) | 7:00 PM | `produce-post` |

All times are **PHT (UTC+8)**. Jeff is based in Manila (PHT, UTC+8) — his Mac runs on local PHT time, so no timezone conversion is needed between drop times and system/cron time.

---

## The workflow

| Day | Stage | Owner | Action |
|-----|-------|-------|--------|
| D-3 | Asset prep | Jeff | Gather S1 photo + S4 Claude screenshot for carousel; no recording needed |
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

**Current/Next/Upcoming weeks (as of Aug 31, 2026):**
| Role | Week | Dates |
|------|------|-------|
| Current | W35 | Aug 24–30 — Mon AI-safety carousel posted (554 views, unpinned, 2nd-best unpinned result ever), Wed clean-brief carousel posted (527 views, unpinned, 3rd-best ever); Fri CJEF proof story (`docs/scripts/w34-fri-script.html`, CTA Comment GUSTO) still **unproduced for a 3rd cycle** — a different, undocumented TikTok-only post using the same CJEF footage ran instead Aug 29 (CTA Comment STUDENT, 129 views, pinned) with no script/schedule.json record |
| Next | W36 | Aug 31–Sep 6 — Mon "Mahabang Notes? Gawing Reviewer sa Gemini" student carousel ready, drops tonight 8 PM PHT; Wed/Fri not yet planned; top priority remains producing the real CJEF proof story |
| Upcoming | W37 | Sep 7–13 — not yet planned |

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
- 5-slide dark navy carousel
- One tool, one use case, one prompt formula
- S1: hook (photo background) · S2: problem · S3: prompt · S4: Claude output (screenshot) · S5: CTA
- Hook template: "Alam mo ba na pwede mong [result] in less than [time]?"

**Demo / Tutorial (Wednesdays)**
- 5-slide dark navy carousel · named persona (VA, Guro, Freelancer, BPO)
- Step-by-step demo: S1 hook → S2 setup → S3 prompt → S4 output → S5 CTA
- Always free tools — never paid
- Real prompt + real Claude output in S3/S4

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
- **DM Sans** sans-serif for body text, captions, and labels
- Logo: `docs/assets/logo-horizontal.png` (horizontal) and `docs/assets/logo-icon.png` (icon)
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
      raw/          ← carousel assets: S1 photo + S4 Claude screenshot (D-3)
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

## Carousel slide production (HTML render → Canva)

> ⚠️ **CLI limitation:** Canva import/create/merge tools (`import-design-from-url`, `create_new_design`, `modify_existing_design`) are NOT available in Claude Code CLI. They only work in **claude.ai web**. Step 3 below must be done there. Steps 1–2 can run from CLI as normal.

Current pipeline: solo HTML files → GitHub Pages → Canva import → assembled carousel.

**Step 1 — Build solo render HTML files**
- One file per slide, saved to repo: `docs/renders/w##-xxx-s#.html`
- Also build a full preview: `docs/renders/w##-xxx-slides.html`
- Each solo file: `body{width:1080px;height:1350px;overflow:hidden}` — single `.slide` div fills the body, no stack
- Design spec: `#0A0F1E` bg · gold `#F59E0B` · teal `#0D9488` · Bebas Neue headlines (118px) · DM Sans body
- Footer: logo at `https://jeffd1130.github.io/TitoAi/assets/logo-horizontal.png` (height:68px) + 5 pip dots (active pip = gold matching slide number)
- Photo zones (S1 hook bg, S4 screenshot): dashed gold border placeholder — user replaces in Canva

**Step 2 — Commit + push, poll for GitHub Pages deploy**
```bash
git add docs/renders/ && git commit -m "add W## renders" && git push
until curl -sf https://jeffd1130.github.io/TitoAi/renders/w##-xxx-s1.html | grep -q '0A0F1E'; do sleep 5; done
```

**Step 3 — Import into Canva**
- `import-design-from-url` for each slide's GitHub Pages URL (NOT raw PNG or local file)
- Each import creates a single-page Canva design — note IDs for S1–S5
- `create_new_design` using S1 (design_type: `social_media`) → base carousel design
- 4× `modify_existing_design` to append S2 → S3 → S4 → S5 (**one operation per API call**)
- The final `modify_existing_design` response contains the edit URL

**Step 4 — Update schedule.json + send Telegram**
- Add Canva design ID and edit URL to the post's `note` field in `docs/schedule.json`
- Send edit URL + GitHub Pages preview link to Telegram chat `8325608814` via Python urllib, `parse_mode=HTML`
- **Always send immediately** after every carousel pipeline — do not wait to be asked

**Step 5 — User completes in Canva**
- Open the edit URL → replace S1 background photo + S4 screenshot zone with real images
- Buffer schedule at the PHT drop time

**Canva carousel design IDs:**
| Week | Design ID | Notes |
|------|-----------|-------|
| W26 Mon | `DAHNQUaAqEQ` | "Ang Sabi Nila" · 5 slides · Updated Jun 22 |
| W26 Wed | `DAHNc6_o6mg` | "Gemini para sa Guro" · 5 slides · Jun 24 |
| W26 Fri | `DAHNoxGHZaQ` | "Nagbabago. Kaya Mo Pa Ba?" · 5 slides · edit: `https://www.canva.com/d/JzWEuWM_q3ybfdc` |
| W27 Fri | `DAHNpfOSrz8` | "Ang Taong Nagsimula Kahapon" · 5 slides · edit: `https://www.canva.com/d/NQZGhE40QTzJKTn` |
| W28 Wed | `DAHO3k_NSmo` | "Gemini — Libre sa Gmail Mo" · 5 slides · edit: `https://www.canva.com/d/uWe0RDgpBkdRRvk` |
| W29 Mon | `DAHPQnSy4aQ` | "Email Drafting — Hayaan ang AI" · 5 slides · edit: `https://www.canva.com/d/MSAgpCJrYKHgUNo` |
| W29 Wed | `DAHPbFUIlGo` | "Resume mo? Claude ang Gagawa — VA Demo" · 5 slides · edit: `https://www.canva.com/d/NF_8BtbZrObCg78` · all slides re-rendered with logo · no Maria |
| W29 Fri | `DAHPvQsLPFo` | "Ang Restaurant sa Clark" · Story S1E2 · 5 slides · edit: `https://www.canva.com/d/30wpLqyopzazHLs` |
| W30 Mon | `DAHP4nHcYXk` | "Tanungin ang AI — Mas Mabilis Pa sa Google" · 5 slides · S5 follow CTA updated · edit: `https://www.canva.com/d/13YetQMLiwYpfKS` |
| W31 Mon | `DAHQkNgsdss` | "Isang Prompt. Sampung Email." · VA persona · 5 slides · edit: `https://www.canva.com/d/GDxs5Mk_1pvE6AF` |
| W31 Wed | `DAHQkBdVE5E` | "Proposal sa Kliyente, Claude ang Gagawa" · Freelancer persona · 5 slides · edit: `https://www.canva.com/d/ZtQ24Mkd0S1e9O6` |

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
| W29 | Jul 13–19 | Email Drafting — Hayaan ang AI ✅ posted Jul 14 | Resume at Cover Letter — Claude ang Gagawa · VA · carousel fixed · ✅ posted Jul 16 | **Story S1E2** — Ang Restaurant sa Clark at ang Social Media na Ginawa Namin · script + captions ready · drops Jul 18 7 PM |
| W30 | Jul 20–26 | Tanungin ang AI — Mas Mabilis Pa sa Google ✅ posted Jul 22 | Alinman Ka Man — Hayaan ang Claude ✅ posted Jul 23 | **Story S1E3** — Tatay. Analyst. Trainer. Sa Iisang Araw. ✅ posted Jul 24 |
| W31 | Jul 27–Aug 2 | Isang Prompt. Sampung Email. — VA Inbox Carousel ✅ posted Jul 28 (260 views) | Proposal sa Kliyente, Claude ang Gagawa — Freelancer Carousel ✅ posted Jul 30 (213 views) | **Story S1E4** — Ang BJJ Champion at ang Marketing Analyst na Nasa Manila (Season 1 finale) ✅ posted Aug 1 (169 views) · boost placement unconfirmed |
| W32 | Aug 3–9 | Nasa Data World Ka. May Side Hustle Nang Naghihintay. — Data Analyst · DAHRNqXlTbc ✅ posted Aug 3 | 30 Bata. 30 Reports. 3 Minuto kay Claude. — Guro · DAHRYiEjngw ✅ posted Aug 5 | S2E1 — Iba't Ibang Kliyente. Iisang AI. Kaya ng Lahat. ✅ posted Aug 7 |
| W33 | Aug 10–16 | BPO ka? Claude ang Bagong Teammate Mo. — BPO · DAHR158OONs · ✅ posted (335 views Aug 13) | Negosyante ka? Claude ang Susulat ng Posts Mo. · DAHR5lxJ_lY · ✅ posted late Aug 13 (265 views) | S2E2 — Ang Unang Araw na Nagturo Ako ng AI sa Ibang Tao · script + captions ready · drops Aug 14 7 PM PHT |
| W34 | Aug 17–23 | Tatlong Revision. Isang Malinaw na Reply. — Freelancer · proof-first carousel | May Parent Meeting Bukas? Gawin Muna Ito. — Guro · screen-record demo | Ano ang Nagbago Pagkatapos ng Unang AI Class? — real-footage proof story |

## Friday Story Series — Season 1: "Ang Buhay na Pinabilis ng AI"

Jeff's real stories used as Friday inspiration content. Each episode is a true story from Jeff's actual work — no fabrication.

| Ep | Week | Title | Story |
|----|------|-------|-------|
| S1E1 | W28 Fri Jul 11 | Dalawang Linggo. Isang Website. At Tatay Pa Rin Ako. | Jeff builds client website in 20-min stolen moments while doing dad duties. Gemini for site outline → Claude for copy. Script + captions ready. |
| S1E2 | W29 Fri Jul 18 | Ang Restaurant sa Clark at ang Social Media na Ginawa Namin | Clark restaurant launch — Jeff did the social media campaign with Claude (captions/tone) + Gemini (content planning). Script + captions ready. |
| S1E3 | W30 Fri Jul 24 | Tatay. Analyst. Trainer. Sa Iisang Araw. | Jeff as household dad in Manila juggling 4 client businesses using AI tools. ✅ posted |
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

**Health check (Jul 18, 2026):** `reports/2026-07-18-health-check.md` — TikTok 7-day views 3,100 (+131.1% WoW), 133 likes, 9 shares, 98% FYP traffic. **W29 Wed carousel ("Resume at Cover Letter") is now the best-performing post in channel history** — 1,016 views/63 likes in 2 days, confirming the named-persona/step-by-step demo shape as the top-proven format (3rd consecutive week: W27 Wed → W28 Wed → W29 Wed). Carousels are outperforming reels on raw views. Branded search growing ("titoserye Filipino ai," "tito ai story"). Boost objective shifted to Followers/Profile visits (98% FYP traffic isn't converting to followers). Two boosts placed same day: W29 Wed carousel ₱300 + W29 Fri S1E2 ₱200, both TikTok, 3-day duration.

**Weekly check & balance (Jul 20, 2026):** `reports/2026-07-20-weekly-checkbalance.md` — automation/repo health normal (clean, pushed, no lock issues), but no commits landed Jul 19–20. Social-health pull failed again this cycle (no browser access) — Jul 18 boost outcomes (W29 Wed ₱300, W29 Fri ₱200) still unconfirmed, now one full cycle overdue. **Urgent flag: W30 Mon (drops Jul 21) and W30 Wed (drops Jul 23) have no script/captions yet** — `schedule.json` still shows both as TBD/draft with no URL; recommend running `produce-post` for W30 Mon immediately. Also found W30 Fri's `schedule.json` entry points to `W30-fri-captions.html`, which doesn't exist yet — needs to be written before the Jul 24 approval step. Standing recommendation: once W30 Wed is scripted, favor the named-persona/step-by-step demo shape that has now won 2 straight weeks.

**Health check (Jul 22, 2026):** `reports/2026-07-22-health-check.md` — live pull via TikTok Studio + IG public profile (this report sat uncommitted until the Jul 27 cycle picked it up — see below). **TikTok crossed 1,000 followers.** 7-day views 4,500 (+317.5% WoW), 350 likes, 16 shares. The Jul 18 boosts are now confirmed: S1E2 (Pares Clark story, ₱200 boost) drove 365 new followers and 4,600 all-time views — over 100x the follower conversion of the W29 Wed carousel boost (₱300 → ~1,100 views). **New standing insight: boosted story reels are the strongest follower-conversion lever found to date**, ahead of carousels. IG at 73 followers, insights still login-gated. W30 Wed/Fri were on track (Wed ready, Fri script still needed at the time).

**Weekly check & balance (Jul 27, 2026):** `reports/2026-07-27-weekly-checkbalance.md` — automation/repo health normal; found and committed a ~6-day-old uncommitted backlog (an exec-summary file rename + last week's own Jul 22 health-check report, which is why that report wasn't logged here until now). Social-health pull failed again (3 of the last 4 cycles) — Claude in Chrome unavailable and `web_fetch` can't render either JS-heavy profile page. `schedule.json` was stale (still showed W30 Wed/Fri as TBD and all of W31 as TBD despite scripts/captions/carousels already existing in the repo) — synced to reflect actual production status. **Applying the Jul 22 story-boost insight:** recommended this week's boost budget go to Fri S1E4 (Season 1 finale) rather than the Wed carousel, and added posting-insight banners to both `docs/W31-wed-captions.html` and `docs/W31-fri-captions.html` reflecting that. Priority for next cycle: get a live account pull (way overdue) and confirm whether W30 Wed/Fri and the S1E4 boost actually went out.

**Health check (Aug 3, 2026):** `reports/2026-08-03-health-check.md` — repo/automation clean (git up to date with origin, no lock issues); no cron log present in this run environment (expected — cron runs on Jeff's Mac, not reachable from here). **Live account pull succeeded** (public profiles via Playwright) after 3 straight failed cycles. TikTok crossed 1,012 followers (+12 WoW, growth normalizing after the S1E2 boost tail) with total likes up +339 WoW to 990. All 3 W31 posts confirmed live and marked `posted` in `schedule.json`: Mon VA Inbox (260 views, pinned), Wed Freelancer Proposal (213 views), Fri S1E4 Season 1 finale (169 views/2d — boost placement still unconfirmed, needs a TikTok Promote-tab check). IG flat at 75 followers (+1). **Urgent flag caught this cycle:** `docs/W32-mon-captions.html` (script+captions+render slides all committed Jul 31) states the Data Analyst carousel drops **today, Aug 3, 8 PM PHT** — but no Canva design has been assembled yet, and `schedule.json` had no W32 entry at all before this cycle (added now, status `draft`). Also no S2 arc/Wed/Fri scripts exist yet for the new season. Priority for next cycle: confirm whether W32 Mon actually got assembled and posted on time, and whether the S1E4 boost was ever placed.

**Health check (Aug 13, 2026):** `reports/2026-08-13-health-check.md` — automation log is healthy and current through Aug 12; daily summaries, weekly production reminders, D-3/D-2 checks, and Aug 10 weekly health reminder fired. Repo matched `origin/main` before this update, but five user-owned untracked items remain untouched. Live public pull: TikTok **1,017 followers / 1,025 total likes** (+5 / +35 vs. Aug 3); IG flat at **75 followers**. W33 Mon BPO is live at 335 views/8 likes/3 saves; W33 Wed Negosyante is live at 265 views/7 likes/4 saves but appears to have published ~16 hours after its Aug 12 7 PM target. `schedule.json` had a duplicate W32 block and stale W33 draft statuses; both were corrected. Priority: publish W33 Fri S2E2 on Aug 14 at 7 PM PHT, then plan W34 immediately (no files or schedule entry yet). Do not boost W33 Mon/Wed based on current evidence; test stronger save-first and comment-choice CTAs next week.

**W34 plan + W33 Fri revision (Aug 13, 2026):** `content/strategy/w34-content-plan.md` — W34 is now planned around proof-first hooks, visible before/after outputs, privacy-safe fictional/anonymized inputs, and one CTA per post. Monday targets freelancer revisions (save CTA), Wednesday tests a Guro screen-record demo (choice CTA), and Friday uses real CJEF proof footage (comment `GUSTO`). `content/strategy/niche-and-growth-plan.md` was refreshed to replace automatic boosting with a 12–24-hour evidence gate and to add workplace/student data-safety rules. Tomorrow's `docs/scripts/w33-fri-script.html` was tightened to 65–75s, removes the unverified direct quote, uses verified participant framing plus real CJEF footage, and moves the companion testimonial to Aug 15 or later.

**Weekly check & balance (Aug 22, 2026):** `reports/2026-08-22-weekly-checkbalance.md` — automation/repo health normal (`main` == `origin/main`, clean tree, Aug 21 auto-sync commits present as expected). Live pull via authenticated TikTok Studio + public IG profile: TikTok now displays rounded "1K" followers/likes (Studio UI change, not a data gap); last-7-days views down 31.3% WoW and likes down 57.1% WoW with 0 net new followers, driven entirely by two unpinned, prompt-recitation-style posts (W34 Wed Guro 94 views, W34 Fri bonus 210 views) — not a platform-wide issue. IG up to 77 followers (+2). **Confirmed the planned S2E3 CJEF proof story never ran** — commit `0ac73ed` shows it was swapped same-day for the lighter S2E4 "prep question" bonus tip; `schedule.json` corrected to reflect the actual post (S2E4, not S2E3) and the CJEF script (`docs/scripts/w34-fri-script.html`) is flagged as ready and unused for W35 Fri. Also corrected `schedule.json`: W34 Wed status `draft` → `posted` with live metrics (it had quietly gone live without the schedule being updated), and refreshed the W33 Wed view count (292, up from 265). **Pin effect is no longer ambiguous** — every pinned post now outperforms every unpinned post by a wide margin across three independent comparisons; pin every post going forward, no exceptions. Priority for next cycle: produce and pin the CJEF proof story for W35 Fri, verify the pin-everything rule holds for a 4th/5th data point, and reply to the real inbound comment (`jkp_7777`) on the pinned Clark story.

**Weekly check & balance (Aug 31, 2026):** `reports/2026-08-31-weekly-checkbalance.md` — automation/repo health normal (`main` == `origin/main`, clean tree, Aug 31 auto-sync commits landed the W36 Mon carousel). Live pull via public TikTok + IG profiles (no authenticated TikTok Studio session available this cycle): TikTok exact followers only 1,017 → 1,019 (+2) over 18 days and total likes 1,025 → 1,053 (+28) — the slowest growth stretch on record; IG flat at 77. Both new W35 carousels performed well **unpinned** (Mon AI-safety 554 views, Wed clean-brief 527 views — 2nd/3rd-best unpinned results ever), reinforcing proof-first-beats-prompt-recitation. **The Aug 22 "pin every post, no exceptions" rule is corrected**: TikTok caps pins at 3, so the real, observed pattern is 2 fixed evergreen pins (Clark story, VA resume) + 1 rotating slot — W35 Mon/Wed didn't get the rotating slot this cycle; a different, undocumented TikTok-only post using the same CJEF footage ("Imbis na mano-mano...", CTA Comment STUDENT, posted Aug 29) got it instead and only reached 129 views/2 likes/1 comment, with **no script, caption file, or schedule.json record anywhere in the repo** and no IG cross-post. The actual scripted CJEF proof story (`docs/scripts/w34-fri-script.html`, CTA Comment GUSTO) remains unproduced for a third straight cycle. `schedule.json` corrected: W35 Mon/Wed `ready` → `posted` with live metrics; W35 Fri left `draft` with the discrepancy noted; W33/W34 view counts refreshed. Priority for next cycle: produce the real CJEF proof story, confirm with Jeff whether the Aug 29 post was an intentional off-pipeline bonus (and backfill its repo record if so), and get an authenticated TikTok Studio pull to restore trend/traffic visibility.

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
| `tito-record.py` | D-3 asset prep reminder: gather S1 photo + S4 Claude screenshot for carousel | 9:00 AM — Fri / Sun / Tue |
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
