import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Modal, Button, Input } from "antd";
import Draggable from "react-draggable";
import NewRoomDialog from "./AddNewRoom";
import Axios from "axios";
import config from "../../config/config.json";
const ENDPOINT = config.dev.path;

function Home() {
  const [onlineUsers, setonlineUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const socket = socketIOClient(ENDPOINT);
      socket.emit("token", token);
    socket.on("send-online-user-list", (data) => {
      console.log(data);
      setonlineUsers(data);
    });
  }, []);

  const Signout = (props) => (
    <Button
      onClick={() => {
        localStorage.clear();
        window.location.href = "/login";
      }}
    >
      Logout
    </Button>
  );

  return (
    <div className="App">
      {Signout()}

      {NewRoomDialog()}

      {onlineUsers.map((OLUser) => (
        <div key={OLUser.id}>{OLUser.nickname}</div>
      ))}
    </div>
  );
}

export default Home;
