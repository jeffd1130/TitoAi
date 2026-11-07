# Origin recut — Part 4 motion clip ("Trial and error? Oo naman.")

- **For:** Tito AI five-part origin recut, Part 4. Posts **Wed Nov 11, 7:00 PM PHT**. Silent motion draft, not the final post.
- **File:** `origin-part-4-flow.mp4`: 720×1280, 30 fps, 31.7 s, no audio. Four 8 s shots, A → B → C → D2, joined end to end.
- **Made by:** Claude Code, Nov 7 2026, driving Google Flow (account jdelasarmas@angelcarehhs.com, per Jeff). Frames mode · Veo 3.1 Lite · 9:16 · x1 · "Return silent videos" ON. Used all 50 of the day's free credits (4 shots + 1 re-roll of D).
- **Method:** A starts from Part 1 at 18.5 s (`docs/media/tito-ai-origin-recut/flow-part-4/start-frame-part1-18.5s.png`). B, C and D each start from the previous shot's last frame. Raw shots are in `docs/media/tito-ai-origin-recut/flow-part-4/`.
- **Voice to use:** Jeff's original, uncut `w44-friday-motion-sample/public/origin-part-4.m4a` (25.5 s). Trim about 6.2 s of motion to fit.

## Exact prompts

**A — block falls, he laughs** (0–8 s)
> On the tablet screen a pretend website layout is being built; one colorful block wobbles and falls off. He laughs and playfully covers his face with one hand. Keep the EXACT same Tito AI chibi and the same soft, painterly 2D-illustrated style, colors and beige room as the starting frame. Completely clean-shaven (no stubble, beard or mustache), plain white crew-neck T-shirt, jeans, white sneakers, black watch on the left wrist, bead bracelet. Smooth, soft, rounded arms and elbows with natural bends; not a puppet, toy, action figure or 3D render, no visible joints or hard corners. The tablet screen faces the viewer, stays fully in frame, and shows only a simple pretend website with no real brands or logos. No captions, voice, dialogue, music or sound. No extra people.

**B — tries again, layout snaps in, one-fist cheer** (8–16 s)
> He tries again, typing quickly on the tablet. The colorful blocks of the pretend website layout snap neatly into place on the screen with a small sparkle, and he cheers happily with one fist raised. [same keep-the-chibi block as A]

**C — picks up tablet, walks to the door** (16–24 s)
> He lowers his fist, smiling, picks up the tablet, tucks it under his arm, stands up from the chair and walks toward the door of the room. [same keep-the-chibi block] The tablet stays fully in frame as he carries it. No captions, voice, dialogue, music or sound. No extra people.

**D2 — steps out onto a sunny tech street, amazed** (24–31.7 s; re-roll)
> He walks through the open door and steps out onto a quiet, sunny street lined with green trees and simple glass buildings, then looks around, amazed and smiling, the tablet still tucked under his arm. The whole scene, street and buildings included, is drawn in the EXACT same soft, painterly 2D storybook-illustration style as the starting frame … not photorealistic, not glossy, not a 3D render. The street is completely empty: no other people, no pedestrians, no cars, no logos, no company names, no readable signs. [same chibi block]

The first D was rejected (glossy 3D-looking street, a tiny pedestrian) and moved to Trash.

## Frame check (Claude Code)
- Same clean-shaven chibi, white crew-neck tee, jeans, white sneakers in every shot. Soft rounded arms, no puppet or 3D look. Tablet in frame.
- **Watch:** in B around 13–16 s (the cheer), the raised arm's watch turns into a bead bracelet. It's small, but the cleanest trim is to cut B's last 1.5–2 s.
- D2's street is painterly and empty. The chibi is a little smaller and flatter outdoors, which is expected for the wider shot.
- **Suggested trim to 25.5 s:** A 0.5–7.5 s, B 0–6.0 s, C 1.0–7.5 s, D2 0–6.0 s, about 25.5 s. Check against the voice beats.

## Finish (Tito AI Studio)
Trim to the voice, save the silent copy to `w44-friday-motion-sample/public/origin-gemini-part-4.mp4`, add the voice (loudnorm I=-14, TP=-1.5), captions plus PART 4 / 5 badge and hooks to match Parts 1–3, render `OriginChibiGeminiP4`, then QA. Keep the final's last frame: Part 5 starts from it. Jeff approves; nothing is posted or scheduled.

## Finished (Claude Code, Nov 7)
- Final: `docs/media/tito-ai-origin-recut/part-4-chibi-final.mp4` (1080×1920, 30 fps, 25.5 s, AAC 48 kHz, -14.3 LUFS, peak -1.4 dBFS). Cover: `part-4-chibi-cover.jpg`.
- Trim used: A 0.5–6.5 s, B 0–5.8 s (cuts most of the watch glitch), C 1.5–7.9 s, D2 0–7.3 s. He steps outside right as the voice says "where AI started… Silicon Valley".
- Silent motion: `w44-friday-motion-sample/public/origin-gemini-part-4.mp4`; rendered with the unchanged `OriginChibiGeminiP4` composition (Jeff's uncut voice, captions, PART 4 / 5 badge, hook and next-part text), then two-pass loudnorm.
- Part 5 start frame: `docs/media/tito-ai-origin-recut/flow-part-4/part-4-last-frame-for-part-5.png`.
- Captions: `content/2026-W45/bonus-origin-recut/captions.md`, section "Part 4 — animated chibi version". In Approve & Post for Wed Nov 11, 7:00 PM PHT. Waiting on Jeff's approval.
