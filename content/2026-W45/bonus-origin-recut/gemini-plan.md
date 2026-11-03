# Origin recut — Gemini video plan, Parts 2–5 (laptop chibi)

Owner: Claude Code (final owner of all Tito AI production tasks since Nov 3, 2026). Jeff approves. Trigger: Jeff pings Claude Code after the reset.

Status: Part 1 done (Gemini motion, tablet). Part 2 done as a still-image version (`docs/media/tito-ai-origin-recut/part-2-chibi-laptop.mp4`), to be replaced by Gemini motion. Parts 3–5 not started.
Gemini video limit resets **Nov 4, 2026, 1:52 PM PHT**. Daily allowance is only ~4–5 videos, so expect about one 30-second part per day.

## Non-negotiable character rules (Jeff, Nov 3)
- Same chibi in every shot: clean-shaven (no stubble/beard/mustache), plain white crew-neck tee (no collar/buttons), jeans, white sneakers, black watch on left wrist, bead bracelet, warm 3D illustrated style.
- Reference image for every prompt: `docs/assets/avatars/tito-ai-chibi-laptop-website.jpg`
- He works at a silver laptop on a wooden table; the screen faces the viewer at a three-quarter angle and shows a pretend website (no real brands). The whole laptop and screen stay in frame.
- Reject any clip where the character drifts. Check sample frames before using it.

## How each part is made in Gemini (gemini.google.com, account Jeff De Las Armas · Work · Pro)
1. Open **Videos** in the sidebar, set the aspect ratio to **Portrait (9:16)**, and attach the reference image.
2. Send shot A (10s). When it's ready, send shot B as "EXTEND the video you just created by 10 more seconds…", then shot C the same way. This gives one continuous ~30s video.
3. Download the final ~30s video from the last response, using the video element's src or the download control.
4. Save it as `docs/media/tito-ai-chibi-gemini-part-N-raw.mp4`, then save a silent copy at `w44-friday-motion-sample/public/origin-gemini-part-N.mp4` (`ffmpeg -i raw -an -c:v copy`).
5. Check the frames. If they pass, render with `npx remotion render OriginChibiGeminiPN out/origin/part-N-raw.mp4`, then run loudnorm (I=-14, TP=-1.5) to `docs/media/tito-ai-origin-recut/part-N-chibi-gemini.mp4`. For Part 2, first remove `2` from `STILL_PARTS` in `src/OriginChibiGemini.tsx`.

Common suffix for every shot:
> Keep the EXACT same character from the attached image: completely clean-shaven, plain white crew-neck T-shirt, jeans, white sneakers, black watch, bead bracelet, same warm 3D illustrated style. One silver laptop; its bright screen faces the viewer at a three-quarter angle and is fully in frame. The screen shows only a simple pretend website, with no real brands or logos. Real articulated body, hand, head and face movement, not a floating still. Correct hands, no extra people. No captions, voice, dialogue, music or sound.

## Part 2 — Website? AI ang tinanong ko. (30.0s)
- A: Daytime, cozy home workspace. He sits at the table typing on the laptop showing the pretend "MY DESIGN STUDIO" website, looks up and smiles at the camera, then points at the screen.
- B (extend): Evening falls, the window turns to a starry night, and the desk lamp switches on. He yawns, then leans in and types a question. Soft glowing blank chat bubbles (no readable text) float up from the screen; he reads them and gives an "aha" nod.
- C (extend): The website on the screen looks complete. He leans back with a proud smile, gestures at the screen with an open palm, and gives a thumbs up to the camera.

## Part 3 — Wala akong background. (27.5s)
- A: At the laptop, a blank notification card pops up on the screen. He looks surprised, eyebrows up, and scratches his head.
- B (extend): Floating "</>" code symbols and question marks swirl around him. He looks confused, sighs, then starts typing a question to the laptop.
- C (extend): Glowing blank chat bubbles answer him. He nods with determination, rolls up his sleeves, and gives a confident thumbs up.

## Part 4 — Trial and error? Oo naman. (25.5s)
- A: On the laptop screen a pretend website layout is being built; one colorful block wobbles and falls off. He laughs and covers his face playfully.
- B (extend): He tries again, typing quickly. The layout snaps into place with a sparkle, and he cheers with both arms up.
- C (extend): He closes the laptop, tucks it under his arm, and walks out onto a sunny, generic tech-campus street with trees and glass buildings (no logos or company names), looking around amazed.

## Part 5 — AI ang tulong, tao ang galaw. (29.5s)
- A: He walks along a sunny street holding the closed laptop, smiling and waving at the camera.
- B (extend): He sits at an outdoor café table and opens the laptop. The screen shows a simple pretend social-media content calendar grid. He types happily.
- C (extend): He turns to the camera, gives a warm smile, waves goodbye, and points at the camera as if saying "follow".
