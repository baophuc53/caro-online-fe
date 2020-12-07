import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:8000";


function App() {

  const [onlineUsers , setonlineUsers] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("send-online-user-list", data => {
      console.log(data);
      setonlineUsers(data);
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {onlineUsers.map((OLUser) => (
          <div key = {OLUser.id}>
            {OLUser.nickname}
          </div>
        ))}

      </header>
    </div>
  );
}

export default App;
