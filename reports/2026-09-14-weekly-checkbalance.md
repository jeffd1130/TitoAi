# Tito AI — Weekly Check & Balance
**Date:** September 14, 2026 (Monday, PHT) · **Prior report:** `2026-09-07-weekly-checkbalance.md`

---

## 1. Automation / repo health

- `main` == `origin/main`, working tree clean. No stuck lock files, no uncommitted backlog.
- Recent commits: `a7d3a81`/`c7a6e3f` (Sep 11, W37 Fri captions), `179f956`/`9db3bcb` (Sep 9, W37 Wed captions), `5e1f916` (Sep 7, W37 Mon carousel). All three W37 slots landed on schedule — **last cycle's urgent flag (W37 unplanned) was resolved.**
- **No cron log at `/tmp/titoai-cron.log`** in this run environment — expected, cron runs on Jeff's Mac, not reachable from this automated context (consistent with every prior cycle's note).
- **Repeat pattern, not a new problem:** as of this Monday-morning check, **W38 (Sep 14–20) has zero planning** — no script, captions, or Canva design for any slot, and today's 8 PM PHT Monday drop is same-day. This is the identical situation flagged for W37 exactly one week ago. The W37 fire-drill got resolved in time, but the recurring same-day-Monday gap suggests the D-2/D-3 lead time isn't being used consistently. **Recommend producing W38 now**, and consider whether the Saturday `tito-weekly.py` reminder needs a harder escalation (or an earlier D-4 check) if a week reaches Monday morning still fully blank two cycles in a row.

## 2. Account health (live pull, public profiles)

| Metric | Aug 31 | Sep 7 | **Sep 14 (now)** |
|---|---|---|---|
| TikTok followers | 1,019 | 1,014 | **1,012** |
| TikTok total likes | 1,053 | ~1,067 (+14) | **1,088** (+21) |
| IG followers | 77 | (not re-pulled) | **80** (+3) |

**TikTok followers have now declined for a third straight cycle** (-7 over 14 days), while total likes keep climbing. That divergence (more likes, fewer followers) remains unexplained — still no authenticated TikTok Studio session available in this run to see traffic-source or unfollow data. Flag again for whenever Studio access is available.

**Pinned posts (3 total, confirmed):**
1. Evergreen — S1E2 "Ang Restaurant sa Clark" (Jul 17) — **4,719 views**, 579 likes
2. Evergreen — "Resume + Cover Letter — 5 Minuto" VA post (Jul 16) — **1,118 views**, 65 likes
3. Rotating slot — currently **W36 Mon** "Mahabang Notes? Gawing Reviewer sa Gemini" (Aug 31) — **212 views**, 5 likes

**The rotating pin slot is still misallocated.** W36 Mon was the *weakest* of the three W36 posts. W36 Wed ("May Lecture PDF Ka?") sits at **593 views unpinned — still the best unpinned result in channel history** — and has now gone three full cycles without ever getting the rotating slot, despite being flagged in both the Aug 31 and Sep 7 reports.

**W37 ("Grounded AI · Career Upgrade") results — all three posts, unpinned:**
| Post | Date | Views | Likes | Shares |
|---|---|---|---|---|
| Mon — "Interview Reviewer" | Sep 7 | 238 | 2 | 3 |
| Wed — "Resume Mo vs. Job Post" | Sep 9 | 230 | 12 | 3 |
| Fri — "AI Can Polish Your Resume" | Sep 11 | 201 | 8 | 3 |

This is the **weakest full week on record** in the data this report has tracked — all three posts landed in a narrow 200–240 view band, well below even W36's weakest post (212, now pinned) and far below W36's best (593). Comment CTAs (INTERVIEW / MATCH / TOTOO) drew single-digit engagement each. IG mirrored the same softness: the Sep 11 Fri carousel got 2 likes, and the Sep 7/Sep 9 reels showed no visible likes at all on the public profile.

**Correction to the repo record:** the Aug 29 "undocumented" CJEF-footage post ("Imbis na mano-mano, paano kung AI ang tumulong sa schoolwork mo?") was previously logged as having "never posted to IG." Live IG pull confirms **it did cross-post**, dated Aug 28 on IG, with 10 likes and 2 comments. `schedule.json` has been corrected below.

**CJEF proof story** (`docs/scripts/w34-fri-script.html`, CTA Comment GUSTO) remains **unproduced for a 5th straight cycle**.

## 3. Analysis & recommendations for the upcoming week

1. **Produce W38 immediately** — no slot has a script, caption, or Canva design yet, and Monday's drop is same-day. This is the priority above everything else in this report.
2. **Re-pin W36 Wed** ("May Lecture PDF Ka?", 593 views) into the rotating slot, replacing W36 Mon. It's the strongest unpinned post in the channel's history and has been recommended for the pin slot for three consecutive cycles without action.
3. **No boost budget this week.** W37's across-the-board weak performance (200–240 views on every post) doesn't clear the bar for a boost — nothing to reinforce yet. Hold budget until a post shows organic traction the way W36 Wed did.
4. **Format/theme signal:** the "AI para sa Students" theme (W36) clearly outperformed the "Grounded AI / Career Upgrade" theme (W37) — 590/260/212 avg ~354 views vs. 238/230/201 avg ~223 views. If W38 has a choice of angle, lean back toward the proof-first, named-persona, step-by-step demo shape that has repeatedly won (students, freelancers, VA), rather than the job-seeker/interview framing, which is untested and now has one full week of soft data against it.
5. **Resolve CJEF once and for all.** Five cycles carried over is long enough — either produce the real scripted version this week (footage + script already sitting ready) or formally retire it and free up the Friday slot's mental overhead.
6. **Follower decline vs. rising likes** is still unexplained after three cycles — needs an authenticated TikTok Studio pull to diagnose (traffic source, unfollow spikes) whenever that access is available.

## 4. What was updated in the repo

- `docs/schedule.json`: `updated` bumped to 2026-09-14; W37 Mon/Wed/Fri `status` corrected `ready` → `posted` with live view/like/share counts; pin-slot note corrected (rotating slot now on W36 Mon, not the Aug 29 post); Aug 29 post's IG cross-post claim corrected; added W38 placeholder flagging the zero-planning gap.
- `CLAUDE.md`: Current/Next/Upcoming table rolled forward (W37 current → posted, W38 next → urgent/unplanned, W39 upcoming); this report's summary appended to the weekly check-and-balance log.
