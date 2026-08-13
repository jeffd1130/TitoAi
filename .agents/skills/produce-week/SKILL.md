# produce-week

Produce ALL remaining drafts for the current ISO week. Runs all 3 slots in parallel.

## Trigger phrases
"produce this week", "make all posts", "run the week", "produce W##"

## Steps

1. **Determine current ISO week** from today's date (format: `YYYY-W##`).

2. **Check which slots still need drafts:**
   - A slot needs a draft if `content/<week>/<slot>/drafts/draft.md` does not exist OR has no Canva design ID.

3. **Run slots in parallel** — spawn 3 concurrent agents, one per slot, each running `produce-post` for their slot. Do NOT run sequentially.

4. **Wait for all agents to complete.**

5. **Run `update-approval-page`** to rebuild `docs/index.html` with all new drafts.

6. **Push to GitHub** (auto-hook handles this).

7. **Report to Jeff:**
   - Summary table: slot | status | drop time (PHT) | Canva edit link
   - Approval page URL: `https://jeffd1130.github.io/TitoAi/`
   - Any slots that failed (missing assets, etc.)
