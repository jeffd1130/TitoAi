# Tito AI Studio

A local web dashboard where you can watch the Tito AI agents work, chat with them, approve their output, render videos, and send approval updates to Telegram.

It runs on your Mac and uses your **Claude plan through Claude Code**, so there are no API keys and no extra cost.

## Start it

On this Mac only:
```bash
bash /Users/jeff/Documents/Claude/TItoAi/studio/start.sh
```

With your phone too (same home Wi-Fi):
```bash
bash /Users/jeff/Documents/Claude/TItoAi/studio/start.sh phone
```
The terminal prints a **private phone link** (`http://<your-Mac-IP>:4545/?key=…`). Open it once on your phone, then add it to your Home Screen. Without the key, the studio refuses every request, so others on the Wi-Fi can't use it. The key lives in `studio/data/access-key`; delete that file to get a new one.

Stop it with Ctrl+C in that terminal.

**Double-click apps:** **Tito AI Studio** and **Tito AI Studio (Phone)** are on your Desktop. Each opens Terminal and starts the studio. (On a Mac this replaces a Windows `.exe`; macOS can't run `.exe` files.)

## 💬 Start with Tito AI (the main producer)

Open the **💬 Tito AI** tab (the home screen) and just say what you want, e.g. *"Gawin natin ang W46 Monday post. Walang Flow credits, carousel na lang."*

1. **Tito AI** (🎙️) makes a short plan (week, slot, topic, format, growth job), asking at most one question.
2. It **starts the team one by one**. Each agent shows up under **Team at work** and as a live card in **Agents**.
3. When an agent finishes, Tito AI reads the result and **starts the next step on its own** (up to 8 steps per message, so it can't loop forever).
4. You can talk to Tito AI at any time, or tap a team member to open its card and talk to that agent directly.
5. Finished posts land in **Approve & Post**.

**Video or carousel?** Reels need chibi motion clips you make by hand in Google Flow, then Gemini. If you have no credits (or no time), tell Tito AI and it switches to the **carousel fallback**: Kuya Sulat writes the script and captions, Ate Disenyo writes `carousel.json` (`studio/carousel-schema.md`), the studio **renders branded 1080×1350 slides itself** (chibi, logo, page dots), Lola Suri runs QA, and the post appears in Approve & Post.

## The team

| Column | Agent | Real agent file | Job |
|---|---|---|---|
| Research | 🔎 **Tita Saliksik** | `tito-researcher` | Plans weeks and writes `brief.md` |
| Script | ✍️ **Kuya Sulat** | `tito-scriptwriter` | Writes the script and TikTok/IG/FB captions |
| Create | 🎨 **Ate Disenyo** | `tito-content-creator` | Writes the ChatGPT slide pack |
| Video | 🎬 **Kuya Kamera** | `video-producer` (built-in) | Renders a Remotion video and levels the audio |
| QA | 🧐 **Lola Suri** | `tito-qa` | Checks brand, accuracy and captions, then gives a VERDICT |
| Insights | 📊 **Tito Numero** | `tito-analyst` | Reads metrics and writes the weekly check & balance |
| 💬 tab | 🎙️ **Tito AI** | `tito-main` (built-in) | Producer: plans with you and runs the team |
| Create | 🖼️ **Ate Disenyo** (render) | `carousel-render` (built-in) | Turns `carousel.json` into PNG slides |
| (any column) | 🤖 **Tito Helper** | `general` | Plain Claude Code in the project |

The names are only for the studio. The agent files in `.claude/agents/` keep their `tito-*` IDs.

## How to use it

1. Click **+ Run** on a column, pick the agent, and say what to do. Quick-start chips fill in common prompts.
2. Watch the card: live text, the tools it uses, and the files it writes. Click a file to preview it.
3. Use the card's **chat box** to steer it ("shorter hook", "use 5 hashtags"). It continues the same conversation.
4. When you're happy, click **Approve**. Then **→ Next** starts the next column with the files passed along.
5. **Video tab:**
   - **Render slides** from any `carousel.json` (the no-video fallback).
   - **Render** a composition (Parts 1–5, W34 bonus, …) to `docs/media/studio/`.
   - Use **Frame strip** to check that the chibi matches before approving.
   - Copy the **Flow prompt** in the style-matched format.
6. **Approve & Post tab** (works on your phone):
   - each post has its video or swipeable slides, a download button, and the TikTok / IG / FB captions plus the seed comment, each with **Copy**
   - **✓ Approve**, then post it yourself in each app, then tap **Mark posted** (optionally paste the post link)
   - **Ask Kuya Sulat for changes** opens a caption-edit run for that post
   - posts are listed in `studio/posts.json`; captions are read live from the content `.md` files, so edits show up right away
7. **Send to Telegram** opens an editable approval message. Nothing sends until you press Send. Nothing is ever posted to social media.

## Good to know

- **Video generation is still manual.** Google Flow/Gemini have no free API. Use the Flow prompt helper (Flow first, Gemini after). The status bar keeps today's Flow credits as you type them.
- **Auto-push:** the project's existing hook commits and pushes to GitHub whenever an agent writes a file. Studio state (`studio/data/`) is git-ignored.
- Agents run with `--permission-mode acceptEdits` and only the tools listed in their agent file.
- Cards and history survive a restart. A run that was working when the server stopped shows as **Stopped**; chat to it again to continue.
- Parts 3–5 render only after their Flow/Gemini clip is saved as `w44-friday-motion-sample/public/origin-gemini-part-N.mp4`.

## Main board (🗺️ Board tab, default)
A Figma-style canvas: drag the background or scroll to move, ⌘/Ctrl + scroll or pinch to zoom, **Fit** (or `1`) to see everything, double-click to add a sticky note (saved in `studio/data/board.json`). Frames:
- **Chief of Staff · Tito AI**: every conversation with the main agent, with a composer. Same agent as the 💬 Tito AI tab.
- **Workflow · live**: Jeff → Tito AI → Tita Saliksik (task summary only) → Kuya Sulat → video lane (ChatGPT makes the clip in Flow, then Gemini → Claude Code handoff review → Kuya Kamera) or carousel fallback (Ate Disenyo → slide render) → Lola Suri → your approval. Working agents pulse and show Figma-style cursors.
- **ChatGPT → Claude handoff**: lists files in `handoff/chatgpt/` (video plus same-name `.md` note; see its README). **Hand to Claude** sends it to the chief of staff with a frame strip, who checks the chibi and finishes it (the `place_file` action copies it into `w44-friday-motion-sample/public/` or `docs/media/`).
- **Your approvals · final only**: final videos and unapproved posts. Research, scripts and other steps finish as **Done** and flow on without your approval.
- **Content calendar**: month view of `docs/schedule.json`, colored by status. Click a post for its notes or to ask the chief of staff about it.

**Results · Tito Numero (Nov 5):** the bottom frame on the Board shows the newest `reports/data/*-metrics.json` pull (TikTok Studio + Meta Business Suite) and the top line and boost call from the newest weekly report. It flags pulls older than 7 days. It refreshes every 5 minutes; new pulls show up without a restart.
