# EP2 · Guro? Quiz sa 1 Minuto — script + what to record

## What Jeff records (about 5 minutes)
1. Open **Gemini (free, gemini.google.com)** on your phone or laptop, logged in to the **free** plan (so "libre" stays true). New chat; hide your name/email if it shows.
2. Start the screen recording. Paste the lesson + prompt, send, let it finish, scroll slowly to the answer key. Whole run about a minute.
3. Send the file here or on Telegram. Don't edit the AI's answer; if it's bad, run it again and send the better one.

**Sample lesson (short, paste as-is): "Ang food chain ay nagpapakita kung paano lumilipat ang enerhiya mula sa isang organismo papunta sa iba. Nagsisimula ito sa producer, gaya ng halaman, na gumagawa ng sariling pagkain gamit ang araw. Kinakain ito ng primary consumer, gaya ng tipaklong. Ang secondary consumer, gaya ng palaka, ay kumakain ng primary consumer. Ang decomposer, gaya ng kabute, ay tumutunaw ng patay na organismo at ibinabalik ang sustansya sa lupa."**

**Prompt to paste:**
```
Gumawa ng 10-item multiple choice quiz mula lang sa text na ito: [i-paste ang sample lesson]. Lagyan ng answer key. Grade 5 level.
```

## Voice (done): Gemini TTS, voice Finn → `raw/voice-finn.wav` (word timings `raw/voice-finn-words.json`)
Ma'am, Sir, sampung tanong na quiz, may answer key pa. Isang minuto lang, libre. Kumusta, mga Pamangkin! I-paste mo ang lesson mo sa libreng Gemini. Sample lang ito. Tapos sabihin mo: gumawa ng sampung item na multiple choice quiz mula lang sa text na ito. Lagyan ng answer key, para sa Grade 5. Importante ang mula lang sa text, para hindi siya mag-imbento. Ayan, may quiz na, may sagot pa. Basahin mo pa rin bago i-print. Ikaw pa rin ang guro. Gusto mo ang eksaktong prompt at siyam pa? I-comment mo lang ang salitang prompt. Ma'am, Sir, quiz o lesson plan ang susunod?

## Headlines (on screen, in order)
- GURO? QUIZ SA 1 MINUTO.
- I-PASTE ANG LESSON
- "MULA LANG SA TEXT"
- MAY ANSWER KEY PA
- COMMENT: PROMPT
- QUIZ O LESSON PLAN?

## Moving chibi
Hook: `fri-chibi-surprised.mp4` (from 2 s). "Mula lang sa text": `fri-chibi-point.mp4`. CTA: `fri-chibi-cta.mp4`. (Teacher-specific clip can be added when Flow credits refresh.)

## Edit notes
Whole screen window, no crop or zoom; pick moments that aren't mid-scroll. Captions timed to the word timings. -14 LUFS. "AI VOICE" badge. Label the sample as sample.

## v2 hook (Nov 24, Jeff asked for a better first 3 s; waiting on his approval)
- Frame 0: headline "GURO? / QUIZ + ANSWER KEY / SA 1 MINUTO" and voice start together (no fade-in).
- Hook screen is a readable zoom of the original Gemini recording (`/Users/jeff/Pictures/Snagit/2026-11-21_08-57-33.mp4`, 33.7–38.3 s, crop 740×370 at 360,140); "Correct answer" pops at 0.8 s.
- "Kumusta, mga Pamangkin!" greeting cut (voice 4.6–6.85 s removed; the cut falls in silence between words).
- Screen label shortened to "Gemini · sample na lesson".
- Source: `w44-friday-motion-sample/src/WedQuizReelV2.tsx`; render `docs/media/w48-wed-ep2-guro-quiz/quiz-reel-v2.mp4` (40.8 s, -14 LUFS).
