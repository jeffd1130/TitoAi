import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// W48 Wed (Nov 25, 2026) EP2 Guro quiz — Jeff's Gemini screen recordings (Snagit Nov 21, work Google account, so no 'libre' claim
// about this run), whole window, never cropped,
// + moving Flow chibi + Gemini TTS voice "Finn" (AI voice, disclosed). Built from MonResumeReel.

const FPS = 30;
const SECONDS = 43.0;
const navy = '#0A0F1E';
const gold = '#F59E0B';
const teal = '#0D9488';
const coral = '#F2545B';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const f = (s: number) => Math.round(s * FPS);
const useT = () => useCurrentFrame() / FPS;

// Full-window screen recordings, never cropped or zoomed. [file, start, end, height]
const SCREENS: [string, number, number, number][] = [
  ['wed/hook.mp4', 0, 4.6, 492],      // Gemini quiz: Q2 answered, correct answer + explanation
  ['wed/paste.mp4', 6.9, 9.85, 684],  // sample lesson + prompt pasted
  ['wed/send.mp4', 9.85, 19.6, 684],  // sent, quiz made (sped up 2.15x)
  ['wed/answer.mp4', 23.7, 27.3, 492],// answering Q2, answer + explanation appear
  ['wed/q5.mp4', 27.3, 31.2, 492],    // Q5 answered with explanations
];

// Moving chibi (Flow, Veo 3.1 Lite, approved chibi as Ingredient): [file, start, end, clip offset s]
const CHIBI: [string, number, number, number][] = [
  ['fri/chibi-cta.mp4', 4.6, 6.9, 3.3],           // wave hello
  ['fri/chibi-point.mp4', 19.6, 23.7, 0.0],       // points at laptop: mula lang sa text
  ['fri/chibi-point.mp4', 31.2, 35.0, 3.7],       // points at viewer: subukan mo rin
  ['fri/chibi-surprised.mp4', 35.0, 37.4, 2.0],   // delighted: + 9 pa
  ['fri/chibi-cta.mp4', 37.4, 39.4, 0.0],         // points down: comment
  ['fri/chibi-surprised.mp4', 39.4, SECONDS, 3.1],
];

type Cue = [number, number, string];
const CUES: Cue[] = [
  [0.0, 3.3, "MA'AM, SIR, SAMPUNG TANONG NA QUIZ, MAY SAGOT PA."],
  [3.4, 4.6, 'ISANG MINUTO LANG.'],
  [5.25, 6.8, 'KUMUSTA, MGA PAMANGKIN!'],
  [6.9, 8.75, 'I-PASTE MO ANG LESSON MO SA GEMINI.'],
  [8.8, 9.8, 'SAMPLE LANG ITO.'],
  [9.85, 11.2, 'TAPOS SABIHIN MO:'],
  [11.25, 16.1, 'GUMAWA NG 10-ITEM NA MULTIPLE CHOICE QUIZ MULA LANG SA TEXT NA ITO.'],
  [16.15, 19.2, 'LAGYAN NG ANSWER KEY, PARA SA GRADE 5.'],
  [19.75, 23.3, 'IMPORTANTE ANG "MULA LANG SA TEXT," PARA HINDI SIYA MAG-IMBENTO.'],
  [23.8, 27.2, 'AYAN, MAY QUIZ NA, MAY SAGOT AT PALIWANAG PA.'],
  [27.4, 29.45, 'BASAHIN MO PA RIN BAGO IBIGAY SA KLASE.'],
  [29.5, 31.1, 'IKAW PA RIN ANG GURO.'],
  [31.25, 34.9, 'PWEDE MO RIN ITONG SUBUKAN SA LIBRENG GEMINI O CHATGPT.'],
  [35.05, 37.35, 'GUSTO MO ANG EKSAKTONG PROMPT AT SIYAM PA?'],
  [37.4, 39.3, 'I-COMMENT MO LANG ANG SALITANG PROMPT.'],
  [39.4, SECONDS, "MA'AM, SIR, QUIZ O LESSON PLAN ANG SUSUNOD?"],
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
      Screen recording · Gemini ni Jeff · sample na lesson</div>
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

export const WedQuizReel: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [f(SECONDS) - 9, f(SECONDS)], [1, 0], clamp);
  return <AbsoluteFill style={{backgroundColor: navy}}>
    <style>{`@font-face{font-family:'Bebas Neue';src:url(${staticFile('fri/BebasNeue-Regular.ttf')})}`}</style>

    {SCREENS.map(([src, a, b, h]) => <Sequence key={src} from={f(a)} durationInFrames={f(b) - f(a)}><Screen src={src} h={h} /></Sequence>)}
    {CHIBI.map(([src, a, b, off]) => <Sequence key={`${src}-${a}`} from={f(a)} durationInFrames={f(b) - f(a)}><ChibiClip src={src} offset={off} /></Sequence>)}
    <Sequence from={f(0.25)} durationInFrames={f(4.6) - f(0.25)}><HookInset /></Sequence>

    <Audio src={staticFile('wed/voice.wav')} />

    <Top a={0} b={4.6}><Line size={110}>GURO?</Line><Line bg={gold} c={navy} size={110}>QUIZ SA 1 MINUTO</Line></Top>
    <Top a={4.7} b={6.9}><Line size={96}>KUMUSTA,</Line><Line bg={coral} size={96}>MGA PAMANGKIN!</Line></Top>
    <Top a={6.9} b={8.8}><Line bg={gold} c={navy} size={104}>I-PASTE ANG LESSON</Line></Top>
    <Top a={8.8} b={9.85}><Line bg={coral} size={110}>SAMPLE LANG</Line></Top>
    <Top a={9.85} b={16.1}><Line size={96}>10-ITEM QUIZ</Line><Line bg={teal} size={100}>"MULA LANG SA TEXT"</Line></Top>
    <Top a={16.1} b={19.6}><Line bg={gold} c={navy} size={100}>+ ANSWER KEY</Line><Line size={84}>GRADE 5</Line></Top>
    <Top a={19.7} b={23.7}><Line bg={teal} size={100}>"MULA LANG SA TEXT"</Line><Line bg={coral} size={90}>= HINDI MAG-IMBENTO</Line></Top>
    <Top a={23.7} b={27.3}><Line size={96}>MAY SAGOT</Line><Line bg={teal} size={100}>AT PALIWANAG PA</Line></Top>
    <Top a={27.3} b={31.2}><Line size={96}>IKAW PA RIN</Line><Line bg={gold} c={navy} size={110}>ANG GURO</Line></Top>
    <Top a={31.3} b={35.0}><Line size={80}>SUBUKAN SA LIBRENG VERSION</Line>
      <div style={{display: 'flex', gap: 16, marginTop: 8}}><Pill bg={teal}>GEMINI</Pill><Pill bg={navy}>CHATGPT</Pill></div></Top>
    <Top a={35.0} b={37.4}><Line size={92}>EKSAKTONG PROMPT</Line><Line bg={teal} size={110}>+ 9 PA</Line></Top>
    <Top a={37.4} b={39.4}><Line size={100}>COMMENT:</Line><Line bg={gold} c={navy} size={150}>PROMPT</Line></Top>
    <Top a={39.4} b={SECONDS}><Line size={92}>SUSUNOD?</Line>
      <div style={{display: 'flex', gap: 24}}><Line bg={teal} size={110}>QUIZ</Line><Line bg={coral} size={110}>LESSON PLAN</Line></div></Top>

    <Badges />
    <Captions />
    <AbsoluteFill style={{backgroundColor: navy, opacity: 1 - fadeOut}} />
  </AbsoluteFill>;
};

export const WedQuizReelComposition = () =>
  <Composition id="WedQuizReel" component={WedQuizReel} durationInFrames={f(SECONDS)} fps={FPS} width={1080} height={1920} />;
