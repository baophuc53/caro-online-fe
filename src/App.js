import "./App.scss";
import React, { useState, useEffect } from "react";
import "antd/dist/antd.css";
import socketIOClient from "socket.io-client";
import LoginScreen from "./pages/LoginScreen/LoginScreen";
import AdminLoginScreen from "./pages/Admin/LoginScreen/LoginScreen";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import RegistrationForm from "./components/Register/Register";
import UserRoute from "./components/Router/UserRoute/UserRoute";
import AdminRoute from "./components/Router/AdminRoute/AdminRoute";
import { Button } from "antd";
const ENDPOINT = "http://localhost:8000";

function App() {
  // const [onlineUsers, setonlineUsers] = useState([]);

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on("send-online-user-list", (data) => {
  //     console.log(data);
  //     setonlineUsers(data);
  //   });
  // }, []);

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
    <Router>
      <div className="App">
        <Switch>
          <UserRoute path="/users" />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegistrationForm} />
          <UserRoute path="/home" component={Signout} />

          <Route path="/admin-login" component={AdminLoginScreen} />
          <AdminRoute path="/admin" component={Signout} />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
