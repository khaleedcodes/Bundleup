import { Pin } from "lucide-react";

function BitItemPin() {
  return (
    <>
      <button className="" onClick={() => {}}>
        <div className="p-1 hover:bg-blue-500 rounded-md">
          <Pin size={18} className="text-white rotate-45" strokeWidth={1} />
        </div>
      </button>
    </>
  );
}

export default BitItemPin;
