import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import type { bitItemProps } from "../../types/types";
import { Trash, Pen } from "lucide-react";
import BitItemTitleInput from "./BitItemTitleInput";
import BitItemLinkInput from "./BitItemLinkInput";
import BitItemEye from "./BitItemEye";
// import { UserCircle } from "lucide-react";

function BitItem({ _id, title, url, isActive, getBits }: bitItemProps) {
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const [isLinkEdit, setIsLinkEdit] = useState(false);
  const { token } = useAuth();

  async function handleDelete(bitID: string) {
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/api/bundles/me/bits/${bitID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      getBits();
    }

    const data = await res.json();
    console.log(data.message);
  }
  return (
    <li
      key={_id}
      className="flex justify-between items-center bg-[#1c1d23] p-4 rounded-2xl"
    >
      <div className="flex w-full gap-4 items-center flex-col ">
        <div className="flex w-full flex-col gap-2">
          <div className="gap-2 justify-between flex">
            <div className="flex gap-2 w-full">
              <div className={`flex ${isTitleEdit && "w-full"}`}>
                {isTitleEdit ? (
                  <BitItemTitleInput
                    title={title}
                    _id={_id}
                    setIsTitleEdit={setIsTitleEdit}
                    getBits={getBits}
                  />
                ) : (
                  <div className="flex items-center">
                    <p className="sm:hidden">
                      {title.length > 25
                        ? `${title.substring(0, 25)}...`
                        : title}
                    </p>
                    <p className="hidden sm:inline">
                      {title.length > 35
                        ? `${title.substring(0, 35)}...`
                        : title}
                    </p>
                  </div>
                )}
              </div>
              {!isTitleEdit && (
                <button
                  onClick={() => {
                    setIsTitleEdit(true);
                  }}
                >
                  <Pen size={14} className="text-third-blue" strokeWidth={1} />
                </button>
              )}
            </div>
          </div>
          <div className="flex gap-2 justify-between items-center">
            <div className="flex gap-2 w-full">
              <div className={`flex ${isLinkEdit && "w-full"}`}>
                {isLinkEdit ? (
                  <BitItemLinkInput
                    link={url}
                    _id={_id}
                    setIsLinkEdit={setIsLinkEdit}
                    getBits={getBits}
                  />
                ) : (
                  <div className="flex items-center">
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-grey hover:underline sm:hidden"
                    >
                      {url.length > 25 ? `${url.substring(0, 25)}...` : url}
                    </a>
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-grey hover:underline hidden sm:inline"
                    >
                      {url.length > 35 ? `${url.substring(0, 35)}...` : url}
                    </a>
                  </div>
                )}
              </div>

              {!isLinkEdit && (
                <button
                  className="text-green-500"
                  onClick={() => {
                    setIsLinkEdit(true);
                  }}
                >
                  <Pen size={14} className="text-third-blue" strokeWidth={1} />
                </button>
              )}
            </div>
          </div>
        </div>
        <div className="flex w-full items-center justify-end">
          {/* <div className="p-2  bg-first-card rounded-full">
            <UserCircle size={18} className="text-second-icon" />
          </div> */}

          <div className="flex gap-10 bg-first-card p-2 rounded-2xl justify-between self-end  max-w-64">
            <BitItemEye isActive={isActive} _id={_id} getBits={getBits} />
            {/* <button className="" onClick={() => {}}>
              <div className="p-1 hover:bg-blue-500 rounded-md">
                <Pin size={18} className="text-white" strokeWidth={1} />
              </div>
            </button> */}

            <button
              onClick={() => {
                handleDelete(_id);
              }}
            >
              <div className="p-1 hover:bg-red-500 rounded-md">
                <Trash size={18} className="text-white " strokeWidth={1} />
              </div>
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default BitItem;
