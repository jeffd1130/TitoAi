# Prompt for Claude Code — W27 Wed post production

Paste this into Claude Code, run from `/Users/jeff/Documents/Claude/TItoAi`.

---

Produce the W27 Wednesday demo post. The video is already shot, edited, and final — do not treat it as raw footage.

**Video:** `content/2026-W27/02-wed-demo/approved/W27-wed-claude-projects-FINAL.mp4`
**Script:** `content/2026-W27/02-wed-demo/drafts/script.md` (already written — "Claude Projects — I-Setup Natin ang Iyong Trabaho Space")
**Drop:** Wed Jul 2, 2026 · 7:00 PM PHT / 4:00 AM PST

**Flag to me before proceeding:** the final edit runs 2:11 (131s) and is 202MB. That's ~45s over both the script's 85–90s target and the brand's 60–90s ceiling, and over the 100MB Canva-compatibility target. Confirm with me whether to post as-is (exception) or trim before packaging — don't silently cut it yourself.

Once confirmed, run the `produce-post` skill for this slot:
1. Upload the video to Canva (catbox.moe → public URL → `upload-asset-from-url` if needed for the file size).
2. Build the cover graphic per brand system (navy `#0A0F1E` bg, gold `#F59E0B` accent, Bebas Neue headline, logo lockup).
3. Generate platform captions from the script — TikTok (short, 8 hashtags), Instagram (medium, 15 hashtags, must include `#TitoAIPH #MgaPamangkin #AIParaSaAtin`), Facebook (story-length, 6 hashtags). Keep the script's existing CTA question ending ("Guro? Freelancer? Negosyante?") — don't rewrite it out.
4. Get the Canva `edit_url` via `get-design` (never the raw design ID).
5. Send the Canva edit URL + script link to Telegram chat `8325608814` via `@titoaiph_bot`, `parse_mode=HTML`.
6. Update `docs/schedule.json` for W27 Wed, set `"updated"` to today, commit and push.

**Two insights from the fresh IG + TikTok post-level engagement audit to apply here and going forward — don't just log these, act on them:**

- **Post once, pin immediately — don't duplicate-post.** Every top-3 TikTok post by views is a pinned post, beating its own unpinned duplicate 2–4x. The recent pattern of posting the same script twice (once pinned, once not) just splits views across two posts instead of compounding one. When this goes up on TikTok, pin it immediately — don't wait and don't post a second copy of the same script this week. Use whatever exists for a "duplicate" slot to cover a new topic in a later week instead.
- **This post matches the single best-performing shape we have** (a named-persona, step-by-step free-tool demo — the "Mga Guro" lesson-plan post hit 784 views on TikTok and 297–304 on IG, our top organic performer). Recommend this is the post the Php 2,000 W27 boost budget goes toward, not the Friday carousel — it's the most-proven format, not an untested one.

Do not schedule to Buffer or publish — that stays Tito AI's call at D-0. Stop and tell me if Canva isn't connected or the brand kit can't be found.
