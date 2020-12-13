import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Button, Layout, Table, Menu } from "antd";
import "./Home.scss";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import config from "../../config/config.json";
import NewRoomDialog from "./CreateRoom";
import JoinRoomDialog from "./JoinRoom";

const { Header, Footer, Sider, Content } = Layout;
const { SubMenu } = Menu;
const ENDPOINT = config.dev.path;

function Home(props) {
  const [current, setCurrent] = useState("mail");

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

  const handleClick = (e) => {
    console.log("click ", e);
    this.setState({ current: e.key });
  };

  const columns = [
    {
      title: "User Online",
      dataIndex: "nickname",
      key: "id",
      render: (text) => <a>{text}</a>,
    },
  ];

  return (
    // <Layout>
    //   <Header >   <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal" theme="light">
    //     <Menu.Item key="mail" icon={<MailOutlined />}>
    //       Navigation One
    //   </Menu.Item>
    //     <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
    //       Navigation Two
    //   </Menu.Item>
    //     <SubMenu
    //       key="SubMenu"
    //       icon={<SettingOutlined />}
    //       title="Navigation Three - Submenu"
    //     >
    //       <Menu.ItemGroup title="Item 1">
    //         <Menu.Item key="setting:1">Option 1</Menu.Item>
    //         <Menu.Item key="setting:2">Option 2</Menu.Item>
    //       </Menu.ItemGroup>
    //       <Menu.ItemGroup title="Item 2">
    //         <Menu.Item key="setting:3">Option 3</Menu.Item>
    //         <Menu.Item key="setting:4">Option 4</Menu.Item>
    //       </Menu.ItemGroup>
    //     </SubMenu>
    //     <Menu.Item key="alipay">
    //       <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
    //         Navigation Four - Link
    //     </a>
    //     </Menu.Item>
    //   </Menu>{Signout()}</Header>
    //   <Layout>
    //     <Content>Content</Content>
    //     <Sider theme="light"> <Table columns={columns} dataSource={onlineUsers} pagination={false} /></Sider>
    //   </Layout>
    //   <Footer>{onlineUsers.map((OLUser) => (
    //     <div key={OLUser.id}>{OLUser.nickname}</div>
    //   ))}</Footer>
    // </Layout>

    <Layout className="layout-home">
      <Header className="header">
        <div className="logo" />
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["2"]}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
          <Menu.Item key="4">{Signout()}</Menu.Item>
        </Menu>
      </Header>
      <Content style={{ padding: "0 50px" }}>
        <Layout
          className="site-layout-background"
          style={{ margin: "24px 0" }}
        >
          <Sider className="site-layout-background" width={200} theme="light">
            <Table
              columns={columns}
              dataSource={props.ListonlineUser}
              pagination={false}
              bordered
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <NewRoomDialog />
          </Content>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <JoinRoomDialog />
          </Content>
        </Layout>
      </Content>

      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED
      </Footer>
    </Layout>
  );
}

export default Home;
