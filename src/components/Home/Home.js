import React, { useState, useEffect } from "react";
import {Button} from "antd";
import NewRoomDialog from "./CreateRoom";
import JoinRoomDialog from "./JoinRoom";

function Home(props) {

  const Signout = () => (
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

      {JoinRoomDialog()}

      {props.ListonlineUser.map((OLUser) => (
          <div key={OLUser.id}>{OLUser.nickname}</div>
        ))}
    </div>
  );
}

export default Home;
