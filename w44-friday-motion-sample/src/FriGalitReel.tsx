import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// W48 Fri (Nov 27, 2026) EP3 "Galit si Customer? Kalmado Ka." — Jeff's Gemini screen recording (Snagit Nov 24 21:13, work Google
// account, so no 'libre' claim about this run), whole window for the demo parts, readable zoom still on the hook (v2 hook rules,
// no greeting), + moving Flow chibi (headset clip) + Gemini TTS voice "Finn" (AI voice, disclosed). Built from ThuThirteenthReel.

const FPS = 30;
const SECONDS = 45.4;
const navy = '#0A0F1E';
const gold = '#F59E0B';
const teal = '#0D9488';
const coral = '#F2545B';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const f = (s: number) => Math.round(s * FPS);
const useT = () => useCurrentFrame() / FPS;

// Full-window screen recordings (Jeff's Snagit Nov 24, work Google account: no 'libre' claim about this run). [file, start, end, height]
const SCREENS: [string, number, number, number][] = [
  ['fri3/answer.mp4', 12.75, 18.45, 653],   // Gemini's calm reply appears (rec 18.5-24.3)
  ['fri3/option2.mp4', 26.45, 32.55, 653],  // "Bigyan mo pa ako ng isang option" + second reply (rec 41.0-47.1)
];

// Moving chibi (Flow, Veo 3.1 Lite, approved chibi as Ingredient): [file, start, end, clip offset s]
const CHIBI: [string, number, number, number][] = [
  ['fri3/headset.mp4', 3.8, 8.15, 0.0],            // headset, calm: i-paste ang mensahe
  ['fri/chibi-point.mp4', 8.15, 12.75, 0.0],       // points at laptop: sabihin mo
  ['fri3/headset.mp4', 32.55, 34.25, 6.0],         // thumbs up: ikaw pa rin ang huling check
  ['fri/chibi-point.mp4', 34.25, 37.2, 3.7],       // subukan mo rin
  ['fri/chibi-surprised.mp4', 37.2, 39.4, 2.0],    // eksaktong prompt?
  ['fri/chibi-cta.mp4', 39.4, 41.55, 0.0],         // points down: comment
  ['fri/chibi-surprised.mp4', 41.55, SECONDS, 3.1],
];

type Cue = [number, number, string];
const CUES: Cue[] = [
  [0, 1.7, 'GALIT SI CUSTOMER?'],
  [1.75, 3.75, 'ITO ANG SAGOT NA HINDI KA MAPAPAHIYA.'],
  [3.8, 6.45, 'I-PASTE ANG MENSAHE NIYA SA GEMINI, AT ANG TOTOONG ALAM MO.'],
  [6.5, 8.1, 'SAMPLE LANG ITO.'],
  [8.15, 12.7, 'TAPOS SABIHIN MO: GUMAWA NG KALMADONG SAGOT.'],
  [12.75, 15.95, 'MAG-SORRY, IPALIWANAG ANG SUSUNOD NA HAKBANG,'],
  [16.0, 18.4, 'AT HUWAG MANGAKO NG HINDI KAYA.'],
  [18.45, 19.3, 'AYAN.'],
  [19.35, 23.95, 'MAY SORRY, MAY UPDATE KUNG NASAAN ANG REFUND, AT MAY MALINAW NA NEXT STEP:'],
  [24.0, 26.4, 'UPDATE BUKAS NG 5 PM.'],
  [26.45, 27.75, 'GUSTO MO NG IBANG VERSION?'],
  [27.8, 29.9, 'HUMINGI KA LANG NG ISA PANG OPTION.'],
  [29.95, 32.55, 'LAGYAN MO LANG NG TOTOONG DETALYE BAGO I-SEND.'],
  [32.6, 34.2, 'IKAW PA RIN ANG HULING CHECK.'],
  [34.25, 37.15, 'PWEDE MO RIN ITONG SUBUKAN SA LIBRENG GEMINI O CHATGPT.'],
  [37.2, 39.35, 'GUSTO MO ANG EKSAKTONG PROMPT?'],
  [39.4, 41.5, 'I-COMMENT MO LANG ANG SALITANG PROMPT.'],
  [41.55, SECONDS, 'IKAW, ALIN ANG MAS MAHIRAP: CHAT O TAWAG?'],
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
      Gemini · sample na customer</div>
  </AbsoluteFill>;
};

const ChibiClip = ({src, offset}: {src: string; offset: number}) =>
  <AbsoluteFill>
    <Video src={staticFile(src)} muted trimBefore={f(offset)} style={{width: 1080, height: 1920, objectFit: 'cover'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0000 70%, #0A0F1E99 100%)'}} />
  </AbsoluteFill>;

// v2 hook rule: readable zoom of the result on frame 0, slow push-in for motion.
const HookAnswer = () => {
  const frame = useCurrentFrame();
  const z = interpolate(frame, [0, f(8.0)], [1.0, 1.06], clamp);
  return <AbsoluteFill style={{background: `linear-gradient(180deg, ${navy} 0%, #16203A 100%)`}}>
    <div style={{position: 'absolute', left: 40, top: 640, width: 1000, height: 468, borderRadius: 24, overflow: 'hidden',
      boxShadow: '0 20px 60px #000a', outline: `5px solid ${gold}`, background: '#000'}}>
      <Img src={staticFile('fri3/hook-answer.png')} style={{width: 1000, transform: `scale(${z})`, transformOrigin: '20% 30%'}} />
    </div>
    <div style={{position: 'absolute', left: 60, top: 1128, color: '#ffffffb0', font: '600 26px Arial, sans-serif'}}>Gemini · sample na customer</div>
  </AbsoluteFill>;
};

// Small moving chibi that pops in over the hook screen.
const HookInset = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = Math.max(0.85, spring({frame, fps, config: {damping: 12, stiffness: 150}}));
  return <div style={{position: 'absolute', right: 50, top: 1330, width: 220, height: 220, borderRadius: '50%', overflow: 'hidden',
    border: `6px solid ${gold}`, boxShadow: '0 16px 40px #000a', transform: `scale(${sp})`, transformOrigin: '50% 50%'}}>
    <Video src={staticFile('fri3/headset.mp4')} muted trimBefore={f(0)} style={{width: 420, height: 747, objectFit: 'cover', marginLeft: -100, marginTop: -235}} />
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

export const FriGalitReel: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [f(SECONDS) - 9, f(SECONDS)], [1, 0], clamp);
  return <AbsoluteFill style={{backgroundColor: navy}}>
    <style>{`@font-face{font-family:'Bebas Neue';src:url(${staticFile('fri/BebasNeue-Regular.ttf')})}`}</style>

    {SCREENS.map(([src, a, b, h]) => <Sequence key={src} from={f(a)} durationInFrames={f(b) - f(a)}><Screen src={src} h={h} /></Sequence>)}
    {CHIBI.map(([src, a, b, off]) => <Sequence key={`${src}-${a}`} from={f(a)} durationInFrames={f(b) - f(a)}><ChibiClip src={src} offset={off} /></Sequence>)}
    <Sequence from={0} durationInFrames={f(3.8)}><HookAnswer /></Sequence>
    <Sequence from={0} durationInFrames={f(3.8)}><HookInset /></Sequence>
    <Sequence from={f(18.45)} durationInFrames={f(26.45) - f(18.45)}><HookAnswer /></Sequence>

    <Audio src={staticFile('fri3/voice.wav')} />

    <Top a={0} b={3.8} top={120}><Line size={124}>GALIT SI CUSTOMER?</Line><Line bg={gold} c={navy} size={120}>KALMADO KA.</Line><Line bg={teal} size={84}>ANG SAGOT SA 1 PROMPT</Line></Top>
    <Top a={3.8} b={6.5}><Line bg={gold} c={navy} size={104}>I-PASTE ANG MENSAHE</Line><Line size={84}>+ ANG TOTOONG ALAM MO</Line></Top>
    <Top a={6.5} b={8.15}><Line bg={coral} size={110}>SAMPLE LANG</Line></Top>
    <Top a={8.15} b={12.75}><Line size={96}>"KALMADONG SAGOT"</Line></Top>
    <Top a={12.75} b={18.45}><Line bg={teal} size={90}>SORRY · NEXT STEP</Line><Line bg={coral} size={90}>WALANG PANGAKO</Line></Top>
    <Top a={18.45} b={26.45}><Line size={96}>MAY SORRY</Line><Line bg={teal} size={90}>MAY UPDATE SA REFUND</Line><Line bg={gold} c={navy} size={90}>UPDATE BUKAS, 5 PM</Line></Top>
    <Top a={26.45} b={29.95}><Line size={96}>IBANG VERSION?</Line><Line bg={teal} size={90}>"ISA PANG OPTION"</Line></Top>
    <Top a={29.95} b={34.25}><Line size={92}>LAGYAN NG TOTOONG DETALYE</Line><Line bg={gold} c={navy} size={100}>IKAW ANG HULING CHECK</Line></Top>
    <Top a={34.25} b={37.2}><Line size={80}>SUBUKAN SA LIBRENG VERSION</Line>
      <div style={{display: 'flex', gap: 16, marginTop: 8}}><Pill bg={teal}>GEMINI</Pill><Pill bg={navy}>CHATGPT</Pill></div></Top>
    <Top a={37.2} b={39.4}><Line size={100}>EKSAKTONG PROMPT?</Line></Top>
    <Top a={39.4} b={41.55}><Line size={100}>COMMENT:</Line><Line bg={gold} c={navy} size={150}>PROMPT</Line></Top>
    <Top a={41.55} b={SECONDS}><Line size={92}>MAS MAHIRAP?</Line>
      <div style={{display: 'flex', gap: 24}}><Line bg={teal} size={110}>CHAT</Line><Line bg={coral} size={110}>TAWAG</Line></div></Top>

    <Badges />
    <Captions />
    <AbsoluteFill style={{backgroundColor: navy, opacity: 1 - fadeOut}} />
  </AbsoluteFill>;
};

export const FriGalitReelComposition = () =>
  <Composition id="FriGalitReel" component={FriGalitReel} durationInFrames={f(SECONDS)} fps={FPS} width={1080} height={1920} />;
