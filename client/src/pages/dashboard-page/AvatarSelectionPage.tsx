import React, { useState, useEffect } from "react";
import { X } from "lucide-react"; // <-- Import from lucide
import { createAvatar } from "@dicebear/core";
import {
  adventurer,
  adventurerNeutral,
  bigSmile,
  bigEars,
  micah,
  avataaarsNeutral,
  pixelArt,
  bottts,
} from "@dicebear/collection";

type AvatarStyle =
  | typeof adventurer
  | typeof adventurerNeutral
  | typeof bigSmile
  | typeof bigEars
  | typeof micah
  | typeof avataaarsNeutral
  | typeof pixelArt
  | typeof bottts;

type AvatarData = {
  dataUri: string;
  seed: string;
  styleName: string;
  svgString: string;
};

const styles: { name: string; style: AvatarStyle }[] = [
  { name: "Adventurer", style: adventurer },
  { name: "Big Smile", style: bigSmile },
  { name: "Big Ears", style: bigEars },
  { name: "Micah", style: micah },
  { name: "Pixel Art", style: pixelArt },
  { name: "Bottts", style: bottts },
  { name: "Adventurer Neutral", style: adventurerNeutral },
  { name: "Avataars Neutral", style: avataaarsNeutral },
];

async function svgStringToPngDataUrl(
  svgString: string,
  width = 128,
  height = 128
): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: "image/svg+xml" });
    const url = URL.createObjectURL(svgBlob);

    img.onload = () => {
      URL.revokeObjectURL(url);
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        reject(new Error("Canvas context not available"));
        return;
      }
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      const pngDataUrl = canvas.toDataURL("image/png");
      resolve(pngDataUrl);
    };

    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };

    img.src = url;
  });
}

interface AvatarSelectionPageProps {
  onClose: () => void;
}

function AvatarSelectionPage({ onClose }: AvatarSelectionPageProps) {
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarData | null>(null);
  const [avatars, setAvatars] = useState<AvatarData[]>([]);
  const [pngDataUrl, setPngDataUrl] = useState<string | null>(null);

  const generateAvatars = () => {
    const generated: AvatarData[] = [];

    styles.forEach(({ name, style }) => {
      for (let i = 0; i < 2; i++) {
        const seed = Math.random().toString(36).substring(2, 15);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const avatar = createAvatar(style as any, { seed });

        generated.push({
          dataUri: avatar.toDataUri(),
          seed,
          styleName: name,
          svgString: avatar.toString(),
        });
      }
    });

    setAvatars(generated);
    setSelectedAvatar(null);
    setPngDataUrl(null);
  };

  useEffect(() => {
    generateAvatars();
  }, []);

  useEffect(() => {
    if (!selectedAvatar) {
      setPngDataUrl(null);
      return;
    }

    svgStringToPngDataUrl(selectedAvatar.svgString, 128, 128)
      .then((pngUrl) => setPngDataUrl(pngUrl))
      .catch(() => setPngDataUrl(null));
  }, [selectedAvatar]);

  const handleUseAvatar = () => {
    if (!selectedAvatar) return;

    // Dummy backend call - replace this later
    console.log("Saving avatar:", selectedAvatar, pngDataUrl);
    onClose();
  };

  return (
    <div className="relative w-full h-full overflow-hidden flex flex-col items-center p-4 rounded-2xl gap-6 max-w-[800px]">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-red-500 transition"
      >
        <X size={24} />
      </button>

      <h1 className="text-2xl font-bold text-white">Choose Your Bitface</h1>
      <div
        className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 overflow-y-auto scrollbar-custom"
        style={{ maxHeight: "60vh" }}
      >
        {avatars.map(({ dataUri, seed, styleName }) => (
          <div
            key={`${styleName}-${seed}`}
            className={`p-2 rounded-2xl cursor-pointer transition-all duration-150 aspect-square ${
              selectedAvatar?.seed === seed
                ? "border-2 border-third-blue bg-[#1c1d23]"
                : "bg-[#1c1d23] border-2 border-transparent hover:border-[#333]"
            }`}
            onClick={() =>
              setSelectedAvatar(
                avatars.find((avatar) => avatar.seed === seed) || null
              )
            }
          >
            <img
              src={dataUri}
              alt={`Avatar: ${styleName}`}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
      <div className="mt-8 flex flex-col sm:flex-row gap-4">
        <button
          onClick={generateAvatars}
          className="px-6 py-2 bg-third-blue hover:bg-second-blue text-white font-bold rounded-md transition-all duration-150"
        >
          Shuffle Avatars
        </button>

        <button
          onClick={handleUseAvatar}
          disabled={!selectedAvatar}
          className={`px-6 py-2 font-bold rounded-md transition-all duration-150 ${
            selectedAvatar
              ? "bg-green-600 hover:bg-green-700 text-white"
              : "bg-gray-600 text-gray-300 cursor-not-allowed"
          }`}
        >
          Use This Avatar
        </button>
      </div>
    </div>
  );
}

export default AvatarSelectionPage;
