import axios from "axios";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setid, setuser } from "../api/contexts";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginOrRegister, setIsLoginOrRegister] = useState("register");
  const dispatch = useDispatch();
  const options = {
    position: "bottom-right",
    autoClose: "5000",
    pauseOnHover: true,
    draggeble: true,
    theme: "dark",
  };

  async function handleSubmit(ev) {
    ev.preventDefault();
    const url =
      isLoginOrRegister === "register" ? "/user/register" : "/user/login";
    try {
      const { data } = await axios.post(url, { username, password });
      if (data === "pass not ok") {
        toast.error("username or password wrong", options);
        return;
      }
      if (data === "username") {
        toast.error("username found, please Login", options);
        return;
      }
      dispatch(setid(data?.id));
      dispatch(setuser(data?.username));
    } catch (error) {
      toast.error("NO user found Please register", options);

      console.log(error);
    }
  }
  return (
    <div className="bg-blue-50 h-screen flex items-center">
      <form className="w-64 mx-auto mb-12" onSubmit={handleSubmit}>
        <input
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          type="text"
          placeholder="username"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <input
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          type="password"
          placeholder="password"
          className="block w-full rounded-sm p-2 mb-2 border"
        />
        <button className="bg-blue-500 text-white block w-full rounded-sm p-2">
          {isLoginOrRegister === "register" ? "Register" : "Login"}
        </button>
        <div className="text-center mt-2">
          {isLoginOrRegister === "register" && (
            <div>
              Already a member?
              <button
                className="ml-1"
                onClick={() => setIsLoginOrRegister("login")}
              >
                Login here
              </button>
            </div>
          )}
          {isLoginOrRegister === "login" && (
            <div>
              Dont have an account?
              <button
                className="ml-1"
                onClick={() => setIsLoginOrRegister("register")}
              >
                Register
              </button>
            </div>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
