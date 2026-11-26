# Niche scan: "AI runs my account" content (2026-11-26)

Method: WebSearch/WebFetch only. Most sources are self-reports or vendor blogs (Postiz, Blotato). None of the numbers were checked independently. I couldn't find a Philippine or SEA creator using this format (no data). TikTok/IG video pages aren't indexed, so I list only examples I can link.

## 1. Examples
| # | Who / account | Platform | Format | Numbers (as stated in the source) | Source |
|---|---|---|---|---|---|
| 1 | Ikjot Juneja | IG, FB, YT | An agent finds outlier videos, writes scripts, builds and posts AI/tech Reels. He reviews 4 checkpoints: first frame, claim, animation, caption | 23.6M total views; top Reel 4.9M | https://www.blotato.com/blog/ikjot-juneja-creator-story |
| 2 | Aesty app founder (shared by Nadia Zueva) | TikTok, IG, YT Shorts | Claude Code researches viral promos, writes the shot list, edits and schedules. The founder films about 1 hour and approves every video | 59 videos; best Short about 20k vs usual 1–2k | https://postiz.com/blog/founder-generated-content-ugc-videos-claude-code |
| 3 | New app account via Meta Muse agent (shared by @PerezHatesAI) | TikTok | Two-slide UGC slideshows. The agent researched, made and scheduled them; the human approved the calendar | 1.1M account views (28-day screenshot) | https://postiz.com/blog/meta-muse-ai-agent-app-marketing |
| 4 | Xero AI (Michael O) | TikTok | Agents do the trend brief and scripts. He approves each script in Telegram (about 2 min) and films his face/voice himself | no data | https://dev.to/michael_xero_ai/how-to-automate-tiktok-content-with-an-ai-agent-full-pipeline-onp |
| 5 | Alan West | IG, Threads | Claude Desktop with meta-mcp posts, reads insights and sorts comments. He gave it more autonomy step by step | 2 weeks, 0 failed posts | https://dev.to/alanwest/i-let-my-ai-agent-run-my-instagram-it-didnt-go-horribly-wrong-2dj5 |
| 6 | "I let AI run my social media for 30 days" (aioperator2026) | IG, LI, X, TikTok | 30-day experiment with a results reveal | Production time 8–10h/wk down to 2h; LinkedIn +340%; AI-voice TikToks under 200 views vs avg 1.5–3k | https://dev.to/aioperator2026/i-let-ai-run-my-social-media-for-30-days-heres-what-happened-5c2 |
| 7 | Sabrina Ramonov (Blotato founder) | Multi | Shows Sheets → n8n → Blotato auto-posting to her own accounts | 1.5M followers (third-party claim) | https://blotato.com |

## 2. What seems to work
- **Show the human checkpoint.** Every high-number case keeps a human approval step and shows it (#1, #2, #4). That builds trust better than "fully autonomous" claims.
- **Results reveal, with real numbers.** Before/after time saved and views (#2, #6). Honest misses also make good content: the AI voice flopped in #6.
- **Real face or voice beats synthetic.** In #6, AI-scripted Reels that were filmed naturally did as well as manual ones. AI voiceovers and AI text overlays did worse.
- **Process walkthrough.** Research → script → design → schedule, shown as a pipeline (#2, #4). This works well as a screen-recording timelapse.

## 3. Risks
- **TikTok:** the Integrity & Authenticity guidelines say automation tools and scripts are "strictly prohibited" when used to get around TikTok's systems or inflate engagement. Penalties include removal and bans. Creators must label AI-generated content. https://www.tiktok.com/community-guidelines/integrity-authenticity/ — Automated posting should go through the official Content Posting API (https://developers.tiktok.com/doc/content-sharing-guidelines). Vendors report caps of about 25 posts a day and no duplicate content (vendor claim).
- **Meta:** content made with Meta AI, or carrying C2PA metadata, can get an "AI info" label automatically. A label is required for photorealistic AI video or realistic AI audio, and Meta may penalize missing labels. Accounts can also add an "AI creator" label to the profile. https://www.meta.com/help/artificial-intelligence/1783222608822690/ (page summarized via search; fetch was truncated)
- **Trust:** a Clutch survey (Aug 2026, n=601) found nearly 90% want AI content disclosed and 53% are less likely to buy from brands using AI in social content. But 42% view AI positively for education/explainer content, which is Tito's lane. https://clutch.co/resources/ai-social-media-report
- **Unlabeled agentic accounts are under scrutiny.** AI Forensics estimates 55% of AI content on TikTok goes unlabeled. https://aiforensics.org/uploads/Agentic_AI_Accounts.pdf
- **Takeaway for Tito:** always toggle the AI label and say "AI voice" (already our rule). Frame it as "AI assistant, ako ang nag-a-approve," not "fully automated." Avoid bulk or duplicate cross-posting.

## 4. Post ideas for Tito AI
1. **"Hindi ako ang gumawa ng video na 'to — pero ako ang nag-approve."**
   Format: 30–40s screen-recording timelapse: research notes → script → design → schedule queue → Jeff's "approve" tap. End with 3 steps viewers can copy using free tools.
   Footage: screen capture of the board/approval page (blur any keys or account details), plus the Tito chibi for the intro frame.
2. **"Isang linggo, [X] posts, [Y] oras ko lang. Ganito ang hatian namin ni AI."** (fill X/Y from Jeff's real log; don't guess)
   Format: split-screen "AI ginawa / Ako ginawa" checklist with real time saved. Include one honest fail ("ito yung mali ni AI, inayos ko").
   Footage: approval-page screenshots, one rejected draft, simple timer graphic.
3. **"Pwede mo rin 'to gawin sa page ng tindahan mo — kahit cellphone lang."**
   Format: Taglish tutorial carousel/Reel. Ask a free AI chat to make a weekly caption plan for a sari-sari/food page, then you review and schedule it in Meta Business Suite.
   Footage: phone screen recording of the prompt and the scheduling step, plus the chibi for the hook frame.
