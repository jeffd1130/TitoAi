import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// W48 Mon (Nov 23, 2026) EP1 Resume — Jeff's ChatGPT screen recording (Snagit Nov 21), whole window, never cropped,
// + moving Flow chibi + Gemini TTS voice "Finn" (AI voice, disclosed). Built from ClaudePlanReel2.

const FPS = 30;
const SECONDS = 37.4;
const navy = '#0A0F1E';
const gold = '#F59E0B';
const teal = '#0D9488';
const coral = '#F2545B';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const f = (s: number) => Math.round(s * FPS);
const useT = () => useCurrentFrame() / FPS;

// Full-window screen recordings (1000 x 702), never cropped or zoomed. [file, start, end, height]
const SCREENS: [string, number, number, number][] = [
  ['mon/hook2.mp4', 0, 4.6, 702],     // finished resume (end of the run)
  ['mon/paste.mp4', 7.0, 14.6, 702], // sample notes + prompt pasted (slowed)
  ['mon/send.mp4', 14.6, 21.9, 702], // sent, thinking (sped up), resume starts
  ['mon/stream.mp4', 21.9, 25.0, 702], // resume writing (sped up)
  ['mon/note.mp4', 25.0, 27.2, 702], // "Hindi ko muna isinama ... wala sa ibinigay mo"
];

// Moving chibi (Flow, Veo 3.1 Lite, approved chibi as Ingredient): [file, start, end, clip offset s]
const CHIBI: [string, number, number, number][] = [
  ['fri/chibi-cta.mp4', 4.6, 7.0, 3.3],          // wave hello
  ['fri/chibi-point.mp4', 27.2, 29.0, 3.7],      // points at viewer: ikaw ang huling check
  ['fri/chibi-surprised.mp4', 29.0, 32.0, 2.0],  // delighted: + 9 pa
  ['fri/chibi-cta.mp4', 32.0, 34.3, 0.0],        // points down: comment
  ['mon/chibi-resume.mp4', 34.3, SECONDS, 3.0],  // holds up resume, thumbs up
];

type Cue = [number, number, string];
const CUES: Cue[] = [
  [0.0, 2.45, 'ITO ANG RESUME NA GINAWA NG CHATGPT,'],
  [2.48, 4.1, 'SA LOOB NG LIMANG MINUTO.'],
  [5.2, 6.5, 'KUMUSTA, MGA PAMANGKIN!'],
  [7.05, 9.4, 'ISULAT MO LANG ANG TRABAHO MO, KAHIT MAGULO:'],
  [9.8, 13.1, "SAAN KA NAGTRABAHO, ANO'NG GINAWA MO, ILANG TAON."],
  [13.4, 14.5, 'SAMPLE LANG ITO.'],
  [14.75, 16.2, 'TAPOS SABIHIN MO:'],
  [16.22, 19.0, 'GAWIN MO ITONG RESUME PARA SA TRABAHONG GUSTO KO.'],
  [19.2, 20.6, 'GAMITIN LANG ANG BINIGAY KO,'],
  [20.7, 21.9, 'HUWAG MAG-IMBENTO.'],
  [22.1, 24.6, 'AYAN. MALINIS, AT TOTOO PA RIN.'],
  [24.95, 27.25, 'BASAHIN MO ULIT AT AYUSIN KUNG MAY MALI.'],
  [27.3, 28.9, 'IKAW PA RIN ANG HULING CHECK.'],
  [29.0, 31.9, 'GUSTO MO ANG EKSAKTONG PROMPT AT SIYAM PA?'],
  [31.97, 34.2, 'I-COMMENT MO LANG ANG SALITANG PROMPT.'],
  [34.3, SECONDS, "IKAW, ANO'NG TRABAHO ANG GUSTO MONG APPLYAN?"],
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
      Screen recording · paid ChatGPT ni Jeff · sample na tao</div>
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
    <Video src={staticFile('mon/chibi-resume.mp4')} muted trimBefore={f(3.0)} style={{width: 420, height: 747, objectFit: 'cover', marginLeft: -100, marginTop: -200}} />
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

export const MonResumeReel: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [f(SECONDS) - 9, f(SECONDS)], [1, 0], clamp);
  return <AbsoluteFill style={{backgroundColor: navy}}>
    <style>{`@font-face{font-family:'Bebas Neue';src:url(${staticFile('fri/BebasNeue-Regular.ttf')})}`}</style>

    {SCREENS.map(([src, a, b, h]) => <Sequence key={src} from={f(a)} durationInFrames={f(b) - f(a)}><Screen src={src} h={h} /></Sequence>)}
    {CHIBI.map(([src, a, b, off]) => <Sequence key={`${src}-${a}`} from={f(a)} durationInFrames={f(b) - f(a)}><ChibiClip src={src} offset={off} /></Sequence>)}
    <Sequence from={f(0.25)} durationInFrames={f(4.6) - f(0.25)}><HookInset /></Sequence>

    <Audio src={staticFile('mon/voice.wav')} />

    <Top a={0} b={4.6}><Line size={110}>RESUME MO, 5 MINUTO.</Line><Line bg={gold} c={navy} size={110}>GAMIT ANG AI.</Line></Top>
    <Top a={4.7} b={7.0}><Line size={96}>KUMUSTA,</Line><Line bg={coral} size={96}>MGA PAMANGKIN!</Line></Top>
    <Top a={7.0} b={13.4}><Line size={92}>ISULAT LANG</Line><Line bg={gold} c={navy} size={100}>ANG TRABAHO MO</Line></Top>
    <Top a={13.4} b={14.6}><Line bg={coral} size={110}>SAMPLE LANG</Line></Top>
    <Top a={14.6} b={19.2}><Line size={92}>SABIHIN:</Line><Line bg={teal} size={84}>GAWIN MO ITONG RESUME</Line></Top>
    <Top a={19.2} b={21.9}><Line bg={coral} size={110}>HUWAG MAG-IMBENTO</Line></Top>
    <Top a={21.9} b={25.0}><Line size={96}>MALINIS.</Line><Line bg={teal} size={110}>TOTOO PA RIN.</Line></Top>
    <Top a={25.0} b={27.2}><Line size={84}>WALANG INIMBENTO:</Line><Line bg={gold} c={navy} size={76}>CONTACT, SCHOOL? IKAW MAGDADAGDAG</Line></Top>
    <Top a={27.3} b={29.0}><Line size={96}>IKAW ANG</Line><Line bg={gold} c={navy} size={110}>HULING CHECK</Line></Top>
    <Top a={29.0} b={32.0}><Line size={92}>EKSAKTONG PROMPT</Line><Line bg={teal} size={110}>+ 9 PA</Line></Top>
    <Top a={32.0} b={34.3}><Line size={100}>COMMENT:</Line><Line bg={gold} c={navy} size={150}>PROMPT</Line></Top>
    <Top a={34.3} b={SECONDS}><Line size={92}>ANONG TRABAHO</Line><Line bg={coral} size={100}>ANG GUSTO MO?</Line></Top>
    <Top a={32.0} b={SECONDS} top={1400}><Pill bg={teal}>➕ FOLLOW · EP2 SA MIYERKULES</Pill></Top>

    <Badges />
    <Captions />
    <AbsoluteFill style={{backgroundColor: navy, opacity: 1 - fadeOut}} />
  </AbsoluteFill>;
};

export const MonResumeReelComposition = () =>
  <Composition id="MonResumeReel" component={MonResumeReel} durationInFrames={f(SECONDS)} fps={FPS} width={1080} height={1920} />;
