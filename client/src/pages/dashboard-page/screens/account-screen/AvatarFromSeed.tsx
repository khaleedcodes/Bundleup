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
  onClick?: () => void; // new optional click handler
}

const AvatarFromSeed: React.FC<AvatarFromSeedProps> = ({
  seed,
  styleName,
  size = 50,
  onClick,
}) => {
  const style = stylesMap[styleName];

  if (!style) {
    return <div>Invalid style name: {styleName}</div>;
  }

  // Generate the avatar as a Data URI
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const avatarDataUri = createAvatar(style as any, { seed }).toDataUri();

  return (
    <img
      src={avatarDataUri}
      alt={`Avatar: ${styleName}`}
      width={size}
      height={size}
      style={{ borderRadius: "50%", cursor: onClick ? "pointer" : undefined }}
      onClick={onClick}
    />
  );
};

export default AvatarFromSeed;
