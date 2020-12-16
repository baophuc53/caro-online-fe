import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Button } from "antd";
import Axios from "axios";
import config from "../../config/config.json";
const ENDPOINT = config.dev.path;

function Home() {
  const [onlineUsers, setonlineUsers] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token != null) {
      const socket = socketIOClient(ENDPOINT);
      socket.on('connect', function() {
        console.log('Connected to server');
        socket.emit("token", token)
      });
      socket.on("send-online-user-list", (data) => {
        console.log(data);
        setonlineUsers(data);
      });
    }
  }, []);

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
