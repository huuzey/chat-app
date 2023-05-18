import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import Logo from "../assets/logo.svg";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import InpuutChat from "../components/InpuutChat";
import { io } from "socket.io-client";
import { baseurl } from "../App";

const Chat = () => {
  const socket = useRef();
  const scrollref = useRef();
  const { id, nameuser } = useSelector((store) => store.global);
  const [contacts, setContacts] = useState([]);
  const [currentid, setcurrentid] = useState(null);
  const [arrivalmsg, setarrivalmsg] = useState(null);
  const [usern, setusern] = useState(null);
  const [chat, setchat] = useState([]);

  const fetch = async () => {
    try {
      const res = await axios.get(`/user/alluser/${id}`);
      setContacts(res?.data);
    } catch (error) {
      console.log(error);
      console.log("caught");
    }
  };
  useEffect(() => {
    if (currentid) {
      const huu = async () => {
        try {
          const { data } = await axios.post(`/user/message/getmsg`, {
            from: id,
            to: currentid,
          });
          setchat(data);
        } catch (error) {
          console.log(error);
        }
      };
      huu();
    }
  }, [currentid]);
  const handleSend = async (mss, setmessege) => {
    try {
      const { data } = await axios.post("/user/message/addmsg", {
        from: id,
        to: currentid,
        message: mss,
      });
      socket.current.emit("send-msg", {
        to: currentid,
        from: id,
        message: mss,
      });
      const msgs = [...chat];
      msgs.push({ fromSelf: true, message: mss });
      setchat(msgs);
      setmessege("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        console.log(msg);
        setarrivalmsg({ from: false, message: msg });
      });
    }
  }, []);
  useEffect(() => {
    arrivalmsg && setchat((prev) => [...prev, arrivalmsg]);
  }, [arrivalmsg]);
  useEffect(() => {
    scrollref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chat]);

  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    if (id) {
      socket.current = io(baseurl);
      socket.current.emit("add-user", id);
    }
  }, [id]);

  const authe = nameuser.charAt(0).toUpperCase() + nameuser.slice(1);
  return (
    <div className="flex h-screen bg-[#131324]">
      <div className="flex w-1/3 shadow-2xl shadow-[#71315C] flex-col bg-[#71315C]">
        <div className="font-bold text-3xl ml-3 mt-3 text-teal-300 flex items-center ">
          <img src={Logo} alt="logo" className=" mr-2 h-12 w-12" />
          {authe}
        </div>
        <div className=" overflow-x-hidden    text-[#1cd5dcd6] ml-3 mt-3 flex flex-col ">
          {contacts?.map((contact) => {
            return (
              <Contact
                con={contact}
                key={contact?._id}
                currentid={currentid}
                setcurrentid={setcurrentid}
                setcurrentusern={setusern}
              />
            );
          })}
        </div>
      </div>
      <div className="w-2/3 text-white h-screen">
        {!currentid ? (
          <Welcome currentuser={nameuser} />
        ) : (
          <>
            <div className="flex flex-col h-full">
              <div className="flex-grow">
                <ChatContainer curr={usern} caht={chat} socket={scrollref} />
              </div>
              <div className="mb-4   w-full">
                <InpuutChat handlesend={handleSend} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Chat;
