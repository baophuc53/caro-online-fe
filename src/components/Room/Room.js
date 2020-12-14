import React, { useState, useEffect } from "react";
import { Button } from "antd";
import Axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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

      <Header/>

      {BacktoHome()}
      
      <Footer/>
    </div>
  );
}

export default Room;
