import React from 'react';
import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// BTS reel (Nov 27, 2026): "Paano ginagawa ang Tito AI content". Jeff's own voice (bts/voice.wav once it arrives; set VOICE).
// Viewer-first: their problem -> how we do it -> AI's mistake fixed by Jeff -> Jeff approves -> what they can do with one free chat.
// Real Studio / TikTok Studio / Meta Planner captures (only Tito AI posts; no other brands, paths, names or keys).
// Timed to Jeff's recording (whisper word timings, raw/bts-voice-tight-words.json).

const FPS = 30;
const VOICE: string | null = 'bts/voice.wav'; // Jeff's voice, denoised + pauses tightened (raw/bts-voice-tight.wav)
// Scene boundaries (s) — one per voice line.
const T = {l1: 0, l2: 3.6, l3: 8.7, l4: 14.55, l5: 21.5, l6: 28.2, l7: 34.4, l8: 44.6, end: 49.4};
const SECONDS = T.end;
const navy = '#0A0F1E';
const navy2 = '#16203A';
const gold = '#F59E0B';
const teal = '#0D9488';
const coral = '#F2545B';
const cream = '#FFF7E6';
const clamp = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
const f = (s: number) => Math.round(s * FPS);
const useT = () => useCurrentFrame() / FPS;
const bebas = "'Bebas Neue', Impact, sans-serif";

type Cue = [number, number, string];
const CUES: Cue[] = [
  [T.l1, T.l2, 'HI! AKO ANG TAO SA LIKOD NG TITO AI.'],
  [T.l2, 6.85, 'WALA KANG ORAS GUMAWA NG CONTENT?'],
  [6.85, T.l3, 'SAME. KAYA ITO ANG GINAWA KO.'],
  [T.l3, 11.25, 'ANG AI ANG GUMAGAWA NG DRAFT:'],
  [11.25, T.l4, 'RESEARCH, SCRIPT, SLIDES, PATI VIDEO.'],
  [T.l4, 17.3, 'PERO HINDI SIYA PERPEKTO.'],
  [17.3, T.l5, 'ITO ANG MALI NIYA, AKO ANG NAG-AAYOS.'],
  [T.l5, 25.6, "WALANG LALABAS SA PAGE HANGGA'T HINDI KO INAAPRUBAHAN."],
  [25.6, T.l6, 'AKO PA RIN ANG NAGDEDESISYON.'],
  [T.l6, 30.8, 'HINDI MO KAILANGAN NG BUONG TEAM NG AI.'],
  [30.8, T.l7, 'ISANG LIBRENG CHAT LANG. SIMULA KA NA.'],
  [T.l7, 35.85, 'I-TYPE MO LANG:'],
  [35.85, 42.0, '"GAWAN MO AKO NG TATLONG POST IDEA PARA SA NEGOSYO KO NGAYONG LINGGO."'],
  [42.0, T.l8, 'TAPOS, IKAW ANG MAG-CHECK.'],
  [T.l8, T.end, 'GUSTO MO ANG BUONG PROMPT PARA SA PAGE MO? COMMENT PLANO.'],
];

const Captions = () => {
  const t = useT();
  const cue = CUES.find(([a, b]) => t >= a && t < b);
  if (!cue) return null;
  const o = cue[0] === 0 ? 1 : interpolate((t - cue[0]) * FPS, [0, 3], [0, 1], clamp);
  return <div style={{position: 'absolute', left: 60, right: 60, top: 1580, display: 'flex', justifyContent: 'center'}}>
    <div style={{backgroundColor: '#0A0F1Ee6', borderRadius: 14, padding: '14px 26px', color: '#fff',
      font: '900 46px/1.15 Arial, sans-serif', textAlign: 'center', opacity: o}}>{cue[2]}</div>
  </div>;
};

const Line = ({c = '#fff', bg = navy, size = 92, children}: {c?: string; bg?: string; size?: number; children: React.ReactNode}) =>
  <div style={{background: bg, color: c, padding: '8px 28px 2px', borderRadius: 14, font: `${size}px/1.05 ${bebas}`,
    letterSpacing: 1, textAlign: 'center', boxShadow: '0 8px 24px #0005'}}>{children}</div>;

const Top = ({a, b, top = 150, children}: {a: number; b: number; top?: number; children: React.ReactNode}) => {
  const t = useT();
  if (t < a || t >= b) return null;
  const o = a === 0 ? interpolate(t, [b - 0.15, b], [1, 0], clamp) : interpolate(t, [a, a + 0.2, b - 0.15, b], [0, 1, 1, 0], clamp);
  const y = a === 0 ? 0 : interpolate(t, [a, a + 0.25], [24, 0], clamp);
  return <div style={{position: 'absolute', left: 50, right: 50, top, opacity: o, transform: `translateY(${y}px)`,
    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12}}>{children}</div>;
};

const Bg = () => <AbsoluteFill style={{background: `linear-gradient(180deg, ${navy} 0%, ${navy2} 100%)`}} />;

// A real screenshot in a framed card, with a slow push-in.
const Shot = ({src, top, w = 1000, label, outline = gold, delay = 0}: {src: string; top: number; w?: number; label?: string; outline?: string; delay?: number}) => {
  const frame = useCurrentFrame() - f(delay);
  const {fps} = useVideoConfig();
  if (frame < 0) return null;
  const sp = spring({frame, fps, config: {damping: 14, stiffness: 120}});
  const z = interpolate(frame, [0, f(6)], [1, 1.04], clamp);
  return <div style={{position: 'absolute', left: (1080 - w) / 2, top, width: w, opacity: sp, transform: `translateY(${(1 - sp) * 40}px)`}}>
    <div style={{borderRadius: 22, overflow: 'hidden', outline: `5px solid ${outline}`, boxShadow: '0 20px 60px #000a', background: '#000'}}>
      <Img src={staticFile(src)} style={{width: w, display: 'block', transform: `scale(${z})`, transformOrigin: '30% 30%'}} />
    </div>
    {label && <div style={{marginTop: 12, color: '#ffffffb0', font: '600 26px Arial, sans-serif'}}>{label}</div>}
  </div>;
};

const ChibiClip = ({src, offset = 0}: {src: string; offset?: number}) =>
  <AbsoluteFill>
    <Video src={staticFile(src)} muted trimBefore={f(offset)} style={{width: 1080, height: 1920, objectFit: 'cover'}} />
    <AbsoluteFill style={{background: 'linear-gradient(180deg, #0A0F1E99 0%, #0000 35%, #0000 70%, #0A0F1E99 100%)'}} />
  </AbsoluteFill>;

const FaceCircle = ({src, top = 1300, mt = -235}: {src: string; top?: number; mt?: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const sp = Math.max(0.85, spring({frame, fps, config: {damping: 12, stiffness: 150}}));
  return <div style={{position: 'absolute', right: 50, top, width: 220, height: 220, borderRadius: '50%', overflow: 'hidden',
    border: `6px solid ${gold}`, boxShadow: '0 16px 40px #000a', transform: `scale(${sp})`}}>
    <Video src={staticFile(src)} muted style={{width: 420, height: 747, objectFit: 'cover', marginLeft: -100, marginTop: mt}} />
  </div>;
};

// Hook: the week's real slides fanned out, frame 0 readable.
const HookFan = () => {
  const frame = useCurrentFrame();
  const slides = ['bts/02-tue-legit-check-slides-1.png', 'bts/04-thu-regalo-slides-1.png', 'bts/06-sat-bangko-call-slides-1.png', 'bts/guro-1.png'];
  return <AbsoluteFill>
    <Bg />
    {slides.map((s, i) => {
      const rot = [-10, -3, 4, 11][i];
      const x = [70, 270, 470, 660][i];
      const drift = interpolate(frame, [0, f(8.7)], [0, (i - 1.5) * 22], clamp);
      return <Img key={s} src={staticFile(s)} style={{position: 'absolute', left: x + drift, top: 640 + Math.abs(i - 1.5) * 30, width: 360,
        borderRadius: 16, transform: `rotate(${rot}deg)`, boxShadow: '0 20px 50px #000b', outline: '4px solid #ffffff22'}} />;
    })}
  </AbsoluteFill>;
};

// Animated workflow: cards light up along the arrows, a dot travels the path.
const NODES: {label: string; sub: string; x: number; y: number; ai: boolean}[] = [
  {label: 'IKAW / AKO', sub: 'idea', x: 80, y: 620, ai: false},
  {label: 'RESEARCH', sub: 'trends ngayong linggo', x: 560, y: 620, ai: true},
  {label: 'SCRIPT', sub: 'caption + voice lines', x: 560, y: 860, ai: true},
  {label: 'SLIDES · VIDEO', sub: 'design + render', x: 80, y: 860, ai: true},
  {label: 'QA CHECK', sub: 'may mali ba?', x: 80, y: 1100, ai: true},
  {label: 'APPROVAL', sub: 'tao ang huling check', x: 560, y: 1100, ai: false},
];
const Workflow = () => {
  const t = useT();
  const local = t; // sequence-relative
  const step = 0.5;
  return <AbsoluteFill>
    <Bg />
    <svg width={1080} height={1920} style={{position: 'absolute'}}>
      {NODES.slice(0, -1).map((n, i) => {
        const m = NODES[i + 1];
        const p = interpolate(local, [i * step + 0.3, i * step + 0.75], [0, 1], clamp);
        const x1 = n.x + 220, y1 = n.y + 80, x2 = m.x + 220, y2 = m.y + 80;
        return <line key={i} x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} stroke={gold} strokeWidth={8} strokeLinecap="round" />;
      })}
    </svg>
    {NODES.map((n, i) => {
      const on = interpolate(local, [i * step, i * step + 0.3], [0, 1], clamp);
      return <div key={n.label} style={{position: 'absolute', left: n.x, top: n.y, width: 440, height: 160, borderRadius: 22,
        background: n.ai ? '#0F2F33' : '#3A2A0A', border: `5px solid ${n.ai ? teal : gold}`, opacity: 0.25 + 0.75 * on,
        transform: `scale(${0.9 + 0.1 * on})`, boxShadow: on > 0.9 ? `0 0 40px ${n.ai ? teal : gold}88` : 'none',
        display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px'}}>
        <div style={{color: '#fff', font: `64px/1 ${bebas}`, letterSpacing: 1}}>{n.label}</div>
        <div style={{color: '#ffffffb0', font: '600 26px Arial, sans-serif', marginTop: 6}}>{n.ai ? 'AI · ' : 'TAO · '}{n.sub}</div>
      </div>;
    })}
  </AbsoluteFill>;
};

// The mistake: old slide (live line) crossed out -> fixed slide.
const Mistake = () => {
  const t = useT();
  const fix = interpolate(t, [3.0, 3.5], [0, 1], clamp);
  const mark = (good: boolean, show: number) => <div style={{position: 'absolute', right: 18, top: 18, width: 96, height: 96, borderRadius: '50%',
    background: good ? teal : coral, color: '#fff', font: `76px/96px ${bebas}`, textAlign: 'center', opacity: show, transform: `scale(${0.6 + 0.4 * show})`}}>{good ? '✓' : '✕'}</div>;
  const xo = interpolate(t, [0.4, 0.8], [0, 1], clamp);
  return <AbsoluteFill>
    <Bg />
    <div style={{position: 'absolute', left: 50, top: 560, width: 470}}>
      <Img src={staticFile('bts/mistake-before.png')} style={{width: 470, borderRadius: 16, outline: `5px solid ${coral}`, filter: `grayscale(${fix * 0.6})`}} />
      {mark(false, xo)}
      <div style={{color: coral, font: `48px/1.1 ${bebas}`, marginTop: 14, textAlign: 'center'}}>DRAFT NG AI: MAY LIVE NA WALA PA</div>
    </div>
    <div style={{position: 'absolute', left: 560, top: 560, width: 470, opacity: fix, transform: `translateX(${(1 - fix) * 60}px)`}}>
      <Img src={staticFile('bts/mistake-after.png')} style={{width: 470, borderRadius: 16, outline: `5px solid ${teal}`}} />
      {mark(true, fix)}
      <div style={{color: '#5EEAD4', font: `48px/1.1 ${bebas}`, marginTop: 14, textAlign: 'center'}}>INAYOS KO BAGO I-POST</div>
    </div>
  </AbsoluteFill>;
};

// Approval: real Studio card, a cursor taps Approve, badge flips; then the real schedule screens.
const Approval = () => {
  const t = useT();
  const W = 1000, s = W / 746;
  const bx = 342 * s, by = 93 * s; // Approve button centre in the crop
  const cx = interpolate(t, [0.2, 1.2], [W - 80, bx], clamp);
  const cy = interpolate(t, [0.2, 1.2], [330, by], clamp);
  const tap = interpolate(t, [1.25, 1.4, 1.6], [1, 0.8, 1], clamp);
  const done = t > 1.45;
  return <AbsoluteFill>
    <Bg />
    <div style={{position: 'absolute', left: 40, top: 420, width: W}}>
      <div style={{position: 'relative', borderRadius: 22, overflow: 'hidden', outline: `5px solid ${gold}`, boxShadow: '0 20px 60px #000a'}}>
        <Img src={staticFile('bts/studio-approve.jpg')} style={{width: W, display: 'block'}} />
        {done && <div style={{position: 'absolute', left: 291 * s, top: 76 * s, width: 100 * s, height: 34 * s, borderRadius: 8, background: '#16A34A', whiteSpace: 'nowrap',
          color: '#fff', font: `800 ${Math.round(15 * s)}px/${Math.round(34 * s)}px Arial, sans-serif`, textAlign: 'center'}}>✓ Approved</div>}
        <div style={{position: 'absolute', left: cx - 10, top: cy - 6, width: 0, height: 0, transform: `scale(${tap})`,
          borderLeft: '18px solid transparent', borderRight: '18px solid transparent', borderBottom: '40px solid #fff',
          filter: 'drop-shadow(0 4px 6px #000a)', rotate: '-30deg'}} />
        {t > 1.25 && t < 1.9 && <div style={{position: 'absolute', left: bx - 40, top: by - 40, width: 80, height: 80, borderRadius: '50%',
          border: `6px solid ${gold}`, opacity: interpolate(t, [1.25, 1.9], [1, 0], clamp), transform: `scale(${interpolate(t, [1.25, 1.9], [0.5, 1.6], clamp)})`}} />}
      </div>
      <div style={{marginTop: 12, color: '#ffffffb0', font: '600 26px Arial, sans-serif'}}>Tito AI Studio · Approve & Post</div>
    </div>
    <Sequence from={f(2.6)}><Shot src="bts/tiktok-scheduled.jpg" top={860} w={900} label="TikTok Studio · naka-schedule" outline={teal} /></Sequence>
    <Sequence from={f(4.2)}><Shot src="bts/meta-planner.jpg" top={1180} w={900} label="Meta Business Suite · Planner" outline={teal} /></Sequence>
  </AbsoluteFill>;
};

// The free-chat prompt, typed out in a phone-style card.
const PROMPT = 'Gawan mo ako ng 3 post idea para sa negosyo ko ngayong linggo. Ito ang negosyo ko: [isulat dito].';
const PromptCard = () => {
  const t = useT();
  const n = Math.floor(interpolate(t, [1.45, 7.4], [0, PROMPT.length], clamp));
  const caret = Math.floor(t * 2) % 2 === 0 ? '|' : '';
  return <AbsoluteFill>
    <Bg />
    <div style={{position: 'absolute', left: 140, top: 520, width: 800, height: 900, borderRadius: 60, background: '#111827',
      border: '10px solid #2b3550', boxShadow: '0 30px 80px #000c'}}>
      <div style={{margin: '60px 40px 0', color: '#ffffffa0', font: '700 30px Arial, sans-serif'}}>Libreng AI chat</div>
      <div style={{margin: '30px 40px', background: cream, borderRadius: 26, padding: '28px 30px', color: navy,
        font: '700 40px/1.3 Arial, sans-serif', minHeight: 300}}>{PROMPT.slice(0, n)}<span style={{color: teal}}>{caret}</span></div>
      <div style={{margin: '0 40px', display: 'flex', gap: 14}}>
        {['ChatGPT', 'Gemini', 'Claude'].map((x) => <div key={x} style={{background: teal, color: '#fff', borderRadius: 999,
          padding: '10px 24px', font: '700 28px Arial, sans-serif'}}>{x}</div>)}
      </div>
      <div style={{margin: '40px 40px 0', color: gold, font: `56px/1.1 ${bebas}`, opacity: interpolate(t, [7.6, 8.0], [0, 1], clamp)}}>
        TAPOS IKAW ANG MAG-CHECK ✓</div>
    </div>
  </AbsoluteFill>;
};

const Badge = () =>
  <div style={{position: 'absolute', left: 40, top: 56, background: gold, color: navy, borderRadius: 10,
    padding: '6px 18px 2px', font: `44px/1 ${bebas}`, letterSpacing: 2}}>TITO AI · BEHIND THE SCENES</div>;

export const BtsReel: React.FC = () => {
  const frame = useCurrentFrame();
  const fadeOut = interpolate(frame, [f(SECONDS) - 9, f(SECONDS)], [1, 0], clamp);
  const seq = (a: number, b: number, el: React.ReactNode) => <Sequence from={f(a)} durationInFrames={f(b) - f(a)}>{el}</Sequence>;
  return <AbsoluteFill style={{backgroundColor: navy}}>
    <style>{`@font-face{font-family:'Bebas Neue';src:url(${staticFile('fri/BebasNeue-Regular.ttf')})}`}</style>

    {seq(T.l1, T.l3, <HookFan />)}
    {seq(T.l1, T.l3, <FaceCircle src="fri/chibi-cta.mp4" top={1330} mt={-90} />)}
    {seq(T.l3, 11.6, <Workflow />)}
    {seq(11.6, T.l4, <AbsoluteFill><Bg /><Shot src="bts/studio-agents.jpg" top={520} w={960} label="Tito AI Studio · ang AI team ko" /></AbsoluteFill>)}
    {seq(T.l4, T.l5, <Mistake />)}
    {seq(T.l5, T.l6, <Approval />)}
    {seq(T.l6, T.l7, <ChibiClip src="fri/chibi-point.mp4" />)}
    {seq(T.l7, T.l8, <PromptCard />)}
    {seq(T.l8, T.end, <ChibiClip src="fri/chibi-cta.mp4" />)}

    {VOICE && <Audio src={staticFile(VOICE)} />}

    <Top a={T.l1} b={T.l3} top={140}><Line size={118}>WALANG ORAS</Line><Line bg={gold} c={navy} size={118}>SA CONTENT?</Line><Line bg={teal} size={80}>GANITO KO GINAGAWA</Line></Top>
    <Top a={T.l3} b={11.6} top={170}><Line size={96}>AI ANG GUMAGAWA</Line><Line bg={teal} size={96}>NG DRAFT</Line></Top>
    <Top a={11.6} b={T.l4} top={170}><Line size={84}>RESEARCH · SCRIPT</Line><Line bg={teal} size={84}>SLIDES · VIDEO</Line></Top>
    <Top a={T.l4} b={T.l5} top={170}><Line size={100}>HINDI PERPEKTO</Line><Line bg={coral} size={92}>AKO ANG NAG-AYOS</Line></Top>
    <Top a={T.l5} b={T.l6} top={170}><Line size={92}>WALANG LALABAS</Line><Line bg={gold} c={navy} size={92}>NANG WALANG APPROVAL KO</Line></Top>
    <Top a={T.l6} b={T.l7} top={150}><Line size={96}>HINDI MO KAILANGAN</Line><Line size={96}>NG BUONG TEAM</Line><Line bg={teal} size={100}>ISANG LIBRENG CHAT</Line></Top>
    <Top a={T.l7} b={T.l8} top={170}><Line bg={gold} c={navy} size={100}>I-TYPE MO ITO</Line></Top>
    <Top a={T.l8} b={T.end} top={170}><Line size={96}>BUONG PROMPT?</Line><Line size={96}>COMMENT:</Line><Line bg={gold} c={navy} size={170}>PLANO</Line></Top>

    <Badge />
    <Captions />
    <AbsoluteFill style={{backgroundColor: navy, opacity: 1 - fadeOut}} />
  </AbsoluteFill>;
};

export const BtsReelComposition = () =>
  <Composition id="BtsReel" component={BtsReel} durationInFrames={f(SECONDS)} fps={FPS} width={1080} height={1920} />;
