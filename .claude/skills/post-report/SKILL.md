# post-report

A detailed performance report for one post, about 24 hours after it goes live (re-run at 72 hours to update). Same depth as `reports/2026-11-24-growth-deep-dive.md`, but for a single post.

## Trigger phrases
"post report", "report on EP1", "how did the post do", the scheduled task `tito-post-report`.

## Rules
- Read-only on the platforms. Never post, comment, boost, change settings, log in, or get past a CAPTCHA. If a login or CAPTCHA shows, stop and say so.
- Use only numbers you see. Write "no data" for anything missing. Never estimate or invent.
- Report text in English. Times in PHT, with PST in brackets.
- Chrome: use the Tito AI profile (Claude in Chrome deviceId `59ee5dbb-97ae-4163-87e1-48898dd2bf5f`). Check that the account is **Tito Ai PH / tito.aiph / @tito.aiph** before reading.

## Steps

1. **Find the post.**
   - Check every post in `studio/data/posts-state.json` and `docs/schedule.json` that went live 18–96 hours ago.
   - 18–48 hours live = the 24 h checkpoint; 60–96 hours = the 72 h checkpoint.
   - Skip a post if `reports/posts/<post-id>.md` already has that checkpoint's section.
   - Do every post that is due, oldest first.
   - If none is due, stop without messaging.
   - Get its title, links and post time from `docs/schedule.json` and the slot's `drafts/captions.md`.
2. **TikTok (tiktok.com/tiktokstudio/content, then the post's analytics "View data").** Record:
   - Views, likes, comments, shares, saves.
   - Average watch time, % who watched the full video, and the retention curve drop points (seconds).
   - New followers from the post.
   - Traffic source split (For You, search, profile, following) and search terms if shown.
   - Audience gender, age and country if shown.
3. **Meta Business Suite (business.facebook.com/latest/insights/content, asset_id 1108395249032434).** For the FB reel and the IG reel separately, record:
   - Views, viewers or reach, 3-second views, average play time.
   - Interactions, comments, shares, saves, follows.
   - FB story and IG story views and replies if they exist.
4. **Comments.**
   - Count total comments and PROMPT comments.
   - Record replies by Tito AI, and whether the first reply came within 1 hour.
   - List open questions people asked. Use paraphrase and usernames only; don't quote long text.
5. **Benchmarks.** Compare with the last 5 posts in `reports/data/*-metrics.json` and earlier `reports/posts/*.md`, and with the all-time best (Resume, 1,123 TikTok views).
6. **Write `reports/posts/<post-id>.md`.**
   - Create it at 24 h. At 72 h, append a new section; don't overwrite.
   - Include these sections:
     1. **Summary:** 3 lines. Verdict: above, at or below average, and why.
     2. **Scorecard:** a table per platform with the numbers from steps 2–3, and change versus the last-5 average.
     3. **Funnel:** views, then 3-sec views (%), then engaged, then profile visits, then follows, then PROMPT comments and DMs, then waitlist. Name the biggest drop.
     4. **Retention:** where people left (seconds) and what was on screen at that moment. Check the frame with `ffmpeg -ss <t> -frames:v 1` on the video in `docs/media/<slot>/`.
     5. **Audience and traffic:** who watched and where the views came from.
     6. **Comments:** counts, reply speed and open questions.
     7. **What worked and what didn't:** hook, format, CTA, post time. Tie each point to a number.
     8. **Boost check:** does the post meet the boost gate in `reports/2026-11-24-growth-deep-dive.md` §6 (300 TikTok views by 48 h)? Say yes or no with the number. Jeff decides and places any boost.
     9. **Next actions:** up to 5, each marked Jeff or Claude Code. Include one change for the next post.
7. **Save raw numbers** to `reports/data/posts/<post-id>-<24h|72h>.json`.
8. **Update the Studio post** with the link if missing (`POST localhost:4545/api/posts/<id>/posted` only if Jeff already marked it posted; otherwise leave it). Update `docs/schedule.json` with a short "Results (24 h): …" line in the note and set `"updated"`.
9. **Commit** the report, JSON and schedule changes (never logs). End the message with `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`. Then push.
10. **Telegram summary** with the Tito bot: Python urllib, token from `.telegram-token`, chat `8325608814`, `parse_mode=HTML`. Never use the Telegram MCP tool. Send the 3-line summary, the 4 key numbers (views, 3-sec %, comments, follows), the boost check, and the report link `https://github.com/jeffd1130/TitoAi/blob/main/reports/posts/<post-id>.md`.
