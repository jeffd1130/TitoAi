# Live Content Timeline — how it stays updated

Two files, dropped together in your repo (e.g. `docs/`):

- **`timeline.html`** — the page. Never needs editing. On load it fetches `schedule.json`, renders the timeline, and re-checks every 60 seconds (an open tab updates itself).
- **`schedule.json`** — the data. **This is the only file Claude Code edits.**

The loop:
> Claude Code changes a task → edits `schedule.json` → `git commit && git push` → GitHub Pages serves the new JSON → the live timeline shows it. No HTML editing.

Live URL once deployed: `https://jeffd1130.github.io/TitoAi/timeline.html`

---

## `schedule.json` shape

```jsonc
{
  "updated": "2026-06-19",                 // YYYY-MM-DD — drives the "TODAY" marker + "updated" stamp
  "handle": "@TitoAIPH",
  "base": "https://jeffd1130.github.io/TitoAi/",  // prepended to each post.url
  "weeks": [
    {
      "id": "W26",
      "range": "Jun 22–28",
      "theme": "⭐ BOOST LAUNCH · Php 2,000 · TikTok",
      "highlight": true,                   // optional — paints the week label gold
      "boost": "TikTok",                   // optional — counts toward "BOOST WEEKS"; null if none
      "posts": [
        {
          "day": "MON",                    // MON | WED | FRI  (sets the badge color)
          "title": "Ang Sabi Nila: Pang-Matalino Lang Iyan",
          "tag": "Carousel",               // optional teal sub-label
          "note": "AI myth-busting",       // optional italic description
          "date": "Jun 22",
          "status": "planned",             // posted | draft | planned | tbd
          "url": "W26-mon-captions.html",  // optional — relative to base; makes the row a ↗ link. null = no link
          "boost": "TikTok"                // optional — TikTok | Instagram | Facebook
        }
      ]
    }
  ]
}
```

### `status` → what shows
| status | badge | counts as | filter |
|---|---|---|---|
| `posted` | green POSTED | Shipped | Shipped |
| `draft` | gold DRAFT | Upcoming | Upcoming |
| `planned` | gray PLANNED | Upcoming | Upcoming |
| `tbd` | gray TBD | Upcoming | Upcoming |

The **TODAY** divider is drawn automatically before the first non-`posted` post. The stat strip (total / shipped / upcoming / boost weeks) is computed automatically.

---

## Rule to add to your repo's `CLAUDE.md`

```
## Content timeline
docs/schedule.json is the single source of truth for the published timeline
(docs/timeline.html renders from it). Whenever a post's status, title, date,
link, or boost changes — or a new week/post is added — update docs/schedule.json
to match, keeping the schema in docs/timeline-README.md. Set "updated" to today.
Do NOT edit timeline.html. Commit and push so GitHub Pages republishes.
```

That's it — point Claude Code at `schedule.json` and the page takes care of itself.
