import React, { useState, useEffect } from "react";
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

type AvatarData = {
  svg: string;
  seed: string;
  styleName: string;
};

const styles: { name: string; style: AvatarStyle }[] = [
  { name: "Adventurer", style: adventurer },
  { name: "Big Smile", style: bigSmile },
  { name: "Big Ears", style: bigEars },
  { name: "Micah", style: micah },
  { name: "Adventurer Neutral", style: adventurerNeutral },
  { name: "Avataars Neutral", style: avataaarsNeutral },
  { name: "Pixel Art", style: pixelArt },
];

const AvatarSelectionPage: React.FC = () => {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarData | null>(null);
  const [avatars, setAvatars] = useState<AvatarData[]>([]);

  const generateAvatars = () => {
    const generated: AvatarData[] = [];

    styles.forEach(({ name, style }) => {
      for (let i = 0; i < 3; i++) {
        const seed = Math.random().toString(36).substring(2, 15);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const avatar = createAvatar(style as any, { seed });
        generated.push({
          svg: avatar.toString(),
          seed,
          styleName: name,
        });
      }
    });

    setAvatars(generated);
  };

  useEffect(() => {
    generateAvatars();
  }, []);

  return (
    <div className="min-h-screen bg-first-card flex flex-col items-center p-6 rounded-2xl gap-6">
      <h1 className="text-3xl font-bold text-white">Choose Your Avatar</h1>

      <button
        onClick={generateAvatars}
        className="px-6 py-2 bg-third-blue hover:bg-second-blue text-white font-bold rounded-md transition-all duration-150"
      >
        Generate Avatars
      </button>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {avatars.map(({ svg, seed, styleName }, idx) => (
          <div
            key={idx}
            className={`p-2 rounded-2xl cursor-pointer transition-all duration-150 ${
              selectedAvatar?.svg === svg
                ? "border-2 border-third-blue bg-[#1c1d23]"
                : "bg-[#1c1d23] border-2 border-transparent hover:border-[#333]"
            }`}
            onClick={() => setSelectedAvatar({ svg, seed, styleName })}
          >
            <div
              className="w-28 h-28"
              dangerouslySetInnerHTML={{ __html: svg }}
            />
          </div>
        ))}
      </div>

      {selectedAvatar && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Selected Avatar
          </h2>
          <div
            className="w-32 h-32 mx-auto"
            dangerouslySetInnerHTML={{ __html: selectedAvatar.svg }}
          />
          <p className="text-white mt-4">
            <strong>Seed:</strong> {selectedAvatar.seed}
          </p>
          <p className="text-white">
            <strong>Style:</strong> {selectedAvatar.styleName}
          </p>
        </div>
      )}
    </div>
  );
};

export default AvatarSelectionPage;
