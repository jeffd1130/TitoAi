# Character sheets — Tito AI Team (7 characters)

**Main risk: character consistency.** Our first Part 2 drifted to a 3D-toy style with stubble and puppet-like elbows and was rejected (Nov 3). Flow can only hold a look it was given. **Generate and approve all 7 reference images (and 7 start frames) BEFORE spending any Flow credits.** If a reference isn't right, fix it in the image tool; don't try to fix it in Flow.

## Style family (same for all)

Same soft painterly 2D chibi family as the Tito AI chibi (`docs/assets/avatars/tito-ai-chibi-*.png`): soft brush shading, friendly adult chibi proportions, smooth rounded arms and elbows, warm cream/marigold/coral/teal/navy accents. Not a puppet, toy, action figure or 3D render. No facial hair on any agent, so nothing leaks onto Tito. These are illustrated characters, not real people.

## Style line (paste at the end of every character prompt)

> Soft painterly 2D illustration in the same style family as the attached Tito AI chibi: friendly adult chibi proportions, smooth rounded arms and elbows with natural bends, five correct fingers on each hand, soft brush shading and warm colors (cream, marigold, coral, deep teal, navy). Not a puppet, toy, action figure, clay or 3D render; no hard joints or hard corners. Plain flat light-cream background, full body, front view, neutral friendly standing pose, both hands visible, feet visible. No text, letters, logos, watermarks or real brands. No other people.

Attach the approved Tito chibi (`docs/assets/avatars/tito-ai-chibi-wave.png`) as the style reference for every prompt.

## Prompts

### 1. Tito AI (Ep 1) — use the existing chibi, don't redesign
No new character. Use `docs/assets/avatars/tito-ai-chibi-wave-screen.png` (or `-wave.png`). Rules from `brand/tito-ai-chibi-avatar.md`: short black hair, clean-shaven, white crew-neck tee, jeans, white sneakers, black watch on the left wrist, bead bracelet. Optional image prompt for the Ep 1 start frame is in the start-frame section below.

### 2. Tita Saliksik (researcher) — magnifier
> Character sheet of "Tita Saliksik," a warm adult Filipina researcher in her 40s. Shoulder-length black hair in a low bun, round glasses, kind smile. Deep teal cardigan over a cream blouse, navy slacks, tan flats. She holds a large magnifying glass in her right hand and a small stack of blank papers in her left. [style line]

### 3. Kuya Sulat (scriptwriter) — pen
> Character sheet of "Kuya Sulat," a friendly adult Filipino scriptwriter in his late 20s. Short side-swept black hair, no glasses, no facial hair, relaxed smile. Marigold sweater vest over a white collared shirt, beige chinos, brown shoes. He holds a pen in his right hand and a blank notebook under his left arm. [style line]

### 4. Ate Disenyo (content creator) — palette
> Character sheet of "Ate Disenyo," a cheerful adult Filipina designer in her late 20s. Chin-length black bob with a coral headband, small paint smudges on her cheek. Coral smock over a cream T-shirt, dark jeans, white sneakers. She holds a wooden paint palette in her left hand (colors: cream, marigold, coral, teal, navy) and a thin brush in her right. [style line]

### 5. Kuya Kamera (video render) — clapperboard
> Character sheet of "Kuya Kamera," a stocky, easygoing adult Filipino video operator in his 30s. Navy baseball cap worn forwards, short black hair, no facial hair, wide grin. Deep teal zip-up hoodie, gray cargo shorts, black sneakers. He holds a blank black-and-white clapperboard (no writing on it) in his left hand, the other hand giving a thumbs up. [style line]

### 6. Lola Suri (QA) — checklist
> Character sheet of "Lola Suri," a sharp, kind older Filipina in her 70s, the quality checker. Silver-gray hair in a neat bun, large square glasses, gentle but serious smile. Navy cardigan with a small marigold brooch over a cream blouse, long soft skirt, comfortable flats. She holds a clipboard with a checklist of blank lines with checkmarks (no readable words) and nothing else in her other hand; she does not hold a pen. [style line]

### 7. Tito Numero (analyst) — chart
> Character sheet of "Tito Numero," a calm adult Filipino analyst in his 50s. Short salt-and-pepper hair, rectangular glasses, no facial hair, thoughtful smile. Navy vest over a white shirt with a deep teal tie, gray trousers, brown shoes. He holds a small rolled bar chart in his left hand and points at a simple colored bar chart (no numbers or letters) with his right. [style line]

## Check each reference image (before Flow)

- [ ] Soft painterly 2D, same family as the Tito chibi; no 3D, clay or toy look
- [ ] Smooth rounded elbows and wrists; no hard corners
- [ ] Hands: five fingers each, nothing melted; prop is held naturally
- [ ] Plain background, full body, feet visible
- [ ] No text, logos or watermarks (including on clapperboard, clipboard, chart)
- [ ] Distinct silhouette from Tito and from the other 5: hair, glasses, color and prop
- [ ] No facial hair on any agent

Save approved images in `docs/assets/avatars/studio-team/` as `tita-saliksik.png`, `kuya-sulat.png`, `ate-disenyo.png`, `kuya-kamera.png`, `lola-suri.png`, `tito-numero.png`.

## Reference-image workflow so Flow stays consistent

1. **Generate each character on a plain background** in ChatGPT or Gemini images, with the Tito chibi attached as the style reference and the style line above. Re-roll until the checklist passes. Generate 2–3 and pick the best.
2. **Lock the look.** Once approved, re-use the exact same image as the reference for every later image of that character. Don't re-describe the character from scratch in later prompts.
3. **Make one start frame per episode** (a duo of Tito + the agent, in the episode's setting). Use this prompt, with the two approved images attached:
   > Using the two attached characters exactly as they are (do not redesign either one), create one 9:16 illustration of them together in [setting]. Same soft painterly 2D style as both references, same outfits, props and faces. Tito AI (clean-shaven, white crew-neck tee, jeans, white sneakers, black watch on the left wrist, bead bracelet) is on the left; [agent] is on the right holding [prop]. Both fully in frame, hands visible, friendly poses. No text, letters, logos or real brands; screens and boards show only blank colored shapes. No other people.
4. **Check hands and elbows on the start frame** with the checklist above. A bad start frame ruins all 4 shots.
5. **Flow in Frames mode:** upload the start frame as the first frame (no Ingredient needed). Paste Shot A from `flow-prompts.md`. Then **Extend** for B, C and D, each with the exact style line.
6. **Check every clip** against the acceptance checklist before the next 10 credits. Scrub around every arm movement.
7. If an extend drifts, re-roll that extend only (the 10-credit spare). If it drifts twice, stop and change the start frame, not the prompt.

## Start-frame settings (one per episode)

| Ep | Setting | Characters | Held prop / scene detail |
|---|---|---|---|
| 1 | Tito's desk with a tablet; six small blank glowing cards floating around it | Tito only | Tablet screen faces the viewer, shows blank colored cards only |
| 2 | Wall calendar of blank squares, desk with paper stacks | Tito + Tita Saliksik | Magnifier |
| 3 | Writing desk with three blank scrolls/cards (one with a dotted outline) | Tito + Kuya Sulat | Pen |
| 4 | Studio wall with five blank slide cards | Tito + Ate Disenyo | Palette |
| 5 | Small video corner with an empty film-strip slot and a level meter of colored bars | Tito + Kuya Kamera | Clapperboard |
| 6 | Reading table with a stack of papers and a small flag | Tito + Lola Suri | Checklist clipboard |
| 7 | Board with a blank bar chart and a calendar of seven blank squares | Tito + Tito Numero | Chart |

Safer fallback if duo shots keep drifting: generate **single-character** clips (agent only), then Claude Code composites the approved Tito chibi PNG next to the agent in Remotion. Less motion for Tito, but no style drift between two characters.
