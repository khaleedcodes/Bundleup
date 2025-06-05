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
  dataUri: string; // SVG Data URI
  seed: string;
  styleName: string;
  svgString: string; // raw SVG string for conversion
};

const styles: { name: string; style: AvatarStyle }[] = [
  { name: "Adventurer", style: adventurer },
  { name: "Big Smile", style: bigSmile },
  { name: "Big Ears", style: bigEars },
  { name: "Micah", style: micah },
  { name: "Adventurer Neutral", style: adventurerNeutral },
  { name: "Avataars Neutral", style: avataaarsNeutral },
  { name: "Pixel Art", style: pixelArt },
  { name: "Bottts", style: bottts },
];

// Helper: Convert SVG string to PNG data URL
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

function AvatarSelectionPage() {
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

  // When selectedAvatar changes, convert its SVG to PNG
  useEffect(() => {
    if (!selectedAvatar) {
      setPngDataUrl(null);
      return;
    }
    console.log(selectedAvatar);

    svgStringToPngDataUrl(selectedAvatar.svgString, 128, 128)
      .then((pngUrl) => setPngDataUrl(pngUrl))
      .catch(() => setPngDataUrl(null));
  }, [selectedAvatar]);

  // Download handler
  const handleDownload = () => {
    if (!pngDataUrl) return;
    const link = document.createElement("a");
    link.href = pngDataUrl;
    link.download = `${selectedAvatar?.styleName}-${selectedAvatar?.seed}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
        {avatars.map(({ dataUri, seed, styleName }) => (
          <div
            key={`${styleName}-${seed}`}
            className={`p-2 rounded-2xl cursor-pointer transition-all duration-150 ${
              selectedAvatar?.seed === seed
                ? "border-2 border-third-blue bg-[#1c1d23]"
                : "bg-[#1c1d23] border-2 border-transparent hover:border-[#333]"
            }`}
            onClick={() => {
              setSelectedAvatar(
                avatars.find((avatar) => avatar.seed === seed) || null
              );
            }}
          >
            <img
              src={dataUri}
              alt={`Avatar: ${styleName}`}
              className="w-28 h-28"
            />
          </div>
        ))}
      </div>

      {selectedAvatar && (
        <div className="mt-8 text-center">
          <h2 className="text-xl font-semibold text-white mb-2">
            Selected Avatar
          </h2>
          {/* Show PNG preview */}
          {pngDataUrl ? (
            <img
              src={pngDataUrl}
              alt={`Selected Avatar PNG: ${selectedAvatar.styleName}`}
              className="w-32 h-32 mx-auto"
            />
          ) : (
            <p className="text-white">Loading PNG...</p>
          )}
          <p className="text-white mt-4">
            <strong>Seed:</strong> {selectedAvatar.seed}
          </p>
          <p className="text-white">
            <strong>Style:</strong> {selectedAvatar.styleName}
          </p>

          <button
            onClick={handleDownload}
            className="mt-4 px-4 py-2 bg-third-blue hover:bg-second-blue text-white font-bold rounded-md transition-all duration-150"
            disabled={!pngDataUrl}
          >
            Download PNG
          </button>
        </div>
      )}
    </div>
  );
}

export default AvatarSelectionPage;
