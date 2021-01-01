import React from "react";
import { Button, Layout, Menu } from "antd";
import "../Home/Home.scss";
import "./Header.scss";
const { Header } = Layout;

function header(props) {
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
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Room</Menu.Item>
        <Menu.Item key="4" style={{ float: "right" }}>
          <Signout />
        </Menu.Item>
        {props.children}
      </Menu>
    </Header>
  );
}

export default header;
