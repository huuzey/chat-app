import React from "react";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ curr, caht, socket }) => {
  const mine = curr.charAt(0).toUpperCase() + curr.slice(1);

  return (
    <div>
      <div className="flex items-center text-2xl font-bold text-amber-500 justify-center">
        {mine}
      </div>
      <div>
        {caht?.map((chat, index) => (
          <div
            ref={socket}
            key={uuidv4()}
            className={`${
              chat?.fromSelf
                ? " text-start ml-2  text-fuchsia-400"
                : "text-end mr-2 text-amber-400"
            }`}
          >
            {" "}
            {chat?.message}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatContainer;
