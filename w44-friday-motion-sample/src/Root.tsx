import { MyComposition } from "./Composition";
import { OriginChibiPart1 } from "./OriginChibiPart1";
import { OriginChibiGeminiPart1 } from "./OriginChibiGeminiPart1";
import { W34FriBonus } from "./W34FriBonus";
import { OriginChibiGeminiParts } from "./OriginChibiGemini";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <MyComposition />
      <OriginChibiPart1 />
      <OriginChibiGeminiPart1 />
      <W34FriBonus />
      <OriginChibiGeminiParts />
    </>
  );
};
