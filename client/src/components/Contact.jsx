import React, { useState } from "react";

const Contact = ({ con, currentid, setcurrentid, setcurrentusern }) => {
  const { _id, username } = con;
  const firsts = username[0].toUpperCase();
  const mine = username.charAt(0).toUpperCase() + username.slice(1);
  return (
    <div>
      <button
        className={` flex   text-center px-2 rounded-full mt-1 mx-2 cursor-pointer ${
          currentid === _id ? "bg-[#131324]" : ""
        }`}
        onClick={() => {
          setcurrentid(_id);
          setcurrentusern(username);
        }}
      >
        <div className="bg-[#131324] hover:bg-red-500 rounded-full w-6 h-5 text-center flex items-center justify-center mr-1">
          {firsts}
        </div>
        {mine}
      </button>
    </div>
  );
};

export default Contact;
