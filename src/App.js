import "./App.scss";
import React from "react";
import "antd/dist/antd.css";
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
import Home from "./components/Home/Home";
import Room from "./components/Room/Room";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <UserRoute path="/users" />
          <Route path="/login" component={LoginScreen} />
          <Route path="/register" component={RegistrationForm} />
          <UserRoute path="/home" component={Home} />
          <UserRoute path="/room" component={Room} />

          <Route path="/admin-login" component={AdminLoginScreen} />
          <AdminRoute path="/admin" component={Home} />
          <Redirect from="/" to="/home" />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
