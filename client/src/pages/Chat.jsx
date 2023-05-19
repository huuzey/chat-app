import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Contact from "../components/Contact";
import Logo from "../assets/logo.svg";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";
import InpuutChat from "../components/InpuutChat";
import { v4 as uuidv4 } from "uuid";

const Chat = ({ socket }) => {
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
          console.log("data", data);
        } catch (error) {
          console.log(error);
        }
      };
      huu();
    }
  }, [currentid]);
  const handleSend = async (mss, setmessege, u) => {
    console.log(u);
    try {
      const { data } = await axios.post("/user/message/addmsg", {
        from: id,
        to: currentid,
        message: mss,
        times: u,
      });
      socket.emit("send-msg", {
        to: currentid,
        from: id,
        message: mss,
        times: u,
      });
      const msgs = [...chat];
      msgs.push({ fromSelf: true, message: mss, times: u });
      setchat(msgs);
      setmessege("");
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    scrollref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [chat]);

  useEffect(() => {
    fetch();
  }, []);
  const authe = nameuser.charAt(0).toUpperCase() + nameuser.slice(1);
  return (
    <div className="flex h-full  bg-[#131324]">
      <div className=" w-1/3 fixed  top-0 left-0 h-full overflow-y-scroll shadow-2xl shadow-[#71315C]  bg-[#71315C]">
        <div className="font-bold text-3xl ml-3 mt-3 text-teal-300 flex items-center ">
          <img src={Logo} alt="logo" className=" mr-2 h-12 w-12" />
          {authe}
        </div>
        <div className="    text-[#1cd5dcd6] ml-3 mt-3 flex flex-col ">
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
      <div className="w-2/3  text-white fixed mb-6 right-0 top-0 bg-[#131324] h-[92%] overflow-y-scroll ">
        {!currentid ? (
          <Welcome currentuser={nameuser} />
        ) : (
          <>
            <div className=" ">
              <div className=" ">
                <ChatContainer
                  curr={usern}
                  caht={chat}
                  setchat={setchat}
                  socket={socket}
                  userk={currentid}
                  curref={scrollref}
                />
              </div>
              <div className="mb-2 fixed bottom-0  w-[65%] self-stretch bg-[#131324]">
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
