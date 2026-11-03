import {AbsoluteFill, Composition, Img, staticFile, useCurrentFrame} from 'remotion';

// Tito AI carousel slides (1080×1350). Frame N renders slide N, so each slide is one `remotion still`.
// Spec format: studio/carousel-schema.md. Pilot palette: cream / marigold / navy text, teal + coral accents.

type Slide = {
  bg?: 'cream' | 'marigold' | 'navy';
  kicker?: string;
  headline?: string;
  highlight?: string;
  body?: string;
  list?: string[];
  prompt?: string;
  cta?: string;
  chibi?: 'wave' | 'teach' | 'surprised' | 'wave-screen' | 'none';
  label?: string;
};
export type CarouselSpec = {title?: string; slides: Slide[]};

const cream = '#FFF8E7';
const marigold = '#FFB800';
const navy = '#0A0F1E';
const teal = '#0D6B63';
const coral = '#FF6B4A';
const font = 'Arial, Helvetica, sans-serif';

const THEMES = {
  cream: {bg: cream, text: navy, accent: teal, logo: 'carousel-logo-light.png', pipOn: navy, pipOff: '#0A0F1E40'},
  marigold: {bg: marigold, text: navy, accent: navy, logo: 'carousel-logo-gold.png', pipOn: navy, pipOff: '#0A0F1E40'},
  navy: {bg: navy, text: cream, accent: marigold, logo: 'tito-logo-on-dark.png', pipOn: marigold, pipOff: '#FFF8E740'},
};

// Shrink long headlines so they never overflow.
const headlineSize = (s = '') => (s.length > 60 ? 64 : s.length > 40 ? 76 : s.length > 24 ? 88 : 104);

const SlideView = ({slide, index, total}: {slide: Slide; index: number; total: number}) => {
  const t = THEMES[slide.bg || 'cream'] || THEMES.cream;
  const chibi = slide.chibi && slide.chibi !== 'none' ? slide.chibi : null;
  const textRight = chibi ? 330 : 80;
  return <AbsoluteFill style={{backgroundColor: t.bg, color: t.text, fontFamily: font, overflow: 'hidden'}}>
    {/* soft accent shapes */}
    <div style={{position: 'absolute', width: 620, height: 620, borderRadius: '50%', right: -170, bottom: 120, backgroundColor: slide.bg === 'marigold' ? '#FFF8E755' : '#FFB80033'}} />
    <div style={{position: 'absolute', width: 260, height: 260, borderRadius: '50%', left: -90, top: -90, backgroundColor: slide.bg === 'navy' ? '#0D6B6355' : '#0D6B6322'}} />

    <div style={{position: 'absolute', left: 80, right: textRight, top: 88, display: 'flex', flexDirection: 'column', gap: 26}}>
      {slide.kicker ? <div style={{alignSelf: 'flex-start', border: `3px solid ${t.accent}`, color: t.accent, borderRadius: 999, padding: '8px 20px', font: `900 26px ${font}`, letterSpacing: 2}}>{slide.kicker}</div> : null}
      {slide.headline ? <div style={{font: `900 ${headlineSize(slide.headline)}px/0.98 ${font}`, letterSpacing: -1.5, textTransform: 'uppercase'}}>
        {slide.headline}
        {slide.highlight ? <div style={{color: slide.bg === 'marigold' ? teal : slide.bg === 'navy' ? marigold : coral, marginTop: 6}}>{slide.highlight}</div> : null}
      </div> : null}
      <div style={{width: 120, height: 10, borderRadius: 10, backgroundColor: t.accent}} />
      {slide.body ? <div style={{font: `600 40px/1.32 ${font}`}}>{slide.body}</div> : null}
      {slide.list ? <div style={{display: 'flex', flexDirection: 'column', gap: 22}}>
        {slide.list.slice(0, 4).map((item, i) => <div key={i} style={{display: 'flex', gap: 20, alignItems: 'flex-start'}}>
          <div style={{flex: 'none', width: 62, height: 62, borderRadius: '50%', backgroundColor: navy, color: cream, display: 'flex', alignItems: 'center', justifyContent: 'center', font: `900 32px ${font}`}}>{i + 1}</div>
          <div style={{font: `700 38px/1.28 ${font}`, paddingTop: 6}}>{item}</div>
        </div>)}
      </div> : null}
      {slide.prompt ? <div style={{backgroundColor: '#FFFFFF', color: navy, border: `4px solid ${teal}`, borderRadius: 28, padding: '28px 32px', font: `600 ${slide.prompt.length > 260 ? 28 : 33}px/1.4 ${font}`, boxShadow: '0 14px 40px #0A0F1E22'}}>
        <div style={{font: `900 22px ${font}`, color: teal, letterSpacing: 2, marginBottom: 12}}>COPY THIS PROMPT</div>
        {slide.prompt}
      </div> : null}
      {slide.cta ? <div style={{alignSelf: 'flex-start', backgroundColor: teal, color: cream, borderRadius: 999, padding: '22px 38px', font: `900 40px ${font}`, boxShadow: '0 12px 30px #0A0F1E33'}}>{slide.cta}</div> : null}
    </div>

    {chibi ? <Img src={staticFile(`carousel-chibi-${chibi}.png`)} style={{position: 'absolute', right: 10, bottom: 120, width: 400, height: 600, objectFit: 'contain', objectPosition: 'bottom'}} /> : null}
    {slide.label ? <div style={{position: 'absolute', left: 80, bottom: 150, backgroundColor: '#FFFFFFE6', color: navy, border: `2px solid ${teal}`, borderRadius: 999, padding: '6px 16px', font: `700 22px ${font}`}}>{slide.label}</div> : null}

    {/* footer: logo + page dots */}
    <Img src={staticFile(t.logo)} style={{position: 'absolute', left: 70, bottom: 48, height: 64, objectFit: 'contain'}} />
    <div style={{position: 'absolute', right: 70, bottom: 70, display: 'flex', gap: 12}}>
      {Array.from({length: total}).map((_, i) => <div key={i} style={{width: 16, height: 16, borderRadius: '50%', backgroundColor: i === index ? t.pipOn : 'transparent', border: `3px solid ${i === index ? t.pipOn : t.pipOff}`}} />)}
    </div>
  </AbsoluteFill>;
};

const CarouselStill = ({slides}: CarouselSpec) => {
  const frame = useCurrentFrame();
  const list = slides && slides.length ? slides : [{headline: 'No slides in spec'}];
  const i = Math.min(frame, list.length - 1);
  return <SlideView slide={list[i]} index={i} total={list.length} />;
};

export const TitoCarousel = () => <Composition id="TitoCarousel" component={CarouselStill}
  defaultProps={{slides: [
    {bg: 'cream', kicker: 'TITO AI TIP', headline: 'Sample hook line', highlight: 'Second line', body: 'Short Taglish body text.', chibi: 'wave', label: 'Fictional practice example'},
    {bg: 'marigold', headline: 'The problem', body: 'Why this matters.', chibi: 'surprised'},
    {bg: 'cream', headline: 'Copy this prompt', prompt: 'Example prompt text.', chibi: 'teach'},
    {bg: 'cream', headline: 'What you get', list: ['First point', 'Second point', 'Third point'], chibi: 'none'},
    {bg: 'marigold', headline: 'Save mo ito', cta: 'I-save para sa susunod', chibi: 'wave'},
  ]} as CarouselSpec}
  durationInFrames={10} fps={30} width={1080} height={1350} />;
