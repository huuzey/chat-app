import React from "react";
import robot from "../assets/robot.gif";

const Welcome = ({ currentuser }) => {
  const mine = currentuser.charAt(0).toUpperCase() + currentuser.slice(1);
  return (
    <div className="flex flex-col items-center justify-center">
      <img src={robot} className="w-[50%] h-[50%]" />
      <h>
        Welcome ,
        <span className="ml-2 font-bold text-2xl text-teal-300 pr-1">
          {mine}!
        </span>
      </h>
      <p> Please select a chat to start messaging.</p>
    </div>
  );
};

export default Welcome;
