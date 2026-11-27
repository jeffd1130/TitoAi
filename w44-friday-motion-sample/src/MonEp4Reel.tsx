import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// W49 Mon (Nov 30, 2026) EP4 "3 Caption para sa Paninda" — Jeff's own voice (denoised, first 0.7 s trimmed so voice starts on frame 1),
// real ChatGPT output captured by Claude Code Nov 27 (Temporary chat in Jeff's logged-in account: plan not verified, so no 'libre' claim),
// moving Flow chibi clips (approved chibi). Built from FriGalitReel. CTA kept below the chibi's face.

const FPS = 30;
const SECONDS = 47.6;
const navy = '#0A0F1E';
const gold = '#F59E0B';
const teal = '#0D9488';
const coral = '#F2545B';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const f = (s: number) => Math.round(s * FPS);
const useT = () => useCurrentFrame() / FPS;

// [file, start, end, clip offset s]
const CHIBI: [string, number, number, number][] = [
  ['fri/chibi-point.mp4', 4.98, 8.8, 0.0],
  ['fri/chibi-surprised.mp4', 26.92, 29.54, 0.0],
  ['fri/chibi-point.mp4', 31.88, 36.38, 2.5],
  ['fri/chibi-surprised.mp4', 41.98, 43.64, 3.0],
  ['fri/chibi-cta.mp4', 43.64, SECONDS, 0.0],
];

type Cue = [number, number, string];
const CUES: Cue[] = [
  [0, 4.98, 'TATLONG CAPTION PARA SA PANINDA MO. ISANG MINUTO LANG.'],
  [4.98, 8.8, 'ILAGAY MO ANG PRODUKTO, PRESYO, AT PARA KANINO.'],
  [8.8, 15.42, "SAMPLE LANG 'TO: DRIED MANGO, ISANDAAN AT LIMAMPUNG PISO."],
  [15.42, 20.46, 'TAPOS SABIHIN MO: GUMAWA NG TATLONG MAIKLING TAGLISH CAPTION.'],
  [20.46, 22.74, 'ISANG NAKAKATAWA,'],
  [22.74, 24.46, 'ISANG DIRETSO,'],
  [24.46, 26.92, 'ISANG MAY PROMO.'],
  [26.92, 29.54, 'AT ITO ANG IMPORTANTE:'],
  [29.54, 31.88, 'HUWAG GUMAWA NG PEKENG REVIEW.'],
  [31.88, 36.38, 'MARAMING BUYER NGAYON, NAG-LE-LEGIT CHECK MUNA.'],
  [36.38, 39.56, "PILIIN MO 'YUNG BAGAY SA 'YO,"],
  [39.56, 41.98, 'AT IKAW PA RIN ANG MAG-CHECK NG PRESYO.'],
  [41.98, 43.64, 'GUSTO MO ANG BUONG PROMPT?'],
  [43.64, 45.4, 'COMMENT PROMPT.'],
  [45.4, SECONDS, 'IKAW, ALIN ANG GAGAMITIN MO: 1, 2 O 3?'],
];

const bg = {background: `linear-gradient(180deg, ${navy} 0%, #16203A 100%)`};

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

const Line = ({c = '#fff', bg: b = navy, size = 92, children}: {c?: string; bg?: string; size?: number; children: React.ReactNode}) =>
  <div style={{background: b, color: c, padding: '8px 28px 2px', borderRadius: 14, font: `${size}px/1.05 'Bebas Neue', Impact, sans-serif`,
    letterSpacing: 1, textAlign: 'center', boxShadow: '0 8px 24px #0005'}}>{children}</div>;

const Top = ({a, b, top = 150, children}: {a: number; b: number; top?: number; children: React.ReactNode}) => {
  const t = useT();
  if (t < a || t >= b) return null;
  const o = a === 0 ? interpolate(t, [b - 0.15, b], [1, 0], clamp) : interpolate(t, [a, a + 0.2, b - 0.15, b], [0, 1, 1, 0], clamp);
  const y = a === 0 ? 0 : interpolate(t, [a, a + 0.25], [24, 0], clamp);
  return <div style={{position: 'absolute', left: 50, right: 50, top, opacity: o, transform: `translateY(${y}px)`,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>{children}</div>;
};

const Label = ({top, children}: {top: number; children: React.ReactNode}) =>
  <div style={{position: 'absolute', left: 60, top, color: '#ffffffb0', font: '600 26px Arial, sans-serif'}}>{children}</div>;

// A real ChatGPT capture in a card; slow push-in for motion. w/h = source pixels.
const Shot = ({src, w, h, top = 600, label = 'ChatGPT · sample na paninda', mark, quote}: {src: string; w: number; h: number; top?: number; label?: string;
  mark?: {x: number; y: number; w: number; h: number}; quote?: string}) => {
  const frame = useCurrentFrame();
  const s = 1000 / w, H = h * s;
  const z = interpolate(frame, [0, f(6)], [1.0, 1.04], clamp);
  const pop = interpolate(frame, [0, 6], [0.95, 1], clamp);
  const mo = interpolate(frame, [f(0.4), f(0.7)], [0, 1], clamp);
  return <AbsoluteFill style={bg}>
    <div style={{position: 'absolute', left: 40, top, width: 1000, height: H, borderRadius: 24, overflow: 'hidden',
      boxShadow: '0 20px 60px #000a', outline: `5px solid ${gold}`, transform: `scale(${pop})`, background: '#000'}}>
      <div style={{position: 'relative', transform: `scale(${z})`, transformOrigin: '30% 40%'}}>
        <Img src={staticFile(src)} style={{width: 1000, display: 'block'}} />
        {mark && <div style={{position: 'absolute', left: mark.x * s, top: mark.y * s, width: mark.w * s, height: mark.h * s,
          border: `6px solid ${coral}`, borderRadius: 12, opacity: mo, boxShadow: `0 0 30px ${coral}aa`}} />}
      </div>
    </div>
    <Label top={top + H + 18}>{label}</Label>
    {quote && <div style={{position: 'absolute', left: 60, right: 60, top: top + H + 80, color: '#fff', textAlign: 'center',
      font: '800 50px/1.25 Arial, sans-serif', opacity: interpolate(frame, [3, 10], [0, 1], clamp)}}>
      <span style={{background: '#ffffff14', borderLeft: `8px solid ${gold}`, padding: '6px 18px', boxDecorationBreak: 'clone', WebkitBoxDecorationBreak: 'clone'}}>“{quote}”</span></div>}
  </AbsoluteFill>;
};

const ChibiClip = ({src, offset}: {src: string; offset: number}) =>
  <AbsoluteFill>
    <Video src={staticFile(src)} muted trimBefore={f(offset)} style={{width: 1080, height: 1920, objectFit: 'cover'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0000 70%, #0A0F1E99 100%)'}} />
  </AbsoluteFill>;

const HookInset = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = Math.max(0.85, spring({frame, fps, config: {damping: 12, stiffness: 150}}));
  return <div style={{position: 'absolute', right: 50, top: 1250, width: 220, height: 220, borderRadius: '50%', overflow: 'hidden',
    border: `6px solid ${gold}`, boxShadow: '0 16px 40px #000a', transform: `scale(${sp})`}}>
    <Video src={staticFile('fri/chibi-point.mp4')} muted style={{width: 420, height: 747, objectFit: 'cover', marginLeft: -100, marginTop: -200}} />
  </div>;
};

const Badge = () =>
  <div style={{position: 'absolute', left: 40, top: 56, background: gold, color: navy, borderRadius: 10,
    padding: '6px 18px 2px', font: "44px/1 'Bebas Neue', Impact, sans-serif", letterSpacing: 2}}>TITO AI · EP4</div>;

const Seq = ({a, b, children}: {a: number; b: number; children: React.ReactNode}) =>
  <Sequence from={f(a)} durationInFrames={f(b) - f(a)}>{children}</Sequence>;

export const MonEp4Reel: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [f(SECONDS) - 9, f(SECONDS)], [1, 0], clamp);
  return <AbsoluteFill style={{backgroundColor: navy}}>
    <style>{`@font-face{font-family:'Bebas Neue';src:url(${staticFile('fri/BebasNeue-Regular.ttf')})}`}</style>

    {/* hook: the real result on frame 0 */}
    <Seq a={0} b={4.98}><Shot src="ep4/crop-funny.png" w={1383} h={321} top={560} quote="Yung dried mango na pang-regalo sana, pero ikaw din ang nakaubos! 😂" /></Seq>
    <Seq a={0} b={4.98}><HookInset /></Seq>
    <Seq a={8.8} b={15.42}><Shot src="ep4/win-prompt.png" w={1418} h={691} top={620} /></Seq>
    <Seq a={15.42} b={20.46}><Shot src="ep4/crop-prompt.png" w={968} h={269} top={720} /></Seq>
    <Seq a={20.46} b={22.74}><Shot src="ep4/crop-funny.png" w={1383} h={321} top={560} label="ChatGPT · 1. Nakakatawa" quote="Yung dried mango na pang-regalo sana, pero ikaw din ang nakaubos! 😂" /></Seq>
    <Seq a={22.74} b={24.46}><Shot src="ep4/crop-direct.png" w={1383} h={321} top={560} label="ChatGPT · 2. Diretso" quote="Looking for an affordable Christmas gift? Dried mango for only ₱150 per pack!" /></Seq>
    <Seq a={24.46} b={26.92}><Shot src="ep4/crop-promo.png" w={1383} h={305} top={560} label="ChatGPT · 3. May promo" quote="Buy 3 packs of dried mango for only ₱450 at libre na ang shipping!" /></Seq>
    <Seq a={29.54} b={31.88}><Shot src="ep4/crop-prompt.png" w={968} h={269} top={620} label="Nasa prompt mismo" quote="Huwag gumawa ng pekeng review o claim na hindi totoo." mark={{x: 375, y: 160, w: 562, h: 46}} /></Seq>
    <Seq a={36.38} b={41.98}><Shot src="ep4/crop-promo.png" w={1383} h={305} top={560} label="I-check: 3 × ₱150 = ₱450 ✓" quote="Buy 3 packs of dried mango for only ₱450 at libre na ang shipping!" mark={{x: 25, y: 78, w: 925, h: 48}} /></Seq>
    {CHIBI.map(([src, a, b, off]) => <Seq key={`${src}-${a}`} a={a} b={b}><ChibiClip src={src} offset={off} /></Seq>)}

    <Audio src={staticFile('ep4/voice.wav')} />

    <Top a={0} b={4.98} top={120}><Line size={120}>3 CAPTION</Line><Line bg={gold} c={navy} size={116}>PARA SA PANINDA</Line><Line bg={teal} size={84}>ISANG MINUTO LANG</Line></Top>
    <Top a={4.98} b={8.8}><Line bg={gold} c={navy} size={100}>PRODUKTO · PRESYO</Line><Line size={96}>PARA KANINO</Line></Top>
    <Top a={8.8} b={15.42}><Line bg={coral} size={104}>SAMPLE LANG</Line><Line size={92}>DRIED MANGO · ₱150</Line></Top>
    <Top a={15.42} b={20.46}><Line size={96}>"3 MAIKLING TAGLISH CAPTION"</Line></Top>
    <Top a={20.46} b={22.74}><Line bg={teal} size={110}>1 · NAKAKATAWA</Line></Top>
    <Top a={22.74} b={24.46}><Line bg={gold} c={navy} size={110}>2 · DIRETSO</Line></Top>
    <Top a={24.46} b={26.92}><Line bg={coral} size={110}>3 · MAY PROMO</Line></Top>
    <Top a={26.92} b={29.54}><Line size={110}>IMPORTANTE:</Line></Top>
    <Top a={29.54} b={31.88}><Line bg={coral} size={104}>BAWAL ANG PEKENG REVIEW</Line></Top>
    <Top a={31.88} b={36.38}><Line size={96}>BUYERS NGAYON:</Line><Line bg={gold} c={navy} size={104}>LEGIT CHECK MUNA</Line></Top>
    <Top a={36.38} b={41.98}><Line size={96}>PILIIN ANG BAGAY SA 'YO</Line><Line bg={teal} size={96}>IKAW ANG MAG-CHECK NG PRESYO</Line></Top>
    <Top a={41.98} b={43.64}><Line size={100}>BUONG PROMPT?</Line></Top>
    {/* below the chibi's face */}
    <Top a={43.64} b={45.4} top={1080}><Line size={100}>COMMENT:</Line><Line bg={gold} c={navy} size={150}>PROMPT</Line></Top>
    <Top a={45.4} b={SECONDS} top={1080}><Line size={92}>ALIN ANG SA 'YO?</Line>
      <div style={{display: 'flex', gap: 20}}><Line bg={teal} size={110}>1</Line><Line bg={gold} c={navy} size={110}>2</Line><Line bg={coral} size={110}>3</Line></div></Top>

    <Badge />
    <Captions />
    <AbsoluteFill style={{backgroundColor: navy, opacity: 1 - fadeOut}} />
  </AbsoluteFill>;
};

export const MonEp4ReelComposition = () =>
  <Composition id="MonEp4Reel" component={MonEp4Reel} durationInFrames={f(SECONDS)} fps={FPS} width={1080} height={1920} />;
