import {Audio, Video} from '@remotion/media';
import {AbsoluteFill, Composition, Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const navy = '#0A0F1E';
const gold = '#F59E0B';

const OriginChibiGeminiPart1Video = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const openingOpacity = interpolate(frame, [0, 0.2 * fps, 2.6 * fps, 3.2 * fps], [1, 1, 1, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const nextOpacity = interpolate(frame, [26 * fps, 26.5 * fps], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  return <AbsoluteFill style={{backgroundColor: navy, overflow: 'hidden'}}>
    <Video
      name="Gemini chibi animation — full 30 seconds"
      src={staticFile('tito-ai-chibi-gemini-origin-30-silent.mp4')}
      premountFor={fps}
      muted
      objectFit="cover"
      style={{width: '100%', height: '100%'}}
    />
    <Audio name="Jeff original voice — uncut" src={staticFile('origin-part-1.m4a')} premountFor={fps} />

    <div style={{position: 'absolute', top: 58, left: 58, right: 58,
      display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
      <Img src={staticFile('tito-logo-on-dark.png')} style={{width: 245, objectFit: 'contain'}} />
      <div style={{backgroundColor: navy, border: `2px solid ${gold}`, color: gold,
        borderRadius: 16, padding: '12px 18px', font: 'bold 30px Arial, sans-serif'}}>PART 1 / 5</div>
    </div>

    <div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: 450,
      background: 'linear-gradient(transparent, #0A0F1EEE)', pointerEvents: 'none'}} />
    <div style={{position: 'absolute', left: 66, right: 66, bottom: 140,
      opacity: openingOpacity, color: '#FFF8E7', font: '900 91px/0.98 Arial, sans-serif',
      textShadow: '0 4px 18px #0009'}}>
      TATAY AKO.<br/><span style={{color: gold}}>NASA SILICON VALLEY?</span>
    </div>
    <div style={{position: 'absolute', left: 66, right: 66, bottom: 150,
      opacity: nextOpacity, color: '#FFF8E7', font: '900 83px/1.02 Arial, sans-serif',
      textShadow: '0 4px 18px #0009'}}>
      SUNOD:<br/><span style={{color: gold}}>WEBSITE? AI ANG TINANONG KO.</span>
    </div>
  </AbsoluteFill>;
};

export const OriginChibiGeminiPart1 = () => <Composition
  id="OriginChibiGeminiPart1"
  component={OriginChibiGeminiPart1Video}
  durationInFrames={900}
  fps={30}
  width={1080}
  height={1920}
/>;
