# Tito AI — Social Media Posting & Content Creation Handover

Companion to `HANDOVER-chatgpt.md` (which covers niche/theme/strategy). This doc covers the **operational side**: how a post actually gets made, approved, and published each week.

---

## 1. Weekly production workflow (D-3 → D-0)

| Day | Stage | Owner | Action |
|---|---|---|---|
| D-3 | Asset prep | Jeff | Gather S1 hook photo + S4 Claude-output screenshot for the carousel (no filming needed for carousels) |
| D-2 | Script + Design | Jeff | Write script → save `.md` + `.html` in `drafts/` → copy HTML to `docs/scripts/` → run production skill → Canva cover + caption generated |
| D-1 | Approval | Tito AI (Jeff, as approver) | Review via Canva edit link + script link (sent over Telegram) → approve or request changes |
| D-0 | Posting | Tito AI | Schedule in **Buffer** at the PHT drop time → publish |

**Drop times (PHT, UTC+8):** Monday 8:00 PM · Wednesday 7:00 PM · Friday 7:00 PM. No timezone conversion needed — Jeff's Mac and the audience are both PHT.

---

## 2. Content creation pipeline (carousel: Mon/Wed)

Current pipeline is **HTML render → GitHub Pages → Canva import → assembled carousel**. Canva's AI import/merge tools only work in claude.ai web, not the CLI — so this is a multi-step, semi-manual pipeline:

1. **Build solo render HTML files** — one file per slide (`docs/renders/w##-slot-s#.html`), 1080×1350px, single `.slide` div. Spec: `#0A0F1E` navy bg, gold `#F59E0B` + teal `#0D9488` accents, Bebas Neue headlines (118px), DM Sans body, logo + 5 pip-dot footer (active pip = gold).
2. **Commit + push** to GitHub, poll until GitHub Pages has deployed each slide URL.
3. **Import into Canva** — `import-design-from-url` per slide → build base design from S1 → append S2–S5 one at a time (Canva's API only allows one merge operation per call).
4. **Update `docs/schedule.json`** with the Canva design ID + edit URL, and **send the edit URL + script link to Telegram immediately** (chat ID `8325608814`, bot `@titoaiph_bot`, always `parse_mode=HTML`).
5. **Jeff finishes in Canva** — swaps in the real S1 hook photo and S4 screenshot (these are placeholder zones in the render), then schedules in Buffer.

## 3. Content creation pipeline (video: Fri stories)

1. Raw footage lives in `Videos/<content-type>/`. Prefer MP4 under 100MB. No public URL for local files — use `catbox.moe` to get one before uploading to Canva.
2. Assemble in Canva: base 1-page design with logo → `copy-design` per scene → swap each copy's video clip → `merge-designs` to combine scenes (one merge operation per call, loop it for multiple scenes).
3. Clip timing/duration and any renaming must be done manually in the Canva UI — not available via API.
4. **No text overlays on video** — footage + logo only, ever.
5. Send final edit URL to Telegram once assembled.

---

## 4. File & folder conventions

```
content/
  2026-W##/                      ← ISO week folder
    01-mon-ai-tip/
      raw/          ← D-3: S1 photo + S4 screenshot dropped here
      drafts/       ← D-2: script.md/html + cover graphic + draft URL
      approved/     ← D-1: moved here once Jeff approves
      brief.md      ← optional context note
    02-wed-demo/
    03-fri-inspiration/
```
Copy `content/_template/` when starting a new week. Slot folders are numbered in posting order.

```
docs/
  index.html      ← Content Hub (current/next/upcoming + archive) — data-driven from schedule.json
  schedule.json    ← single source of truth for timeline + hub; update status/title/date/link/boost here, never edit timeline.html directly
  scripts/         ← docs/scripts/<week>-<slot>-script.html
  renders/         ← solo carousel-slide HTML (production artifacts, not public-facing content)
  slides/          ← exported carousel PNGs
  archive/         ← completed weeks, moved here once shipped
```

---

## 5. Captions & platform differences

Never reuse one caption across all three platforms — each is written to its platform's norms:

| Platform | Length | Hashtags |
|---|---|---|
| TikTok | short, punchy | 8 |
| Instagram | medium | 15 |
| Facebook | story-length | 6 |

Always include `#TitoAIPH #MgaPamangkin #AIParaSaAtin` in the hashtag set (8–15 total per post). Caption body: 3–5 sentences max, one CTA (follow/comment/DM), max 3 emoji, lead with the hook or the win.

**Cross-posting rule:** upload natively to each platform — never use TikTok's built-in cross-post link. Native uploads get more reach per platform.

---

## 6. Posting-day checklist

1. First 3 seconds = silent hook + direct eye contact (no audio dependency for the hook to land).
2. Native upload to each platform separately.
3. Seed the first comment yourself within 5 minutes of posting (bonus tip or tool link) and pin it.
4. Reply to every comment within the first hour.
5. End the video/caption with a YES/NO or choice question to drive replies.
6. Share Reels to Facebook Stories immediately after posting.
7. Schedule/boost decision: prioritize boosting **Friday story reels** for follower growth (highest proven follower-conversion lever) over Wednesday carousels (which win on views/saves but convert fewer follows per peso).

---

## 7. Tools in the pipeline

| Tool | Role |
|---|---|
| **Canva** | Cover graphics, carousel assembly, video scene assembly, exports |
| **GitHub / GitHub Pages** | Repo `jeffd1130/TitoAi` (main branch); `docs/` folder is the public approval site + slide-render host |
| **Buffer** | Scheduling/publishing to IG, FB, TikTok after approval (workspace `jeffd321@live.com`) |
| **Telegram** (`@titoaiph_bot`) | Sends approval links (Canva edit URL + script link) to Jeff after every production run — always `parse_mode=HTML`, never Markdown |
| **catbox.moe** | Quick public URL for local video files before Canva upload |

---

## 8. Automation (runs on Jeff's Mac via crontab, PHT wall-clock)

| Script | Purpose | Fires (Manila time) |
|---|---|---|
| `tito-summary.py` | Daily status: current/next/upcoming weeks + today's drops | 10:00 AM daily |
| `tito-record.py` | D-3 reminder: gather S1 photo + S4 screenshot | 9:00 AM Fri/Sun/Tue |
| `tito-create.py` | D-2 reminder: script + captions + Canva | 9:00 AM Sat/Mon/Wed |
| `tito-weekly.py` | Saturday production overview (next 2 weeks) | 9:00 AM Saturday |
| `tito-remind.py` | 1hr-before-drop reminder + pre-post checklist | 7:00 PM Mon/Wed/Fri |

Setup: `bash automation/setup-cron.sh`. Log: `/tmp/titoai-cron.log`.

---

## 9. Production skills (Claude Code, for whoever has repo + tool access)

| Skill | Trigger phrase | Purpose |
|---|---|---|
| `produce-post` | "make Monday's post" | Produce one draft end-to-end for a specific slot |
| `produce-week` | "produce this week" | Produce all remaining drafts for the current week (runs all 3 slots in parallel) |
| `update-approval-page` | "update the approval page" | Rebuild `docs/index.html` from current drafts, push |
| `weekly-status` | "weekly status" | Read-only check of every slot's state for the current ISO week |
| `caption-library` | "redo the caption" | Regenerate caption + hashtags for one slot only |

---

## 10. Hard rules (don't violate these when creating content)

1. **No fabrication** — never invent quotes, comments, metrics, or events.
2. **Free tools only** — Claude + Gemini, never anything paid, ever referenced.
3. **60–90 seconds max** for any video.
4. **No text overlays on video** — footage + logo only.
5. **PHT drop time shown on every draft.**
6. **This system produces drafts only — Jeff/Tito AI makes the actual posting decision.**
