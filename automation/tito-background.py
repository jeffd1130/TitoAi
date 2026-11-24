#!/usr/bin/env python3
"""Start a Tito AI background agent run in the Studio (Jeff, Nov 24, 2026).

Usage: tito-background.py <job>
Jobs: trends (Tita Saliksik, daily), brief (Tito AI chat: Tita's findings + next steps with Jeff, daily), sales (Tito Benta, Mon), bizdev (Ate Kasosyo, Wed), numbers (Tito Numero, Tue).
The run shows under Agent activity in the Studio. Drafts and files only: nothing is posted, sent, scheduled or boosted.
Fired by crontab (Mac runs on PHT). Needs the Studio running (launchd com.titoai.studio).
"""
import datetime
import json
import sys
import urllib.request

STUDIO = "http://127.0.0.1:4545/api/runs"
TODAY = datetime.date.today().isoformat()
COMMON = (
    "Background run started on a schedule, not by Jeff in chat. Drafts and files only: never post, send, "
    "schedule, boost, log in, or message anyone. Report text in English; Taglish only inside content drafts. "
    "Use only facts you can cite with a URL or a repo file; write 'no data' instead of guessing. Keep it short. "
    "End your reply with a 3-line summary of what changed."
)

JOBS = {
    "trends": {
        "agent": "tito-researcher",
        "stage": "research",
        "title": f"Daily trends · {TODAY}",
        "prompt": f"""Daily trend scan for Tito AI ({TODAY}). Write content/research/trends/{TODAY}.md (create the folder if missing). Read CLAUDE.md, the newest content/research/trends/*.md (don't repeat items already listed there in the last 7 days) and docs/schedule.json (what's coming up).

Use WebSearch/WebFetch for the last 48 hours. Sections, max 5 bullets each, every bullet with date + source URL:
1. AI news that matters to Filipinos: new or changed free-tier features in ChatGPT, Gemini, Claude (and Meta AI/Copilot if big), price changes in PHP, availability in the Philippines.
2. Similar niche: what Filipino and SEA AI-education creators (TikTok, FB, IG, YouTube) are posting now — topics, hooks, formats (carousel vs reel) that are getting traction. Name the account and link the post; never copy their content.
3. Philippine trends for our targets (guro/DepEd, BPO/CSR, VAs/freelancers, sari-sari and online sellers, office workers, OFW families): news, policy, seasonal moments (paydays, school calendar, Christmas, 13th month), viral topics we could tie AI help to.
4. Ideas: 3 post ideas for the next Mon/Wed/Fri videos and their Tue/Thu/Sat companion slides, each = persona + free tool + one prompt + hook line + why now (cite the trend). Mark ideas that need a real screen recording from Jeff.
5. Flags: anything risky (misinformation, scams using AI, DepEd rules on AI) worth a safety post.
Then add one line to content/research/trends/README.md index (create it if missing): date, file, top idea. {COMMON}""",
    },
    "sales": {
        "agent": "tito-sales",
        "stage": "sales",
        "title": f"Weekly sales pipeline · {TODAY}",
        "prompt": f"""Weekly Tito Benta run ({TODAY}). Read content/business/business-plan.md, content/business/sales/ (pipeline and launch-status.json), the newest reports/posts/*.md and reports/*.md (CLASS / COACH / PROMPT comments and DMs), and the newest content/research/trends/*.md.
1. Update content/business/sales/pipeline.md: leads by stage with source file, next action and owner (Jeff sends). Add only people that appear in the repo data; never invent leads.
2. Draft replies/follow-ups for any open CLASS, COACH or PROMPT requests (Taglish, warm, one CTA) under a dated "Drafts for Jeff" section.
3. One short offer-copy idea for the free live / Google Meet class tied to a current trend from the trends file.
4. Weekly numbers: seats sold, waitlist, leads (from launch-status.json; 'no data' if missing). {COMMON}""",
    },
    "bizdev": {
        "agent": "tito-bizdev",
        "stage": "sales",
        "title": f"Weekly partner targets · {TODAY}",
        "prompt": f"""Weekly Ate Kasosyo run ({TODAY}). Read content/business/business-plan.md, content/business/bizdev/partners.md (create it if missing) and the newest content/research/trends/*.md.
1. Research 5 new Philippine partner targets that fit the offer ladder (schools/DepEd divisions, BPO teams, SMEs, LGUs, associations) using public sources; for each: name, why now (cite a URL), who to contact (public role/page only, no personal data), and the best first offer.
2. Draft one short outreach message per target (Jeff reviews and sends). No client names or results that aren't documented as approved.
3. Update the status of existing targets only from repo data. Append under a dated section in partners.md. {COMMON}""",
    },
    "numbers": {
        "agent": "tito-analyst",
        "stage": "insights",
        "title": f"Weekly numbers check · {TODAY}",
        "prompt": f"""Weekly Tito Numero run ({TODAY}). You have no browser: use only repo data — reports/posts/*.md, reports/data/posts/*.json, reports/data/*-metrics.json, docs/schedule.json, content/business/sales/launch-status.json.
Write reports/{TODAY}-numbers-check.md: posts from the last 7 days (views, 3-sec hold, comments, follows, PROMPT/CLASS/COACH comments), morning (7 AM slides) vs evening (7 PM videos) comparison, best and worst post with the reason tied to a number, boost-gate status (300 TikTok views by 48 h), and 3 decisions for Jeff. Say clearly which numbers are missing or older than 7 days so Claude Code can do a fresh pull. {COMMON}""",
    },
}


BRIEF = (
    f"[Tita Saliksik update] Today's trend scan is in content/research/trends/{TODAY}.md (if it's missing, say so and stop). "
    "Brief Jeff here: (1) Tita's top 3 findings in one line each, with the source; (2) what it means for the posts already "
    "planned in docs/schedule.json this week and next; (3) up to 3 next steps you recommend (which idea, which slot, "
    "what Jeff must record or decide), then ask Jeff which ones to go with. Plan together with Jeff: don't start any "
    "agent until Jeff picks. Keep it short."
)


def main():
    job = sys.argv[1] if len(sys.argv) > 1 else ""
    if job not in JOBS and job != "brief":
        sys.exit(f"usage: tito-background.py {{{'|'.join(list(JOBS) + ['brief'])}}}")
    url = STUDIO.replace("/api/runs", "/api/main") if job == "brief" else STUDIO
    payload = {"text": BRIEF, "newChat": True} if job == "brief" else JOBS[job]
    body = json.dumps(payload).encode()
    req = urllib.request.Request(url, data=body, headers={"Content-Type": "application/json"}, method="POST")
    with urllib.request.urlopen(req, timeout=20) as r:
        run = json.load(r)
    print(f"{datetime.datetime.now():%Y-%m-%d %H:%M} started {job}: run {run.get('id')} ({run.get('agent')})")


if __name__ == "__main__":
    main()
