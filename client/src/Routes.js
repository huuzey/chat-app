import axios from "axios";
import React, { useEffect, useState } from "react";
import { setid, setuser } from "./api/contexts";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import io from "socket.io-client";

const socket = io.connect("https://chat-backend-sh8h.onrender.com");

const Routers = () => {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(() => {
    setloading(true);
    axios.get("/user/token").then((response) => {
      dispatch(setid(response.data.id));
      dispatch(setuser(response.data.username));
    });
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

  const fetch = useSelector((store) => store.global);
  useEffect(() => {
    if (fetch?.id) {
      socket.emit("add-user", fetch?.id);
    }
  }, [fetch?.id]);

  if (fetch?.id) {
    return <Chat socket={socket} />;
  }
  return <>{!loading && !fetch?.id && <Register />}</>;
};

export default Routers;
