import axios from "axios";
import React, { useEffect, useState } from "react";
import { setid, setuser } from "./api/contexts";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Chat from "./pages/Chat";

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
  if (fetch?.id) {
    return <Chat />;
  }
  return <>{!loading && !fetch?.id && <Register />}</>;
};

export default Routers;
