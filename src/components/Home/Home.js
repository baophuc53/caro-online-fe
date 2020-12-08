import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Button } from "antd";
const ENDPOINT = "http://localhost:8000";


function Home() {

  const [onlineUsers , setonlineUsers] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("send-online-user-list", data => {
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

        {onlineUsers.map((OLUser) => (
          <div key = {OLUser.id}>
            {OLUser.nickname}
          </div>
        ))}


    </div>
  );
}

export default Home;
