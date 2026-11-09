# produce-post

Produce one complete draft for one content slot: script, captions, slides or video, and a Studio post card ready for Jeff's approval.

## Trigger phrases
"make Monday's post", "produce Wednesday", "redo Friday's draft", "produce [slot-name]"

## Steps

1. **Identify the slot**: `01-mon-ai-tip`, `02-wed-demo` or `03-fri-inspiration`, and the ISO week (`content/<YYYY-W##>/<slot>/`; copy `content/_template/` for a new week).

2. **Review first.** Read `docs/schedule.json`, recent captions, the latest `reports/*-weekly-checkbalance.md` and `reports/data/*-metrics.json`. Avoid topics already posted. Pick the audience (Class B/C first, some A; at least one B/A topic a week), one measurable job (follow, save, comment, share or inquiry) and a testable hook/format/CTA hypothesis. Never invent metrics.

3. **Raw assets.** Use `raw/` if Jeff supplied media. If it is empty, make an on-brand draft from the approved chibi/logo assets (`docs/assets/avatars/`, `docs/assets/logo-*.png`). Label illustrations and fictional practice examples. No identifiable attendees or client material without verified permission.

4. **Script + captions** (Kuya Sulat rules): save `drafts/script.md` and `drafts/captions.md` with separate **TikTok**, **Instagram**, **Facebook** sections, five hashtags each including `#TitoAIPH #MgaPamangkin #AIParaSaAtin`, one CTA each, plus a **Seed comment**.

5. **Visuals.**
   - Carousel: write `drafts/carousel.json` (`studio/carousel-schema.md`) and render 1080×1350 slides to `drafts/slides/` (Remotion `TitoCarousel`), or build Canva slides in claude.ai web if Jeff wants Canva.
   - Video: Claude Code drives Google Flow in the Tito AI Chrome profile (Veo 3.1 Lite, 9:16, x1, silent ON, approved chibi as Ingredient), Gemini after credits run out; save clips + same-name `.md` notes to `handoff/flow/`, check frames and regenerate drifted shots; same clean-shaven chibi every shot; keep Jeff's original audio. Render in `w44-friday-motion-sample/` and copy the final to `docs/media/`.

6. **QA**: run Lola Suri's checks (brand, captions, hashtags, claims, chibi consistency) and fix what fails.

7. **Studio card**: add or update the post in `studio/posts.json` (`id`, `title`, `series` like `W46 · Monday 8:00 PM PHT`, `type`, `media`, `captions.file`/`section`) so it shows in Approve & Post with its posting time.

8. **Schedule**: add or update the post in `docs/schedule.json` (status `draft`, or `ready` once QA passes), set `"updated"` to today, commit and push.

9. **Report to Jeff** (short): slot and post time (PHT), hook, caption first line, file paths, growth hypothesis and which metric to check after posting. He approves and posts it himself; never post, schedule or boost. Send to Telegram only if he asks or presses the Studio button.
