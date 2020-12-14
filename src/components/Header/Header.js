import React from "react";
import { Button, Layout, Menu } from "antd";
import "../Home/Home.scss";

const { Header } = Layout;

function header() {
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
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
        <Menu.Item key="1">nav 1</Menu.Item>
        <Menu.Item key="2">nav 2</Menu.Item>
        <Menu.Item key="3">nav 3</Menu.Item>
        <Menu.Item key="4">{Signout()}</Menu.Item>
      </Menu>
    </Header>
  );
}

export default header;
