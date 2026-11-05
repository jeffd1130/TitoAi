# Origin Recut Part 1: Push Plan
**Date:** Thu Nov 5, 2026 (PHT) · **Status: PLAN. Inputs are unverified or dated.**
**Nothing here posts, boosts or messages anyone.** Every spend step needs Jeff's OK.

**What I could and couldn't use**
- I can't pull live metrics, so I invented no numbers.
- The newest file is `reports/data/2026-11-05-metrics.json`, pulled this morning and about 1 day after Part 1. It is under 7 days old, so I used it, labeled "Nov 5 snapshot". It is not final.
- That pull lists Part 1 at **TikTok 12:09 PM** and **Meta (IG+FB combined) 12:10 PM** on Nov 4, with TikTok showing it pinned. This partly backs up Jeff's report that he posted it. Jeff should still confirm the details in table 1.
- Part 2 is a candidate that Jeff hasn't approved. `schedule.json` shows it as draft, with a fallback to Mon Nov 9 if it isn't approved by Nov 6 afternoon. Parts 3–5 are planned only.

---

## 1. Part 1 metrics-intake table (Jeff fills)

Take one snapshot at the current age (~48h, on Nov 6) and another at 72h (Nov 7). Write the snapshot time on each. A blank means we don't know. Please don't estimate.

Snapshot column: from the Nov 5 pull (~1 day old). Meta reports IG+FB together for cross-posted items. Jeff should fill the separate IG and FB cells from each app's own insights, and leave a cell blank if the app doesn't show it.

| Metric | Nov 5 snapshot (dated, not final) | TikTok (Jeff) | IG (Jeff) | FB (Jeff) |
|---|---|---|---|---|
| Post date and time (PHT) | TikTok Nov 4 12:09 · Meta Nov 4 12:10 | | | |
| Native upload, or Meta cross-post toggle? | unknown | n/a | | |
| Pinned? (and which of the 3 pin slots) | TikTok: yes. IG/FB: not captured | | | |
| Views | TikTok 111 · IG+FB 266 | | | |
| Viewers / reach | IG+FB 205 viewers | | | |
| 3-second views (and % of views) | IG+FB 41 (15.4%). TikTok not captured | | | |
| Completion % (watched to end) | not captured | | | |
| Average watch time | IG+FB 2s. TikTok not captured | | | |
| Likes | TikTok 1 · IG+FB 5 | | | |
| Comments (excluding Jeff's own seed) | TikTok 0 · IG+FB 2 | | | |
| Shares | IG+FB 0. TikTok not captured | | | |
| Saves | IG+FB 0. TikTok not captured | | | |
| Profile visits | not captured | | | |
| New follows from this post | IG+FB 0 (Part 1 row). TikTok not captured | | | |
| Follower count before (Nov 3 or 4, if known) | not captured | | | |
| Follower count after (now) | TikTok shows "1K" (rounded). IG not captured | | | |
| Traffic source (For You / Search / Profile) | account-level only: 93% For You | | n/a | n/a |
| Seed comment posted? When? | unknown | | | |
| Any boost run on this post? | assumed none | | | |

**Where to look.** These locations are my best understanding of the apps, so adjust if the menus differ.
- TikTok: Studio → Content → Part 1 → Analytics.
- IG: Insights on the post, in the app.
- FB: Business Suite → Content → All content.
- Exact TikTok followers: the public profile.

---

## 2. Benchmarks from our own history

**All of these are dated, not current.** The exceptions are the Nov 5 pull rows, which are about 1 day old.

Compare like with like. Almost all the benchmarks are TikTok lifetime views on mature posts. Part 1's numbers are 1 day old and, for Meta, IG+FB combined. That makes the Part 1 comparison indicative only. Re-compare at the same age using the 72h snapshot.

| Benchmark | Value | Source (report, date) | Caveat |
|---|---|---|---|
| Best unpinned TikTok post: W36 Wed "May Lecture PDF Ka?" | 590 views (Sep 7), 593 (Sep 14) | `2026-09-07-weekly-checkbalance.md`; `2026-09-14-weekly-checkbalance.md` | Carousel, not video. Dated. |
| W35 Mon / Wed, unpinned | 554–556 / 527–531 views | `2026-09-07-weekly-checkbalance.md` | Carousels |
| W36 Fri / W36 Mon, unpinned | 260 / 212 views | `2026-09-07-weekly-checkbalance.md` | W36 Fri was a seminar-testimony post |
| Weakest full week: W37 | 238 / 230 / 201 views (200–240 band) | `2026-09-14-weekly-checkbalance.md` | Job-seeker framing |
| **Most recent baseline** | Oct 23: 377 views, 4 likes. Oct 26: 302 views, 6 likes. Nov 2 "HM po?": 213 views, 0 likes. Oct 30 chibi short: 136 views, 1 like | `reports/data/2026-11-05-metrics.json` (Nov 5 pull) | This is the real floor. Part 1 on TikTok (111 views, 1 like at ~1 day) sits below all of these. |
| TikTok account, last 7 days (Oct 28–Nov 3) | 425 views (−60.8%), 1 like, 0 profile views, 0 net follows | `2026-11-05-weekly-checkbalance.md` | Weak week overall |
| S1E2 Clark story (boosted) | 4,747 views, 579 likes now (4,719 on Sep 14, 4,600 on Jul 22) | `reports/data/2026-11-05-metrics.json`; `2026-09-14-weekly-checkbalance.md`; `2026-07-22-health-check.md` | Paid distribution. The Jul 22 report says organic story performance is unconfirmed. |
| **S1E2 boost result** | **365 new followers** in the 7-day window. Boost was ₱200, TikTok, 3 days | `2026-07-22-health-check.md` (followers); boost spec per `CLAUDE.md` Jul 18 log entry | **Treat as an outlier, not a forecast.** The post's 365 exceeds the account's net 348 that week, so it's a gross attribution. Don't plan on ~₱0.55 per follow. The boost spec is second-hand from the CLAUDE.md log, not a report I opened. |
| W29 Wed carousel boost | ₱300, about 1,100 views | `2026-07-22-health-check.md` | Much weaker follow conversion than S1E2 |
| W31 Fri S1E4 (organic story) | 169 views at 2 days | `CLAUDE.md` Aug 3 log entry (the Aug 3 report itself wasn't opened) | The only organic story data point I have |
| VA resume, pinned | 1,122 views, 65 likes | `reports/data/2026-11-05-metrics.json` | Evergreen |
| Meta, recent posts (IG+FB) | "HM po?" 43 views / 0 interactions / 3s avg 4 of 43. Oct 30 short 51 views / 4 interactions / 5s avg | `reports/data/2026-11-05-metrics.json` | Part 1 at 266 views is the best of the three |
| Part 1 on Meta | 266 views, 205 viewers, 8 interactions (5 likes, 2 comments), 41 3-sec views (15.4%), 2s avg play | `reports/data/2026-11-05-metrics.json`, `2026-11-05-weekly-checkbalance.md` | ~1 day old |
| **Followers, as of Sep 14 (dated, not current)** | TikTok **1,012** (total likes 1,088) · IG **80** | `2026-09-14-weekly-checkbalance.md` | Nov 5 Studio shows only "1K". IG wasn't captured. The Sep 14 numbers are not today's. |
| Plan targets (not history) | Completion >35% · cost per follow <₱20 · scale if a boost gets 50+ follows | `content/strategy/niche-and-growth-plan.md` (Aug 13 update) | Targets we set, not results we've reached |

---

## 3. Decision framework: how to push

### Step A. Organic levers first (free; do them all before any spend)

1. **Native uploads only.** No TikTok cross-post link. Jeff confirms whether Part 1 on IG/FB was native or a Meta cross-post.
2. **Seed comment within 5 min of posting.** Use the one already in `captions.md` ("Hulaan mo…"). Reply to every comment in the first hour. Part 1 got 2 comments on Meta and 0 on TikTok. Replies are the cheapest lever.
3. **TikTok pin cap is 3.**
   - Slots today: Clark story, VA resume, and Part 1 (rotating).
   - Pinning Part 2 means unpinning something. The only candidate is Part 1, since the other two are evergreen.
   - **Rule (editable):** after Part 2's 24h read, pin whichever of Part 1 or Part 2 has more TikTok views at the same age. Don't unpin Clark or the VA resume.
4. **Series cross-linking.**
   - Part 2's caption says "Follow for Part 3". Add a pinned or seed comment on Part 1: "Part 2 is up on my profile". Ask Jeff whether to add a "Part 2 next" line to Part 1's caption.
   - Ask Jeff if the "TitoSerye" playlist exists. The Jul 22 report listed it as a to-do, and I can't confirm it was made. If it exists, add the parts to it.
5. **Post time.**
   - Part 1 went up at ~12:09 PM. The strategy says TikTok 8–10 PM and IG 7–9 PM.
   - Part 2 is slotted Fri 7 PM, so Part 2 vs Part 1 mixes the hook change with a time-of-day change. Note this when reading the result.
6. **Don't stack two similar videos within 1–2 hours.**
   - If Part 2 slips to Mon Nov 9, it collides with Part 3's Mon Nov 9 8 PM slot. Hold Part 3 rather than posting both.
7. **No duplicate posts.** If a post underperforms, don't re-upload it.

### Step B. Paid-push gate (all must pass; thresholds are editable)

Edit the "Default" column. I derived each default from our own numbers, but they are proposals, not rules.

| # | Gate | Default | Why this number | Part 1 now (Nov 5, ~1 day) |
|---|---|---|---|---|
| G0 | Jeff approves in writing, naming post, amount and dates | required | Standing rule | n/a |
| G1 | Post is at least 24h old, and the numbers come from Jeff's snapshot | required | Evidence gate in the growth plan (12–24h) | n/a |
| G2 | TikTok organic views at 48h | ≥ 400 | Above the Oct 23 high of 377, below the Sep records (~550–590) | 111 at ~1 day. **Fails** |
| G3 | Completion % (TikTok) | ≥ 20% (stretch 35%, the plan target) | Plan target is 35%; 20% is a floor for a 30s video | not captured. **Unknown** |
| G4 | Meta 3-second rate (3s views ÷ views) | ≥ 25% | Part 1 is 15.4%. A hook fix should show up clearly | 15.4%. **Fails** |
| G5 | Real interaction | ≥ 5 shares + saves, or ≥ 3 non-seed comments, within 48h | Part 1 has 2 comments, 0 shares, 0 saves on Meta | **Fails** |
| G6 | Follow signal | ≥ 3 organic new follows from the post, or profile-view rate ≥ 2% of views | Account had 0 net follows in 7 days | 0 on Meta. TikTok unknown |

**Reading the gate:** pass G0 and G1, plus at least 4 of G2–G6, including G3 or G4.

**Sample-size warning:** these are tiny numbers. At ~250 views, a 10-point change in 3-second rate is about 25 views. Treat G4 and G5 as directional.

**Budget tiers (PHP).** TikTok only, objective **Followers / Profile visits** (video views only as a deliberate awareness test), automatic audience, 3 days. These match the past boosts (₱200 and ₱300, 3-day).

| Tier | Amount | When |
|---|---|---|
| T0 | ₱0 | Default. Gate not passed. **Where we are now.** |
| T1 | ₱200 (~₱67/day) | Gate passed on the minimum bar |
| T2 | ₱300 (₱100/day) | Gate passed, with G2 ≥ 550 and G3 ≥ 35% |
| Cap (editable) | ₱300 per post, ₱500 for the origin series until we've read one boost result | Proposed; the growth plan's older ₱2,000/week is archival |

**Stop-loss (editable):** at the 24h check of a running boost, if ≥ ₱67 is spent with 0 follows, Jeff decides whether to stop. Judge success on cost per follow against the plan's < ₱20 target. Don't extrapolate from S1E2.

**What NOT to do**
- No boost without Jeff's explicit OK on that post, amount and dates.
- No boosting to rescue a weak post. The growth plan says this explicitly.
- No duplicate posts.
- No boosting IG or FB for now. FB's one follow in 28 days and no IG data give no basis.
- No spending on Parts 3–5 before Part 2's read.
- Don't treat the S1E2 result as the expected return.

---

## 4. Which parts to push (if any)

**Now: none paid.** The Nov 5 weekly report reached the same conclusion: Part 1 has 8 interactions and TikTok likes were down 92%.

**Organic priority: Part 2**
- **Hypothesis:** Part 1's weak spot is the first 2 seconds (2s average play on Meta, 15.4% reach 3 seconds). If Part 2 opens on the strongest line and the face instead of a title card, more viewers will stay past 3 seconds.
- **Single metric that would prove it:** Part 2's Meta **3-second rate (3s views ÷ views)** at 48h, compared with Part 1's 15.4%. Pass at ≥ 25% (editable). The Nov 5 report set a weaker bar ("above 15%"). Since Part 1 is already at 15.4%, I'd tighten it.
- **Confounds to record:** Part 2 is a different clip, with a possibly different post time and a glossier style (flagged in `schedule.json`). It was reviewed via a contact sheet only. A win is a signal, not proof.

**Conditional paid candidate: the better-retaining of Parts 1 and 2**
- Compare them at the same age. If they tie, pick Part 1, since it's the series entry point.
- Run the gate above. The Nov 5 report's trigger (Part 1 + Part 2 together past ~20 Meta interactions → ₱200 on Part 1) still stands as a rough cue, but it doesn't replace the gate.
- Don't boost a leaky Part 1 if Part 2 clearly holds viewers better.

**Parts 3–5:** organic only for now. Revisit after Part 2's 72h read.

---

## 5. Numbers Jeff must send me

**By Nov 6 (so the next report is real).**
1. **Part 1, per platform (TikTok, IG, FB), from table 1.** At minimum:
   - views, 3-second views, average watch time and completion %
   - likes, comments, shares, saves
   - profile visits and new follows
   - the snapshot time
2. **Exact follower counts now:** TikTok (public profile) and IG, plus FB Page followers if shown. If you know them, the counts before Part 1 on Nov 3–4.
3. **Pin state:** which 3 TikTok posts are pinned right now, and whether Part 1 is still one of them.
4. **Native or cross-post?** Was Part 1 uploaded natively to IG and FB, or through Meta's cross-post? Posted on which platforms (TikTok, IG, FB)?
5. **Any boost or promotion on Part 1?** Yes or no. If yes, amount, dates and objective.
6. **Part 2 decision:** approved or not, and the planned post time (PHT). If it's moving to Mon Nov 9, say so, so I can hold Part 3.
7. **TitoSerye playlist:** exists or not.

**After Part 2 posts (Nov 6–8).**
- Part 2 at +1 hour (views, comments), +24 hours and +48 hours (the table 1 metrics), plus exact post time.
- Part 1 again at 72h (Nov 7).
- IG and FB insights exported with the platform column. Business Suite merges the cross-posted items, so I can't separate IG from FB otherwise.

*Plan only. All inputs unverified or dated as marked.*
