import { MyComposition } from "./Composition";
import { OriginChibiPart1 } from "./OriginChibiPart1";
import { OriginChibiGeminiPart1 } from "./OriginChibiGeminiPart1";
import { W34FriBonus } from "./W34FriBonus";
import { OriginChibiGeminiParts } from "./OriginChibiGemini";
import { TitoCarousel } from "./TitoCarousel";
import { TakipOAyosComposition } from "./TakipOAyos";
import { ClaudePlanReelComposition } from "./ClaudePlanReel";
import { ClaudePlanReel2Composition } from "./ClaudePlanReel2";
import { MonResumeReelComposition } from "./MonResumeReel";
import { WedQuizReelComposition } from "./WedQuizReel";
import { WedQuizReelV2Composition } from "./WedQuizReelV2";
import { ThuThirteenthReelComposition } from "./ThuThirteenthReel";
import { FriGalitReelComposition } from "./FriGalitReel";
import { BtsReelComposition } from "./BtsReel";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <OriginChibiPart1 />
      <OriginChibiGeminiPart1 />
      <W34FriBonus />
      <OriginChibiGeminiParts />
      <TakipOAyosComposition />
      <ClaudePlanReelComposition />
      <ClaudePlanReel2Composition />
      <MonResumeReelComposition />
      <WedQuizReelComposition />
      <WedQuizReelV2Composition />
      <TitoCarousel />
      <ThuThirteenthReelComposition />
      <FriGalitReelComposition />
      <BtsReelComposition />
    </>
  );
};
