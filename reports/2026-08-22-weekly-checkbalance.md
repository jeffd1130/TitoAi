# Tito AI — Weekly Check & Balance · Aug 22, 2026
*Automated run. Live pull via authenticated TikTok Studio + public Instagram profile. IG post-level insights remain login-gated.*

## Executive summary

Automation and repo health are normal — `main` matches `origin/main`, working tree clean, five auto-sync commits landed Aug 21 (14:23–16:46 PHT) alongside expected daily/weekly cron activity. The **W34 Friday slot did not run as planned**: the scripted CJEF proof story (S2E3) was swapped same-day for a simpler "prep question" bonus tip (S2E4) — a real, documented decision (commit `0ac73ed`, Aug 21 14:23), but `schedule.json` and `CLAUDE.md` still describe S2E3 as what posted. That's corrected in this run. TikTok engagement is down sharply this week (views ‑31.3%, likes ‑57.1% WoW, 0 net new followers vs. +3 the prior week) — driven by two unpinned, prompt-recitation-style posts (W34 Wed Guro, W34 Fri S2E4) landing well below the proof-first carousel baseline. IG ticked up to 77 followers (+2).

## Automation and repo health

| Check | Result |
|---|---|
| Git state | `main` == `origin/main`, working tree clean. Last commit `68b08fa`, Aug 21 16:46 PHT. |
| Recent commits | `0ac73ed` (14:23) added the W34 Fri bonus script; four "Auto-sync" commits (16:35–16:46) added CJEF-adjacent slide renders, the bonus carousel render, and Canva import assets. |
| Stray lock file | `.git/index.lock` present (0 bytes, harmless — `git status`/`git log` ran fine around it; matches the documented sandbox quirk). No action needed unless a future commit is blocked. |
| Cron log | `/tmp/titoai-cron.log` not present in this sandbox — expected; cron runs on Jeff's Mac, unreachable from here. |

## Account health

| Metric | Aug 22 | Aug 13 | Change |
|---|---:|---:|---:|
| TikTok followers | **~1K** (net +0 last 7d, vs. +3 prior 7d) | 1,017 | Growth stalled this week |
| TikTok total likes | **~1K** | 1,025 | Marginal |
| TikTok following | 149 | — | — |
| Instagram followers | **77** | 75 | **+2** |
| Instagram following | 112 | 112 | Flat |

TikTok Studio's dashboard now rounds both followers and likes to "1K" rather than showing exact counts — this is a Studio display change, not a data gap. Last-7-days key metrics: video views 675 (**‑31.3%** WoW), profile views 6 (‑14.3%), likes 12 (**‑57.1%** WoW), comments 0, shares 1. Traffic remains 91.9% For You / 7.3% Search. Search queries: "tito ai" (11.4%), "ai tito" (8.6%), "tito ai story" (5.7%), and a new one worth noting — **"safety ba ang ai"** (2.9%), the first AI-trust/myth-busting search query seen in any report to date.

## Posts since the previous check — corrected against live data

| Post | Pinned | Views | Likes | Comments | Notes |
|---|---|---:|---:|---:|---|
| W33 Fri — S2E2 CJEF training story (Aug 14) | Yes | 213 | 3 | 0 | Confirmed live, on schedule. |
| W34 Mon — Freelancer feedback carousel (Aug 17) | No | 279 | 7 | 0 | Confirmed posted. |
| W34 Wed — Guro parent-meeting demo (Aug 19) | No | **94** | **1** | 0 | **Weakest post since at least W31.** `schedule.json` still had this marked `draft` — it is live; corrected to `posted`. |
| W34 Fri — planned S2E3 CJEF proof story | — | — | — | — | **Never produced.** Commit history shows it was replaced same-day by the bonus script below. |
| W34 Fri (actual) — S2E4 "prep question" bonus tip (Aug 21, 6:59 PM) | No | **210** | 4 | 0 | This is what's actually live in the W34 Friday slot. Talking-head + 5-slide carousel adaptation exists (Canva `DAHS6AdAdTg`), but only the talking-head video was posted. |
| W33 Wed — Negosyante carousel (re-check) | No | 292 (was 265 Aug 13) | 7 | 0 | +27 views since last check, normal organic tail. |
| W33 Mon — BPO carousel | — | 335 (Aug 13 figure, not re-verified this cycle) | 8 | 0 | Not re-pulled this run; carried forward from Aug 13 report rather than guessed. |

**W34 Fri resolution:** the CJEF proof story (real training footage, `docs/scripts/w34-fri-script.html`, CTA "Comment GUSTO") was written but a same-day judgment call swapped it for a lighter, faster-to-produce tip video (`docs/scripts/w34-fri-bonus-script.html`, CTA "Comment YES"). That's a reasonable call under time pressure, but it means **the CJEF proof story — the strongest proof-format asset currently sitting unused — has not run yet.** `schedule.json` is corrected below to reflect reality and flag the CJEF script as available for W35.

## Engagement findings

1. **Pin effect is no longer ambiguous.** Every post at the top of the TikTok Studio content list is pinned and outperforms every unpinned post by a wide margin: Jul 17 Clark story (pinned, 4,679 views) · Jul 16 VA resume (pinned, 1,117) · Aug 14 CJEF story (pinned, 213) vs. the four most recent unpinned posts, all in the 94–292 range. Combined with the earlier Jul 15/16 same-content duplicate pair (356 unpinned vs. 1,117 pinned, ~3.1x), this resolves the "is pinning decisive" question the Aug 13 report left open: **pin every post going forward, no exceptions.**
2. **Prompt-recitation tip formats underperform proof-first formats.** The two lowest-viewed recent posts (W34 Wed Guro, 94 views; W34 Fri S2E4 bonus, 210 views) both follow the same shape — read a prompt aloud, no visible before/after or footage. The two carousels that show real inputs/outputs (W34 Mon Freelancer 279, W33 Wed Negosyante 292) outperform them despite being unpinned.
3. **Comments are still at zero on every organic post this cycle**, but the pinned Clark story has one real inbound comment worth a personal reply — a viewer (`jkp_7777`) asking about starting an AI side hustle. Replying is a low-cost way to model the exact behavior the CTAs are asking for.
4. **This week's dip is explained by content mix, not a platform-wide problem.** Views/likes fell WoW because the week's two new posts were both unpinned tip-format videos; profile views and shares are flat-to-up. No red flag beyond format choice.
5. **New branded-search signal:** "safety ba ang ai" appearing in search queries suggests some viewers are looking for reassurance/myth-busting content — a possible new content angle, distinct from the existing tool-tip and persona-demo pillars.

## Recommendations for W35 (Aug 24–30)

| Priority | Action | Why |
|---|---|---|
| Immediate | Pin every new post immediately on posting — no more unpinned drops. | Now the best-evidenced lever in the channel's history (3.1x–5x range across two independent comparisons). |
| Immediate | Revisit and produce the CJEF proof story (`docs/scripts/w34-fri-script.html`) for W35 Friday — real footage is ready and unused. | It's the strongest proof-format asset on hand and matches the top-performing content shape (named/verified proof + real output). |
| Next week | For Monday/Wednesday, keep the before/after proof shape (persona + visible input/output) over prompt-recitation-only tips. | Prompt-recitation posts this cycle (94, 210 views) underperformed proof carousels (279, 292 views) despite being more recent. |
| Next week | Reply personally to the `jkp_7777` comment on the Clark story. | Real inbound engagement — reinforces the "comment and I'll respond" pattern the CTAs are trying to build. |
| Process | Hold all boosts. | No post this cycle clears the 12–24h evidence gate in `content/strategy/niche-and-growth-plan.md`. |
| Optional test | Try one myth-busting/trust-themed hook (e.g., "Ligtas ba ang AI?") in a future week. | New "safety ba ang ai" search query — first sign of this angle in any report. |

## Repo corrections made this run

- `docs/schedule.json`: `updated` bumped to `2026-08-22`; W34 Wed status corrected `draft` → `posted` with live metrics; W34 Fri entry corrected to reflect the actual S2E4 bonus post (not the unproduced S2E3 story), with the CJEF script flagged as available for reuse; W33 Wed view count refreshed.
- `CLAUDE.md`: new dated log entry appended; Current/Next/Upcoming week table refreshed.

## Next-period focus

- Produce and pin the CJEF proof story for W35 Friday.
- Pin every post at time of posting, without exception, and track whether the pattern holds for a 4th and 5th data point.
- Watch whether the "safety ba ang ai" search query recurs before building content around it.

*Previous: reports/2026-08-13-health-check.md*
*Data pulled: Aug 22, 2026, via authenticated TikTok Studio (Overview/Content/Followers) and public Instagram profile.*
