# Tito AI — Weekly Check & Balance · Sep 7, 2026
*Automated run. Live pull via public TikTok profile/video grid and public Instagram profile (no authenticated TikTok Studio session available this cycle — same limitation as Aug 31).*

## Executive summary

Automation and repo health are normal — `main` matches `origin/main`, working tree clean, with W36 Wed and W36 Fri both produced and confirmed live on schedule (Sep 2, Sep 4). The Aug 31 report's uncommitted changes did land safely (folded into a later commit), so nothing was lost. The big story this cycle is a genuine content win buried under a growth warning sign: **W36 Wed's grounded-PDF-prompting carousel hit 590 views unpinned — the best unpinned result in the channel's history** — while account-wide growth turned negative for the first time on record (TikTok followers 1,019 → 1,014, **-5** over 7 days). The rotating pin slot is still occupied by the weak, undocumented Aug 29 post (133 views) instead of any of the three much stronger posts produced since (590, 260, 212 views) — the same misallocation flagged last cycle, now with three more data points making it clearer. Most urgently: **W37 has no plan at all** — no content, no script, no `schedule.json` entry — and Monday's 8 PM PHT drop is about 12 hours away as of this report. The CJEF proof story (`docs/scripts/w34-fri-script.html`) is now unproduced for a 4th straight cycle.

## Automation and repo health

| Check | Result |
|---|---|
| Git state | `main` == `origin/main`, working tree clean. Last commit `c7ff91e`, Sep 4 18:40 PHT. |
| Recent commits | `151681a` (Sep 2, W36 Wed production — also picked up the Aug 31 report file that was blocked from committing last cycle); three Sep 4 auto-syncs (W36 Fri production: draft, captions, renders, schedule.json). |
| Last cycle's blocked commit | Resolved on its own — the Aug 31 `CLAUDE.md`/`docs/schedule.json`/report edits that couldn't commit due to a stuck `.git/index.lock` are now present in the repo (via `151681a`). No data was lost. |
| Stray lock file | `.git/index.lock` was present again at the start of this run (0 bytes) but cleared on its own before the commit step — see below. |
| Cron log | `/tmp/titoai-cron.log` not present in this sandbox — expected; cron runs on Jeff's Mac. |
| Gap flagged | **No commits at all between Sep 4 18:40 and Sep 7** (this run) — three full days with no production activity, spanning the entire weekend into Monday morning. `content/2026-W37/` does not exist; `docs/schedule.json` has no W37 entry. |

## Account health

| Metric | Sep 7 | Aug 31 | Change |
|---|---:|---:|---:|
| TikTok followers | **1,014** | 1,019 | **-5** (first recorded decline) |
| TikTok total likes | **1,067** | 1,053 | +14 |
| TikTok following | 153 | 152 | +1 |
| Instagram followers | **77** | 77 | Flat |
| Instagram following | 113 | 112 | +1 |

This is the first week-over-week follower loss seen in any check-and-balance cycle to date. Total likes still grew, so it isn't that content stopped landing — it's a net unfollow signal. No authenticated TikTok Studio session was available to see the "unfollow reasons" or traffic-source breakdown that would normally help diagnose this.

## Posts since the previous check (Aug 31) — from the public video grid

| Post | Pinned | Views | Notes |
|---|---|---:|---|
| W36 Mon — "Mahabang Notes? Gawing Reviewer sa Gemini" (Aug 31) | No | 212 | Confirmed live on TikTok. Weakest of the three new W36 posts. |
| W36 Wed — "May Lecture PDF Ka? Huwag Basahin Lang." (grounded Gemini PDF demo, Sep 2) | No | **590** | **Best unpinned result in channel history**, beating W35 Mon's 556 and W35 Wed's 531. Confirmed live on TikTok + Instagram. |
| W36 Fri — "Pagkatapos ng AI Seminar, Ito ang Narinig Namin" (real seminar testimony, Sep 4) | No | 260 | Confirmed live on TikTok + Instagram. |
| Undocumented Aug 29 post — CJEF/schoolwork tip (re-check) | **Yes** (rotating slot, unchanged) | 133 (was 129) | Still the weakest pinned post in the account, still holding the rotating pin slot over three stronger candidates produced since. Still no script/caption file/schedule.json record. |
| Evergreen pinned — Clark restaurant story | Yes | 4,714 (was 4,687) | +27, tail continuing very slowly. |
| Evergreen pinned — VA resume carousel | Yes | 1,117 (unchanged) | No organic growth this cycle either. |
| W35 Mon (re-check) | No | 556 (was 554) | +2. |
| W35 Wed (re-check) | No | 531 (was 527) | +4. |

Instagram: W36 Wed and W36 Fri are both confirmed in the public grid (matching TikTok). W36 Mon was not visible in the logged-out 3-tile preview, so its IG status could not be confirmed this cycle. Post-level IG likes/comments remain login-gated, as in every prior cycle.

## Engagement findings

1. **Grounded-document-prompting is the new strongest format.** W36 Wed ("upload the PDF, answer only from the file, verify against source") beat every unpinned post the channel has ever put out, including both W35 AI-safety/privacy posts. This is a third format now proven to work well unpinned: proof-first carousels, privacy/safety carousels, and now grounded-document demos — all share "show the actual constraint or actual output," not prompt recitation.
2. **The rotating pin slot has now missed the better post for two consecutive cycles.** Last cycle it was W35 Mon/Wed (554/527) losing out to a 129-view post; this cycle three more posts (590, 260, 212) all outperform or are close to the pinned 133-view post, and none got the slot. This is no longer a one-off — it's a standing gap between "what's pinned" and "what's actually performing," worth fixing deliberately rather than waiting for the next production cycle to notice.
3. **Follower count declined for the first time.** -5 net over 7 days, despite total likes rising. Without authenticated analytics this cycle, it's not possible to tell whether this is unrelated account churn, a reaction to the weak pinned post being someone's first impression, or normal noise at this follower count. Worth a closer look with Studio access next cycle before drawing conclusions.
4. **W37 has zero planning as of Monday morning, ~12 hours before the Monday 8 PM PHT drop.** This is more urgent than any single post's performance this cycle.
5. **The CJEF proof story is now unproduced for a 4th cycle** (`docs/scripts/w34-fri-script.html`, CTA "Comment GUSTO"). It has been carried over in every report since Aug 22.

## Recommendations for W37 (Sep 7–13)

| Priority | Action | Why |
|---|---|---|
| Immediate | Plan and produce W37 Monday today — nothing exists yet and the 8 PM PHT drop is hours away. | No content, script, or schedule.json entry currently exists for this week at all. |
| Immediate | Swap the rotating TikTok pin from the Aug 29 post (133 views) to W36 Wed (590 views, the account's best-ever unpinned post). | Two straight cycles of evidence that the rotating pin slot is going to the weaker post, not the stronger one. |
| This week | Lean into grounded-document-prompting as a content angle (upload a file, answer only from it, verify against source) — it just set the channel's unpinned record. | Directly evidenced by this cycle's data, consistent with the "proof-first beats prompt-recitation" pattern from prior cycles. |
| This week | Finally produce the CJEF proof story or formally retire it — 4 cycles carried over is long enough to force a decision either way. | Sitting unused ties up a real, ready asset and keeps showing up as an open item every report. |
| Next cycle | Get an authenticated TikTok Studio pull to investigate the follower decline (traffic source, unfollow context) before it repeats. | First-ever recorded follower loss; public profile data can't explain why. |
| Process | Hold all boosts. | No post this cycle has been evaluated against the 12–24h evidence gate, and the follower dip argues for understanding the cause before spending on amplification. |

## Repo corrections made this run

- `docs/schedule.json`: `updated` bumped to `2026-09-07`; W36 Mon/Wed/Fri statuses corrected `ready` → `posted` with live view counts (212, 590, 260); W35 Mon/Wed/evergreen-pin view counts refreshed; W35 Fri note updated to reflect a 4th unproduced cycle; added a placeholder W37 week so the timeline reflects that nothing is planned yet.
- `CLAUDE.md`: new dated log entry appended; Current/Next/Upcoming week table refreshed to show W36 as current-shipped, W37 as next-and-unplanned.

## Next-period focus

- Get W37 Monday produced today.
- Re-pin the best-performing recent post instead of leaving the rotating slot on autopilot.
- Resolve the CJEF proof story one way or the other.
- Investigate the follower decline once authenticated analytics are available.

*Previous: reports/2026-08-31-weekly-checkbalance.md*
*Data pulled: Sep 7, 2026, via public TikTok profile/video grid and public Instagram profile (no authenticated TikTok Studio session available this cycle).*
