import React, { useState } from "react";
import { IoMdSend } from "react-icons/io";

const InpuutChat = ({ handlesend }) => {
  const [messege, setmessege] = useState("");
  return (
    <div className="flex gap-2 justify-center w-full ">
      <div className="w-full">
        <input
          type="text"
          placeholder="type message..."
          value={messege}
          onChange={(e) => setmessege(e.target.value)}
          className="w-full bg-[#71315C] px-2 py-1 rounded-md ml-2"
        />
      </div>
      <div>
        <button
          onClick={() => handlesend(messege, setmessege)}
          className=" mr-2 ml-1 text-[#71315C] hover:scale-125"
        >
          <IoMdSend />
        </button>
      </div>
    </div>
  );
};

export default InpuutChat;
