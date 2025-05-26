import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

interface BitItemEyeProp {
  isActive: boolean;
  _id: string;
  getBits: () => void;
}

function BitItemEye({ isActive, _id, getBits }: BitItemEyeProp) {
  const { token } = useAuth();
  async function handleEyeClick() {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/bundles/me/bits/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isActive: !isActive }),
      }
    );
    const data = await res.json();
    console.log(data);
    getBits();
  }
  return (
    <>
      <button
        className="p-1 hover:bg-slate-800 rounded-md"
        onClick={handleEyeClick}
      >
        {isActive ? (
          <Eye size={18} className="text-third-blue" strokeWidth={1} />
        ) : (
          <EyeOff size={18} className="text-third-blue" strokeWidth={1} />
        )}
      </button>
    </>
  );
}

export default BitItemEye;
