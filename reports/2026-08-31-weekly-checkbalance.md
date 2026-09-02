# Tito AI — Weekly Check & Balance · Aug 31, 2026
*Automated run. Live pull via public TikTok profile (session not authenticated to TikTok Studio this cycle) and public Instagram profile. IG post-level insights remain login-gated; TikTok comment text remains login-gated.*

## Executive summary

Automation and repo health are normal — `main` matches `origin/main`, working tree clean, with active auto-sync commits through this morning (W36 Mon carousel assets landed 08:24–08:42 PHT). TikTok growth has stalled hard: exact followers moved only 1,017 → 1,019 (+2) over 18 days, and total likes 1,025 → 1,053 (+28) — the slowest stretch since tracking began. IG is flat at 77 followers. The good news is content quality: **both new W35 carousels (AI-safety and clean-brief) landed 527–554 views while sitting unpinned** — the second- and third-best unpinned results in the account's history — reinforcing last cycle's proof-first-beats-prompt-recitation finding. The bad news is a process gap: a TikTok-only post ("Imbis na mano-mano, paano kung AI ang tumulong sa schoolwork mo?", CTA "Comment STUDENT") went live Aug 29 using the CJEF training footage, got the account's rotating pin slot, but only pulled 129 views/2 likes/1 comment — and **it doesn't exist anywhere in the repo** (no script, no `docs/W35-fri-captions.html`, no `content/2026-W35/03-fri-inspiration/` folder, no `schedule.json` entry). It also never posted to Instagram. This also finally resolves last cycle's open question about "pin everything": **TikTok caps pins at 3**, so the real, observed practice is a fixed 2-slot core (Clark story, VA resume carousel) plus 1 rotating slot for the newest featured post — not literal every-post pinning.

## Automation and repo health

| Check | Result |
|---|---|
| Git state | `main` == `origin/main`, working tree clean. Last commit `eb8d018`, Aug 31 08:42 PHT. |
| Recent commits | Active this week: `d3e04b8` (Aug 24, W35 Mon production), two Aug 26 auto-syncs (W35 Wed), two Aug 21→26 gaps aside, three Aug 31 commits landing the W36 Mon carousel (script, captions, renders, `schedule.json`) and cleaning up a temporary test image. |
| Stray lock file | `.git/index.lock` present (0 bytes) again — same harmless sandbox quirk noted in prior cycles; `git status`/`git log`/`git fetch` all ran fine around it. Flagged for the commit step below in case it blocks. |
| Cron log | `/tmp/titoai-cron.log` not present in this sandbox — expected; cron runs on Jeff's Mac, unreachable from here. |
| Process gap (new) | A real post shipped to TikTok (Aug 29, CJEF/schoolwork tip) with **no corresponding script, caption file, or schedule.json entry anywhere in the repo**, and did not cross-post to Instagram. This is the first time content has gone live with zero repo footprint — worth a quick check with Jeff on whether it was posted directly from Buffer/TikTok outside the normal D-2 pipeline. |

## Account health

| Metric | Aug 31 | Aug 22 (Studio, rounded) | Aug 13 (exact) | Change vs Aug 13 |
|---|---:|---:|---:|---:|
| TikTok followers | **1,019** | ~1K | 1,017 | **+2 in 18 days** |
| TikTok total likes | **1,053** | ~1K | 1,025 | +28 |
| TikTok following | 152 | 149 | — | +3 |
| Instagram followers | **77** | 77 | 75 | +2 (all in the Aug 13→22 window; flat since) |
| Instagram following | 112 | 112 | 112 | Flat |

TikTok Studio (authenticated analytics — views, likes-this-week, traffic source, search queries) was not reachable this cycle; the browser session had no saved TikTok login, so this report uses the public profile and public video grid only. Follower/like growth has been essentially flat since Aug 13 — the slowest 18-day stretch on record for this channel, spanning the entire W34 and W35 production cycles.

## Posts since the previous check (Aug 22) — from the public video grid

| Post | Pinned | Views | Likes | Comments | Notes |
|---|---|---:|---:|---:|---|
| W35 Mon — "Ligtas Ba ang AI? Huwag Ilagay Ito." (AI-safety carousel, Aug 24) | No | **554** | — (gated) | — (gated) | 2nd-best unpinned result in channel history. |
| W35 Wed — "May Client Brief Ka? Huwag I-paste Agad." (redact-info carousel, Aug 26) | No | **527** | — (gated) | — (gated) | 3rd-best unpinned result in channel history. |
| Undocumented — "Imbis na mano-mano, paano kung AI ang tumulong sa schoolwork mo?" (Aug 29, CTA "Comment STUDENT," #AIForStudents) | **Yes** (rotating slot) | 129 | 2 | 1 | Real CJEF classroom footage, but weak numbers for a pinned post — 2 days old and still the lowest-viewed pinned post the channel has had. Not the CJEF proof story that was planned/reused (`docs/scripts/w34-fri-script.html`, CTA "Comment GUSTO") — different script, different CTA, no repo record. |
| W34 Mon — Freelancer feedback carousel (re-check) | No | 282 (was 279) | — | — | +3, normal organic tail. |
| W34 Wed — Guro parent-meeting demo (re-check) | No | 96 (was 94) | — | — | +2, still the weakest tip-format post. |
| W34 Fri actual — S2E4 bonus tip (re-check) | No | 223 (was 210) | — | — | +13. |
| W33 Wed — Negosyante carousel (re-check) | No | 295 (was 292) | — | — | +3. |
| W33 Mon — BPO carousel (re-check, first re-pull since Aug 13) | No | 345 | — | — | +10 vs. the Aug 13 figure of 335. |
| W33 Fri — S2E2 CJEF training story (re-check) | **No (un-pinned this cycle)** | 214 (was 213) | — | — | Lost its pin slot to the Aug 29 CJEF/schoolwork post. |
| Evergreen pinned — Clark restaurant story (S1E2) | Yes | 4,687 (was 4,679) | 579 | 3 | Still the all-time top post; +8 views, tail essentially over. |
| Evergreen pinned — VA resume/cover-letter carousel | Yes | 1,117 (unchanged) | — | — | No further organic growth this cycle. |

Instagram: only the 3 most recent grid tiles are visible without login. W35 Wed and W35 Mon are both confirmed live on IG (matching TikTok). The Aug 29 CJEF/schoolwork post is **not** in the IG grid — it appears to be TikTok-only. Post-level IG likes/comments remain login-gated, as in every prior cycle.

## Engagement findings

1. **The "pin every post" rule from Aug 22 was impossible to fully apply — TikTok hard-caps pins at 3.** What actually happened this cycle: the two long-term evergreen top performers (Clark story, VA resume) stayed pinned, and the single rotating third slot went to the newest CJEF-themed post instead of to W35 Mon or Wed. The corrected, practicable rule: **maintain 2 fixed evergreen pins + 1 rotating pin for the current week's strongest/most strategic post** — not literal pin-everything.
2. **Content quality is holding up without pinning.** W35 Mon (554) and W35 Wed (527) are the 2nd- and 3rd-best unpinned results ever, both proof-first carousels (visible before/after, redaction demo, safety checklist) — consistent with the standing finding that proof-first beats prompt-recitation, independent of pin status.
3. **The rotating pin slot went to the weaker post this cycle.** The Aug 29 CJEF/schoolwork video got the pin and still only reached 129 views/2 likes — worse than both unpinned W35 posts. If rotating-pin choice had gone to W35 Mon or Wed instead, the evidence suggests it likely would have outperformed 129 views by a wide margin. Pin allocation, not just pinning itself, is a lever worth being deliberate about.
4. **Undocumented, off-pipeline post.** The Aug 29 video has no script, caption file, or `schedule.json` record, and didn't cross-post to IG. Whatever the reason (same-day judgment call, direct Buffer post, etc.), it breaks the "every post traceable in the repo" pattern this project depends on for reporting. Flagging for Jeff to confirm intent — not correcting it into `schedule.json` as a phantom W35 Friday post, since the actual planned W35 Friday content (CJEF proof story, CTA "Comment GUSTO") was never produced.
5. **Growth has stalled account-wide, not just per-post.** +2 TikTok followers and 0 net IG followers over 18 days is a bigger flag than any single post's performance — worth investigating whether this is a seasonal dip, an algorithm/reach change, or simply fewer posts going out with real reach (no boosts placed since the 12–24h evidence gate went into effect).
6. **No inbound comments were checked this cycle** (TikTok comment threads are login-gated on the public profile; the Jul 17 Clark-story reply-to-`jkp_7777` recommendation from Aug 22 could not be verified or acted on without an authenticated session).

## Recommendations for W36 (Aug 31–Sep 6)

| Priority | Action | Why |
|---|---|---|
| Immediate | Produce and post the actual CJEF proof story (`docs/scripts/w34-fri-script.html`, CTA "Comment GUSTO") — it is still unused after being carried over from W34 and W35. | The strongest proof-format asset on hand has now been flagged three cycles running without being produced as scripted. |
| Immediate | Confirm with Jeff whether the Aug 29 "Comment STUDENT" post was an intentional off-pipeline bonus post; if it should count as content, backfill a script/caption file and a `schedule.json` entry so it's traceable. | Repo traceability broke for the first time this cycle. |
| This week | Keep W36 Mon's carousel ("Mahabang Notes? Gawing Reviewer sa Gemini," drops tonight 8 PM PHT) in the rotating pin slot once it's live, given the proof-first format's track record — but weigh it against how W35 Mon/Wed did unpinned. | Rotating-pin choice mattered more than pin status alone this cycle. |
| Next week | Get a TikTok Studio (authenticated) pull done at least once before the next cycle — public-profile-only data has no likes/comments for most posts and no view-trend/traffic-source context. | Two of the last four cycles have lacked authenticated data; trend visibility is degrading. |
| Process | Hold all boosts. | Account-wide growth is flat; no post this cycle clearly clears a re-evaluated evidence bar, and the boost budget is better spent once a stronger, correctly-pinned post is confirmed. |
| Optional | Cross-post the Aug 29 CJEF/schoolwork content to Instagram if Jeff wants it counted as a real post, since it currently only exists on TikTok. | Matches the standing "same content, platform-specific caption" practice used everywhere else. |

## Repo corrections made this run

- `docs/schedule.json`: `updated` bumped to `2026-08-31`; W35 Mon and W35 Wed statuses corrected `ready` → `posted` with live view counts (554 and 527); W35 Fri left as `draft` with a note explaining the CJEF proof story is still unproduced and that an unrelated, undocumented post ran in its place; W33 Fri note updated to reflect it lost its pin slot; W33 Mon view count refreshed to 345.
- `CLAUDE.md`: new dated log entry appended below the Aug 22 entry with this cycle's findings and the corrected pin-rotation rule.

## Next-period focus

- Produce the CJEF proof story for real — three cycles running unproduced.
- Get one authenticated TikTok Studio pull to restore trend/traffic visibility.
- Track whether the 2-fixed + 1-rotating pin model holds up as a repeatable pattern, and whether rotating-pin choice (not just pin/unpin) correlates with performance over more data points.
- Resolve the Aug 29 undocumented post with Jeff before the next cycle.

*Previous: reports/2026-08-22-weekly-checkbalance.md*
*Data pulled: Aug 31, 2026, via public TikTok profile/video grid and public Instagram profile (no authenticated TikTok Studio session available this cycle).*
