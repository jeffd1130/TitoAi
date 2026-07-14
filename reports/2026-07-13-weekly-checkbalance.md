# Tito AI — Weekly Check & Balance (Jul 13, 2026)

Automated routine run. Covers automation health, social account health, and engagement-driven recommendations for W29.

---

## 1. Automation / Claude Code health

| Check | Result |
|---|---|
| Git log | Last commit `3c1a8d8` — Jul 13, 07:42, "Add W29 Mon script + captions — email drafting with AI." Commits landing steadily through Jul 9–13 (W28 Fri script iterations, W28 Wed carousel ID, W29 Mon). |
| Git status | Clean. Branch up to date with `origin/main`. One untracked local file (`.claude/settings.local.json`) — machine-local, not a concern. |
| Push state | Local `main` matches `origin/main` — nothing stuck unpushed. No index.lock present. |
| Cron log (`/tmp/titoai-cron.log`) | **Not present in this sandboxed run** — same limitation as prior cycles: this automated environment only mounts the `TItoAi` repo folder, not Jeff's actual Mac `/tmp` or crontab. Cron firing itself can't be confirmed from here; would need to be checked directly on the Mac. |

**Verdict:** repo/automation-output health normal — no stuck commits, no conflicts, push current.

---

## 2. Social media account health (Instagram + TikTok)

**Could not complete this cycle — second cycle in a row.** Two access paths attempted:

1. **Claude in Chrome** — no browser connected (`list_connected_browsers` returned empty, `tabs_context_mcp` reported "Claude in Chrome is not connected"). Consistent with browser control being unavailable during unattended/scheduled runs.
2. **Direct web fetch** of `instagram.com/tito.aiph` and `tiktok.com/@tito.aiph` — both returned empty content (JS-rendered pages, static fetch can't see follower counts or post data).

No follower counts, post-timing confirmation, or new post-level engagement numbers were pulled. Per the no-fabrication rule, nothing is reported here in place of real data. The last confirmed pull remains `reports/2026-07-09-health-check.md` (Jul 9: IG 70 followers/2,152 90-day views; TikTok 146 followers/2.2K 7-day views, -37.8% WoW).

**Open items carried forward, still unconfirmed:**
- W28 Wed boost post ("Gemini sa Gmail," pinned Jul 8) — was at 195 views ~1 day in as of Jul 9. Outcome still not confirmed.
- W28 Fri Story S1E1 ("Dalawang Linggo...") dropped Jul 11, 7 PM PHT — no engagement data pulled yet since it went live.
- The Jul 9 report noted an unpinned TikTok copy outperforming a pinned one for the first time (one-off, not yet a rule change) — still needs more data to confirm or dismiss.

**Recommendation:** run the social-health portion of this routine while Jeff is at his Mac with Chrome open and the extension signed in, or have Jeff paste current follower counts / screenshots for the next cycle.

---

## 3. Engagement analysis (carried forward — no fresh data this cycle)

No new metrics were available, so this section reaffirms the standing insights from `reports/2026-07-01-ig-tiktok-post-mapping.md` and `reports/2026-07-09-health-check.md`, applied to W29:

1. **Post once, pin immediately on TikTok** — still the baseline rule, with one unconfirmed counterexample from Jul 3 (unpinned copy outperformed). Not enough data yet to revise.
2. **Named-persona, step-by-step free-tool demos are the top-proven organic format** ("Mga Guro" post remains the highest-performing organic post on record).

**Recommendation for W29:**
- **W29 Wed — "Resume at Cover Letter — Claude ang Gagawa"** matches the proven named-persona/step-by-step demo shape (same structure as "Mga Guro," W27 Wed, and W28 Wed). It's the strongest data-grounded boost candidate this week. However, since the W28 Wed boost outcome is still unconfirmed, recommend a **conservative TikTok-only boost** rather than repeating "All Platforms" — scale up only once W28 Wed's result is verified.
- **W29 Mon ("Email Drafting — Hayaan ang AI")** and **W29 Fri (Story S1E2 — Pares Clark)** — keep organic-only, consistent with how W27/W28 handled non-demo slots.
- **Pin-once discipline** applies to all three W29 posts on TikTok — post once, pin within 5 minutes, no duplicate posting.
- **Priority for next cycle:** re-pull IG + TikTok post-level metrics as soon as browser access is available — two full weeks (W28, part of W29) of engagement data is now unverified, which is starting to limit how confidently boost decisions can be made.

---

## 4. What changed in the repo this cycle

- `docs/schedule.json`: `updated` bumped to 2026-07-13. W29 Mon entry updated from placeholder ("TBD — AI Tip", `status: draft`, `url: null`) to actual finalized title/link ("Email Drafting — Hayaan ang AI", `status: ready`, `url: W29-mon-captions.html`) — script + captions already existed in `docs/` but schedule.json hadn't been synced. W29 Wed `boost` note updated to reflect the conservative TikTok-only recommendation above (no dollar commitment made — actual boost spend remains Jeff's call).
- `CLAUDE.md`: content calendar row for W29 Mon updated to match the finalized title; added a note under the engagement-audit section flagging that account-health pull failed for a second consecutive cycle.
- No caption HTML files were changed — no new insight emerged this cycle to justify updating banners, and the Jul 6 report's claim that insight banners were added to `W28-wed-captions.html` doesn't match the file's current content (no banner present). Flagging this discrepancy rather than assuming it was done.

No metrics were invented anywhere in this report or in the updated files — every number traces back to `reports/2026-07-09-health-check.md` or earlier.

---

## 5. Live update — confirmed Jul 14, 2026

Browser access came back this cycle. Pulled live IG Insights (30-day + 90-day) and TikTok profile/video data directly.

**Instagram:** 70 followers (flat). 90-day views 2,348 (up from 2,152 on Jul 9). Profile visits 243 (~flat vs 240).

**TikTok:** 152 followers (+6 from 146), 252 likes (+21), 127 following.

**TikTok video grid (Latest sort, views):** 768 · 684 · 654 · 541 (Pinned) · 539 · 238 · 197 · 161 · 115 · 185 (Pinned)

Three posts identified and matched to the content calendar:

| Post | Pin status | Views | Likes | Shares | Posted |
|---|---|---|---|---|---|
| W29 Mon "Email Drafting — Hayaan ang AI" | Pinned | 185 | 5 | 1 | 17h ago (Jul 14) |
| W28 Fri Story S1E1 "Dalawang Linggo. Isang Website." | Pinned | 541 | 13 | 5 | 3d ago (Jul 11) |
| W27 Wed "Claude Projects — I-Setup Natin" (unpinned duplicate copy) | **Not pinned** | 684 | 25 | 8 | Jul 3 |

**This meaningfully updates the standing "pin wins" insight.** Ranked by views, the two Pinned posts sit at #4 (541) and #10/last (185) out of 10 videos in the grid — the top 3 spots (768, 684, 654) and #5 (539) are all unpinned. The Jul 9 report flagged the Claude Projects unpinned copy (678 views then) as a single counterexample to "pin wins," treating it as a one-off. With two more weeks of data, that post has only grown (684 now) and is still outperformed by two other unpinned posts (768, 654) that haven't been identified/matched to specific calendar entries yet. **Recommendation: stop treating pin-vs-unpinned as a settled rule.** The pattern from the original Jul 1 audit (pinned posts sweeping the top 3) no longer holds in this snapshot — worth a deeper pass next cycle to identify what 768 and 654 are and whether something else (posting time, hook, topic) explains the spread better than pin status.

W28 Wed boost post ("Gemini sa Gmail") could not be re-confirmed this pass — did not appear distinctly in the time available; carry forward to next cycle.

No metrics invented — all figures above pulled live from IG Professional Dashboard Insights and TikTok's profile/video pages during this session.
