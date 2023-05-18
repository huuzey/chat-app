const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const userrouter = require("./routers/userrouter");
const jwt = require("jsonwebtoken");
const socket = require("socket.io");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/user", userrouter);
PORT = process.env.PORT;
mongoose
  .connect(process.env.MONGO_URL, console.log("connected"), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    const server = app.listen(PORT, () => {
      console.log(`Server connected ${PORT}`);
    });
    const io = socket(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
      },
    });

    global.onlineUsers = new Map();
    io.on("connection", (socket) => {
      global.chatSocket = socket;
      socket.on("add-user", (userId) => {
        onlineUsers.set(userId, socket.id);
      });

      socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
          socket.to(sendUserSocket).emit("msg-recieve", data.message);
        }
      });
    });
  })
  .catch((err) => console.log(err));
