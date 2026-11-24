import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// W48 Thu (Nov 26, 2026) "13th Month Mo, Saan Mapupunta?" — Jeff's Gemini screen recording (Snagit Nov 24, work Google
// account, so no 'libre' claim about this run), whole window for the demo parts, readable zoom still on the hook (v2 hook rules),
// + moving Flow chibi + Gemini TTS voice "Finn" (AI voice, disclosed). Built from WedQuizReelV2. Caption timing from pauses (no whisper).

const FPS = 30;
const SECONDS = 46.0;
const navy = '#0A0F1E';
const gold = '#F59E0B';
const teal = '#0D9488';
const coral = '#F2545B';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const f = (s: number) => Math.round(s * FPS);
const useT = () => useCurrentFrame() / FPS;

// Full-window screen recordings (Jeff's Snagit Nov 24, work Google account: no 'libre' claim about this run). [file, start, end, height]
const SCREENS: [string, number, number, number][] = [
  ['thu13/send.mp4', 5.0, 15.2, 641],     // prompt sent, Gemini answers (rec 14.3-24.5)
  ['thu13/table.mp4', 20.9, 28.2, 641],   // 3-option table (rec 24.5-31.8)
  ['thu13/explain.mp4', 28.2, 34.2, 641], // explanation per option (rec 41.5-47.5)
];

// Moving chibi (Flow, Veo 3.1 Lite, approved chibi as Ingredient): [file, start, end, clip offset s]
const CHIBI: [string, number, number, number][] = [
  ['fri/chibi-point.mp4', 15.2, 20.9, 0.0],         // numbers ko lang, huwag mag-imbento
  ['fri/chibi-point.mp4', 34.2, 37.8, 3.7],         // subukan mo rin
  ['fri/chibi-surprised.mp4', 37.8, 39.4, 2.0],     // eksaktong prompt?
  ['fri/chibi-cta.mp4', 39.4, 41.4, 0.0],           // points down: comment
  ['fri/chibi-surprised.mp4', 41.4, SECONDS, 3.1],
];

type Cue = [number, number, string];
const CUES: Cue[] = [
  [0, 2.25, '13TH MONTH MO, SAAN MAPUPUNTA?'],
  [2.3, 4.95, 'HUWAG HULAAN. ITO ANG GINAWA KO SA GEMINI.'],
  [5.1, 6.55, 'SINABI KO ANG NUMBERS KO:'],
  [6.6, 10.35, '₱18,000 ANG 13TH MONTH, ₱5,000 ANG UTANG,'],
  [10.4, 12.15, '₱4,000 ANG NOCHE BUENA,'],
  [12.2, 13.65, '₱3,000 ANG REGALO,'],
  [13.7, 15.15, 'AT GUSTO KONG MAG-IPON.'],
  [15.25, 19.05, 'TAPOS SABI KO: NUMBERS KO LANG ANG GAMITIN MO, HUWAG MAG-IMBENTO,'],
  [19.1, 20.95, 'AT SABIHIN KUNG LUMAMPAS.'],
  [21.0, 23.1, 'AYAN, TATLONG OPTIONS AGAD,'],
  [23.2, 28.2, 'SAKTO LAHAT SA ₱18,000. SA OPTION 2, ₱9,500 ANG IPON.'],
  [28.3, 32.3, 'PERO I-CHECK MO PA RIN SA CALCULATOR, AT IKAW PA RIN ANG MAGDEDESISYON.'],
  [32.4, 34.15, 'SAMPLE NA NUMBERS LANG ITO.'],
  [34.25, 37.75, 'PWEDE MO RIN ITONG SUBUKAN SA LIBRENG GEMINI O CHATGPT.'],
  [37.8, 39.35, 'GUSTO MO ANG EKSAKTONG PROMPT?'],
  [39.4, 41.35, 'I-COMMENT ANG SALITANG PLANO.'],
  [41.4, SECONDS, 'IKAW, ALIN ANG UUNAHIN MO: IPON O NOCHE BUENA?'],
];


const Captions = () => {
  const t = useT();
  const cue = CUES.find(([a, b]) => t >= a && t < b);
  if (!cue) return null;
  const o = cue[0] === 0 ? 1 : interpolate((t - cue[0]) * FPS, [0, 3], [0, 1], clamp);
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
  const o = a === 0 ? interpolate(t, [b - 0.15, b], [1, 0], clamp) : interpolate(t, [a, a + 0.2, b - 0.15, b], [0, 1, 1, 0], clamp);
  const y = a === 0 ? 0 : interpolate(t, [a, a + 0.25], [24, 0], clamp);
  return <div style={{position: 'absolute', left: 50, right: 50, top, opacity: o, transform: `translateY(${y}px)`,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>{children}</div>;
};

// Whole screen-recording window in a card: objectFit contain, no crop, no zoom.
const Screen = ({src, h}: {src: string; h: number}) => {
  const frame = useCurrentFrame();
  const isHook = false;
  const pop = isHook ? 1 : interpolate(frame, [0, 6], [0.95, 1], clamp);
  const top = isHook ? 610 : 560;
  return <AbsoluteFill style={{background: `linear-gradient(180deg, ${navy} 0%, #16203A 100%)`}}>
    <div style={{position: 'absolute', left: 40, top, width: 1000, height: h, borderRadius: 24, overflow: 'hidden',
      boxShadow: '0 20px 60px #000a', outline: `5px solid ${gold}`, transform: `scale(${pop})`, background: '#000'}}>
      <Video src={staticFile(src)} muted style={{width: 1000, height: h, objectFit: 'contain'}} />
    </div>
    <div style={{position: 'absolute', left: 60, top: top + h + 18, color: '#ffffffb0', font: '600 26px Arial, sans-serif'}}>
      Gemini · sample na numbers</div>
  </AbsoluteFill>;
};

const ChibiClip = ({src, offset}: {src: string; offset: number}) =>
  <AbsoluteFill>
    <Video src={staticFile(src)} muted trimBefore={f(offset)} style={{width: 1080, height: 1920, objectFit: 'cover'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0000 70%, #0A0F1E99 100%)'}} />
  </AbsoluteFill>;

// v2 hook rule: readable zoom of the result on frame 0, slow push-in for motion.
const HookTable = () => {
  const frame = useCurrentFrame();
  const z = interpolate(frame, [0, f(5.0)], [1.0, 1.07], clamp);
  return <AbsoluteFill style={{background: `linear-gradient(180deg, ${navy} 0%, #16203A 100%)`}}>
    <div style={{position: 'absolute', left: 40, top: 640, width: 1000, height: 470, borderRadius: 24, overflow: 'hidden',
      boxShadow: '0 20px 60px #000a', outline: `5px solid ${gold}`, background: '#000'}}>
      <Img src={staticFile('thu13/hook-table.png')} style={{width: 1000, transform: `scale(${z})`, transformOrigin: '30% 40%'}} />
    </div>
    <div style={{position: 'absolute', left: 60, top: 1128, color: '#ffffffb0', font: '600 26px Arial, sans-serif'}}>Gemini · sample na numbers</div>
  </AbsoluteFill>;
};

// Small moving chibi that pops in over the hook screen.
const HookInset = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = Math.max(0.85, spring({frame, fps, config: {damping: 12, stiffness: 150}}));
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

export const ThuThirteenthReel: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [f(SECONDS) - 9, f(SECONDS)], [1, 0], clamp);
  return <AbsoluteFill style={{backgroundColor: navy}}>
    <style>{`@font-face{font-family:'Bebas Neue';src:url(${staticFile('fri/BebasNeue-Regular.ttf')})}`}</style>

    {SCREENS.map(([src, a, b, h]) => <Sequence key={src} from={f(a)} durationInFrames={f(b) - f(a)}><Screen src={src} h={h} /></Sequence>)}
    {CHIBI.map(([src, a, b, off]) => <Sequence key={`${src}-${a}`} from={f(a)} durationInFrames={f(b) - f(a)}><ChibiClip src={src} offset={off} /></Sequence>)}
    <Sequence from={0} durationInFrames={f(5.0)}><HookTable /></Sequence>
    <Sequence from={0} durationInFrames={f(5.0)}><HookInset /></Sequence>

    <Audio src={staticFile('thu13/voice.wav')} />

    <Top a={0} b={5.0} top={120}><Line size={124}>13TH MONTH MO</Line><Line bg={gold} c={navy} size={112}>SAAN MAPUPUNTA?</Line><Line bg={teal} size={84}>3 OPTIONS SA 1 TANONG</Line></Top>
    <Top a={5.0} b={6.6}><Line bg={gold} c={navy} size={104}>ANG NUMBERS KO</Line></Top>
    <Top a={6.6} b={15.2}><Line size={96}>₱18,000 NA 13TH MONTH</Line><Line bg={coral} size={84}>SAMPLE NA NUMBERS</Line></Top>
    <Top a={15.3} b={20.9}><Line bg={teal} size={100}>"NUMBERS KO LANG"</Line><Line bg={coral} size={90}>= HINDI MAG-IMBENTO</Line></Top>
    <Top a={20.9} b={28.2}><Line size={100}>3 OPTIONS</Line><Line bg={gold} c={navy} size={104}>SAKTO LAHAT SA ₱18,000</Line></Top>
    <Top a={28.2} b={34.2}><Line size={96}>I-CHECK SA CALCULATOR</Line><Line bg={gold} c={navy} size={100}>IKAW ANG MAGDEDESISYON</Line></Top>
    <Top a={34.25} b={37.8}><Line size={80}>SUBUKAN SA LIBRENG VERSION</Line>
      <div style={{display: 'flex', gap: 16, marginTop: 8}}><Pill bg={teal}>GEMINI</Pill><Pill bg={navy}>CHATGPT</Pill></div></Top>
    <Top a={37.8} b={39.4}><Line size={100}>EKSAKTONG PROMPT?</Line></Top>
    <Top a={39.4} b={41.4}><Line size={100}>COMMENT:</Line><Line bg={gold} c={navy} size={150}>PLANO</Line></Top>
    <Top a={41.4} b={SECONDS}><Line size={92}>UUNAHIN MO?</Line>
      <div style={{display: 'flex', gap: 24}}><Line bg={teal} size={110}>IPON</Line><Line bg={coral} size={110}>NOCHE BUENA</Line></div></Top>

    <Badges />
    <Captions />
    <AbsoluteFill style={{backgroundColor: navy, opacity: 1 - fadeOut}} />
  </AbsoluteFill>;
};

export const ThuThirteenthReelComposition = () =>
  <Composition id="ThuThirteenthReel" component={ThuThirteenthReel} durationInFrames={f(SECONDS)} fps={FPS} width={1080} height={1920} />;
