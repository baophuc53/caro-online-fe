import React from "react";
import { Button, Layout, Menu, Dropdown } from "antd";
import {TrophyFilled} from '@ant-design/icons';
import "../Home/Home.scss";
import "./Header.scss";
import InfoDialog from "../Infomation/Infomation";
const { Header } = Layout;

function Header_(props) {
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

  const toRankPage = () => {
    window.location.href = "/ranking";
  };

  return (
    <Header className="header">
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
      <Menu.Item key="1" onClick={() => toRankPage()}>
        <TrophyFilled style={{ fontSize: "30px", color: "yellow" }} />
      </Menu.Item>
        <Menu.Item key="4" style={{ float: "right" }}>
          <Dropdown overlay={menu} placement="bottomCenter">
            <Button>{props.nickname}</Button>
          </Dropdown>
        </Menu.Item>
        {props.children}
      </Menu>
    </Header>
  );
}

export default Header_;
