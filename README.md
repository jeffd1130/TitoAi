# Tito AI — Social Media Content System

Weekly content production for **@TitoAIPH**, a Filipino AI education channel by Jeff de las Armas.

> *"AI Para Sa Ating Lahat" — Kumusta, mga Pamangkin!*

## How it works

1. Plan and make posts with **Tito AI Studio** (`bash studio/start.sh`, then http://localhost:4545): chat with the Tito AI chief of staff, and the agents write scripts, captions, slides and videos.
2. Review and approve in **Approve & Post**. Each post shows its posting time (PHT) and can be sent to Telegram.
3. Jeff posts natively on TikTok, Instagram and Facebook, then taps **Mark posted** (it moves to the **Posted** tab).

## Weekly schedule (PHT)

| Day | Content | Post time |
|-----|---------|-----------|
| Monday | AI tip carousel | 8:00 PM |
| Wednesday | Demo carousel | 7:00 PM |
| Friday | Story / reel | 7:00 PM |

## Where things live

```
CLAUDE.md        project rules and current status (source of truth)
AGENTS.md        notes for other AI tools (Codex / ChatGPT)
studio/          Tito AI Studio
content/         weekly folders (YYYY-W##) and strategy/
docs/            GitHub Pages hub: https://jeffd1130.github.io/TitoAi/
brand/           colors, fonts, logos, chibi host
reports/         weekly reports, metrics, history-2026.md
automation/      cron reminders (Telegram)
Videos/, Images/ raw footage
```

## Open this project

```bash
cd ~/Documents/Claude/TItoAi && claude
```

Then say **"produce this week"** or **"weekly status"**.
