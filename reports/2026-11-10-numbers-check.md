# Tito AI — Numbers Check (Origin Parts 1–3)
**Date:** Tue Nov 10, 2026 (PHT) · **Status: BASED ON PULLED DATA WITH UNVERIFIED INPUTS.**
Nothing here posts, boosts, schedules or messages anyone. Jeff does all of that.

**Sources read.** Every figure below is quoted from one of these files, or marked *derived* (my arithmetic on those figures).
- `reports/data/2026-11-09-metrics.json` (pulled Nov 9 about 7:30 AM PHT). Called **M9** below.
- `reports/data/2026-11-05-metrics.json` (pulled Nov 5, time of day not recorded). Called **M5**.
- `reports/2026-11-09-weekly-checkbalance.md` (**R9**) and `reports/2026-11-05-weekly-checkbalance.md` (**R5**).
- `reports/2026-11-05-part1-push-plan.md` (**Plan**).
- `CLAUDE.md` (Analytics section; Nov 9 video-openings note).
- `docs/schedule.json`, updated Nov 9. Called **SCH**.

**Data age.** M9 is about 1 day old, so it is under the 7-day limit and usable. It was pulled **before Part 3's 8:00 PM Nov 9 slot**. It cannot contain Part 3 or any business-CTA activity.

---

## 1. NUMBER CHECK

### 1a. Mismatches between the Nov 9 report (R9) and the data

| # | Item | What the files say | Verdict |
|---|---|---|---|
| 1 | R9: "IG reached only **79 accounts in 28 days**, so Reels depend almost entirely on strangers." | The 79 comes from **M5** (Oct 7–Nov 3). M9 says IG was "not pulled this time". M5 also says IG views came **72.9% from followers**. | **Stale and contradictory.** The figure is 6 days old and a different window. The "strangers" conclusion conflicts with M5's 72.9% from followers. Treat the IG conclusion as unsupported. |
| 2 | R9: "94% non-followers on FB". | From **M5** (`from_non_followers` 94.0%, window Oct 7–Nov 3). Not in M9. | Stale. Source is the Nov 5 pull, not Nov 9. |
| 3 | R9 and CLAUDE.md say "TikTok shows a new video to about 100–200 strangers first … with 1–3% completion, it isn't pushed further." | No file holds this. The data shows only 119 and 85 views and 3.1% and 1.1% completion. | **Unverified general belief.** It is a hypothesis about TikTok's ranking, not a measured fact. |
| 3b | R9: "**the apps stop showing it**" and the opening-frame explanations (title card, series label). | The data shows *where* viewers leave (drop-off at 0:01 on both parts). It cannot show *why*. | **Hypothesis.** The causes in R9 §3 are not tested yet. |
| 4 | Meta Part 1 **3-second rate**. Part 1 baseline "15.4%" in SCH and Plan. | 41/266 = 15.4% on **Nov 5**. On Nov 9 it is 41/284 = **14.4%** (*derived*). The 3-second count did not change (41 on both dates) while views went 266 → 284. | Baseline is dated. Comparing to "15.4%" mixes dates. 3-second views frozen at 41 while views rose by 18 is unusual. I can't tell whether it is a real result or a refresh lag. **Unverified.** |
| 5 | Part 1 Meta **interactions** vs parts. | M9: interactions 9, likes 6, comments 2, shares 0, saves 0 → parts sum to **8**. M5: interactions 8, likes 5, comments 2 → parts sum to **7**. | Interactions exceed the listed parts by 1 on both dates. The extra one is unexplained (another reaction type, or a link click?). Part 2 reconciles (1 share = 1 interaction). |
| 6 | R5 table: Part 1 IG+FB **Follows = 0**; HM po Saves/Shares "0 / 0". | M5 has **no per-post follows field** and no shares or saves fields for HM po. The only follows figure is account-level FB: 1 in 28 days. | **Not in the data.** Those zeros in R5 were assumed, not read. |
| 7 | **TikTok pins.** Plan rule: "Don't unpin Clark or the VA resume." Standing insight: 2 evergreen + 1 rotating. | M5 pinned: Clark, VA resume, Part 1. M9 pinned: **Part 2, Part 1, VA resume**. M9 `not_found`: "Clark restaurant story (4,747 views) is no longer pinned." | Pin state now breaks the 2-evergreen rule. Two of three pins are Origin parts, and one evergreen is gone. Why Clark was unpinned is unknown. |
| 8 | **Post times.** CLAUDE.md and SCH say Parts 1 and 2 drop at **7:00 PM**. | M9 actual: Part 1 TikTok 12:09, Meta 12:10 (Nov 4). Part 2 TikTok 16:19, Meta 16:25 (Nov 6). | Actual times differ from plan. SCH and CLAUDE.md were not updated with actual times. R9 does state the actual times. |
| 9 | SCH Part 1 and Part 2 notes: "user-reported posted … platform(s), exact time and metrics not independently verified." | M9 now shows both on **TikTok and Meta** with timestamps. | Posting is now confirmed from the data for TikTok and Meta combined. **IG vs FB is still unconfirmed.** SCH notes should be updated (not done here). |
| 10 | **Account profile views = 0** (M5 and M9) vs traffic "profile **1.7%**" (M9). | Profile-sourced views are 1.7% of 497 ≈ 8 views (*derived*) while profile views are 0. | Internally inconsistent. Treat TikTok profile views as **unreliable or not captured**. |
| 11 | TikTok `net_followers` 0 vs Part 1 `new_followers` 1 (M9). | Both are in M9; the windows differ (7-day account vs per-post lifetime). | Not necessarily a conflict (an unfollow or the window). **Unverified.** |
| 12 | TikTok account **comments 3** (7d) vs post comments in the window: Part 2 1 + Part 1 1 + HM po 0 = 2. | Likes reconcile (3 = 1 + 2 + 0). Comments are off by 1. | One comment is unaccounted for (older post or another source). |
| 13 | **Meta 28-day FB** window and change. | M5: Oct 7–Nov 3, views 952 (−13.9%), viewers 825. M9: Oct 11–Nov 7, views "1.2K" (+15.4%), viewers "1.0K". | Different windows and **rounded** values in M9. Not comparable exactly. Direction up, but only roughly: 952 → ~1.2K. |
| 14 | **TikTok 7-day** account totals. | M5: Oct 28–Nov 3, 425 views (−60.8%). M9: "last 7 days to Nov 8", 497 views (−9.1%). | Overlapping windows, so the change figures are not comparable. |
| 15 | **Provenance.** | M5: "Browser 4 profile, logged in as Tito AI". M9: "Browser 1, logged in to TikTok Studio @tito.aiph and Meta Business Suite Tito Ai PH". | Different browser sessions. Both claim the right accounts. I can't confirm it from the files. |

Items that **did reconcile**: R9's TikTok figures (119 / 85 / 216 / 306 / 1,122; 3.54 s / 3.67 s; 3.1% / 1.1%; For You 91.6%), Meta views, viewers, 3-second counts and Part 1/2 post times, plus the R5 engagement rates (e.g. 4/14 = 28.6%, 6/302 = 2.0%). The 3 likes in the 7-day total match the posts.

### 1b. Missing fields (not in M9)
- **Part 3**: everything. It posts after the pull.
- **Per post on TikTok**: shares, saves, total watch time, per-post profile visits, per-post follows for HM po and older posts, retention curve (only a single "drop_off" value: 0:01), and a 3-second rate (TikTok Studio may not report one; **unverified**).
- **Per post on Meta**: new follows, profile visits, link clicks, average play to a decimal (only whole seconds), and the 3-second count for older posts.
- **IG-only and FB-only** values for any post.
- **IG**: 28-day totals and follower count (M9 `not_found`).
- **Exact followers**: TikTok shows "1K (rounded by Studio)" in M5 and M9. The last exact numbers are TikTok 1,012 and IG 80 on **Sep 14** (Plan citing `2026-09-14-weekly-checkbalance.md`). Both are stale.
- **Native upload vs Meta cross-post, seed-comment timing, whether Jeff's own comment is counted** (Plan asked; still unanswered in the files).
- **Meta pinned state.**
- **M5 pull time of day**, so Part 1's age at the Nov 5 snapshot is unknown (about 12–36 h, *derived* from the post time).

### 1c. Rounded or unverified values
- TikTok followers "1K" is rounded. "No net growth" can't be tested at that resolution (0 net followers is reported separately).
- Meta FB "1.2K" and "1.0K" are rounded.
- `watch_time_s` on Meta is assumed to be seconds from the field name. **Unverified.**
- Meta per-post numbers are **IG + FB combined**. The split is unavailable.
- Whole-second averages (Meta "2s", "3s") hide a lot (see 2b).

---

## 2. ORIGIN SERIES TABLE

**Age at the Nov 9 pull (*derived*):** Part 1 about 115 h (Nov 4 12:09 → Nov 9 about 7:30). Part 2 about 63 h (Nov 6 16:19 → Nov 9 about 7:30). **Part 3: no data.** SCH (updated Nov 9) lists it as "ready … not posted or scheduled", due Mon Nov 9, 8:00 PM. I can't confirm from the files that it posted.

### 2a. TikTok (source M9)

| Metric | Part 1 | Part 2 | Part 3 |
|---|---|---|---|
| Post time (PHT) | Nov 4, 12:09 | Nov 6, 16:19 | not available (planned Nov 9, 8 PM) |
| Pinned | Yes | Yes | not available |
| Views | 119 (111 on Nov 5 per M5) | 85 | not available |
| 3-second views / rate | not available | not available | not available |
| Average watch | 3.54 s of 30 s | 3.67 s of 30 s | not available |
| Total watch time | not available (avg × views ≈ 421 s, *derived*) | not available (≈ 312 s, *derived*) | not available |
| Watched full | 3.1% | 1.1% | not available |
| Drop-off point | 0:01 | 0:01 | not available |
| Likes | 2 | 1 | not available |
| Comments | 1 | 1 | not available |
| Shares / saves | not available | not available | not available |
| New followers | 1 | 0 | not available |
| For You share | 91.6% | not available | not available |

### 2b. Meta (IG + FB combined; source M9)

| Metric | Part 1 | Part 2 | Part 3 |
|---|---|---|---|
| Post time (PHT) | Nov 4, 12:10 | Nov 6, 16:25 | not available |
| Pinned | not captured | not captured | not available |
| Views | 284 (266 on Nov 5) | 287 | not available |
| Viewers | 207 | 208 | not available |
| 3-second views | 41 | 42 | not available |
| **3-second rate** (*derived*) | **14.4%** (15.4% on Nov 5) | **14.6%** | not available |
| Average play (as reported) | 2 s | 3 s | not available |
| Watch time | 493 s | 731 s | not available |
| Average play (*derived*: watch time ÷ views) | ≈ 1.74 s | ≈ 2.55 s | not available |
| Likes | 6 | 0 | not available |
| Comments | 2 | 0 | not available |
| Shares | 0 | 1 | not available |
| Saves | 0 | 0 | not available |
| Interactions | 9 | 1 | not available |
| Follows | not available per post | not available per post | not available |

### 2c. Pass / fail

| Test | Part 1 | Part 2 | Part 3 |
|---|---|---|---|
| **Meta 3-second rate ≥ 25%** (the line set for Part 2, in SCH and Plan G4) | Baseline; would **fail** at 14.4% | **FAIL**: 14.6% vs 25% (about 10 points short) | **Not available** |
| Meta 3-second rate vs Part 1 baseline 15.4% | n/a | **Flat or slightly below**: 14.6% vs 15.4% (Part 1 on Nov 9 is 14.4%). A 1-view difference, so within noise. | Not available |
| Meta average play vs Part 1 (2 s) | n/a | **Higher by reported whole seconds** (3 s vs 2 s). *Derived* ≈ 2.55 s vs ≈ 1.74 s. This is the only sign of improvement. It is small, rests on rounded and unverified values, and the 3-second rate did not move. | Not available |
| R5's earlier test: avg play > 2 s **and** 3-second > 15% | n/a | **Mixed**: avg play 3 s passes; 14.6% fails. | Not available |
| TikTok average watch > 6 s (R9's success line for the next pull) | **FAIL**: 3.54 s | **FAIL**: 3.67 s | **Not available** |

**Reading.** The Part 2 opening change did not clear the 25% line. The 3-second rate is unchanged against Part 1. On TikTok, both parts lost most viewers at 0:01 and finished at 1–3%. Neither part is near older posts' retention (Kalat 6.54 s / 10.7%, VA resume 6.81 s / 13.2%, both M9).

Part 2 was also posted at a different time (4:19 PM vs 12:09 PM) and has a different clip, so the comparison is not clean. Part 3 is the first re-cut opening (`part-3-chibi-final-v2.mp4`, per SCH). **It is the first real test of the v2 opening**, and it has no data yet.

---

## 3. WHY TIKTOK IS LOW VS META

**First, the premise.** "IG 200+" is not IG alone. M9 gives **284 / 287 views** for Parts 1/2 as **IG + FB combined**. Viewers are 207 / 208 (*derived* views per viewer ≈ 1.37 and 1.38). An IG-only figure is not available. So I can't say IG alone exceeded 200.

**What the data shows**
1. **The gap is specific to the Origin videos.** Meta ÷ TikTok views (*derived*): Part 1 284 / 119 ≈ 2.4×; Part 2 287 / 85 ≈ 3.4×.
   - On other posts TikTok is higher. HM po: TikTok 216 vs Meta 46 (M9). Isang Skill (a video): TikTok 136 vs Meta 51 (both M5, same date).
   - So Meta is not generally stronger; it is stronger on these two Origin videos only. Two posts are a small sample.
2. **TikTok views for the new parts are the lowest of its recent posts.** Part 1 119 and Part 2 85, vs HM po 216, Isang Skill 149, Kalat 306, Three phone shots 378 (M9).
3. **TikTok traffic is almost all For You (90.5% account, 91.6% Part 1).** Followers are about "1K" with 0 net follows, so TikTok views are mostly test impressions to strangers. When retention is poor, there is little other traffic to fall back on.
4. **Retention on TikTok is poor and consistent**: drop-off at 0:01, 3.54 s and 3.67 s average, 3.1% and 1.1% finished.
5. **Attention in seconds is closer than views suggest** (*derived, rough*). Part 1: TikTok ≈ 421 s total vs Meta 493 s. Part 2: TikTok ≈ 312 s vs Meta 731 s. TikTok shows fewer views, but not a proportionally smaller total of attention for Part 1. This is only an estimate from average × views.
6. **Meta views are mostly short.** Only about 14–15% of Meta views reach 3 seconds. About 85% are shorter, so many Meta views may be brief autoplays (a hypothesis).

**Hypotheses (not shown by the data)**
- **How "views" are defined.** Meta may count shorter or auto-played impressions, and replays, as views. TikTok may count differently. I **cannot confirm either definition from the files**, so treat view-to-view comparisons across platforms as **unverified**. The like-for-like checks are the 3-second count and average play, but those also differ by platform.
- **Two surfaces on Meta.** Because Meta combines IG and FB, a post on both gets two sets of distribution. Facebook shows 94% non-follower views (M5, stale), so Facebook may be pushing to strangers generously. That would be a FB effect, not IG.
- **IG numbers look odd.** M5 shows IG 1.4K views against 79 reach (72.9% from followers). Roughly 18 views per account (*derived*) suggests loops or replays. **Unverified.** IG was not pulled on Nov 9.
- **TikTok ranking.** The idea that low early retention stops TikTok from expanding distribution is plausible, but the files don't show it.
- **Post time.** Part 1 posted at 12:09 and Part 2 at 16:19, off the 7 PM slot. TikTok views by post time don't show a pattern: 12:09 → 119, 14:48 → 216, 16:19 → 85, 18:13 → 306, 20:03 → 149, 20:31 → 378. Format, age and content are mixed in. **The data does not support a time-of-day explanation.**
- **Part 2 is younger** (about 63 h vs about 115 h), but Part 1 was only 111 views at its Nov 5 snapshot, and Part 2's 85 is already below that.

**Best-supported summary:** the Origin videos hold TikTok viewers poorly, and TikTok has no follower base to cushion that. The Meta lead on these two videos comes from two surfaces and a view definition that probably counts shorter views. IG alone is unknown.

---

## 4. FOLLOWS / DMs / BUSINESS SIGNALS

**Evidence of follows**
- **TikTok** 7-day (to Nov 8): **net_followers 0**, profile views 0 (flagged unreliable in 1a #10). Part 1: 1 new follower. Part 2: 0. (M9)
- **Facebook** 28-day (M5, Oct 7–Nov 3): **follows 1**, unfollows 0, page visits 6, conversations 0. Not re-pulled on Nov 9.
- **IG:** no follower count in either pull. Last exact value is 80 on Sep 14 (Plan, stale).
- **TikTok search** (M9): "Tito Ai" 28.1%, "tito ai" 12.5%, "Tite AI" 6.3%, "ai in pampanga" 6.3%. Search is 7.2% of views. This suggests some people look for the brand by name, but it can't be tied to a follow or inquiry.

**DMs and CLASS / COACH inquiries: not measurable from the data**
- The business CTAs launched Nov 9. M9 was pulled at about 7:30 AM that day, so it cannot show any response.
- Neither pull has a DM, message-count or keyword-comment field. Meta `conversations` was 0 (M5, FB, 28 days, before launch).
- Comment text isn't captured, so I can't tell if any of the 3 TikTok / 2 Meta comments were CLASS or COACH.
- I did not check whether the Part 1–3 captions carry a business CTA. I did not open `captions.md`.
- Nothing in the files lets me attribute any follow, visit or inquiry to a specific post. The only per-post follow is TikTok Part 1 = 1.

---

## 5. RECOMMENDATIONS

**1. Part 3 is the test for the v2 opening. Read it before approving Part 4.**
- Part 4 (Wed Nov 11, 7 PM) is waiting on Jeff's approval. A first read of Part 3 at about 24 h (Tue Nov 10, about 8 PM, if it posted at 8 PM Nov 9) is the earliest evidence. Pull Meta **3-second views, average play, watch time** and TikTok **average watch, finished %, drop-off point**.
- **Proposed decision rule (editable, mine, not from a file):** if Part 3's Meta 3-second rate is still at or below Part 1's 15.4%, the v2 opening (viewer hook, voice from frame 1, badge after 2 s) has not moved the metric. Don't treat it as a pass. Hold Part 4/5's openings for another variant before posting. If it is near or above 25%, keep the v2 pattern. Sample sizes are about 250 views, so call it directional.
- **Confound:** the v2 opening changes three things at once (hook, voice from frame 1, badge timing). A win would not show which change worked.

**2. Part 4 and Part 5 openings.** Both v2 files (`part-4-chibi-final-v2.mp4`, `part-5-chibi-final-v2.mp4`, per SCH) are waiting on Jeff's approval. **I haven't viewed them.** On approval, check:
- The first spoken line tells the *viewer* what they gain, not what the series is.
- Voice starts on frame 1 (Jeff's original audio).
- The PART n / 5 badge appears only after about 2 s. "Part n of 5" goes in the caption.
- One sentence of context makes each part stand alone (over 90% of views come from strangers).
- Visible motion in the first second.
- One business CTA (free live, `CLASS` or `COACH`) in the caption and at the close, **not** in the first 2 s. Part 5 is the series finale and a natural place for it (hypothesis). Whether Part 4/5 captions already carry the CTA is **unknown**.

**3. TikTok pin choice (cap 3: 2 evergreen + 1 rotating).**
- **Re-pin Clark** (4,747 views, 579 likes on Nov 5; M9 did not list it, so the figure is stale). Note that Clark's numbers came with a paid boost per Plan, so "evergreen" is a judgment on a boosted post.
- **Keep VA resume** (1,122 views, 65 likes; unchanged between pulls).
- **Rotating slot:** best retention among recent posts is **Kalat ang Notes** (6.54 s, 10.7% finished, 6 likes). Three phone shots has more views (378) but 4 likes and no retention data.
- Part 1 and Part 2 have 3.1% and 1.1% finished and the old openings. Putting two of them on the profile is the weakest use of the pins. **Unpin Part 2 first.** Pin Part 1 or Part 3 only if its retention beats Kalat's.
- Counter-point: Part 1 is the series entry point, so unpinning it may cost series discovery (a hypothesis). Jeff makes this call.

**4. Posting time.**
- The data supports **no** time-of-day conclusion (Section 3).
- M9 shows followers most active **Nov 8, 7 AM**. That is a single data point, with about 1K followers and 90%+ of views from strangers, so it has little leverage (a hypothesis).
- **Post Parts 4 and 5 at the planned slots (Wed Nov 11 7 PM, Fri Nov 13 7 PM).** Parts 1–2 drifted to 12:09 and 16:19, which muddied the comparison. Log the actual time of each post.
- SCH already assigns time tests (Thu Nov 12 12:15 PM; Sat Nov 14 10:00 AM; Tue Nov 17 7:30 PM), marked "test, not verified best time". Don't read them before each has about 48 h of data and compare like formats only.

**5. Boost decision: NOT YET.**
- **Evidence gate:** 12–24 h of organic data and Jeff's OK (CLAUDE.md). Parts 1 and 2 have it, and they fail:

| Plan gate | Part 2 now | Result |
|---|---|---|
| G2: TikTok views at 48 h ≥ 400 | 85 | Fail |
| G4: Meta 3-second rate ≥ 25% | 14.6% | Fail |
| G5: ≥ 5 shares + saves, or ≥ 3 non-seed comments | 1 share, 0 saves, 1 TikTok comment, 0 Meta | Fail |
| G6: ≥ 3 organic follows | TikTok 0 (Part 1: 1) | Fail |
| G3: TikTok completion ≥ 20% | 1.1% | Fail |

- Paid views would meet the same 0:01 drop-off. The Plan also says not to boost to rescue a weak post.
- **Candidate:** none now. **The next candidate is Part 3 (or Part 4), if it reads at 24–48 h.** It needs the 25% Meta 3-second rate, **and** a TikTok average watch above 6 s (R9), **and** at least 4 of G2–G6 including G3 or G4 (Plan).
- **Budget:** cap is **₱3,000/month** (CLAUDE.md Nov 9, Jeff boosts). The Plan's tighter per-post tiers (T1 ₱200, T2 ₱300, "₱500 for the origin series", all marked editable) can stay as sub-caps.
- **Spend to date is unknown.** SCH shows no boost on any November post, but I did not read the finance folder (`content/business/finance/`). Confirm month-to-date spend before any boost.

---

## 6. NEXT PULL

**Timing: 48 h after each post** (PHT; assumes Jeff posts at plan time and confirms actual time). Add a 24 h read for Part 3 now.

| Post | 24 h read | 48 h read |
|---|---|---|
| Part 3 (planned Mon Nov 9, 8 PM; posting unconfirmed) | Tue Nov 10, about 8 PM | **Wed Nov 11, about 8 PM** |
| Part 4 (Wed Nov 11, 7 PM) | Thu Nov 12, 7 PM | **Fri Nov 13, 7 PM** |
| Thu Nov 12 12:15 PM slot | Fri Nov 13, 12:15 PM | Sat Nov 14, 12:15 PM |
| Part 5 (Fri Nov 13, 7 PM) | Sat Nov 14, 7 PM | **Sun Nov 15, 7 PM** |
| Sat Nov 14 10:00 AM slot | Sun Nov 15, 10:00 AM | Mon Nov 16, 10:00 AM |
| Part 2 final read | | about Nov 13 (7 days) |

Note: Part 4 posts at 7 PM on Nov 11, about 1 h before Part 3's 48 h mark. Pull Part 3 before approving Part 4.

**Fields still missing (get these every pull):**
- **Part 3, every platform:** views, viewers/reach, 3-second views, average play, watch time, finished %, drop-off point, likes, comments, shares, saves, follows, post time, pinned, native upload or cross-post.
- **Meta export with the platform column** (IG vs FB split), including IG-only views for Parts 1–3. Add IG 28-day totals and exact IG follower count.
- **TikTok per post:** shares, saves, total watch time, new followers for each Origin part, retention curve, traffic source for Parts 2–3.
- **Exact followers:** TikTok (public profile), IG, FB Page. Before and after each post if possible.
- **Business signals:** count of DMs and comments containing `CLASS` or `COACH` (by platform, with date), plus waitlist or live sign-up count. I don't know where the waitlist lives. Note whether Jeff's own seed comment is included in the comment counts.
- **Pin state:** order and which 3 TikTok posts are pinned now; Meta pinned posts.
- **Pull metadata:** time of day on each pull and which browser profile and account it used.
- **Spend:** month-to-date boost spend against the ₱3,000 cap.
- **Housekeeping (not done here):** update SCH Part 1/2 notes with the confirmed TikTok + Meta posting and actual times.

*Based on pulled data (Nov 9, about 7:30 AM PHT) with unverified inputs. No post, boost, schedule or message was made.*
