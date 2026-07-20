# Tito AI — Weekly Check & Balance (Jul 20, 2026)

Automated routine run. Covers automation health, social account health, and engagement-driven recommendations for W30.

---

## 1. Automation / Claude Code health

| Check | Result |
|---|---|
| Git log | Last commit `42e5d20` — Jul 18, "Update schedule + CLAUDE.md with W29 Fri carousel (DAHPvQsLPFo)." No commits Jul 19–20 (no content work landed those two days). |
| Git status | Clean. Branch up to date with `origin/main`. One untracked local file (`.claude/settings.local.json`) — machine-local, not a concern. No `index.lock` present. |
| Push state | Local `main` matches `origin/main` — nothing stuck unpushed. |
| Cron log (`/tmp/titoai-cron.log`) | **Not present in this sandboxed run** — same limitation as every prior cycle. This automated environment only mounts the `TItoAi` repo folder, not Jeff's actual Mac `/tmp` or crontab, so `tito-summary`/`tito-record`/`tito-create`/`tito-weekly`/`tito-remind` firing can't be confirmed from here. Would need to be checked directly on Jeff's Mac. |

**Verdict:** repo/automation-output health normal (clean, current, no conflicts). **However:** the lack of any commits since Jul 18 lines up with a real content gap flagged below — W30 Mon and Wed have no script/captions yet, and Mon drops tomorrow (Jul 21).

---

## 2. Social media account health (Instagram + TikTok)

**Could not complete this cycle.** `list_connected_browsers` returned empty (no Claude in Chrome extension connected), and direct `web_fetch` of both profile URLs returned empty content (JS-rendered pages, not visible to a static fetch). Per the no-fabrication rule, no live follower counts or engagement numbers are reported here.

**Last confirmed data** (from `reports/2026-07-18-health-check.md`, pulled Jul 18):
- **TikTok:** 152 followers (as of Jul 14) · 7-day views 3,100 (+131.1% WoW) · 133 likes · 9 shares · 98% FYP traffic.
- **Instagram:** 70 followers (as of Jul 14) · 90-day views 2,348 · profile visits 243.
- Two boosts were placed Jul 18 (W29 Wed carousel ₱300, W29 Fri S1E2 ₱200, both Followers/Profile-visits objective, 3-day duration) — **outcomes still unconfirmed**, this is now one full cycle without a re-check.

**Recommendation:** run this section while Jeff has Chrome open with the extension signed in, or have Jeff paste current follower counts / a screenshot next cycle. Confirming the Jul 18 boost outcomes should be the top priority next time browser access is available.

---

## 3. Engagement analysis (carried forward — no fresh data this cycle)

No new metrics were available, so this reaffirms the standing insights from `reports/2026-07-18-health-check.md` and `reports/2026-07-13-weekly-checkbalance.md`:

1. **Named-persona, step-by-step free-tool demos remain the top-proven format.** W29 Wed carousel ("Resume at Cover Letter — Claude ang Gagawa") is the best-performing post in channel history (1,016 views / 63 likes in 2 days as of Jul 18) — same shape as W27 Wed and W28 Wed.
2. **Carousel/slide format is outperforming reels on raw views** (top 2 posts as of Jul 18 were both carousels), though story reels still pull more comparative shares/likes per view.
3. **Pin-vs-unpinned is still an open question**, not a settled rule (per the Jul 14 finding that unpinned posts held 3 of the top 4 spots). Don't over-index on pinning as the primary performance lever until more data resolves this.
4. **Boost objective should stay Followers/Profile visits, not views** — 98% FYP traffic is reaching people but not converting into followers.
5. Branded search queries continue to grow ("titoserye Filipino ai," "tito ai story," "tito ai video") — name recognition is building week over week.

### Recommendations for W30 (Jul 20–26)

- **Urgent — content gap.** W30 Mon ("TBD — AI Tip," drops Jul 21, tomorrow) and W30 Wed ("TBD — Demo," drops Jul 23) both still show `status: draft`, `url: null` in `schedule.json` — no script or captions exist yet for either. D-2 (script + design day) for Monday's post should already have happened. **This needs Jeff's immediate attention** — recommend running `produce-post` for W30 Mon today to make the Jul 21 8 PM PHT drop.
- **Discrepancy found.** `schedule.json` lists `"url": "W30-fri-captions.html"` for W30 Fri (Story S1E3, "Tatay. Analyst. Trainer."), but that file does not exist in `docs/`. Flagging rather than fabricating placeholder content — script + captions still need to be written before the Jul 24 (D-1) approval step.
- **Format recommendation once W30 Wed is written:** if the week's demo topic allows, follow the same named-persona/step-by-step shape that has now won two consecutive weeks (W28 Wed, W29 Wed) — it's the single most data-grounded lever available.
- **Boost approach:** keep boost spend concentrated on the single strongest performer of the week (as done Jul 18) rather than spreading it thin, until the Jul 18 boost outcomes and the pin-vs-unpinned question are resolved with real data.
- **Priority for next cycle:** (1) confirm Jul 18 boost outcomes, (2) re-check whether W30 Mon/Wed content was produced in time, (3) pull fresh IG + TikTok metrics as soon as browser access is available.

---

## 4. What changed in the repo this cycle

- `docs/schedule.json`: `updated` bumped to 2026-07-20. Added boost note to W29 Wed and W29 Fri entries reflecting the Jul 18 boost placement (amount + objective) so the record isn't lost before outcomes are confirmed. Added urgency notes to W30 Mon and W30 Wed entries flagging the missing script/captions ahead of their drop dates.
- `CLAUDE.md`: appended a dated entry under the engagement-audit / weekly check-and-balance section summarizing this cycle — automation normal, social pull unavailable for the reasons above, and the W30 content-gap + W30-Fri-file-discrepancy flags.
- No caption HTML files were changed — W30 Mon and Wed have no caption files to add an insight banner to (they don't exist yet), and the W30 Fri file referenced in `schedule.json` is itself missing. Nothing fabricated in their place.

No metrics were invented anywhere in this report or in the updated files — every number traces back to `reports/2026-07-18-health-check.md` or earlier.
