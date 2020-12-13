import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Axios from "axios";

function Room() {
  const [player1, setPlayer1] = useState({});
  
  //load user

  //load trạng thái bàn cờ

  //load chat

  const BacktoHome = (props) => (
    <Button
      onClick={() => {
        window.location.href = "/home";
      }}
    >
      Back to home
    </Button>
  );

  return (
    <div className="App">

      {BacktoHome()}
      
    </div>
  );
}

export default Room;
