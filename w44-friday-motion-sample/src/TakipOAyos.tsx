import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Sequence, interpolate, staticFile, useCurrentFrame} from 'remotion';

// W47 Wed (Nov 18, 2026) "Takip o Ayos?" ASEAN Summit satire. 5 Flow clips (approved chibi as Ingredient),
// Jeff's voice (slip cut, pauses tightened, -14 LUFS), burned-in captions, SATIRE label.
// Script: content/2026-W47/02b-wed-asean-satire/drafts/script.md

const FPS = 30;
const SECONDS = 40.7;
const navy = '#0A0F1E';
const gold = '#F59E0B';
const teal = '#0D9488';
const coral = '#F2545B';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const f = (s: number) => Math.round(s * FPS);

// [file, start s, end s] — each 8 s clip is sped/slowed to fill its slot.
const SHOTS: [string, number, number][] = [
  ['takip/shot-A-paint.mp4', 0, 5.5],
  ['takip/shot-B-peek.mp4', 5.5, 14.2],
  ['takip/shot-C-laptop.mp4', 14.2, 23.0],
  ['takip/shot-E-phone.mp4', 23.0, 31.9],
  ['takip/shot-D-reveal.mp4', 31.9, SECONDS],
];

type Cue = [number, number, string];
const CUES: Cue[] = [
  [0.1, 2.2, 'MAY BISITA?'],
  [2.2, 5.4, 'EDI PINTURAHAN NA LANG ANG PADER!'],
  [5.6, 8.4, 'NGAYONG ASEAN SUMMIT, USAP-USAPAN'],
  [8.4, 10.5, 'ANG MGA PADER NA PININTURAHAN SA DIOKNO'],
  [10.5, 11.8, 'PERO MGA PAMANGKIN,'],
  [11.8, 14.2, 'ANG PROBLEMA, HINDI NAWAWALA KAPAG TINAKPAN'],
  [14.3, 15.9, 'SA AI,'],
  [15.9, 18.2, 'KAYA MONG ILISTA ANG TOTOONG PROBLEMA'],
  [18.2, 20.5, 'I-RANK KUNG ALIN ANG UUNAHIN'],
  [20.5, 21.8, 'AT GUMAWA NG PLANO'],
  [21.8, 23.1, 'LIBRE PA!'],
  [23.1, 25.0, 'SUBUKAN MO ITO:'],
  [32.0, 34.4, 'ANG AI, HINDI PANG-TAKIP.'],
  [34.4, 35.4, 'PANG-AYOS.'],
  [35.5, 38.3, 'IKAW: TATAKPAN MO, O AYUSIN MO?'],
  [38.4, SECONDS, 'COMMENT MO: TAKIP O AYOS 👇'],
];

const Captions = () => {
  const t = useCurrentFrame() / FPS;
  const cue = CUES.find(([a, b]) => t >= a && t < b);
  if (!cue) return null;
  const o = interpolate((t - cue[0]) * FPS, [0, 3], [0, 1], clamp);
  return <div style={{position: 'absolute', left: 70, right: 170, top: 1150, display: 'flex', justifyContent: 'center'}}>
    <div style={{backgroundColor: '#0A0F1Ed9', borderRadius: 14, padding: '14px 24px', color: '#FFFFFF',
      font: '900 50px/1.15 Arial, sans-serif', textAlign: 'center', opacity: o}}>{cue[2]}</div>
  </div>;
};

// Text block near the top, fading in/out over [a, b] seconds.
const Top = ({a, b, children, top = 210}: {a: number; b: number; children: React.ReactNode; top?: number}) => {
  const t = useCurrentFrame() / FPS;
  if (t < a || t >= b) return null;
  const o = interpolate(t, [a, a + 0.2, b - 0.2, b], [0, 1, 1, 0], clamp);
  const y = interpolate(t, [a, a + 0.25], [24, 0], clamp);
  return <div style={{position: 'absolute', left: 60, right: 60, top, opacity: o, transform: `translateY(${y}px)`,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10}}>{children}</div>;
};
const Line = ({c = '#fff', bg = navy, size = 92, children}: {c?: string; bg?: string; size?: number; children: React.ReactNode}) =>
  <div style={{background: bg, color: c, padding: '6px 26px 2px', borderRadius: 12, font: `${size}px/1.05 'Bebas Neue', Impact, sans-serif`,
    letterSpacing: 1, textAlign: 'center', boxShadow: '0 8px 24px #0006'}}>{children}</div>;

const PromptCard = () => {
  const t = useCurrentFrame() / FPS;
  const a = 25.0, b = 31.8;
  if (t < a || t >= b) return null;
  const o = interpolate(t, [a, a + 0.25, b - 0.25, b], [0, 1, 1, 0], clamp);
  return <div style={{position: 'absolute', left: 70, right: 70, top: 1030, opacity: o, background: '#FFFFFF', borderRadius: 22,
    padding: '26px 34px', boxShadow: '0 10px 30px #0008', border: `6px solid ${teal}`}}>
    <div style={{font: "40px/1 'Bebas Neue', Impact, sans-serif", color: teal, letterSpacing: 1, marginBottom: 10}}>PROMPT · LIBRENG AI</div>
    <div style={{font: '700 44px/1.25 Arial, sans-serif', color: navy}}>
      "Ito ang problema sa barangay namin: [ilista]. Ano'ng tatlong pwedeng ayusin ngayong buwan?"</div>
  </div>;
};

const Satire = () => <div style={{position: 'absolute', left: 40, top: 70, background: coral, color: '#fff', borderRadius: 10,
  padding: '6px 18px 2px', font: "44px/1 'Bebas Neue', Impact, sans-serif", letterSpacing: 2}}>SATIRE · PARODY</div>;

export const TakipOAyos: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [f(SECONDS) - 10, f(SECONDS)], [1, 0], clamp);
  return <AbsoluteFill style={{backgroundColor: navy}}>
    <style>{`@font-face{font-family:'Bebas Neue';src:url(${staticFile('takip/BebasNeue-Regular.ttf')})}`}</style>
    {SHOTS.map(([src, a, b]) => {
      const rate = 8 / (b - a);
      return <Sequence key={src} from={f(a)} durationInFrames={f(b) - f(a)}>
        <Video src={staticFile(src)} muted playbackRate={rate} style={{width: '100%', height: '100%', objectFit: 'cover'}} />
      </Sequence>;
    })}
    <Audio src={staticFile('takip-voice.m4a')} />
    <Satire />
    <Top a={0.1} b={5.4}><Line size={104}>MAY BISITA?</Line><Line bg={gold} c={navy} size={104}>PINTURAHAN NA LANG.</Line></Top>
    <Top a={11.8} b={14.2}><Line bg={coral} size={110}>TINAKPAN ≠ INAYOS</Line></Top>
    <Top a={32.0} b={38.3}><Line size={96}>ANG AI:</Line><Line bg={coral} size={96}>HINDI PANG-TAKIP.</Line><Line bg={teal} size={110}>PANG-AYOS.</Line></Top>
    <Top a={38.3} b={SECONDS}><Line size={92}>COMMENT MO:</Line>
      <div style={{display: 'flex', gap: 24}}><Line bg={coral} size={120}>TAKIP</Line><Line bg={teal} size={120}>AYOS</Line></div></Top>
    <Captions />
    <PromptCard />
    <AbsoluteFill style={{backgroundColor: navy, opacity: 1 - fadeOut}} />
  </AbsoluteFill>;
};

export const TakipOAyosComposition = () =>
  <Composition id="TakipOAyos" component={TakipOAyos} durationInFrames={f(SECONDS)} fps={FPS} width={1080} height={1920} />;
