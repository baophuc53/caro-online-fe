import React, { useEffect, useState } from "react";
import { Button, Layout, Menu, Dropdown } from "antd";
import "../Home/Home.scss";
import "./Header.scss";
import Axios from "axios";
import InfoDialog from "../Infomation/Infomation";
import config from "../../config/config.json";
const { Header } = Layout;

function Header_(props) {
  const [nickname, setNickname] = useState("Try Again");
  const menu = (
    <Menu>
      <Menu.Item>
        <InfoDialog />
      </Menu.Item>
      <Menu.Item>
        <Button type="text" onClick={() => Signout()}>
          Sign out
        </Button>
      </Menu.Item>
    </Menu>
  );

  const Signout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${config.dev.path}/user/get-nickname`, {
      headers: {
        Authorization: `token ${token}`,
      },
    }).then((res) => {
      if (res.data.code === 0) {
        setNickname(res.data.data.nickname);
      }
    });
  });

  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">Room</Menu.Item>
        <Menu.Item key="4" style={{ float: "right" }}>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>{nickname}</Button>
          </Dropdown>
        </Menu.Item>
        {props.children}
      </Menu>
    </Header>
  );
}

export default Header_;
