import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Button } from "antd";
import Axios from "axios";
import config from "../../config/config.json";
const ENDPOINT = "http://localhost:8000";

function Home() {
  const [onlineUsers, setonlineUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      Axios.post(`${config.dev.path}`, { token })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
          alert(err.message);
        });
      const socket = socketIOClient(ENDPOINT);
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
