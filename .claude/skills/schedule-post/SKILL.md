# schedule-post

Upload one **approved** Tito AI post to the native schedulers: Meta Business Suite Planner (Facebook + Instagram) and TikTok Studio. Schedule only. Never post now, never boost.

## Trigger
Jeff pressed **📅 Schedule** on an approved post in Tito AI Studio → Approve & Post, or he asked in chat to schedule a specific approved post at a specific time. Each press covers one post at one time. It does not carry over to other posts.

## Hard rules
- The post must say **Approved** in `studio/data/posts-state.json` (`approved: true`). If it doesn't, stop and say so.
- Use the media files and captions exactly as given. Captions come from the post's captions file, one section per platform (TikTok / Instagram / Facebook). Don't rewrite, shorten or add hashtags.
- **Schedule only.** Choose "Schedule" with the given date and time. Never press "Post now", "Publish", "Share now", "Boost" or "Promote". Never add paid options, music you'd have to license, or tags of other accounts.
- Time zone is **PHT (UTC+8)**. If a scheduler shows another time zone, convert, and say what you entered.
- **Right account first.** Before uploading, confirm the account:
  - Meta Business Suite: the page is **Tito Ai PH** (asset_id 1108395249032434, business_id 1496630368854152).
  - TikTok Studio: the account is Tito AI. The Analytics search terms include "tito ai". It is not Cobrinha and not Golden Gate Pandi.
  If the wrong account is showing, try the other connected Chrome profiles (`list_connected_browsers` → `select_browser`). If none has it, stop.
- Stop and report (don't work around it) if you hit a login page, a password prompt, a CAPTCHA or bot check, new terms or consent screens, or a warning about the content. Jeff handles those himself.
- Never type passwords or codes, and never change account settings.
- If a platform is already scheduled for this post (Jeff's notes or the scheduler's list shows it), skip it. Don't double-schedule.

## Steps
1. Read the brief in your prompt: post id, media paths, captions file, platforms, date and time (PHT). Read the captions file and pull each platform's section.
2. **Meta Business Suite** (Instagram + Facebook in one composer, if both are requested):
   - Open `https://business.facebook.com/latest/composer?asset_id=1108395249032434&business_id=1496630368854152` (or Planner → Create post / Create reel for video).
   - Select the Facebook and Instagram placements.
   - Upload the media with `file_upload` (slides in order 1→N; for a video use the reel composer).
   - Paste the Facebook caption. If the composer allows per-platform text, use "Customize" and paste the Instagram caption for IG.
   - Open Scheduling options → set the date and time → **Schedule**. Read the confirmation.
3. **TikTok Studio**:
   - Open `https://www.tiktok.com/tiktokstudio/upload`. Upload the video, or the slides as a photo post.
   - Paste the TikTok caption. Leave "Who can watch" on Everyone, and leave the Comments/Duet/Stitch defaults alone.
   - Turn on **Schedule**, set the date and time → **Schedule**. Read the confirmation.
   - If TikTok doesn't allow scheduling this format on the web (e.g. photo posts), stop for TikTok and say so. Don't post it now instead.
4. Take a screenshot of each confirmation, or of the scheduled list.

## Reply (Tito AI Studio)
Keep it short:
- `Facebook: scheduled Wed Nov 18, 7:00 PM PHT` (or `skipped: <reason>` / `stopped: <reason>`)
- `Instagram: …`
- `TikTok: …`
- One line on anything Jeff must do by hand. End with a line `SCHEDULED: {"facebook": "...", "instagram": "...", "tiktok": "..."}` using an ISO time or `null` for each.
