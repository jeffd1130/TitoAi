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
    <div style={{position: 'absolute', left: 95, top: 225, width: 880, color: navy, fontFamily: 'Arial, sans-serif', fontSize: 90, lineHeight: 0.96, fontWeight: 900, letterSpacing: -3, textShadow: '0 2px 20px #FFF8E7', opacity: entrance}}>
      DI KAILANGAN<br/>MAGING TECHIE
    </div>
    <div style={{position: 'absolute', left: 55, top: 1040, width: 380, height: 380, borderRadius: '50%', backgroundColor: gold, opacity: .95}} />
    <Img src={staticFile('chibi-wave.png')} style={{position: 'absolute', width: 475, height: 713, objectFit: 'contain', left: -30, top: 820, translate: `0px ${(1-entrance)*500}px`, rotate: `${Math.sin(frame/9)*2}deg`}} />
    <Logo />
  </AbsoluteFill>;
};

const TeachingScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const bob = Math.sin(frame / 10) * 18;
  const appear = spring({frame, fps, config: {damping: 18, stiffness: 80}});
  const stepOpacity = interpolate(frame, [3 * fps, 4 * fps], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  const promptOpacity = interpolate(frame, [3 * fps, 4 * fps], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'});
  return <AbsoluteFill style={{backgroundColor: navy, overflow: 'hidden'}}>
    <div style={{position: 'absolute', width: 1180, height: 1180, left: -50, top: 190, backgroundColor: teal, borderRadius: '50%', opacity: .65}} />
    <div style={{position: 'absolute', width: 890, height: 890, left: 95, top: 330, backgroundColor: gold, borderRadius: '50%'}} />
    <Img src={staticFile('chibi-teach.png')} style={{position: 'absolute', width: 870, height: 1305, left: 130, top: 265, objectFit: 'contain', translate: `0px ${bob + (1-appear)*400}px`}} />
    <div style={{position: 'absolute', left: 80, top: 1120, width: 920, height: 540, borderRadius: 38, backgroundColor: cream, scale: appear, boxShadow: '0 15px 40px #0005', fontFamily: 'Arial, sans-serif'}}>
      <div style={{position: 'absolute', left: 62, top: 58, right: 62, opacity: stepOpacity}}>
        <div style={{color: teal, fontSize: 38, fontWeight: 800, letterSpacing: 2}}>UNANG HAKBANG</div>
        <div style={{color: navy, fontSize: 80, lineHeight: 1.06, fontWeight: 900, marginTop: 36}}>PUMILI NG<br/>ISANG SKILL.</div>
        <div style={{color: teal, fontSize: 42, fontWeight: 700, marginTop: 42}}>Kahit maliit na simula.</div>
      </div>
      <div style={{position: 'absolute', left: 62, top: 48, right: 62, opacity: promptOpacity}}>
        <div style={{color: teal, fontSize: 38, fontWeight: 800, letterSpacing: 1}}>COPY SA CHATGPT O GEMINI</div>
        <div style={{color: navy, fontSize: 52, lineHeight: 1.14, fontWeight: 800, marginTop: 27}}>
          “Turuan mo ako ng [SKILL]<br/>
          sa simpleng Taglish.<br/>
          Bigyan mo ako ng isang<br/>
          maliit na practice task.”
        </div>
      </div>
    </div>
    <Logo onDark />
  </AbsoluteFill>;
};

const ClosingScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pop = spring({frame, fps, config: {damping: 14, stiffness: 90}});
  return <AbsoluteFill style={{backgroundColor: gold, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 92, right: 92, top: 105, color: navy, fontFamily: 'Arial, sans-serif', fontSize: 82, lineHeight: 0.96, fontWeight: 900, textAlign: 'center', letterSpacing: -2, scale: pop}}>
      ANONG SKILL ANG<br/>SISIMULAN MO?
    </div>
    <div style={{position: 'absolute', width: 900, height: 900, left: 90, top: 320, borderRadius: '50%', backgroundColor: cream, scale: pop}} />
    <Img src={staticFile('chibi-wave.png')} style={{position: 'absolute', width: 720, height: 1080, objectFit: 'contain', left: 180, top: 260, rotate: `${Math.sin(frame/7)*3}deg`}} />
    <div style={{position: 'absolute', bottom: 0, height: 460, width: '100%', backgroundColor: navy}} />
    <div style={{position: 'absolute', top: 1490, width: '100%', color: cream, textAlign: 'center', fontFamily: 'Arial, sans-serif', fontSize: 50, fontWeight: 800}}>COMMENT MO SA BABA</div>
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
