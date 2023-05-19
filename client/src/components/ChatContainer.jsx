import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { uniqBy } from "lodash";

const ChatContainer = ({ curr, caht, socket, userk, setchat, curref }) => {
  const mine = curr.charAt(0).toUpperCase() + curr.slice(1);
  useEffect(() => {
    if (socket) {
      socket.on("msg-recieve", (msg) => {
        console.log({ selected: userk, from: msg.from });
        const tar = userk === msg.from;
        console.log(tar);
        if (tar) {
          console.log("are same");

          setchat((prev) => [
            ...prev,
            { from: false, message: msg.text, times: msg.times },
          ]);
        } else {
          setchat((prev) => prev.filter((pre) => pre.times !== msg.times));
        }
      });
    }
  }, [userk]);
  const messagesWithoutDupes = uniqBy(caht, "times");
  console.log("chat", caht);
  console.log("filtered", messagesWithoutDupes);
  return (
    <div>
      <div className="flex items-center text-2xl font-bold text-amber-500 justify-center">
        {mine}
      </div>
      <div>
        {messagesWithoutDupes?.map((chat, index) => (
          <div
            ref={curref}
            key={uuidv4()}
            className={` ${
              chat?.fromSelf
                ? " text-start ml-2 mb-2  text-fuchsia-400"
                : "text-end mr-2 text-amber-400 mb-2"
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
