# update-approval-page

Rebuild `docs/index.html` from current draft files. Push to GitHub Pages.

## Trigger phrases
"update the approval page", "refresh the review site", "rebuild approval page"

## Steps

1. **Determine current ISO week.**

2. **Read each slot's draft.md** in `content/<week>/<slot>/drafts/` — extract:
   - Caption text
   - Hashtags
   - Canva edit URL
   - Drop time PHT + PST
   - Approval status

3. **Copy cover preview PNGs** to `docs/assets/` (if not already there).

4. **Rebuild `docs/index.html`** with:
   - Week label in header
   - One card per slot: cover preview image, caption, hashtags, drop time, Canva edit link, draft/approved status badge
   - Mobile-optimized (max-width 480px, full-width cards)
   - Dark navy + gold brand colors

5. **Commit and push** — auto-push hook fires on Write.

6. **Report the URL:** `https://jeffd1130.github.io/TitoAi/`
   - Note: changes go live ~1–2 min after push.

## IMPORTANT
- Always use `parse_mode=HTML` if sending Telegram notification (URL underscores break Markdown mode).
- Verify the page loads and images resolve before reporting success.
