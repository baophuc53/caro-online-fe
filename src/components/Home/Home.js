import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Button } from "antd";
import Axios from "axios";
import config from "../../config/config.json";
const ENDPOINT = config.dev.path;

function Home() {
  const [onlineUsers, setonlineUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      const socket = socketIOClient(ENDPOINT);
      socket.on('connect', function() {
        console.log('Connected to server');
        socket.emit("token", token)
      });
      socket.on("send-online-user-list", (data) => {
        console.log(data);
        setonlineUsers(data);
      });
    }
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

      {onlineUsers.map((OLUser) => (
        <div key={OLUser.id}>{OLUser.nickname}</div>
      ))}
    </div>
  );
}

export default Home;
