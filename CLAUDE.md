# Tito AI — Social Media Automation

You help Jeff (Senior Marketing Analyst, Manila, UTC+8) run weekly content for **Tito AI — AI sa Totoong Buhay** (@TitoAIPH): an entertainment-led Filipino AI education and services brand. It uses humor, real experiments, approved client proof and seminar stories to teach Filipinos to use AI, in Taglish.

**Market (Jeff, Nov 5, 2026): Class B and C first, with some Class A.**
- C: BPO workers, guro, starting freelancers/VAs, sari-sari and small sellers.
- B: office professionals, supervisors/managers, small-business owners with staff, OFW families.
- A (some): business owners, executives, school/company decision-makers who could book a Tito AI training.
- Each week include at least one B/A topic (time saved, team or business results). Keep visuals polished and Taglish natural (a bit more English is fine for B/A). Free tools first. Never talk down to C or show off to A.

Older production notes, audits and health checks (May–Nov 3, 2026) are in `reports/history-2026.md`. Read it only when you need past detail.

---

## Ground rules (current)

- **Claude Code owns all production tasks** (Nov 3): scripts, captions, carousels, videos, `docs/schedule.json`, review pages, these `.md` files. ChatGPT/Codex and Gemini may draft; Claude Code reviews and finishes.
- **Jeff approves and posts everything himself.** Never post, schedule or boost. Calendar uploading (Kuya Iskedyul) was turned off Nov 5; the schedule is only a posting guide.
- **Video order:** Google Flow first (Veo 3.1 Lite, 9:16, x1, "Return silent videos" ON, chibi as Ingredient; 50 free credits a day, 10 per 8s clip, often blocked about 10 PM–1 AM PHT). Gemini Videos only after Flow credits run out. Keep Jeff's original audio. Don't pay for HeyGen or other tools without his OK.
- **Same chibi every shot** (clean-shaven, white tee, laptop fully in frame). Reject drifted clips.
- **No fabrication.** Never invent quotes, metrics, comments or events. Label illustrations and fictional practice examples. No identifiable seminar attendees or client material without verified permission.
- **Telegram only when asked** (or when Jeff presses a Studio button).

---

## Tito AI Studio

Local dashboard at http://localhost:4545. It starts at login and restarts itself if it stops (launchd `com.titoai.studio`, log `~/Library/Logs/titoai-studio.log`); after code changes restart it with `launchctl kickstart -k gui/$(id -u)/com.titoai.studio`. `bash studio/start.sh` just opens it. It runs the agents through Claude Code on Jeff's plan (no API). See `studio/README.md`.

- **🗺️ Board**: Updates (waiting on Jeff + agent activity), live workflow, ChatGPT → Claude handoff inbox, final approvals, content calendar, Results (Tito Numero).
- **💬 Tito AI**: chief-of-staff chat (`tito-main`). It plans and starts the team (up to 8 steps per message).
- **Agents**: 🔎 Tita Saliksik (research, short summary only), ✍️ Kuya Sulat (script + captions), 🎨 Ate Disenyo (carousel fallback), 🎬 Kuya Kamera (render), 🧐 Lola Suri (QA), 📊 Tito Numero (analyst).
- **Approve & Post**: unposted posts in calendar order, with captions, Copy, Approve, Mark posted, a 📅 posting-time guide and 📨 Send to Telegram (media + one message per caption).
- **Posted**: anything marked posted, newest first.
- **ChatGPT handoff**: ChatGPT saves a video + same-name `.md` note in `handoff/chatgpt/`; Claude Code reviews the frames and finishes it. Jeff approves only the final video and post.
- **Live hub** (Nov 6): `https://jeffd1130.github.io/TitoAi/hub/` (laptop) and `/hub/m.html` (phone). The Studio re-exports `docs/hub/data.json` with `studio/artifacts/export.py --pages --push` after changes (at most every 5 min; `TITO_HUB_SYNC=0` turns it off). Public, `noindex`. The claude.ai artifacts are snapshots that link to it.
- **Phone via Telegram**: `scripts/bot_listener.py` (launchd `com.titoai.bot`) handles `/send [post-id]`, `/posts`, and passes any other text to Tito AI in the Studio, replying when done.
- **Carousel fallback** (no video credits): Ate Disenyo writes `drafts/carousel.json` (`studio/carousel-schema.md`), rendered to 1080×1350 slides with Remotion (`TitoCarousel`).

---

## Weekly schedule (PHT)

| Day | Slot | Format | Post time |
|-----|------|--------|-----------|
| Monday | `01-mon-ai-tip` | AI tip carousel (5 slides) | 8:00 PM |
| Wednesday | `02-wed-demo` | Demo carousel (5 slides) | 7:00 PM |
| Friday | `03-fri-inspiration` | Story / reel (30–90s) | 7:00 PM |

Jeff's Mac runs on PHT, so cron and post times need no conversion.

**Current (Nov 6, 2026):**
- W45 (Nov 2–8): Mon "HM po?" posted; origin recut Part 1 posted Wed Nov 4; Part 2 (`docs/media/tito-ai-origin-recut/flow-part-2/part-2-chibi-codex-review.mp4`, approved) posts Fri Nov 6, 7 PM. Parts 3–5 wait until Jeff says go. Plan and captions: `content/2026-W45/bonus-origin-recut/` (`captions.md`, `gemini-plan.md`). Remotion source: `w44-friday-motion-sample/src/OriginChibiGemini.tsx`.
- W46 (Jeff, Nov 6): Mon Nov 9 Origin Part 3 (approved, `handoff/chatgpt/origin-part-3-matched-review.mp4`), Wed Nov 11 Part 4, Fri Nov 13 Part 5. Parts 4–5 still need to be made (Flow → ChatGPT handoff → Claude Code finish).
- Carousels are held until after Part 5: W47 Mon "Buy 1 Take 1" (moved from W46), W47 Wed/Fri, then W48 Mon/Wed/Fri. Drafts are in `content/2026-W46`–`W48` and in the Studio.
- Post status lives in the Studio (`studio/data/posts-state.json`) and `docs/schedule.json`.

---

## GitHub Pages hub

`https://jeffd1130.github.io/TitoAi/` (repo `jeffd1130/TitoAi`, branch `main`, serves `docs/`).
- `docs/index.html` hub, `docs/timeline.html` (renders from `docs/schedule.json`; don't edit the HTML), `docs/links.html`, `docs/archive/`.
- `docs/scripts/`, `docs/slides/`, `docs/downloads/`, `docs/media/`, `docs/renders/` hold current work. Files from before Aug 6, 2026 were cleared Nov 6, so old archive pages may show missing images.
- **`docs/schedule.json` is the source of truth for the timeline.** When a post's status, title, date, link or boost changes, update it (schema in `docs/timeline-README.md`), set `"updated"` to today, commit and push.

---

## Content pillars

Mix (Sep 22, 2026): 50% entertainment-led · 30% educational · 20% proof/services. Strategy: `content/strategy/tito-ai-rebrand-2026.md`, `content/strategy/niche-and-growth-plan.md`; chibi host: `brand/tito-ai-chibi-avatar.md`.

- **AI Tip (Mon):** one tool, one use case, one prompt. S1 hook · S2 problem · S3 prompt · S4 output · S5 CTA.
- **Demo (Wed):** named persona (VA, guro, freelancer, BPO, manager, business owner), step by step, real prompt + real output.
- **Story (Fri):** origin, struggle, win, apply-it-yourself; warm Tito-to-Pamangkin; real Filipino life.

Every new carousel or video uses the approved chibi host and the logo (pose fits the story) unless Jeff says otherwise. If a slot has no raw assets, make an on-brand draft from approved chibi/logo assets in that week's `raw/` folder rather than stopping. Before each post, check recent posts and the latest metrics to avoid repeats.

---

## Voice

- Taglish, natural; warm older tito/kuya, never lecturing or selling; calm confidence.
- Proof: real tool output only. Free tools (Claude, Gemini, ChatGPT free tier).
- Hook lands in second 1 (don't open with "Kumusta"). Then "Kumusta, mga Pamangkin!"; closer "Ingat lagi, mga Pamangkin. Tito AI — AI Para Sa Ating Lahat."
- Reels 60–90s max; ask before going longer. Text overlays only when they help (hook, prompt, next-part cue).
- Captions: short, lead with the hook or win, 3–5 sentences, one CTA, max 3 emoji. Separate TikTok / Instagram / Facebook captions, **five hashtags each**, always including `#TitoAIPH #MgaPamangkin #AIParaSaAtin`.
- End videos with a YES/NO or choice question. Every post gets one measurable job (follow, save, comment, share or inquiry) and a testable hook/format/CTA hypothesis.

---

## Brand system

Details in `brand/README.md`. Navy `#0A0F1E`, gold `#F59E0B`, teal `#0D9488`; Bebas Neue headlines, DM Sans body. New work uses the brighter cream/marigold/coral/teal pilot with navy text plus the chibi. Logos: `docs/assets/logo-horizontal.png`, `docs/assets/logo-icon.png`; chibi poses in `docs/assets/avatars/`. Warm, human, editorial; never crowded.

---

## Files

```
content/<YYYY-W##>/<slot>/   raw/ · drafts/ (script.md, captions.md, slides/) · approved/ · brief.md
content/_template/           copy for a new week
content/strategy/            strategy memos
studio/                      Tito AI Studio (server.js, public/, posts.json, data/)
handoff/chatgpt/             ChatGPT video handoffs
w44-friday-motion-sample/    Remotion project (src/; out/ is scratch)
Videos/, Images/             raw footage and photos (keep)
reports/                     weekly reports, metrics in reports/data/, history-2026.md
```

Prefer MP4 under 100 MB. Cover images are `.jpg` frames from the video.

---

## Tools

- **Canva MCP**: covers and carousels. Import/create/merge tools only work in claude.ai web, not the CLI. Canva can't set solid fills, change fonts or export PSD; flag those as manual steps.
- **GitHub**: auto-push hook in `.claude/settings.json` on Write/Edit from this directory. Check for files over 50 MB and never commit logs.
- **Chrome profiles**: the Tito AI profile has TikTok Studio and Meta Business Suite "Tito Ai PH" (asset_id 1108395249032434, business_id 1496630368854152). Verify the account name each time; other profiles are Cobrinha and Golden Gate.
- **Telegram bot** `@titoaiph_bot`, Jeff's chat ID `8325608814`. The token is in `.telegram-token` (gitignored; the Studio reads it). Always `parse_mode=HTML`. Send with Python urllib/curl or the Studio, never the Telegram MCP tool (that is the Cobrinha bot).

**Carousel via Canva (claude.ai web):** one 1080×1350 HTML file per slide in `docs/renders/`, push and wait for Pages, `import-design-from-url` each slide, `create_new_design` from S1, then `modify_existing_design` once per extra slide (one operation per call). Record the design ID and edit URL in `schedule.json`.

**Video via Canva:** `copy-design` per scene, swap the clip in an editing transaction, then `merge-designs` one operation per call. Clip timing is set by hand in Canva.

---

## Analytics

Tito Numero (`tito-analyst`) reads `reports/data/*-metrics.json` and the latest `reports/*-weekly-checkbalance.md`; results show on the board. Sources: Meta Business Suite (Tito Ai PH; IG+FB are combined for cross-posts) and TikTok Studio in the Tito AI Chrome profile. Ask for a fresh pull if data is over 7 days old.

Standing insights (evidence in `reports/history-2026.md`):
- Proof-first, named-persona, step-by-step free-tool demos beat prompt recitation.
- TikTok allows 3 pins: 2 evergreen (Clark story, VA resume) + 1 rotating slot for the best recent post. Never duplicate-post.
- Boosted story reels converted followers best (Jul 2026). Boost only with Jeff's OK, after 12–24h of organic evidence.
- Fix the first 2 seconds: Origin Part 1 averaged 2s play time on Meta.
- Reply to comments in the first hour; Jeff seeds the first comment within 5 minutes.

---

## Automation

`automation/` scripts run from Mac crontab (log `/tmp/titoai-cron.log`). **Only `tito-remind.py` is on** (Jeff, Nov 6): an hour before each post it sends a reminder, then the post's media + captions through the Studio (text only if the Studio isn't running). The others are commented out in crontab. Scripts read the bot token from `.telegram-token`.

| Script | Purpose | Fires (PHT) |
|--------|---------|-------------|
| `tito-summary.py` | Daily status | 10:00 AM daily |
| `tito-record.py` | D-3 asset prep reminder | 9:00 AM Fri / Sun / Tue |
| `tito-create.py` | D-2 creation reminder | 9:00 AM Sat / Mon / Wed |
| `tito-weekly.py` | Saturday production overview | 9:00 AM Sat |
| `tito-remind.py` | Post-day checklist | 7:00 PM Mon / Wed / Fri |

---

## Skills

| Skill | Trigger | Purpose |
|-------|---------|---------|
| `produce-post` | "make Monday's post" | One slot end to end |
| `produce-week` | "produce this week" | All remaining slots, in parallel |
| `update-approval-page` | "update the approval page" | Rebuild `docs/index.html` |
| `weekly-status` | "weekly status" | Read-only state of the week |
| `caption-library` | "redo the caption" | Captions + hashtags for one slot |

---

## When something is missing

- **Raw assets missing:** make an on-brand draft from approved chibi/logo assets in the slot's `raw/`; ask for real footage only when the idea needs verified proof.
- **Canva not connected:** stop and say how to connect it.
- **Brand kit not found:** check `brand/README.md`.
- **One question max**, and only if truly needed.
