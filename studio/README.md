# Tito AI Studio

A local web dashboard where you can watch the Tito AI agents work, chat with them, approve their output, render videos, and send approval updates to Telegram.

It runs on your Mac and uses your **Claude plan through Claude Code**, so there are no API keys and no extra cost.

## Start it

```bash
bash /Users/jeff/Documents/Claude/TItoAi/studio/start.sh
```

This opens http://localhost:4545. Stop it with Ctrl+C in that terminal. It only listens on your own computer.

## The team

| Column | Agent | Real agent file | Job |
|---|---|---|---|
| Research | 🔎 **Tita Saliksik** | `tito-researcher` | Plans weeks and writes `brief.md` |
| Script | ✍️ **Kuya Sulat** | `tito-scriptwriter` | Writes the script and TikTok/IG/FB captions |
| Create | 🎨 **Ate Disenyo** | `tito-content-creator` | Writes the ChatGPT slide pack |
| Video | 🎬 **Kuya Kamera** | `video-producer` (built-in) | Renders a Remotion video and levels the audio |
| QA | 🧐 **Lola Suri** | `tito-qa` | Checks brand, accuracy and captions, then gives a VERDICT |
| Insights | 📊 **Tito Numero** | `tito-analyst` | Reads metrics and writes the weekly check & balance |
| (any column) | 🤖 **Tito AI** | `general` | Plain Claude Code in the project |

The names are only for the studio. The agent files in `.claude/agents/` keep their `tito-*` IDs.

## How to use it

1. Click **+ Run** on a column, pick the agent, and say what to do. Quick-start chips fill in common prompts.
2. Watch the card: live text, the tools it uses, and the files it writes. Click a file to preview it.
3. Use the card's **chat box** to steer it ("shorter hook", "use 5 hashtags"). It continues the same conversation.
4. When you're happy, click **Approve**. Then **→ Next** starts the next column with the files passed along.
5. **Video tab:**
   - **Render** a composition (Parts 1–5, W34 bonus, …) to `docs/media/studio/`.
   - Use **Frame strip** to check that the chibi matches before approving.
   - Copy the **Flow prompt** in the style-matched format.
6. **Send to Telegram** opens an editable approval message. Nothing sends until you press Send. Nothing is ever posted to social media.

## Good to know

- **Video generation is still manual.** Google Flow/Gemini have no free API. Use the Flow prompt helper (Flow first, Gemini after). The status bar keeps today's Flow credits as you type them.
- **Auto-push:** the project's existing hook commits and pushes to GitHub whenever an agent writes a file. Studio state (`studio/data/`) is git-ignored.
- Agents run with `--permission-mode acceptEdits` and only the tools listed in their agent file.
- Cards and history survive a restart. A run that was working when the server stopped shows as **Stopped**; chat to it again to continue.
- Parts 3–5 render only after their Flow/Gemini clip is saved as `w44-friday-motion-sample/public/origin-gemini-part-N.mp4`.
