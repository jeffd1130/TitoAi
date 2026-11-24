import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// W47 Fri (Nov 20, 2026) v2 — full, uncropped screen recordings (Jeff's Claude app, Snagit Nov 19)
// + moving chibi clips from Flow (handoff/flow/fri-chibi-*.mp4) + Gemini TTS voice "Finn" (AI voice, disclosed).

const FPS = 30;
const SECONDS = 47.0;
const navy = '#0A0F1E';
const gold = '#F59E0B';
const teal = '#0D9488';
const coral = '#F2545B';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const f = (s: number) => Math.round(s * FPS);
const useT = () => useCurrentFrame() / FPS;

// Full-window screen recordings (1000 x ~740), never cropped or zoomed.
const SCREENS: [string, number, number, number][] = [
  ['fri2/hook-guro2.mp4', 0, 4.3, 742],
  ['fri2/prompt-table.mp4', 8.9, 17.9, 732],
  ['fri2/table-full.mp4', 17.9, 21.2, 732],
  ['fri2/car-guro2.mp4', 21.2, 23.9, 742],
  ['fri2/car-bpo.mp4', 23.9, 25.4, 742],
  ['fri2/car-negosyo.mp4', 25.4, 28.2, 742],
];

// Moving chibi (Flow, Veo 3.1 Lite, approved chibi as Ingredient): [file, start, end, clip offset s]
const CHIBI: [string, number, number, number][] = [
  ['fri/chibi-cta.mp4', 4.3, 8.9, 3.3],        // wave hello
  ['fri/chibi-point.mp4', 28.2, 31.4, 0.0],    // points at laptop: checking the work
  ['fri/chibi-point.mp4', 31.4, 35.6, 3.7],    // nods, points at viewer
  ['fri/chibi-surprised.mp4', 35.6, 38.5, 2.0],// delighted reaction
  ['fri/chibi-cta.mp4', 38.5, 42.2, 0.0],      // points down: comment below
  ['fri/chibi-surprised.mp4', 42.2, SECONDS, 3.1],
];

type Cue = [number, number, string];
const CUES: Cue[] = [
  [0.0, 2.8, "ANG BUONG LINGGO NG TITO AI PAGE NA 'TO?"],
  [2.86, 4.3, 'ISANG PROMPT LANG.'],
  [4.36, 5.6, 'KUMUSTA, MGA PAMANGKIN!'],
  [5.62, 7.45, 'GANITO KO PINAPLANO ANG POSTS KO,'],
  [7.48, 8.95, 'KASAMA SI CLAUDE.'],
  [9.0, 11.2, 'SINASABI KO KUNG PARA KANINO,'],
  [11.22, 13.2, "ILANG POSTS, AT ANO'NG KAILANGAN:"],
  [13.26, 16.35, 'HOOK, TOOL, PROMPT AT CALL TO ACTION.'],
  [16.4, 17.95, 'TAPOS, TABLE.'],
  [17.98, 19.42, 'AYAN. TATLONG POST,'],
  [19.46, 21.12, 'MAY HOOK AT PROMPT NA.'],
  [21.18, 23.0, 'PINAGAWA KO PA NG SAMPLE NA CAROUSEL'],
  [23.04, 25.96, 'PARA SA GURO, SA BPO, AT SA NEGOSYO.'],
  [26.0, 28.6, 'HINDI NA AKO NAGSISIMULA SA BLANKONG PAPEL,'],
  [28.66, 31.4, 'PERO AKO PA RIN ANG PUMIPILI AT NAG-AAYOS.'],
  [31.5, 33.0, "PWEDE MO RIN 'TONG SUBUKAN"],
  [33.04, 35.6, 'SA LIBRENG CLAUDE, GEMINI O CHATGPT,'],
  [35.68, 38.6, 'PARA SA REPORT, LESSON PLAN, O PROMO.'],
  [38.68, 40.3, 'GUSTO MO ANG EKSAKTONG PROMPT?'],
  [40.32, 42.25, 'I-COMMENT MO LANG ANG SALITANG PROMPT.'],
  [42.32, 44.85, "IKAW, ANO'NG UNA MONG IPAPLANO?"],
  [44.9, SECONDS, 'TRABAHO O NEGOSYO?'],
];

const Captions = () => {
  const t = useT();
  const cue = CUES.find(([a, b]) => t >= a && t < b);
  if (!cue) return null;
  const o = interpolate((t - cue[0]) * FPS, [0, 3], [0, 1], clamp);
  return <div style={{position: 'absolute', left: 60, right: 60, top: 1560, display: 'flex', justifyContent: 'center'}}>
    <div style={{backgroundColor: '#0A0F1Ee6', borderRadius: 14, padding: '14px 26px', color: '#fff',
      font: '900 50px/1.15 Arial, sans-serif', textAlign: 'center', opacity: o}}>{cue[2]}</div>
  </div>;
};

const Line = ({c = '#fff', bg = navy, size = 92, children}: {c?: string; bg?: string; size?: number; children: React.ReactNode}) =>
  <div style={{background: bg, color: c, padding: '8px 28px 2px', borderRadius: 14, font: `${size}px/1.05 'Bebas Neue', Impact, sans-serif`,
    letterSpacing: 1, textAlign: 'center', boxShadow: '0 8px 24px #0005'}}>{children}</div>;

const Top = ({a, b, top = 150, children}: {a: number; b: number; top?: number; children: React.ReactNode}) => {
  const t = useT();
  if (t < a || t >= b) return null;
  const o = interpolate(t, [a, a + 0.2, b - 0.15, b], [0, 1, 1, 0], clamp);
  const y = interpolate(t, [a, a + 0.25], [24, 0], clamp);
  return <div style={{position: 'absolute', left: 50, right: 50, top, opacity: o, transform: `translateY(${y}px)`,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>{children}</div>;
};

// Whole screen-recording window in a card: objectFit contain, no crop, no zoom.
const Screen = ({src, h}: {src: string; h: number}) => {
  const frame = useCurrentFrame();
  const pop = interpolate(frame, [0, 6], [0.95, 1], clamp);
  const top = 560;
  return <AbsoluteFill style={{background: `linear-gradient(180deg, ${navy} 0%, #16203A 100%)`}}>
    <div style={{position: 'absolute', left: 40, top, width: 1000, height: h, borderRadius: 24, overflow: 'hidden',
      boxShadow: '0 20px 60px #000a', outline: `5px solid ${gold}`, transform: `scale(${pop})`, background: '#000'}}>
      <Video src={staticFile(src)} muted style={{width: 1000, height: h, objectFit: 'contain'}} />
    </div>
    <div style={{position: 'absolute', left: 60, top: top + h + 18, color: '#ffffffb0', font: '600 26px Arial, sans-serif'}}>
      Screen recording · Claude app ni Jeff</div>
  </AbsoluteFill>;
};

const ChibiClip = ({src, offset}: {src: string; offset: number}) =>
  <AbsoluteFill>
    <Video src={staticFile(src)} muted trimBefore={f(offset)} style={{width: 1080, height: 1920, objectFit: 'cover'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0000 70%, #0A0F1E99 100%)'}} />
  </AbsoluteFill>;

// Small moving chibi that pops in over the hook screen.
const HookInset = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = spring({frame, fps, config: {damping: 12, stiffness: 150}});
  return <div style={{position: 'absolute', right: 50, top: 1330, width: 220, height: 220, borderRadius: '50%', overflow: 'hidden',
    border: `6px solid ${gold}`, boxShadow: '0 16px 40px #000a', transform: `scale(${sp})`, transformOrigin: '50% 50%'}}>
    <Video src={staticFile('fri/chibi-surprised.mp4')} muted trimBefore={f(2.0)} style={{width: 420, height: 747, objectFit: 'cover', marginLeft: -100, marginTop: -235}} />
  </div>;
};

const Pill = ({bg, children}: {bg: string; children: React.ReactNode}) =>
  <div style={{background: bg, color: '#fff', borderRadius: 999, padding: '10px 30px 4px', font: "64px/1 'Bebas Neue', Impact, sans-serif",
    letterSpacing: 1, boxShadow: '0 8px 20px #0005'}}>{children}</div>;

const Badges = () => <>
  <div style={{position: 'absolute', right: 40, top: 60, background: '#0A0F1Ecc', color: '#fff', borderRadius: 10,
    padding: '6px 16px', font: '700 26px Arial, sans-serif'}}>AI VOICE</div>
  <div style={{position: 'absolute', left: 40, top: 56, background: gold, color: navy, borderRadius: 10,
    padding: '6px 18px 2px', font: "44px/1 'Bebas Neue', Impact, sans-serif", letterSpacing: 2}}>TITO AI</div>
</>;

export const ClaudePlanReel2: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [f(SECONDS) - 9, f(SECONDS)], [1, 0], clamp);
  return <AbsoluteFill style={{backgroundColor: navy}}>
    <style>{`@font-face{font-family:'Bebas Neue';src:url(${staticFile('fri/BebasNeue-Regular.ttf')})}`}</style>

    {SCREENS.map(([src, a, b, h]) => <Sequence key={src} from={f(a)} durationInFrames={f(b) - f(a)}><Screen src={src} h={h} /></Sequence>)}
    {CHIBI.map(([src, a, b, off]) => <Sequence key={`${src}-${a}`} from={f(a)} durationInFrames={f(b) - f(a)}><ChibiClip src={src} offset={off} /></Sequence>)}
    <Sequence from={f(0.25)} durationInFrames={f(4.3) - f(0.25)}><HookInset /></Sequence>

    <Audio src={staticFile('fri/voice.wav')} />

    <Top a={0} b={4.3}><Line size={104}>1 PROMPT =</Line><Line bg={gold} c={navy} size={104}>1 LINGGONG PLANO</Line></Top>
    <Top a={4.4} b={7.4}><Line size={96}>KUMUSTA,</Line><Line bg={coral} size={96}>MGA PAMANGKIN!</Line></Top>
    <Top a={7.4} b={8.9}><Line size={104}>KASAMA SI CLAUDE</Line></Top>
    <Top a={8.9} b={13.2}><Line bg={gold} c={navy} size={96}>ANG PROMPT KO</Line></Top>
    <Top a={13.2} b={17.9}><Line bg={coral} size={84}>HOOK · TOOL · PROMPT · CTA</Line></Top>
    <Top a={17.9} b={21.2}><Line bg={teal} size={100}>3 POSTS, HANDA NA</Line></Top>
    <Top a={21.2} b={23.9}><Line bg={gold} c={navy} size={100}>PARA SA GURO</Line></Top>
    <Top a={23.9} b={25.4}><Line bg="#5B3FD9" size={100}>PARA SA BPO</Line></Top>
    <Top a={25.4} b={28.2}><Line bg={coral} size={100}>PARA SA NEGOSYO</Line></Top>
    <Top a={28.3} b={31.4}><Line size={96}>IKAW PA RIN ANG</Line><Line bg={gold} c={navy} size={110}>FINAL CHECK</Line></Top>
    <Top a={31.5} b={35.6}><Line size={80}>SUBUKAN SA LIBRENG VERSION</Line>
      <div style={{display: 'flex', gap: 16, marginTop: 8}}><Pill bg={coral}>CLAUDE</Pill><Pill bg={teal}>GEMINI</Pill><Pill bg={navy}>CHATGPT</Pill></div></Top>
    <Top a={35.6} b={38.5}><Line size={80}>GAMITIN SA TRABAHO</Line>
      <div style={{display: 'flex', gap: 16, marginTop: 8}}><Pill bg={teal}>REPORT</Pill><Pill bg={navy}>LESSON PLAN</Pill><Pill bg={coral}>PROMO</Pill></div></Top>
    <Top a={38.5} b={42.2}><Line size={100}>COMMENT:</Line><Line bg={gold} c={navy} size={150}>PROMPT</Line></Top>
    <Top a={42.2} b={SECONDS}><Line size={92}>ANO'NG UNA MONG IPAPLANO?</Line>
      <div style={{display: 'flex', gap: 24}}><Line bg={teal} size={120}>TRABAHO</Line><Line bg={coral} size={120}>NEGOSYO</Line></div></Top>

    <Badges />
    <Captions />
    <AbsoluteFill style={{backgroundColor: navy, opacity: 1 - fadeOut}} />
  </AbsoluteFill>;
};

export const ClaudePlanReel2Composition = () =>
  <Composition id="ClaudePlanReel2" component={ClaudePlanReel2} durationInFrames={f(SECONDS)} fps={FPS} width={1080} height={1920} />;
