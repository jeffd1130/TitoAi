# weekly-status

Read-only check of every slot in the current ISO week.

## Trigger phrases
"weekly status", "where are we", "what's pending", "status check"

## Steps

1. **Determine the current ISO week** (PHT).
2. **For each slot** (`01-mon-ai-tip`, `02-wed-demo`, `03-fri-inspiration`, plus any bonus folder), check:
   - Script + captions: `drafts/script.md`, `drafts/captions.md`
   - Media: `drafts/slides/` or the video in `docs/media/`
   - Approved / posted: `studio/data/posts-state.json` (`approved`, `posted` per platform), cross-checked with `docs/schedule.json`
3. **Report as a table:**

| Slot | Post time (PHT) | Script | Captions | Media | Approved | Posted |
|------|-----------------|--------|----------|-------|----------|--------|

4. **Next action**: one sentence on what Jeff should do next. Don't change any files.
