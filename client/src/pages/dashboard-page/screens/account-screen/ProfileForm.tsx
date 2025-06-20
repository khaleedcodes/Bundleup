import { useState } from "react";
import AvatarFromSeed from "./AvatarFromSeed";
import AvatarSelectionPage from "./AvatarSelectionPage";
import Modal from "../../../../components/Modal";
import { useAuth } from "../../../../context/AuthContext";

const ProfileForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  const { user } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const [bitFace, setBitFace] = useState<{
    avatarSeed: string;
    avatarStyle: string;
  }>(user.bitface);
  console.log(setBitFace);

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="gap-4 flex-col flex bg-first-card p-6 rounded-2xl w-full"
      >
        <div className="flex items-center gap-2">
          <div onClick={() => setIsModalOpen(true)} className="cursor-pointer">
            {bitFace && (
              <AvatarFromSeed
                seed={bitFace?.avatarSeed}
                styleName={bitFace?.avatarStyle}
              />
            )}
          </div>
          <div className="grow">
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              className="w-full bg-[#1c1d23] p-4 mt-1  rounded-2xl"
              placeholder="username..."
            />
          </div>
        </div>

        <div>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-[#1c1d23] p-4 mt-1 rounded-2xl h-40 resize-none"
            placeholder="bio..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 mt-4 text-white bg-third-blue rounded-md hover:bg-third-blue/80"
        >
          Save
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AvatarSelectionPage onClose={() => setIsModalOpen(false)} />
      </Modal>
    </>
  );
};

export default ProfileForm;
