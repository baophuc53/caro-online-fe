import React, { useState, useEffect } from "react";
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
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const { Sider, Content } = Layout;
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
  const data = props.ListonlineUser;
  data.forEach(data => data.key=data.id);
  return (
    

    <Layout className="layout-home">
      <Header />
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
      <Footer />
    </Layout>
  );
}

export default Home;
