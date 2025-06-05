import React from "react";
import { createAvatar } from "@dicebear/core";
import {
  adventurer,
  adventurerNeutral,
  bigSmile,
  bigEars,
  micah,
  avataaarsNeutral,
  pixelArt,
} from "@dicebear/collection";

type AvatarStyle =
  | typeof adventurer
  | typeof adventurerNeutral
  | typeof bigSmile
  | typeof bigEars
  | typeof micah
  | typeof avataaarsNeutral
  | typeof pixelArt;

const stylesMap: Record<string, AvatarStyle> = {
  Adventurer: adventurer,
  "Big Smile": bigSmile,
  "Big Ears": bigEars,
  Micah: micah,
  "Adventurer Neutral": adventurerNeutral,
  "Avataars Neutral": avataaarsNeutral,
  "Pixel Art": pixelArt,
};

interface AvatarFromSeedProps {
  seed: string;
  styleName: string;
  size?: number; // optional size in px
}

const AvatarFromSeed: React.FC<AvatarFromSeedProps> = ({
  seed,
  styleName,
  size = 80,
}) => {
  const style = stylesMap[styleName];

  if (!style) {
    return <div>Invalid style name: {styleName}</div>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const avatar = createAvatar(style as any, { seed, size });

  return (
    <div
      style={{ width: size, height: size }}
      dangerouslySetInnerHTML={{ __html: avatar.toString() }}
    />
  );
};

export default AvatarFromSeed;
