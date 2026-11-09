import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {ORIGIN_CAPTIONS} from './originCaptions';

// Origin-story recut, Parts 1–5: Gemini chibi animation + Jeff's uncut original voice + recovered subtitles.
// Same look as OriginChibiGeminiPart1, with hook/next cues lifted above the Reels/TikTok bottom UI.

const navy = '#0A0F1E';
const gold = '#F59E0B';
const cream = '#FFF8E7';
const FPS = 30;

type Part = {n: number; seconds: number; hook: [string, string]; next: [string, string]; laptopAlt?: boolean; openFix?: boolean};

const PARTS: Part[] = [
  {n: 1, seconds: 30, hook: ['TATAY AKO.', 'NASA SILICON VALLEY?'], next: ['SUNOD:', 'WEBSITE? AI ANG TINANONG KO.']},
  {n: 2, seconds: 30, hook: ['WEBSITE?', 'AI ANG TINANONG KO.'], next: ['SUNOD:', 'WALA AKONG BACKGROUND.']},
  {n: 3, seconds: 27.5, hook: ['WALA AKONG', 'BACKGROUND.'], next: ['SUNOD:', 'TRIAL AND ERROR? OO NAMAN.']},
  {n: 4, seconds: 25.5, hook: ['TRIAL AND ERROR?', 'OO NAMAN.'], next: ['SUNOD:', 'AI ANG TULONG, TAO ANG GALAW.']},
  {n: 5, seconds: 29.5, hook: ['AI ANG TULONG,', 'TAO ANG GALAW.'], next: ['FOLLOW', 'TITO AI PARA SA DAGDAG.']},
];

// Nov 9 re-cut (data: most viewers left at 0:01 on Parts 1-2). The opening hook speaks to the viewer, not the series,
// and the PART n / 5 badge waits until 2 s so the first frame doesn't read as a title card for a story they missed.
const OPEN_FIX_HOOKS: Record<number, [string, string]> = {
  3: ['WALANG BACKGROUND?', 'ITO ANG GINAWA KO.'],
  4: ['PALPAK ANG UNANG TRY?', "NORMAL LANG 'YAN."],
  5: ['PAANO MAGSIMULA SA AI?', 'ITO ANG NATUTUNAN KO.'],
};

const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;

// `lift` (0–1) raises captions while the hook / next-part text is on screen so they never touch.
const Captions = ({n, lift = 0}: {n: number; lift?: number}) => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const cue = ORIGIN_CAPTIONS[n].find(([a, b]) => t >= a && t < b);
  if (!cue) return null;
  const o = interpolate((t - cue[0]) * FPS, [0, 3], [0, 1], clamp);
  return <div style={{position: 'absolute', left: 70, right: 170, top: 1150 - 150 * lift, display: 'flex', justifyContent: 'center'}}>
    <div style={{backgroundColor: '#0A0F1Ed9', borderRadius: 14, padding: '14px 24px', color: '#FFFFFF',
      font: '900 50px/1.15 Arial, sans-serif', textAlign: 'center', opacity: o}}>{cue[2]}</div>
  </div>;
};


// Part 2: built only from the approved laptop + pretend-website chibi (docs/assets/avatars/tito-ai-chibi-laptop-website.jpg)
// so the character never drifts. Screen centre in frame ≈ (850, 960).
type Pt = [number, number];
// Scales the still about focus point `c` and moves that point from `t0` to `t1`, so framing can be checked numerically:
// at scale 1 the screen spans x 664–1037, y 788–1134; head ≈ (457, 595).
const LaptopStill = ({len, src = 'chibi-laptop-website.jpg', s0 = 1, s1 = 1.05, c = [540, 960] as Pt, t0, t1, night = 0}: {len: number; src?: string; s0?: number; s1?: number; c?: Pt; t0?: Pt; t1?: Pt; night?: number}) => {
  const frame = useCurrentFrame();
  const k = interpolate(frame, [0, len], [0, 1], clamp);
  const sc = s0 + (s1 - s0) * k;
  const from = t0 ?? c, to = t1 ?? from;
  const tx = from[0] + (to[0] - from[0]) * k - c[0] * sc, ty = from[1] + (to[1] - from[1]) * k - c[1] * sc;
  const o = interpolate(frame, [0, 8, len - 8, len], [0, 1, 1, 0], clamp);
  return <AbsoluteFill style={{opacity: o, overflow: 'hidden'}}>
    <Img src={staticFile(src)} style={{position: 'absolute', left: 0, top: 0, width: 1080, height: 1935,
      transformOrigin: '0 0', transform: `translate(${tx}px, ${ty}px) scale(${sc})`}} />
    {night ? <AbsoluteFill style={{backgroundColor: '#0A1638', opacity: night, mixBlendMode: 'multiply'}} /> : null}
    {night ? <AbsoluteFill style={{background: 'radial-gradient(circle at 72% 55%, #FFE7A855 0%, transparent 36%)'}} /> : null}
  </AbsoluteFill>;
};

const ChatBubbles = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const bubbles = [[0, 660, 0], [0.9, 740, 0], [1.8, 620, 0], [2.7, 720, 0]] as const;
  return <>{bubbles.map(([delay, x, w], i) => {
    const t = frame / fps - delay;
    const rise = interpolate(t, [0, 3.2], [0, 520], clamp);
    const o = interpolate(t, [0, 0.3, 2.6, 3.2], [0, 1, 1, 0], clamp);
    return <div key={i} style={{position: 'absolute', left: x, top: 880 - rise, width: 230 + (i % 2) * 60, height: 70,
      borderRadius: 26, backgroundColor: '#FFFDF5', opacity: o * 0.92, boxShadow: '0 0 30px #FFE7A8aa'}}>
      <div style={{position: 'absolute', left: 26, top: 22, width: '62%', height: 10, borderRadius: 5, backgroundColor: '#CBD5E1'}} />
      <div style={{position: 'absolute', left: 26, top: 40, width: '40%', height: 10, borderRadius: 5, backgroundColor: '#CBD5E1'}} />
    </div>;
  })}</>;
};

const Part2Visual = () => {
  const {fps} = useVideoConfig();
  const s = (sec: number) => Math.round(sec * fps);
  return <>
    <Sequence name="Wide: laptop + pretend website" durationInFrames={s(10.7)}><LaptopStill len={s(10.7)} s0={1} s1={1.04} c={[540, 960]} /></Sequence>
    <Sequence name="Night: asks Claude" from={s(10.5)} durationInFrames={s(10.2)}>
      <LaptopStill len={s(10.2)} s0={1.1} s1={1.18} c={[650, 780]} t0={[540, 800]} night={0.55} />
      <Sequence from={s(5.3)}><ChatBubbles /></Sequence>
    </Sequence>
    <Sequence name="Website payoff push-in" from={s(20.5)} durationInFrames={s(9.5)}><LaptopStill len={s(9.5) + 8} s0={1} s1={2.2} c={[850, 961]} t1={[580, 780]} /></Sequence>
  </>;
};


// Part 1: same chibi across three approved stills (docs/assets/avatars/tito-ai-chibi-laptop-{kitchen,website,cafe-sv}.jpg).
// Screen centres at scale 1: kitchen ≈ (857, 918), home ≈ (850, 960), café ≈ (911, 1005).
const Part1Visual = () => {
  const {fps} = useVideoConfig();
  const s = (sec: number) => Math.round(sec * fps);
  return <>
    <Sequence name="Kitchen: household dad" durationInFrames={s(8.7)}><LaptopStill src="chibi-laptop-kitchen.jpg" len={s(8.7)} s0={1} s1={1.07} c={[540, 900]} /></Sequence>
    <Sequence name="Home: side hustle, push to site" from={s(8.5)} durationInFrames={s(7.7)}><LaptopStill len={s(7.7)} s0={1} s1={1.6} c={[850, 961]} t1={[720, 860]} /></Sequence>
    <Sequence name="Silicon Valley café" from={s(16)} durationInFrames={s(10.2)}><LaptopStill src="chibi-laptop-cafe-sv.jpg" len={s(10.2)} s0={1.0} s1={1.05} c={[560, 800]} /></Sequence>
    <Sequence name="Back to household dad" from={s(26)} durationInFrames={s(4.1)}><LaptopStill src="chibi-laptop-kitchen.jpg" len={s(4.1) + 8} s0={1.08} s1={1.0} c={[540, 900]} /></Sequence>
  </>;
};

// Parts still using the laptop-still version; remove a part once its Gemini clip is in public/origin-gemini-part-N.mp4.
// Part 1 final = Gemini animation (Jeff, Nov 3); Part1Visual is kept for the laptop alternate.
// Part 2 = Google Flow (Veo 3.1 Lite) clip; Part2Visual kept as the laptop-stills fallback.
const STILL_PARTS: Record<number, () => React.ReactElement> = {};
export const LAPTOP_FALLBACKS = {Part2Visual};

const OriginChibiGeminiVideo = ({n, seconds, hook: baseHook, next, laptopAlt, openFix}: Part) => {
  const hook = openFix && OPEN_FIX_HOOKS[n] ? OPEN_FIX_HOOKS[n] : baseHook;
  const Still = laptopAlt ? Part1Visual : STILL_PARTS[n];
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const hookOpacity = interpolate(frame, [0, 0.2 * fps, 2.8 * fps, 3.3 * fps], [1, 1, 1, 0], clamp);
  const nextOpacity = interpolate(frame, [(seconds - 3.8) * fps, (seconds - 3.3) * fps], [0, 1], clamp);
  const bigText = (lines: [string, string], opacity: number) => <div style={{position: 'absolute', left: 66, right: 170, bottom: 400,
    opacity, color: cream, font: '900 84px/1.0 Arial, sans-serif', textShadow: '0 4px 18px #000a'}}>
    {lines[0]}<br /><span style={{color: gold}}>{lines[1]}</span>
  </div>;

  return <AbsoluteFill style={{backgroundColor: navy, overflow: 'hidden'}}>
    {Still ? <Still /> : <Video name={`Gemini chibi animation — Part ${n}`} src={staticFile(`origin-gemini-part-${n}.mp4`)} premountFor={fps}
      muted objectFit="cover" style={{width: '100%', height: '100%'}} />}
    <Audio name="Jeff original voice — uncut" src={staticFile(`origin-part-${n}.m4a`)} premountFor={fps} />

    <div style={{position: 'absolute', top: 58, left: 58, right: 58, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
      <Img src={staticFile('tito-logo-on-dark.png')} style={{width: 245, objectFit: 'contain'}} />
      <div style={{backgroundColor: navy, border: `2px solid ${gold}`, color: gold, borderRadius: 16, padding: '12px 18px', font: 'bold 30px Arial, sans-serif',
        opacity: openFix ? interpolate(frame, [2 * fps, 2.5 * fps], [0, 1], clamp) : 1}}>PART {n} / 5</div>
    </div>

    <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 900, background: 'linear-gradient(transparent, #0A0F1Ecc)', pointerEvents: 'none'}} />
    <Captions n={n} lift={Math.max(hookOpacity, nextOpacity)} />
    {bigText(hook, hookOpacity)}
    {bigText(next, nextOpacity)}
  </AbsoluteFill>;
};

export const OriginChibiGeminiParts = () => <>
  <Composition id="OriginChibiLaptopP1" component={OriginChibiGeminiVideo} defaultProps={{...PARTS[0], laptopAlt: true}}
    durationInFrames={Math.round(PARTS[0].seconds * FPS)} fps={FPS} width={1080} height={1920} />
  {PARTS.map((p) => <Composition key={p.n} id={`OriginChibiGeminiP${p.n}`} component={OriginChibiGeminiVideo}
    defaultProps={p} durationInFrames={Math.round(p.seconds * FPS)} fps={FPS} width={1080} height={1920} />)}
  {PARTS.filter((p) => OPEN_FIX_HOOKS[p.n]).map((p) => <Composition key={`v2-${p.n}`} id={`OriginChibiGeminiP${p.n}v2`} component={OriginChibiGeminiVideo}
    defaultProps={{...p, openFix: true}} durationInFrames={Math.round(p.seconds * FPS)} fps={FPS} width={1080} height={1920} />)}
</>;
