# Tito AI — Social Media Automation

You help Jeff (Senior Marketing Analyst, Manila, UTC+8) run weekly content for **Tito AI — AI sa Totoong Buhay** (@TitoAIPH): an entertainment-led Filipino AI education and services brand. It uses humor, real experiments, approved client proof and seminar stories to teach Filipinos to use AI, in Taglish.

**Market (Jeff, Nov 5, 2026): Class B and C first, with some Class A.**
- C: BPO workers, guro, starting freelancers/VAs, sari-sari and small sellers.
- B: office professionals, supervisors/managers, small-business owners with staff, OFW families.
- A (some): business owners, executives, school/company decision-makers who could book a Tito AI training.
- Each week include at least one B/A topic (time saved, team or business results). Keep visuals polished and Taglish natural (a bit more English is fine for B/A). Free tools first. Never talk down to C or show off to A.

**Business (Jeff, Nov 9, 2026):** Tito AI is now a business under the company **Alameda**. Launch paid **Google Meet classes** (1.5–2 h, ₱999/seat) and **1:1 coaching** (₱2,500/hour) first, fed by free **1-hour TikTok and Facebook Lives**. Seminars are phase 2, after the following grows (proposed: 5,000 combined followers and 2 sold-out classes). Teach free tiers of Claude, ChatGPT and Gemini first, then why paid is worth it for B and A. Every post carries one business CTA (free live, `CLASS` waitlist or `COACH`). Paid boosts capped at ₱3,000/month (Jeff boosts). Jeff may name clients live in seminars; public posts still need approval. Plan: `content/business/business-plan.md` (live doc https://claude.ai/artifact/5VdxbM1EHLhcyK4jT5uZcD); calendar: `content/strategy/2026-11-09-business-launch-content-plan.md`; class scripts `content/business/live-classes/`; invoices and finance `content/business/finance/`.

Older production notes, audits and health checks (May–Nov 3, 2026) are in `reports/history-2026.md`. Read it only when you need past detail.

---

## Ground rules (current)

- **Language (Nov 6):** Taglish is only for content (scripts, captions, slides, voiceover). Everything else is English: the Studio board, hub, chat replies, Telegram messages, docs and reports. Agent names stay as they are (Tita Saliksik, Kuya Sulat, Ate Disenyo, Kuya Kamera, Lola Suri).
- **Claude Code owns all production tasks** (Nov 3): scripts, captions, carousels, videos, `docs/schedule.json`, review pages, these `.md` files. Claude Code also makes the video clips itself (Nov 7, see Video order); ChatGPT is no longer in the video lane.
- **Jeff approves and posts everything himself.** Never post, schedule or boost. Calendar uploading (Kuya Iskedyul) was turned off Nov 5; the schedule is only a posting guide.
- **Video order:** Claude Code drives Google Flow itself in Jeff's Tito AI Chrome profile (Nov 7): Flow first (Veo 3.1 Lite, 9:16, x1, "Return silent videos" ON, chibi as Ingredient; 50 free credits a day, 10 per 8s clip, often blocked about 10 PM–1 AM PHT). Gemini Videos only after Flow credits run out. Save each clip with a same-name `.md` note (purpose, model, exact prompt) in `handoff/flow/`, check frames, reject drift. If a login or CAPTCHA appears, stop and ask Jeff. Log work done outside the Studio with `bash studio/log-activity.sh <node> <emoji> <who> <title> [file]` so it shows on the board. Don't pay for HeyGen or other tools without his OK.
- **Voiceover (Jeff, Nov 19):** every new video gets an AI voiceover unless Jeff sends his own recording. Claude Code makes it in Google AI Studio (`https://aistudio.google.com/generate-speech?model=gemini-3.8-flash-tts`, free tier, Tito AI Chrome profile): **Create new dialog**, voice **Finn** (free stock voice; voice cloning and Voice Design need a paid key, so don't use them), Style: "Warm, friendly Filipino tito in his 40s speaking natural Taglish with a Manila accent. Conversational and relaxed, like talking to a nephew, smiling, medium-brisk pace for a short social video, short natural pauses." Paste the script's voice lines, Run, download the WAV. Write all-caps words in lowercase (it spells "PROMPT" letter by letter). Save to the slot's `raw/` as `voice-finn.wav`, transcribe with mlx-whisper to check every word, normalize to -14 LUFS, and time captions to it. Disclose it: add "(AI voice ang gamit dito.)" to each caption and remind Jeff to turn on TikTok's AI-generated content label. Never present it as Jeff's own voice. If Jeff sends his own recording, use that instead.
- **Screen-demo reel recipe (Jeff, Nov 19; first used W47 Fri):** (1) Jeff screen-records the real AI run (any recorder, e.g. Snagit) and sends the files. (2) Claude Code makes **moving chibi** clips in Flow (approved chibi as Ingredient: wave/hello, pointing at laptop, surprised reaction, point-down CTA), never still PNG cut-outs. (3) Finn voiceover (above). (4) Remotion template `ClaudePlanReel2` (`w44-friday-motion-sample/src/ClaudePlanReel2.tsx`): copy it per episode, swap clips, cues and headlines. Rules: show the **whole screen-recording window** (objectFit contain, no crop, no zoom) and pick moments that aren't mid-scroll; chibi clips full-frame between screen parts plus a small chibi face circle on the hook; captions timed to the voice's whisper word timings; -14 LUFS. Truth check: say "libre/free" only if the recording is a free account; if it's Jeff's paid Claude app, say "kasama si Claude" and suggest trying the prompt on free tiers. Render to `docs/media/<slot-name>/`, add to `studio/posts.json`, re-approve if the video changes after approval.
- **Same chibi every shot** (clean-shaven, white tee, laptop fully in frame). Reject drifted clips.
- **No fabrication.** Never invent quotes, metrics, comments or events. Label illustrations and fictional practice examples. No identifiable seminar attendees or client material without verified permission.
- **Telegram only when asked** (or when Jeff presses a Studio button).

---

## Tito AI Studio

Local dashboard at http://localhost:4545. It starts at login and restarts itself if it stops (launchd `com.titoai.studio`, log `~/Library/Logs/titoai-studio.log`); after code changes restart it with `launchctl kickstart -k gui/$(id -u)/com.titoai.studio`. `bash studio/start.sh` just opens it. It runs the agents through Claude Code on Jeff's plan (no API). See `studio/README.md`.

- **🗺️ Board**: Updates (waiting on Jeff + agent activity), live workflow, Flow clip inbox, final approvals, content calendar, Results (Tito Numero).
- **💬 Tito AI**: chief-of-staff chat (`tito-main`). It plans and starts the team (up to 8 steps per message).
- **Agents**: 🔎 Tita Saliksik (research, short summary only), ✍️ Kuya Sulat (script + captions), 🎨 Ate Disenyo (carousel fallback), 🎬 Kuya Kamera (render), 🧐 Lola Suri (QA), 📊 Tito Numero (analyst), 💼 Tito Benta (Sales Head, `tito-sales`), 🤝 Ate Kasosyo (Business Development, `tito-bizdev`) in the **Sales & BD** column.
- **Approve & Post**: unposted posts in calendar order, with captions, Copy, Approve, Mark posted, a 📅 posting-time guide and 📨 Send to Telegram (media + one message per caption).
- **Posted**: anything marked posted, newest first.
- **Flow clips**: Claude Code saves each clip + same-name `.md` note in `handoff/flow/`; **Hand to Claude** sends it to Tito AI, which checks the frames and finishes it. Jeff approves only the final video and post.
- **Live hub** (Nov 6): `https://jeffd1130.github.io/TitoAi/hub/` (laptop) and `/hub/m.html` (phone). The Studio re-exports `docs/hub/data.json` with `studio/artifacts/export.py --pages --push` after changes (at most every 5 min; `TITO_HUB_SYNC=0` turns it off). Public, `noindex`. The claude.ai artifacts are snapshots that link to it.
- **Phone via Telegram**: `scripts/bot_listener.py` (launchd `com.titoai.bot`) handles `/send [post-id]`, `/posts`, and passes any other text to Tito AI in the Studio, replying when done.
- **Carousel fallback** (no video credits): Ate Disenyo writes `drafts/carousel.json` (`studio/carousel-schema.md`), rendered to 1080×1350 slides with Remotion (`TitoCarousel`).

---

## Weekly schedule (PHT)

| Day | Slot | Format | Post time |
|-----|------|--------|-----------|
| Monday | `01-mon-ai-tip` | AI tip carousel (5 slides) | 8:00 PM |
| Tuesday | `00-tue-slides` | Companion slides for Mon's video (6 slides) | 7:00 AM |
| Wednesday | `02-wed-demo` | Demo carousel (5 slides) | 7:00 PM |
| Thursday | `04-thu-slides` | Companion slides for Wed's video (6 slides) | 7:00 AM |
| Friday | `03-fri-inspiration` | Story / reel (30–90s) | 7:00 PM |
| Saturday | `06-sat-slides` | Companion slides for Fri's video (6 slides) | 7:00 AM |

**Tue/Thu/Sat companion slides (Jeff, Nov 24; first: W48 Thu `04-thu-guro-slides`, approved):** a "save this" carousel built from the previous day's video, same topic, but it must stand alone for new viewers. Why: the top 2 organic posts ever were step-by-step carousels (Resume 1,123, Study mode 907). Recipe:
- `drafts/carousel.json` rendered with Remotion `TitoCarousel` (`npx remotion still TitoCarousel out.png --frame=N --props=<carousel.json>`), 1080×1350, Bebas Neue headlines.
- Theme: **navy cover** (stands out in the feed, matches the July winners) → **cream step slides** (readable) → one **marigold "secret" slide** → **navy CTA**.
- Slides: S1 hook + real proof screenshot (`image`, from Jeff's screen recording via ffmpeg, cropped readable) · S2–S3 steps + the exact prompt from the video · S4 the secret/why + second proof shot · S5 check-before-use list · S6 save + one topic-word CTA (e.g. "Comment GURO").
- No greeting, no "paid" text; "libre" only if the recording was a free account. Captions for TikTok photo mode, IG carousel, FB photos (5 hashtags each), seed comment, and the DM reply for the CTA word (test that prompt first).
- Post at 7:00 AM PHT (morning post-time test vs the 7–8 PM videos). Saturdays with a free live: the slides announce the live. Show Jeff before finalizing; Jeff posts.

Jeff's Mac runs on PHT, so cron and post times need no conversion.

**Current (Nov 6, 2026):**
- W45 (Nov 2–8): Mon "HM po?" posted; origin recut Part 1 posted Wed Nov 4; Part 2 (`docs/media/tito-ai-origin-recut/flow-part-2/part-2-chibi-codex-review.mp4`, approved) posts Fri Nov 6, 7 PM. Parts 3–5 wait until Jeff says go. Plan and captions: `content/2026-W45/bonus-origin-recut/` (`captions.md`, `gemini-plan.md`). Remotion source: `w44-friday-motion-sample/src/OriginChibiGemini.tsx`.
- **Video openings (Nov 9 data):** viewers left at 0:01 on Parts 1–2. Open with a viewer-facing hook (not the series), voice from frame 1, PART badge only after 2 s (`openFix` / `OriginChibiGeminiP{n}v2`). Report: `reports/2026-11-09-weekly-checkbalance.md`.
- W46 (Jeff, Nov 6): Mon Nov 9 Origin Part 3 (approved; Nov 9 re-cut opening `docs/media/tito-ai-origin-recut/part-3-chibi-final-v2.mp4`), Wed Nov 11 Part 4 (made Nov 7 by Claude Code in Flow: `docs/media/tito-ai-origin-recut/part-4-chibi-final-v2.mp4`, waiting on Jeff's approval), Fri Nov 13 Part 5 (made Nov 9 by Claude Code in Flow: `docs/media/tito-ai-origin-recut/part-5-chibi-final-v2.mp4`, waiting on Jeff's approval).
- **W47–W50 (Nov 9 re-plan for the business launch):** W47 = "Libre Muna" series (Mon ChatGPT NEW, Wed Gemini quiz, Fri Claude/Tito AI story NEW); W48 as drafted; free live Sat Nov 28; W49 Mon "Buy 1 Take 1" (folder `content/2026-W46/01-mon-ai-tip`), Wed "Sulit ba ang Paid AI?" reel NEW, Fri anak/assignment story (folder `content/2026-W47/03-fri-inspiration`); W50 Class #1 push; Google Meet Class #1 proposed Sat Dec 12. Full table in the business launch content plan.
- **W47 (Nov 19 update):** Wed Nov 18 "Takip o Ayos?" posted (TikTok 7:29 PM, IG/FB 7:32 PM). Fri Nov 20 "Isang Prompt, Isang Linggong Plano" approved: `docs/media/w47-fri-claude-plan/claude-plan-reel-v3.mp4` (Jeff's Claude app recordings + moving Flow chibi + Finn AI voice; captions in `content/2026-W47/03b-fri-claude-story/drafts/`). W48–W49 = "Libre AI, Totoong Trabaho" EP1–6 (`content/series/libre-ai-totoong-trabaho/`), CTA comment PROMPT.
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
handoff/flow/                Flow/Gemini clips made by Claude Code (+ .md notes)
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
- **Telegram bot** `@titoai_ph_bot`, Jeff's chat ID `8325608814`. The token is in `.telegram-token` (gitignored; the Studio reads it). Always `parse_mode=HTML`. Send with Python urllib/curl or the Studio, never the Telegram MCP tool (that is the Cobrinha bot).

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
| `tito-background.py trends` | 🔎 Tita Saliksik daily trend scan → `content/research/trends/<date>.md` (AI news, similar-niche creators, PH trends for our targets, 3 ideas) | 6:00 AM daily |
| `tito-background.py brief` | 💬 Tito AI chat: new chat with Tita's findings + recommended next steps; Jeff and Tito AI decide together (no agent starts until Jeff picks) | 7:30 AM daily |
| `tito-background.py sales` | 💼 Tito Benta: pipeline + reply drafts → `content/business/sales/pipeline.md` | 9:00 AM Tue |
| `tito-background.py numbers` | 📊 Tito Numero: repo-data numbers check → `reports/<date>-numbers-check.md` | 8:00 AM Tue |
| `tito-background.py bizdev` | 🤝 Ate Kasosyo: 5 partner targets + outreach drafts → `content/business/bizdev/partners.md` | 9:30 AM Tue |

**Background agents (Jeff, Nov 24):** the four `tito-background.py` jobs start Studio runs (they show under Agent activity, drafts only, Jeff sends). The business lane (Tito Benta, Ate Kasosyo, Tito Numero, "Jeff sends") was removed from the board's workflow diagram; those agents run in the background. Writers (Kuya Sulat) and Tito AI chat should use the newest trends file when planning. Needs the Mac awake and the Studio running.

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
