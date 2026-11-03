import {Audio} from '@remotion/media';
import {AbsoluteFill, Composition, Img, Series, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const navy = '#0A0F1E';
const cream = '#FFF8E7';
const gold = '#F59E0B';
const teal = '#0D9488';

const AnimatedHost = ({pose = 'wave', left = 120, top = 380, width = 840}: {
  pose?: 'wave' | 'teach'; left?: number; top?: number; width?: number;
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const enter = spring({frame, fps, config: {damping: 18, stiffness: 85}});
  return <Img
    src={staticFile(pose === 'wave' ? 'chibi-wave.png' : 'chibi-teach.png')}
    style={{position: 'absolute', left, top, width, height: 1100, objectFit: 'contain',
      translate: `0px ${Math.sin(frame / 11) * 13 + (1 - enter) * 400}px`,
      rotate: `${Math.sin(frame / 18) * 1.5}deg`,
      scale: interpolate(frame, [0, 15], [0.91, 1], {extrapolateRight: 'clamp'}),
    }}
  />;
};

const Logo = () => <Img src={staticFile('tito-logo-on-dark.png')}
  style={{position: 'absolute', width: 300, left: 80, bottom: 85}} />;

const HomeScene = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor: cream, overflow: 'hidden'}}>
    <div style={{position: 'absolute', width: 910, height: 910, left: 85, top: 530,
      borderRadius: '50%', backgroundColor: gold}} />
    <div style={{position: 'absolute', width: 1120, height: 400, left: -20, top: 0,
      backgroundColor: navy, borderRadius: '0 0 70px 70px'}} />
    <div style={{position: 'absolute', left: 85, top: 130, width: 900, color: cream,
      fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 94, lineHeight: 1.02}}>
      TATAY. MAY<br/>SIDE HUSTLE.
    </div>
    <div style={{position: 'absolute', left: 110, top: 1100, width: 860, height: 260,
      borderRadius: 42, backgroundColor: teal, rotate: `${Math.sin(frame / 22) * 1}deg`}} />
    <AnimatedHost pose="wave" left={80} top={420} width={920} />
    <div style={{position: 'absolute', height: 370, bottom: 0, width: '100%', backgroundColor: navy}} />
    <Logo />
  </AbsoluteFill>;
};

const WorkScene = () => {
  const frame = useCurrentFrame();
  return <AbsoluteFill style={{backgroundColor: navy, overflow: 'hidden'}}>
    <div style={{position: 'absolute', width: 1000, height: 1000, left: 40, top: 320,
      borderRadius: '50%', backgroundColor: teal}} />
    <div style={{position: 'absolute', left: 85, top: 145, color: cream, width: 910,
      fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 94, lineHeight: 1.02}}>
      GRAPHIC<br/><span style={{color: gold}}>DESIGNER DIN.</span>
    </div>
    <AnimatedHost pose="teach" left={130} top={415} width={820} />
    <div style={{position: 'absolute', left: 85, top: 1290, width: 910, height: 310,
      borderRadius: 38, backgroundColor: cream, boxShadow: '0 25px 50px #0005',
      translate: `0px ${Math.sin(frame / 14) * 9}px`}}>
      <div style={{width: 110, height: 20, backgroundColor: gold, borderRadius: 10, margin: '55px 0 0 55px'}} />
      <div style={{width: 700, height: 20, backgroundColor: navy, opacity: .25, borderRadius: 10, margin: '45px 0 0 55px'}} />
      <div style={{width: 550, height: 20, backgroundColor: navy, opacity: .25, borderRadius: 10, margin: '30px 0 0 55px'}} />
    </div>
    <Logo />
  </AbsoluteFill>;
};

const JourneyScene = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return <AbsoluteFill style={{backgroundColor: gold, overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 85, top: 150, width: 910, color: navy,
      fontFamily: 'Arial, sans-serif', fontWeight: 900, fontSize: 94, lineHeight: 1.02,
      opacity: interpolate(frame, [0, fps], [0, 1], {extrapolateRight: 'clamp'})}}>
      SAAN DADALHIN<br/>NG CURIOSITY MO?
    </div>
    <div style={{position: 'absolute', left: 45, top: 490, width: 990, height: 990,
      borderRadius: '50%', backgroundColor: cream}} />
    <AnimatedHost pose="wave" left={90} top={430} width={900} />
    <div style={{position: 'absolute', height: 400, bottom: 0, width: '100%', backgroundColor: navy}} />
    <Logo />
  </AbsoluteFill>;
};

export const OriginChibiPart1Video = () => {
  const {fps} = useVideoConfig();
  return <>
    <Series>
      <Series.Sequence name="Home and side hustle" durationInFrames={10 * fps} premountFor={fps}><HomeScene /></Series.Sequence>
      <Series.Sequence name="The work" durationInFrames={10 * fps} premountFor={fps}><WorkScene /></Series.Sequence>
      <Series.Sequence name="The journey" durationInFrames={10 * fps} premountFor={fps}><JourneyScene /></Series.Sequence>
    </Series>
    <Audio name="Jeff original voice — full Part 1" src={staticFile('origin-part-1.m4a')} premountFor={fps} />
  </>;
};

export const OriginChibiPart1 = () => <Composition id="OriginChibiPart1" component={OriginChibiPart1Video}
  durationInFrames={900} fps={30} width={1080} height={1920} />;
