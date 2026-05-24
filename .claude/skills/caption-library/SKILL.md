# caption-library

Regenerate caption + hashtags for one slot without touching the design.

## Trigger phrases
"redo the caption for Monday", "regenerate hashtags", "rewrite Wednesday's caption"

## Steps

1. **Identify the slot** from the user's request.

2. **Read the brief.md** for the slot (if it exists) for context.

3. **Read existing draft.md** for the slot (if it exists) to avoid repeating.

4. **Write new caption (Taglish):**
   - Opener from `brand/caption-pool.json` openers
   - Body: 3–5 short lines relevant to the content type
   - CTA: one line max
   - Closer from `brand/caption-pool.json` closers
   - Hashtags: base_hashtags + slot-appropriate set (from `templates.json`)

5. **Show the new caption to Jeff** for review before saving.

6. **On Jeff's approval**, overwrite `content/<week>/<slot>/drafts/draft.md` with updated caption.

7. **Run `update-approval-page`** to reflect the change.

## Caption rules
- Taglish only — never pure English unless quoting a tool
- Max 5 sentences in the body
- One CTA per caption
- 8–15 hashtags total
- Never use urgency tactics or hard-sell language
