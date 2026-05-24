# weekly-status

Read-only check: state of every slot in the current ISO week.

## Trigger phrases
"weekly status", "where are we", "what's pending", "status check"

## Steps

1. **Determine current ISO week.**

2. **For each slot**, check:
   - Raw assets present? (count files in `raw/`)
   - Draft made? (`drafts/draft.md` exists?)
   - Cover graphic generated? (`drafts/cover-preview.png` exists?)
   - Approved? (`approved/` has files?)

3. **Report as a table:**

| Slot | Day | Drop (PHT) | Raw | Draft | Cover | Approved |
|------|-----|-----------|-----|-------|-------|----------|
| 01-mon-ai-tip | Mon | 20:00 | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| 02-wed-demo | Wed | 19:00 | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |
| 03-fri-inspiration | Fri | 19:00 | ✓/✗ | ✓/✗ | ✓/✗ | ✓/✗ |

4. **State next action** — one sentence: what Jeff should do next.
