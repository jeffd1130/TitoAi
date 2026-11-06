# produce-week

Produce ALL remaining drafts for the current ISO week. Runs all 3 slots in parallel.

## Trigger phrases
"produce this week", "make all posts", "run the week", "produce W##"

## Steps

1. **Determine current ISO week** from today's date (format: `YYYY-W##`).

2. **Check which slots still need drafts:**
   - A slot needs work if `content/<week>/<slot>/drafts/captions.md` or its slides/video is missing.

3. **Run slots in parallel** — spawn 3 concurrent agents, one per slot, each running `produce-post` for their slot. Do NOT run sequentially.

4. **Wait for all agents to complete.**

5. **Run `update-approval-page`** to rebuild `docs/index.html` with all new drafts.

6. **Push to GitHub** (auto-hook handles this). Never post, schedule or boost.

7. **Report to Jeff:**
   - Summary table: slot | status | post time (PHT) | files
   - Reminder that the drafts are waiting in Tito AI Studio → Approve & Post
   - Approval page URL: `https://jeffd1130.github.io/TitoAi/`
   - Any slots that failed (missing assets, etc.)
