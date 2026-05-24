# produce-post

Produce one complete draft for a specific content slot (cover graphic + caption + approval page entry).

## Trigger phrases
"make Monday's post", "produce Wednesday", "redo Friday's draft", "produce [slot-name]"

## Steps

1. **Identify the slot** from the user's request. Map to slot key: `01-mon-ai-tip`, `02-wed-demo`, or `03-fri-inspiration`.

2. **Check for raw assets** in `content/<YYYY-W##>/<slot>/raw/`. If empty, tell Jeff which slot is empty and stop.

3. **Select cover asset:**
   - Look for `.jpg` / `.jpeg` still frames first (preferred for cover graphic).
   - If only video, extract a representative still (use the first frame or a notable moment).
   - Fallback: use a still from `Videos/Intro/` if no raw assets yet.

4. **Upload asset to Canva** via `Canva:upload-asset-from-url` or local path upload.

5. **Generate cover graphic** via `Canva:generate-design`:
   - Use the slot's `generation_prompt` from `templates.json`
   - Apply `brand_kit_id` if set in `templates.json`
   - Size: 1080x1920 (9:16 vertical reel format)

6. **Export preview PNG** via `Canva:export-design` → save to `content/<week>/<slot>/drafts/cover-preview.png` and `docs/assets/<slot>-preview.png`.

7. **Write caption** (Taglish):
   - Start with opener from `brand/caption-pool.json`
   - Body: 3–5 short lines based on the slot content type and brief.md if present
   - End with closer + hashtags (base + slot-specific sets from `templates.json`)
   - Save caption to `content/<week>/<slot>/drafts/draft.md`

8. **Update approval page** — call `update-approval-page` skill or update `docs/index.html` with this slot's data.

9. **Push to GitHub** — the auto-push hook handles this on Write/Edit.

10. **Report to Jeff:**
    - Slot name + drop time (PHT + PST)
    - Caption preview (first 2 lines)
    - Canva edit link
    - Approval page URL: `https://jeffd1130.github.io/TitoAi/`
