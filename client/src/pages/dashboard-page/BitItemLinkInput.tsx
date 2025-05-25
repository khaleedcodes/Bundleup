import { useState, useEffect, Dispatch, useRef } from "react";
import { Check } from "lucide-react";
import { X } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

function BitItemLinkInput({
  link,
  _id,
  setIsLinkEdit,
  getBits,
}: {
  link: string;
  _id: string;
  setIsLinkEdit: Dispatch<React.SetStateAction<boolean>>;
  getBits: () => void;
}) {
  const { token } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);

  const [LinkInput, setLinkInput] = useState("");
  const [message, setMessage] = useState("");

  async function handleSave() {
    if (!urlPattern.test(LinkInput)) {
      setMessage("Please enter a valid URL");
      return;
    }

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/bundles/me/bits/${_id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ url: LinkInput }),
        }
      );
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.message || "Failed to update link.");
        return;
      }

      setIsLinkEdit(false);
      getBits();
    } catch (error) {
      console.error(error);
      setMessage("An unexpected error occurred.");
    }
  }

  useEffect(() => {
    if (!message) return;

    const timeout = setTimeout(() => {
      setMessage("");
    }, 3000);

    return () => clearTimeout(timeout);
  }, [message]);

  function handleCancel() {
    setIsLinkEdit(false);
  }

  useEffect(() => {
    inputRef.current?.focus();
    setLinkInput(link);
  }, [link]);

  const urlPattern =
    /^(https?:\/\/)([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/;

  return (
    <div className="flex w-full flex-col">
      <div className="w-full flex gap-4">
        <input
          type="text"
          className="  bg-first-card p-1 px-2 rounded-xl w-full border-none outline-none"
          value={LinkInput}
          onChange={(e) => setLinkInput(e.target.value)}
          ref={inputRef}
          // onBlur={handleCancel}
        />
        <div className="flex gap-2 items-center">
          <button
            onClick={handleSave}
            className="p-1 rounded-md hover:bg-green-100 text-green-600 transition"
          >
            <Check size={14} />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 rounded-md hover:bg-red-100 text-red-600"
          >
            <X size={14} />
          </button>
        </div>
      </div>
      {message && (
        <div className="text-third-blue text-center transition-opacity duration-300">
          {message}
        </div>
      )}
    </div>
  );
}

export default BitItemLinkInput;
