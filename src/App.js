import "./App.scss";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import RegistrationForm from "./components/Register/Register";
import UserRoute from "./components/Router/UserRoute";
import LoginOtherRoute from "./components/Router/LoginOtherRoute";
import Home from "./components/Home/Home";
import Room from "./components/Room/Room";
import RegisterOther from "./components/Register/RegisterOther";
import {Socket} from "./components/Socket/Socket";

function App() {
  const [onlineUsers, setonlineUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // console.log(socket);
      Socket.emit("token", token);
      Socket.on("send-online-user-list", (data) => {
        console.log(data);
        setonlineUsers(data);
      });
    }
  }, []);

  return (
    <Router>
      <div className="App">
        <Switch>
          <UserRoute path="/users" />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegistrationForm} />
          <LoginOtherRoute path="/register-other" component={() => <RegisterOther/>} />
          <UserRoute path="/home" component={()=> <Home ListonlineUser={onlineUsers}/>}/>
          <UserRoute path="/room" component={Room} />
          <Redirect from="/" to="/home" />
        </Switch>

      </div>
    </Router>
  );
}

export default App;
