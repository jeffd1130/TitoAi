import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// W47 Fri (Nov 20, 2026) "Isang Prompt, Isang Linggong Plano" — Jeff's Claude app screen recordings
// (Snagit, Nov 19) + approved chibi bits + Gemini TTS voice "Finn" (AI voice, disclosed).
// Script: content/2026-W47/03b-fri-claude-story/drafts/script.md

const FPS = 30;
const SECONDS = 47.0;
const navy = '#0A0F1E';
const gold = '#F59E0B';
const teal = '#0D9488';
const coral = '#F2545B';
const cream = '#FFF6E5';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const f = (s: number) => Math.round(s * FPS);
const useT = () => useCurrentFrame() / FPS;

// Screen-recording segments: [file, start, end]
const SCREENS: [string, number, number, number?][] = [
  ['fri/hook-bpo.mp4', 0, 4.3],
  ['fri/prompt-table.mp4', 8.9, 17.9, 1.3],
  ['fri/table-full.mp4', 17.9, 21.2, 1.3],
  ['fri/car-guro.mp4', 21.2, 23.9],
  ['fri/car-bpo.mp4', 23.9, 25.4],
  ['fri/car-negosyo.mp4', 25.4, 28.2],
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
  return <div style={{position: 'absolute', left: 60, right: 60, top: 1540, display: 'flex', justifyContent: 'center'}}>
    <div style={{backgroundColor: '#0A0F1Ee6', borderRadius: 14, padding: '14px 26px', color: '#fff',
      font: '900 50px/1.15 Arial, sans-serif', textAlign: 'center', opacity: o}}>{cue[2]}</div>
  </div>;
};

const Line = ({c = '#fff', bg = navy, size = 92, children}: {c?: string; bg?: string; size?: number; children: React.ReactNode}) =>
  <div style={{background: bg, color: c, padding: '8px 28px 2px', borderRadius: 14, font: `${size}px/1.05 'Bebas Neue', Impact, sans-serif`,
    letterSpacing: 1, textAlign: 'center', boxShadow: '0 8px 24px #0005'}}>{children}</div>;

// Headline block near the top, fading in/out over [a, b].
const Top = ({a, b, top = 150, children}: {a: number; b: number; top?: number; children: React.ReactNode}) => {
  const t = useT();
  if (t < a || t >= b) return null;
  const o = interpolate(t, [a, a + 0.2, b - 0.15, b], [0, 1, 1, 0], clamp);
  const y = interpolate(t, [a, a + 0.25], [24, 0], clamp);
  return <div style={{position: 'absolute', left: 50, right: 50, top, opacity: o, transform: `translateY(${y}px)`,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>{children}</div>;
};

// Screen recording in a rounded "phone-like" card with a slow push-in.
const Screen = ({src, a, b, zoom = 1}: {src: string; a: number; b: number; zoom?: number}) => {
  const frame = useCurrentFrame();
  const len = f(b) - f(a);
  const s = interpolate(frame, [0, len], [zoom, zoom * 1.06], clamp);
  const pop = interpolate(frame, [0, 6], [0.94, 1], clamp);
  return <AbsoluteFill style={{backgroundColor: navy}}>
    <div style={{position: 'absolute', left: 40, top: 430, width: 1000, height: 1026, borderRadius: 28, overflow: 'hidden',
      boxShadow: '0 20px 60px #0009', border: `5px solid ${gold}`, transform: `scale(${pop})`}}>
      <div style={{transform: `scale(${s})`, transformOrigin: '50% 15%', width: '100%', height: '100%'}}>
        <Video src={staticFile(src)} muted style={{width: 1000, height: 1026, objectFit: 'cover'}} />
      </div>
    </div>
    <div style={{position: 'absolute', left: 60, top: 1472, color: '#ffffffb0', font: '600 26px Arial, sans-serif'}}>
      Screen recording · Claude app ni Jeff</div>
  </AbsoluteFill>;
};

// Chibi that pops in with a spring and keeps a gentle bob.
const Chibi = ({file, at, x, y, h, flip = false}: {file: string; at: number; x: number; y: number; h: number; flip?: boolean}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const local = frame - f(at);
  if (local < 0) return null;
  const sp = spring({frame: local, fps, config: {damping: 11, stiffness: 140}});
  const bob = Math.sin(local / 9) * 8;
  return <Img src={staticFile(file)} style={{position: 'absolute', left: x, top: y + bob, height: h,
    transform: `scale(${sp}) ${flip ? 'scaleX(-1)' : ''}`, transformOrigin: '50% 100%', filter: 'drop-shadow(0 18px 24px #0006)'}} />;
};

const Bg = ({color, children}: {color: string; children?: React.ReactNode}) =>
  <AbsoluteFill style={{background: `radial-gradient(circle at 50% 40%, ${color} 0%, ${color} 45%, #0A0F1E 140%)`}}>{children}</AbsoluteFill>;

const Pill = ({bg, children}: {bg: string; children: React.ReactNode}) =>
  <div style={{background: bg, color: '#fff', borderRadius: 999, padding: '10px 34px 4px', font: "72px/1 'Bebas Neue', Impact, sans-serif", letterSpacing: 1}}>{children}</div>;

const Badges = () => <>
  <div style={{position: 'absolute', right: 40, top: 60, background: '#0A0F1Ecc', color: '#fff', borderRadius: 10,
    padding: '6px 16px', font: '700 26px Arial, sans-serif'}}>AI VOICE</div>
  <div style={{position: 'absolute', left: 40, top: 56, background: gold, color: navy, borderRadius: 10,
    padding: '6px 18px 2px', font: "44px/1 'Bebas Neue', Impact, sans-serif", letterSpacing: 2}}>TITO AI</div>
</>;

export const ClaudePlanReel: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [f(SECONDS) - 9, f(SECONDS)], [1, 0], clamp);
  return <AbsoluteFill style={{backgroundColor: navy}}>
    <style>{`@font-face{font-family:'Bebas Neue';src:url(${staticFile('fri/BebasNeue-Regular.ttf')})}`}</style>

    {SCREENS.map(([src, a, b, z]) => <Sequence key={src} from={f(a)} durationInFrames={f(b) - f(a)}><Screen src={src} a={a} b={b} zoom={z ?? 1} /></Sequence>)}

    {/* Chibi bit 1: hello */}
    <Sequence from={f(4.3)} durationInFrames={f(8.9) - f(4.3)}>
      <Bg color={gold}><Chibi file="fri/tito-ai-chibi-wave.png" at={0} x={190} y={430} h={1100} /></Bg>
    </Sequence>
    {/* Chibi bit 2: final check */}
    <Sequence from={f(28.2)} durationInFrames={f(31.4) - f(28.2)}>
      <Bg color={teal}><Chibi file="fri/tito-ai-chibi-teach.png" at={0} x={190} y={430} h={1100} /></Bg>
    </Sequence>
    {/* Chibi bit 3: try it free */}
    <Sequence from={f(31.4)} durationInFrames={f(38.5) - f(31.4)}>
      <Bg color={cream}><Chibi file="fri/tito-ai-chibi-teach.png" at={0} x={-60} y={620} h={900} /></Bg>
    </Sequence>
    {/* Chibi bit 4: CTA */}
    <Sequence from={f(38.5)} durationInFrames={f(42.2) - f(38.5)}>
      <Bg color={coral}><Chibi file="fri/tito-ai-chibi-wave.png" at={0} x={240} y={560} h={980} /></Bg>
    </Sequence>
    {/* Chibi bit 5: question */}
    <Sequence from={f(42.2)} durationInFrames={f(SECONDS) - f(42.2)}>
      <Bg color={gold}><Chibi file="fri/tito-ai-chibi-surprised.png" at={0} x={240} y={600} h={940} /></Bg>
    </Sequence>

    {/* Hook chibi pop over the screen */}
    <Sequence from={f(0.25)} durationInFrames={f(4.3) - f(0.25)}>
      <Chibi file="fri/tito-ai-chibi-surprised.png" at={0} x={640} y={1080} h={560} />
    </Sequence>

    <Audio src={staticFile('fri/voice.wav')} />

    {/* Headlines */}
    <Top a={0} b={4.3}><Line size={104}>1 PROMPT =</Line><Line bg={gold} c={navy} size={104}>1 LINGGONG PLANO</Line></Top>
    <Top a={4.4} b={7.4} top={190}><Line size={96}>KUMUSTA,</Line><Line bg={coral} size={96}>MGA PAMANGKIN!</Line></Top>
    <Top a={7.4} b={8.9} top={190}><Line bg={navy} size={104}>KASAMA SI CLAUDE</Line></Top>
    <Top a={8.9} b={13.2}><Line bg={gold} c={navy} size={96}>ANG PROMPT KO</Line></Top>
    <Top a={13.2} b={17.9}><Line bg={coral} size={84}>HOOK · TOOL · PROMPT · CTA</Line></Top>
    <Top a={17.9} b={21.2}><Line bg={teal} size={100}>3 POSTS, HANDA NA</Line></Top>
    <Top a={21.2} b={23.9}><Line bg={gold} c={navy} size={100}>PARA SA GURO</Line></Top>
    <Top a={23.9} b={25.4}><Line bg="#5B3FD9" size={100}>PARA SA BPO</Line></Top>
    <Top a={25.4} b={28.2}><Line bg={coral} size={100}>PARA SA NEGOSYO</Line></Top>
    <Top a={28.3} b={31.4} top={190}><Line size={96}>IKAW PA RIN ANG</Line><Line bg={gold} c={navy} size={110}>FINAL CHECK</Line></Top>
    <Top a={31.5} b={35.6} top={170}><Line size={84}>SUBUKAN SA LIBRENG VERSION</Line>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-end', alignSelf: 'flex-end', marginTop: 60, marginRight: 20}}>
        <Pill bg={coral}>CLAUDE</Pill><Pill bg={teal}>GEMINI</Pill><Pill bg={navy}>CHATGPT</Pill></div></Top>
    <Top a={35.6} b={38.5} top={170}><Line size={84}>GAMITIN SA TRABAHO</Line>
      <div style={{display: 'flex', flexDirection: 'column', gap: 18, alignItems: 'flex-end', alignSelf: 'flex-end', marginTop: 60, marginRight: 20}}>
        <Pill bg={teal}>REPORT</Pill><Pill bg={gold}>LESSON PLAN</Pill><Pill bg={coral}>PROMO</Pill></div></Top>
    <Top a={38.5} b={42.2} top={190}><Line size={100}>COMMENT:</Line><Line bg={gold} c={navy} size={150}>PROMPT</Line></Top>
    <Top a={42.2} b={SECONDS} top={190}><Line size={96}>ANO'NG UNA MONG IPAPLANO?</Line>
      <div style={{display: 'flex', gap: 24}}><Line bg={teal} size={120}>TRABAHO</Line><Line bg={coral} size={120}>NEGOSYO</Line></div></Top>

    <Badges />
    <Captions />
    <AbsoluteFill style={{backgroundColor: navy, opacity: 1 - fadeOut}} />
  </AbsoluteFill>;
};

export const ClaudePlanReelComposition = () =>
  <Composition id="ClaudePlanReel" component={ClaudePlanReel} durationInFrames={f(SECONDS)} fps={FPS} width={1080} height={1920} />;
