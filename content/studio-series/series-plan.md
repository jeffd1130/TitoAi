# Ang Team ni Tito AI — 7 Katulong, 1 Studio

**Status:** planning draft (Nov 5, 2026) · nothing scripted into `schedule.json`, nothing scheduled or posted · Jeff approves everything.
**Runs after:** origin recut Part 5 (Fri Nov 13). Parts 3–5 take Flow credits first.
**Format:** 7 vertical videos, about 28 seconds spoken (32s of Flow clips trimmed), Jeff's voice (or a voice Jeff approves), 4 shots × 8s in Google Flow.

Alternate titles if Jeff prefers: *"Kilalanin ang Barkada ni Tito AI"* · *"Sino ang Katulong ni Tito AI?"*

## Growth job and hypothesis

**One job: FOLLOW.** Every episode ends with one follow ask and the next-episode cue. No comment, save or DM asks.

**Hypothesis (testable):** If each episode opens with a hard one-line hook in second 0–1, is labeled "Ep X/7", and ends with "Follow ka sa Tito AI" plus a next-episode cue, then viewers will stay past the first seconds and some will follow to catch the next character.

| Signal | Baseline (from `reports/2026-11-05-weekly-checkbalance.md`) | What to compare |
|---|---|---|
| 3-second views ÷ views (Meta) | Origin Part 1: 41 of 266 (15%) | Ep 1, 2, 3 |
| Average play time (Meta) | Part 1: 2s | Ep 1, 2, 3 |
| Follows per episode | Part 1: 0 on IG/FB; TikTok per-post follows not shown | Ep 1 → Ep 7 |
| Ep N+1 views vs Ep N | none | does the cue pull people forward? |

**Decision gate after Ep 3:** Tito Numero reads the pulls. If 3-second views and follows are no better than Part 1, stop and rework the hook or shorten the series. Growth is a goal, not a guarantee. No boost without current organic data and Jeff's OK.

## What the series is (and isn't)

Plain-language tour of the Tito AI Studio: a local dashboard on Jeff's Mac. The "agents" are Claude Code helpers that run on Jeff's own plan, with no API. Each one has a narrow job and its own file in `.claude/agents/`.

- Nothing is auto-posted. Jeff approves the final post in the Approve & Post tab, then posts it himself.
- No claims about results, views, growth or time saved.
- The characters are illustrations of the agents. They are not real people. Label them "Illustration" in the final shot.
- Free tools only. Don't name paid tools.

## Episodes (in order)

Sources: `.claude/agents/*.md`, `studio/README.md`, `studio/carousel-schema.md`, `studio/server.js` (personas and the main prompt).

### Ep 1 — Tito AI (chief of staff / producer) · `ep-1-tito-ai`
- **Really does:** chats with Jeff, makes a short plan (week, slot, topic, format, growth job), starts the team one agent at a time, reads each result and starts the next step (up to 8 steps per message). Switches to the carousel fallback when Jeff says there are no video credits. Hands over when QA passes. Shows summaries and the final-only approvals on the Board.
- **Can't do yet:** it reads files but can't edit them; every change goes through a team member. It never posts, schedules, boosts or sends messages. Telegram only sends when Jeff presses Send.

### Ep 2 — Tita Saliksik (researcher) · `ep-2-tita-saliksik`
- **Really does:** turns an unplanned week into briefs (working title, pillar and persona, tool and exact prompt, slide outline, proof needed, risks). Reads `CLAUDE.md`, strategy notes, `docs/schedule.json`, the last 4 weeks of briefs and the latest report so lessons aren't repeated. Checks that a tool is free with a web search. Replies with a short task summary only.
- **Can't do yet:** can't open a browser or pull metrics. Doesn't touch `schedule.json`, Canva, Telegram or Buffer. Doesn't test the prompt.

### Ep 3 — Kuya Sulat (scriptwriter) · `ep-3-kuya-sulat`
- **Really does:** writes `script.md` and `captions.md` from a brief: separate TikTok, IG and FB captions, five hashtags each, one CTA, max 3 emoji. If a prompt is untested, he marks the slide `[PLACEHOLDER — paste real output]` instead of writing fake AI output.
- **Can't do yet:** has no tool to run a prompt in an AI model, so tested output has to come from Jeff. Doesn't touch Canva, Telegram, Buffer or `schedule.json`.

### Ep 4 — Ate Disenyo (content creator) · `ep-4-ate-disenyo`
- **Really does:** two jobs under one name. (1) `tito-content-creator` writes a ChatGPT-ready slide pack from a finished script. (2) For the carousel fallback, she writes `carousel.json` per `studio/carousel-schema.md` (3–7 slides, 5 is standard; fields like headline, body, prompt, list, cta, chibi pose, label) and the studio renders branded 1080×1350 PNGs with the chibi, logo and page dots. Fictional scenarios must carry a label.
- **Can't do yet:** doesn't call ChatGPT, so Jeff generates slide pack images himself. The chibi poses are limited to `wave`, `teach`, `surprised`, `wave-screen`, `none`. She can't capture real AI output screenshots.

### Ep 5 — Kuya Kamera (video render) · `ep-5-kuya-kamera`
- **Really does:** renders a Remotion composition and levels the audio with ffmpeg loudnorm (about -14 LUFS). The Video tab also has a Frame strip to check that the chibi matches before approving, and a Flow prompt helper.
- **Can't do yet:** **cannot generate Flow or Gemini clips; Jeff makes those by hand.** Parts 3–5 only render after their clip is saved in `w44-friday-motion-sample/public/`. **There is no Remotion composition for this series yet**; one must be built before Kuya Kamera can render it (see decisions).

### Ep 6 — Lola Suri (QA) · `ep-6-lola-suri`
- **Really does:** read-only reviewer (Read, Glob, Grep). Checks drafts against `CLAUDE.md`, brand files and `schedule.json`. Blockers: fake output, unlabeled fictional scenario, attendee footage without permission, repeated lesson, paid tool as the main solution, wrong slot or time. Fixes: voice, caption split, hashtag count, more than one CTA, over 3 emoji, slide typos, off-palette colors, chibi drift. Gives `VERDICT: PASS | FIX NEEDED | BLOCKED`.
- **Can't do yet:** can't fix anything; she only reports. Her verdict is a review, not approval. Jeff decides.

### Ep 7 — Tito Numero (analyst) · `ep-7-tito-numero`
- **Really does:** reads the newest `reports/data/*-metrics.json` (TikTok Studio and Meta Business Suite pulls) and writes `reports/<date>-weekly-checkbalance.md`: top line, table, repeat/drop/test, boost call, data gaps. Flags pulls older than 7 days. Recommends no boost when current organic data is missing. The Board's Results frame shows the newest pull.
- **Can't do yet:** can't open a browser; Claude Code pulls the data first. Never estimates missing numbers. Can't boost or post.

## Posting options (Jeff chooses)

Nov 16–27 slots already hold scripted carousels (W47 Wed/Fri, W48 Mon/Wed/Fri), so the default leaves them alone.

| Option | Dates (7 PM PHT Fri, 8 PM PHT Mon) | Notes |
|---|---|---|
| **A (default): Fridays after Nov 27** | Dec 4, 11, 18, **25**, **Jan 1**, 8, 15 | Doesn't displace anything. Dec 25 and Jan 1 are holidays: consider moving those two to Thu or Sat. Runs 6 weeks. |
| B: Mon + Fri from Nov 30 | Mon Nov 30, Fri Dec 4, Mon Dec 7, Fri Dec 11, Mon Dec 14, Fri Dec 18, Mon Dec 21 | Done before Christmas. W49+ slots not yet planned; the series would replace the carousel slots there. |
| C: replace some W47–W48 carousels | e.g. swap W47 Fri Nov 20 and W48 Fri Nov 27 for Ep 1–2 | Starts sooner, but displaces scripted carousels and needs your OK per slot. |

W47 Mon (Nov 16) has no brief file in `content/2026-W47/`; confirm in `schedule.json` before using it. Posting stays manual. Pin or boost only on your call.

## Credit budget (Google Flow)

- Flow: 50 free credits a day, no rollover. Veo 3.1 Lite is 10 credits per 8s clip or extend.
- One episode = 4 clips × 10 = **40 credits**. Spare **10 per day** = one re-roll.
- 7 episodes = **280 credits ≈ 7 days of credits** (one episode a day). A second re-roll in one day spills to the next day, so budget 7–8 days.
- Parts 3–5 come first. Use only the days they leave free.
- The 7 reference images and 7 start frames (ChatGPT/Gemini images) cost no Flow credits.
- Flow video may be blocked at peak (about 10 PM–1 AM PHT). Run earlier in the day.
- Gemini Videos is the fallback after the day's Flow credits run out (about 4–5 videos a day).

## Production order

1. **Reference images first** (`character-sheets.md`): all 7 agent sheets plus 7 start frames. This is the main risk gate.
2. Jeff records 7 voice takes (about 28s each), or approves a voice.
3. Flow, one episode per day, with the acceptance checklist after every clip.
4. Kuya Kamera renders after a series composition exists (new Remotion composition, Claude Code builds).
5. Lola Suri reviews, then Jeff approves in Approve & Post.

## Risks

- **Character consistency is the main risk.** Our first Part 2 drifted to a 3D-toy look with stubble and puppet elbows (rejected Nov 3). Two characters per shot doubles the chance of drift. See `character-sheets.md`.
- Stubble or facial hair can leak onto Tito from other characters. Agent characters have no facial hair on purpose.
- Name clash: "Tito AI" is the channel, the host chibi and the chief-of-staff agent. Ep 1 script says "Tito AI sa Studio" for the agent.
- Voice: past voice candidates were synthetic and not a Jeff clone. Jeff must listen for Taglish tone.
- Hook order: the repo standard opener is "Kumusta, mga Pamangkin!" but the hook rule says the hook lands in second 1. Each script opens with a 4–6 word hook, then "Kumusta, mga Pamangkin!".
- The "what it does" lines come from the agent files. The examples are lines in the repo; I couldn't verify which agent wrote them (see each script's note).

## Decisions needed from Jeff

1. Posting option: A, B or C?
2. Voice: you record, or approve a synthetic voice?
3. Closer: keep "Follow ka sa Tito AI. Susunod: …" (current scripts) or the standard "Ingat lagi, mga Pamangkin. Tito AI — AI Para Sa Ating Lahat."?
4. Duo shots (Tito + agent) or single-character shots? Duo is the plan. Single-character is safer.
5. Build a new Remotion composition (captions, "Ep X/7" tag, hook) so Kuya Kamera can render the series?
6. Lola Suri example (Ep 6): did she really catch the S4 table wrapping issues in the Nov 18–27 carousels? I couldn't find a record, so the script uses her rule instead. An alternate line is ready.
