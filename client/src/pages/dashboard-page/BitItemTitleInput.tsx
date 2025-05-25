import { useState, useEffect, Dispatch, useRef } from "react";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function BitItemTitleInput({
  title,
  _id,
  setIsTitleEdit,
  getBits,
}: {
  title: string;
  _id: string;
  setIsTitleEdit: Dispatch<React.SetStateAction<boolean>>;
  getBits: () => void;
}) {
  const { token } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);

  const [titleInput, setTitleInput] = useState("");

  async function handleSave() {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/bundles/me/bits/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: titleInput }),
      }
    );
    const data = await res.json();
    console.log(data);
    setIsTitleEdit(false);
    getBits();
  }

  function handleCancel() {
    setIsTitleEdit(false);
  }

  useEffect(() => {
    inputRef.current?.focus();
    setTitleInput(title);
  }, [title]);

  return (
    <div className="flex gap-4 w-full">
      <input
        type="text"
        className="  bg-first-card p-1 px-2 rounded-xl w-full border-none outline-none"
        value={titleInput}
        onChange={(e) => setTitleInput(e.target.value)}
        ref={inputRef}
        onBlur={handleCancel}
        onKeyDown={(e) => e.key === "Enter" && handleSave()}
      />
      <div className="flex gap-2 items-center">
        <button
          onMouseDown={handleSave}
          className="p-1 rounded-md hover:bg-green-100 text-green-600 transition"
        >
          <Check size={14} />
        </button>
        <button
          onMouseDown={handleCancel}
          className="p-1 rounded-md hover:bg-red-100 text-red-600"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}

export default BitItemTitleInput;
