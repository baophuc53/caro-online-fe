import logo from "./logo.svg";
import "./App.scss";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import socketIOClient from "socket.io-client";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import RegistrationForm from "./components/Register/Register";
const ENDPOINT = "http://localhost:8000";

function App() {
  const [onlineUsers, setonlineUsers] = useState([]);

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT);
    socket.on("send-online-user-list", (data) => {
      console.log(data);
      setonlineUsers(data);
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/register">
            <RegistrationForm/>
          </Route>
          <Route path="/users">
            {/* <Users /> */}
          </Route>
          <Route path="/">
            <LoginScreen />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
