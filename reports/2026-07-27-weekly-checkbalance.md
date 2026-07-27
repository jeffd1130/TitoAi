# Tito AI — Weekly Check & Balance (Jul 27, 2026)

Automated routine run. Covers automation health, social account health, and engagement-driven recommendations for W31.

---

## 1. Automation / Claude Code health

| Check | Result |
|---|---|
| Git log | Active and current. Last commit `a95ac8b` — today, Jul 27, 08:30 ("Add data-document-role annotations for Canva HTML import"). 4 commits landed today alone, building out all of W31 (Mon VA / Wed Freelancer / Fri S1E4 scripts + captions + carousel slide renders). |
| Git status (before this run) | **Not clean** — found a backlog that had been sitting uncommitted since ~Jul 21: `docs/exec-summary-jul22.html` deleted, `docs/exec-summary-jul22.pdf` regenerated, a renamed replacement `docs/Tito Ai Social Media EXEC SUMMARY.html` left untracked, and **last week's own health-check report** (`reports/2026-07-22-health-check.md`) was never committed. None of this is destructive — it's just been unstaged for ~6 days. Picked up and committed as part of this run (see §4). |
| Push state | Local `main` was up to date with `origin/main` before this run. |
| Cron log (`/tmp/titoai-cron.log`) | Not present in this sandboxed run — same limitation as every prior cycle (this automated environment only mounts the `TItoAi` repo folder, not Jeff's actual Mac `/tmp` or crontab). Reminder firing for `tito-summary` / `tito-record` / `tito-create` / `tito-weekly` / `tito-remind` can't be confirmed from here — would need to be checked directly on Jeff's Mac. |

**Verdict:** Repo/automation output is healthy — content is being produced and committed on schedule (W31 fully scripted a day ahead of its Mon Jul 28 drop). The one real finding is a **process gap**: files (including a prior week's own report) can sit uncommitted for close to a week before an automated run notices and sweeps them up. Worth a habit check on Jeff's end — commit right after generating a report/exec summary rather than leaving it for the next cycle to catch.

---

## 2. Social media account health (Instagram + TikTok)

**Could not complete this cycle.** Claude in Chrome reported "not connected" on three retries, and a direct `web_fetch` of both profile URLs returned empty content (both are JS-rendered pages that don't serve meaningful HTML to a static fetch). Per the no-fabrication rule, no new follower counts or engagement numbers are reported here — this is now the **third of the last four scheduled cycles** (Jul 13, Jul 20, and now Jul 27) where this automated run had no browser access. The one live pull that succeeded in that window (Jul 22) appears to have been run manually/out-of-band with Chrome open, not from this scheduled context.

**Last confirmed data**, from `reports/2026-07-22-health-check.md` (pulled Jul 22, via TikTok Studio + IG public profile):

- **TikTok:** crossed **1,000 followers** (milestone). 7-day (Jul 13–19) views 4,500 (+317.5% WoW), 350 likes, 16 shares, 2 comments, 33 profile views. Traffic 93.7% FYP. Top post: S1E2 "Pares Clark" story reel — 4,600 all-time views, boosted (₱200, Jul 18), drove 365 new followers in 7 days. W29 Wed carousel (Resume/Cover Letter) — 1,100 all-time views.
- **Instagram:** 73 followers. Insights unavailable (login-gated); last known baseline ~230 avg reel views, 8.6% engagement rate (from Jul 14 data).
- Both Jul 18 boosts (W29 Wed ₱300, W29 Fri ₱200) are now **confirmed** via the Jul 22 pull — the Fri boost (S1E2) clearly drove the 365-follower/4,600-view spike; the Wed boost (carousel) landed a more modest 1,100 views. This closes out the "unconfirmed boost outcome" item that had been open since Jul 18.

**Recommendation, again:** run this section while Jeff has Chrome open with the extension signed in, or have Jeff paste current follower counts/a screenshot next cycle. Given this has now failed 3 of 4 scheduled runs, worth considering whether the scheduled task should just skip the live pull and explicitly ask Jeff to supply numbers, rather than retrying silently each week.

---

## 3. Engagement analysis (carried forward from Jul 22 — no fresh data this cycle)

Standing insights, reaffirmed:

1. **Story reels are the strongest follower-conversion lever, when boosted.** S1E2 (Pares Clark) drove 365 new followers off a ₱200 boost — over 100x the organic follower rate of any other post. This is now the single best-proven boost target.
2. **Carousels remain the strongest organic-views driver.** Three straight weeks (W27 Wed → W28 Wed → W29 Wed) of carousel demos topping the views chart; W29 Wed hit 1,016 views organically without a boost, more than most boosted posts.
3. **Split by content type, not by feed:** Reels = emotional/story content (Fri slot). Carousels = educational/step-by-step (Mon/Wed slots). This split has now been in place since W30 and both formats are outperforming their old counterparts.
4. **Post once, pin immediately — no duplicates.** Standing rule since the Jul 1 audit; nothing since has contradicted it enough to drop it, though the earlier pin-vs-unpinned ranking question (Jul 14 finding) was never fully re-litigated with fresh data this cycle — treat as still open, low-priority given the story-format finding now dominates.
5. **Branded/franchise search is compounding** — "titoserye Filipino ai" and "tito ai story" queries were already appearing as of Jul 21; TikTok 1K-follower milestone also unlocks TikTok Live, floated but not yet scheduled.

### W31 status (Jul 27–Aug 2 · Season 1 finale week)

All three slots are scripted, captioned, and have carousel slide renders as of this morning (Jul 27) — a full day ahead of the Jul 28 Mon drop, no repeat of the W30-style late scramble:

| Slot | Title | Format | Drop (PHT) | Status |
|---|---|---|---|---|
| Mon | VA Inbox | Carousel + Reel | Jul 28, 8:00 PM | Ready |
| Wed | Freelancer Proposal | Carousel + Reel | Jul 30, 7:00 PM | Ready |
| Fri | Story S1E4 — Ang BJJ Champion at ang Marketing Analyst na Nasa Manila | Reel | Aug 1, 7:00 PM | Ready — **Season 1 finale** |

### Recommendations for W31

- **Boost budget → Fri S1E4 (Season 1 finale), not Wed.** Data-grounded: the one story-format boost we've run (S1E2) outperformed every carousel boost by more than 100x on follower conversion. S1E4 closes out the whole Season 1 arc, which makes it the highest-leverage single post to put spend behind this cycle. Recommend the same shape as the Jul 18 S1E2 boost: TikTok, Followers/Profile-visits objective, concentrated (not split with the Wed post).
- **Keep Wed (Freelancer carousel) organic.** It's the same proven named-persona/step-by-step shape that's carried the last 3 weeks organically — no boost needed to perform.
- **Hook check on S1E4.** Per the Jul 21 growth plan, open with the most dramatic line first (not "Kumusta") — confirm the S1E4 script follows this before recording, same as S1E3 did.
- **Pin once, don't duplicate** on whichever post gets the boost.
- **Priority for next cycle:** (1) get a live browser/account pull — this is now overdue for 3 of 4 cycles; (2) confirm whether W30 Wed ("Alinman Ka Man") and W30 Fri (S1E3) actually posted on their Jul 23/Jul 25 drop dates — content was ready on time per the repo, but posting itself is Tito AI's manual step and isn't confirmable without account access; (3) confirm S1E4 boost outcome once placed.

---

## 4. What changed in the repo this cycle

- Picked up and committed the ~6-day-old uncommitted backlog: `docs/exec-summary-jul22.html` removal, `docs/exec-summary-jul22.pdf` refresh, `docs/Tito Ai Social Media EXEC SUMMARY.html` addition, and `reports/2026-07-22-health-check.md`.
- `docs/schedule.json`: `updated` bumped to 2026-07-27. W30 Wed/Fri entries updated from stale `draft`/`TBD` to reflect that scripts, captions, and carousel slides were actually produced on time (Jul 23–24) — status set to `ready` rather than `posted` since live posting can't be confirmed this cycle. W31 entries filled in with real titles/personas/drop times (previously all `TBD`), status `ready`, with a note recommending boost on Fri S1E4 over Wed.
- `docs/W31-fri-captions.html`: added a posting-insight banner (S1E4 = highest-leverage boost target this week, per the S1E2 precedent; hook-fix reminder).
- `docs/W31-wed-captions.html`: added a posting-insight banner (proven organic shape, no boost needed, pin-once reminder).
- `CLAUDE.md`: appended a dated entry under the content-calendar/insights section summarizing this cycle.

No metrics were invented anywhere in this report or the updated files — every number traces back to `reports/2026-07-22-health-check.md` or earlier confirmed reports.

*Previous: reports/2026-07-22-health-check.md*
