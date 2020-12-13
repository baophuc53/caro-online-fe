import React, { useState, useEffect } from "react";
// import socketIOClient from "socket.io-client";
import { Button } from "antd";
// const ENDPOINT = "http://localhost:8000";

function Room() {
//   const [onlineUsers, setonlineUsers] = useState([]);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//       const socket = socketIOClient(ENDPOINT);
//       socket.on('connect', function() {
//         console.log('Connected to server');
//         socket.emit("token", token)
//       });
//       socket.on("send-online-user-list", (data) => {
//         console.log(data);
//         setonlineUsers(data);
//       });
//   }, []);

  const BacktoHome = (props) => (
    <Button
      onClick={() => {
        window.location.href = "/home";
      }}
    >
      Back to home
    </Button>
  );

  const NewRoom = (props) => (
    <Button
      // onClick={() => {
      //   localStorage.clear();
      //   window.location.href = "/login";
      // }}
    >
      Tạo Phòng
    </Button>
  );

  return (
    <div className="App">
      {BacktoHome()}

      {NewRoom()}
      
      {/* {onlineUsers.map((OLUser) => (
        <div key={OLUser.id}>{OLUser.nickname}</div>
      ))} */}
    </div>
  );
}

export default Room;
