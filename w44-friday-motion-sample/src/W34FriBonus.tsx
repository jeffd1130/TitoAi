import {AbsoluteFill, Composition, Img, Sequence, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

// W34 Fri Bonus · S2E4 — "Ang Tanong na Palagi Kong Tinatanong sa Claude"
// Source script: docs/scripts/w34-fri-bonus-script.html (scene timings 0:00–1:05 kept).
// Visuals reuse the approved W34 carousel images + chibi host + logo. Captions = script VO, verbatim.

const navy = '#0A0F1E';
const gold = '#F59E0B';
const teal = '#0D9488';
const cream = '#FFF8E7';
const font = 'Arial, Helvetica, sans-serif';
const FPS = 30;

const PROMPT = 'Gagawin ko ang [task mo]. Bago ako magsimula, ano ang mga bagay na dapat ko malaman, gawin muna, o i‑clarify — para hindi ako bumalik sa simula?';

// [start s, end s, text]
const CAPTIONS: [number, number, string][] = [
  [0.3, 3.2, 'May isang tanong na tinatanong ko sa Claude'],
  [3.2, 6.2, 'bago ko simulan ang halos lahat ng trabaho ko.'],
  [6.2, 7.9, 'Hindi ito complicated.'],
  [7.9, 10, 'Pero palagi itong nagbabago ng lahat.'],
  [10, 12.8, 'Kasi dati, pag may bagong task —'],
  [12.8, 15.8, 'mag-iisip ka na agad kung paano gagawin.'],
  [15.8, 18.4, 'At madalas, kalahati ng trabaho'],
  [18.4, 20.6, 'ay pag-aayos ng mga bagay'],
  [20.6, 23.8, 'na hindi mo inisip bago ka nagsimula.'],
  [23.8, 27, 'Ngayon, bago ko gawin ang kahit ano —'],
  [27, 30, 'nagtatanong muna ako.'],
  [30, 32.5, 'Ito ang prompt. Simple lang:'],
  [32.5, 37.5, '“Gagawin ko ang [task]. Bago ako magsimula,'],
  [37.5, 42.5, 'ano ang mga bagay na dapat ko malaman, gawin muna, o i‑clarify —'],
  [42.5, 45.5, 'para hindi ako bumalik sa simula?”'],
  [45.5, 47.3, 'Claude ang sumasagot.'],
  [47.3, 49.2, 'Ako ang nagdedesisyon.'],
  [49.2, 52, 'Pero lagi akong handa na ngayon bago magsimula.'],
  [52, 54.8, 'Subukan mo ngayon sa kahit anong trabaho mo —'],
  [54.8, 57.2, 'kahit sa isang email o presentation.'],
  [57.2, 60.6, 'Comment ng YES kung susubukan mo ito ngayong araw.'],
  [60.6, 62.6, 'Ingat lagi, mga Pamangkin.'],
  [62.6, 65, 'Tito AI — AI Para Sa Ating Lahat.'],
];

const fade = (frame: number, len: number, edge = 8) => interpolate(frame, [0, edge, len - edge, len], [0, 1, 1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});

const Photo = ({src, len, dim = 0}: {src: string; len: number; dim?: number}) => {
  const frame = useCurrentFrame();
  const scale = interpolate(frame, [0, len], [1, 1.08]);
  return <div style={{position: 'absolute', left: 0, right: 0, top: 210, height: 1110, overflow: 'hidden', opacity: fade(frame, len, 10)}}>
    <Img src={staticFile(src)} style={{width: '100%', height: '100%', objectFit: 'cover', scale: String(scale)}} />
    <div style={{position: 'absolute', inset: 0, background: `linear-gradient(${navy} 0%, transparent 18%, transparent 55%, ${navy} 100%)`}} />
    {dim ? <div style={{position: 'absolute', inset: 0, backgroundColor: navy, opacity: dim}} /> : null}
    <div style={{position: 'absolute', left: 70, top: 40, color: '#CBD5E1', font: `600 22px ${font}`, opacity: 0.75}}>Illustration</div>
  </div>;
};

const Headline = ({children, top = 930}: {children: React.ReactNode; top?: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame, fps, config: {damping: 16, stiffness: 110}});
  return <div style={{position: 'absolute', left: 70, right: 170, top, color: cream, font: `900 84px/0.98 ${font}`, letterSpacing: -1.5, textShadow: '0 4px 20px #000a', opacity: s, translate: `0px ${(1 - s) * 40}px`}}>{children}</div>;
};

const Chibi = ({src, width = 380, left = 30, top = 1500}: {src: string; width?: number; left?: number; top?: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame, fps, config: {damping: 14, stiffness: 90}});
  return <Img src={staticFile(src)} style={{position: 'absolute', width, left, top, objectFit: 'contain', translate: `0px ${(1 - s) * 300 + Math.sin(frame / 12) * 8}px`}} />;
};

const Captions = () => {
  const frame = useCurrentFrame();
  const t = frame / FPS;
  const cue = CAPTIONS.find(([a, b]) => t >= a && t < b);
  if (!cue) return null;
  const local = (t - cue[0]) * FPS;
  const o = interpolate(local, [0, 4], [0, 1], {extrapolateRight: 'clamp'});
  return <div style={{position: 'absolute', left: 70, right: 170, top: 1330, minHeight: 150, display: 'flex', alignItems: 'flex-start'}}>
    <div style={{backgroundColor: '#0A0F1Ee6', borderLeft: `8px solid ${gold}`, borderRadius: 14, padding: '18px 24px', color: '#FFFFFF', font: `800 46px/1.22 ${font}`, opacity: o}}>{cue[2]}</div>
  </div>;
};

const Frame = () => <>
  <Img src={staticFile('tito-logo-on-dark.png')} style={{position: 'absolute', top: 72, left: 70, width: 260}} />
  <div style={{position: 'absolute', top: 84, right: 170, border: `2px solid ${gold}`, color: gold, borderRadius: 999, padding: '10px 20px', font: `800 26px ${font}`, letterSpacing: 2}}>QUICK TIP</div>
</>;

const PromptCard = ({len}: {len: number}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame, fps, config: {damping: 18, stiffness: 100}});
  return <div style={{position: 'absolute', left: 60, right: 150, top: 360, opacity: fade(frame, len, 8), scale: String(0.92 + s * 0.08)}}>
    <div style={{color: teal, font: `900 34px ${font}`, letterSpacing: 3, marginBottom: 18}}>COPY THIS PROMPT · CLAUDE.AI (LIBRE)</div>
    <div style={{backgroundColor: '#060B16f2', border: '2px solid #334155', borderLeft: `12px solid ${gold}`, borderRadius: 24, padding: '38px 40px', color: '#FFFFFF', font: `700 50px/1.34 ${font}`, boxShadow: '0 20px 60px #0008'}}>“{PROMPT}”</div>
  </div>;
};

const CtaCard = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const s = spring({frame, fps, config: {damping: 12, stiffness: 120}});
  return <div style={{position: 'absolute', left: 70, right: 170, top: 860, textAlign: 'left'}}>
    <div style={{display: 'inline-block', backgroundColor: gold, color: navy, borderRadius: 28, padding: '26px 44px', font: `900 112px/1 ${font}`, letterSpacing: -2, scale: String(s), transformOrigin: 'left center', boxShadow: '0 18px 50px #0009'}}>COMMENT YES</div>
    <div style={{color: cream, font: `800 44px/1.25 ${font}`, marginTop: 26, opacity: s, textShadow: '0 3px 14px #000c'}}>kung susubukan mo ito ngayong araw.</div>
  </div>;
};

const W34FriBonusVideo = () => {
  const s = (sec: number) => Math.round(sec * FPS);
  return <AbsoluteFill style={{backgroundColor: navy, overflow: 'hidden'}}>
    {/* 01 Hook 0–10 */}
    <Sequence name="01 Hook" from={0} durationInFrames={s(10)}>
      <Photo src="w34fb-slide-1-thoughtful-start.png" len={s(10)} />
      <Headline>ISANG TANONG<br /><span style={{color: gold}}>BAGO MAGSIMULA.</span></Headline>
      <Chibi src="chibi-surprised.png" />
    </Sequence>
    {/* 02 Setup 10–30 */}
    <Sequence name="02 Setup" from={s(10)} durationInFrames={s(20)}>
      <Photo src="w34fb-slide-2-rework.png" len={s(20)} />
      <Headline>ANG REWORK,<br /><span style={{color: gold}}>NAGSISIMULA BAGO</span><br />KA PA MAG‑TRABAHO.</Headline>
      <Chibi src="chibi-surprised.png" />
    </Sequence>
    {/* 03 Prompt 30–45.5 */}
    <Sequence name="03 Prompt" from={s(30)} durationInFrames={s(15.5)}>
      <Photo src="w34fb-slide-3-ai-prompt.png" len={s(15.5)} dim={0.72} />
      <PromptCard len={s(15.5)} />
      <Chibi src="chibi-teach.png" />
    </Sequence>
    {/* 03b Human review 45.5–52 */}
    <Sequence name="03b Human review" from={s(45.5)} durationInFrames={s(6.5)}>
      <Photo src="w34fb-slide-4-human-review.png" len={s(6.5)} />
      <Headline>CLAUDE ANG NAGMUMUNGKAHI.<br /><span style={{color: gold}}>IKAW ANG NAGDEDESISYON.</span></Headline>
      <Chibi src="chibi-teach.png" />
    </Sequence>
    {/* 04 CTA 52–65 */}
    <Sequence name="04 CTA" from={s(52)} durationInFrames={s(13)}>
      <Photo src="w34fb-slide-5-confident-start.png" len={s(13) + 10} />
      <Sequence from={s(5)}><CtaCard /></Sequence>
      <Chibi src="chibi-wave.png" />
    </Sequence>
    <Frame />
    <Captions />
  </AbsoluteFill>;
};

export const W34FriBonus = () => <Composition id="W34FriBonus" component={W34FriBonusVideo} durationInFrames={65 * FPS} fps={FPS} width={1080} height={1920} />;
