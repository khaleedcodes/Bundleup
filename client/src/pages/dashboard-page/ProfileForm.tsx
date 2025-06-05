import { useState } from "react";
// import { UserCircle } from "lucide-react";
import AvatarFromSeed from "./AvatarFromSeed";
// import { useAuth } from "../../context/AuthContext";

const ProfileForm = () => {
  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");

  // const { user } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-4 flex-col flex bg-first-card p-6 rounded-2xl w-full"
    >
      <div className="flex items-center gap-4">
        <AvatarFromSeed seed="6kdb7gpp5jg" styleName="Avataars Neutral" />
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
  );
};

export default ProfileForm;
