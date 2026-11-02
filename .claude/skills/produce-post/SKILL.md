# produce-post

Produce one complete draft for a specific content slot (cover graphic + caption + approval page entry).

## Trigger phrases
"make Monday's post", "produce Wednesday", "redo Friday's draft", "produce [slot-name]"

## Steps

1. **Identify the slot** from the user's request. Map to slot key: `01-mon-ai-tip`, `02-wed-demo`, or `03-fri-inspiration`.

2. **Review before producing.** Work only in `/Users/jeff/Documents/Claude/TItoAi/`. Check `docs/schedule.json`, recent captions/scripts, the latest engagement report, and any available current account metrics. Avoid topics Jeff has reported posted. Give the draft one measurable job (follow, save, comment, or inquiry) and record the hook/format/CTA hypothesis; never promise virality or invent metrics.

3. **Check for raw assets** in `content/<YYYY-W##>/<slot>/raw/`. If the folder is missing or empty, create it and produce an on-brand image or short video draft using the approved chibi/logo assets and, when useful, a newly generated visual. Label generated imagery and practice examples clearly. Save the asset in the Tito AI project and continue toward a review draft; do not stop merely because Jeff has not supplied media. Do not use identifiable seminar attendees or client material without verified permission. Send the new asset to Jeff for approval before any posting.

4. **Select cover asset and visual host:** Include the approved Tito AI chibi avatar and logo in every new carousel or video, with a pose that fits the story, unless Jeff explicitly asks otherwise.
   - Look for `.jpg` / `.jpeg` still frames first (preferred for cover graphic).
   - If only video, extract a representative still (use the first frame or a notable moment).
   - Fallback: use the newly created draft asset or approved chibi artwork. Do not silently substitute old or unrelated footage.

5. **Upload asset to Canva** via the connected Canva tool when available. Keep the generated source in the project regardless of Canva status.

6. **Generate cover graphic** via the connected Canva design tool:
   - Use the slot's `generation_prompt` from `templates.json`
   - Apply `brand_kit_id` if set in `templates.json`
   - Size: 1080x1920 (9:16 vertical reel format)

7. **Export preview PNG** via Canva → save to `content/<week>/<slot>/drafts/cover-preview.png` and `docs/assets/<slot>-preview.png`.

8. **Write caption** (Taglish):
   - Start with opener from `brand/caption-pool.json`
   - Body: 3–5 short lines based on the slot content type and brief.md if present
   - End with closer + hashtags (base + slot-specific sets from `templates.json`)
   - Save caption to `content/<week>/<slot>/drafts/draft.md`

9. **Update approval page** — call `update-approval-page` skill or update `docs/index.html` with this slot's data.

10. **Push to GitHub** — verify that the auto-push hook or explicit push actually lands and that public links resolve.

11. **Write Buffer scheduling block** — append to `content/<week>/<slot>/drafts/draft.md` as an instruction for Tito AI only; do not schedule or publish:
    ```
    ## Buffer
    Schedule: <PHT drop time> Manila
    Channel: Instagram → use IG caption
    Channel: Facebook → use FB caption
    Upload: export cover-preview.png as the media file
    ```

12. **Report to Jeff:**
    - Slot name + drop time (Manila)
    - Caption preview (first 2 lines)
    - Canva edit link
    - Buffer: remind Jeff to schedule in Buffer at buffer.com (workspace: jeffd321@live.com)
    - Approval page URL: `https://jeffd1130.github.io/TitoAi/`
    - Growth hypothesis and what metric to review after posting (for example follows per 1,000 views, saves, shares, or qualified comments)
    - If live metrics or Canva are unavailable, say so and hand over the local/public draft assets that were completed; do not fabricate a Canva link or performance result.
