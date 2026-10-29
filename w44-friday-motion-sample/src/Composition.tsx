import {AbsoluteFill, Composition, Img, Series, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const navy = '#0A0F1E';
const cream = '#FFF8E7';
const gold = '#FFB800';
const teal = '#0D6B63';

const Logo = ({onDark = false}: {onDark?: boolean}) => <Img src={staticFile(onDark ? 'tito-logo-on-dark.png' : 'tito-logo.png')} style={{position: 'absolute', width: 300, bottom: 105, left: 80}} />;

const PhotoScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const photoScale = interpolate(frame, [0, 8 * fps], [1, 1.09], {extrapolateRight: 'clamp'});
  const entrance = spring({frame, fps, config: {damping: 15, stiffness: 95}});
  return <AbsoluteFill style={{backgroundColor: cream, overflow: 'hidden'}}>
    <div style={{position: 'absolute', width: 980, height: 1250, top: 150, left: 50, borderRadius: 44, overflow: 'hidden', boxShadow: '0 25px 90px #0A0F1E35'}}>
      <Img src={staticFile('seminar-jeff-only.jpeg')} style={{width: '100%', height: '100%', objectFit: 'cover', scale: photoScale}} />
    </div>
    <div style={{position: 'absolute', left: 55, top: 1040, width: 380, height: 380, borderRadius: '50%', backgroundColor: gold, opacity: .95}} />
    <Img src={staticFile('chibi-wave.png')} style={{position: 'absolute', width: 475, height: 713, objectFit: 'contain', left: -30, top: 820, translate: `0px ${(1-entrance)*500}px`, rotate: `${Math.sin(frame/9)*2}deg`}} />
    <Logo onDark />
  </AbsoluteFill>;
};

const TeachingScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const bob = Math.sin(frame / 10) * 18;
  const appear = spring({frame, fps, config: {damping: 18, stiffness: 80}});
  return <AbsoluteFill style={{backgroundColor: navy, overflow: 'hidden'}}>
    <div style={{position: 'absolute', width: 1180, height: 1180, left: -50, top: 190, backgroundColor: teal, borderRadius: '50%', opacity: .65}} />
    <div style={{position: 'absolute', width: 890, height: 890, left: 95, top: 330, backgroundColor: gold, borderRadius: '50%'}} />
    <Img src={staticFile('chibi-teach.png')} style={{position: 'absolute', width: 870, height: 1305, left: 130, top: 265, objectFit: 'contain', translate: `0px ${bob + (1-appear)*400}px`}} />
    <div style={{position: 'absolute', left: 125, top: 1250, width: 820, height: 250, borderRadius: 38, backgroundColor: cream, opacity: .95, scale: appear, boxShadow: '0 15px 40px #0005'}}>
      <div style={{height: 20, width: 470, borderRadius: 20, margin: '55px 60px 25px', backgroundColor: teal}} />
      <div style={{height: 20, width: 610, borderRadius: 20, margin: '0 60px 25px', backgroundColor: '#B8C9C3'}} />
      <div style={{height: 20, width: 380, borderRadius: 20, margin: '0 60px', backgroundColor: '#B8C9C3'}} />
    </div>
    <Logo />
  </AbsoluteFill>;
};

const ClosingScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 14, stiffness: 90}});
  return <AbsoluteFill style={{backgroundColor: gold, overflow: 'hidden'}}>
    <div style={{position: 'absolute', width: 900, height: 900, left: 90, top: 320, borderRadius: '50%', backgroundColor: cream, scale: pop}} />
    <Img src={staticFile('chibi-wave.png')} style={{position: 'absolute', width: 720, height: 1080, objectFit: 'contain', left: 180, top: 260, rotate: `${Math.sin(frame/7)*3}deg`}} />
    <div style={{position: 'absolute', bottom: 0, height: 460, width: '100%', backgroundColor: navy}} />
    <Img src={staticFile('tito-logo-on-dark.png')} style={{position: 'absolute', width: 620, left: 230, bottom: 170}} />
  </AbsoluteFill>;
};

export const SampleVideo = () => {
  const {fps} = useVideoConfig();
  return <Series>
    <Series.Sequence name="Real seminar photo" durationInFrames={8 * fps} premountFor={fps}><PhotoScene /></Series.Sequence>
    <Series.Sequence name="Chibi teaches" durationInFrames={14 * fps} premountFor={fps}><TeachingScene /></Series.Sequence>
    <Series.Sequence name="Tito AI close" durationInFrames={8 * fps} premountFor={fps}><ClosingScene /></Series.Sequence>
  </Series>;
};

export const MyComposition = () => <Composition id="TitoAiFridaySample" component={SampleVideo} durationInFrames={900} fps={30} width={1080} height={1920} />;
