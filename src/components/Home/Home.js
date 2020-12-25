import React, { useState, useEffect } from "react";
import { Button, Layout, Table, Menu, Card } from "antd";
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
import Board from "../GameBoard/Board";
import Axios from "axios";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const ENDPOINT = config.dev.path;

function Home(props) {
  const [room, setRoom] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    Axios.get(`${config.dev.path}/room`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => {
        if (res.data.code === 0) {
          console.log(res.data);
          setRoom(res.data.data.rooms);
        }
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  }, []);

  const join = (roomId) => {
    Axios.post(
      `${config.dev.path}/room/join-room`,
      { room_id: roomId },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    )
      .then((_result) => {
        if (_result.data.code === 0) {
          localStorage.setItem("room", roomId);
          window.location.href = "/room";
        } else alert("Room is full!");
      })
      .catch((_error) => {
        alert(_error.message);
      });
  }

  const view = () => {
    
  }

  const showListRoom = () => {
    const src =
      (room &&
        room.map((item, key) => (
          <Card className="room" 
          title={item.name_room}
          extra={<><a onClick={()=>{join(item.id)}}>Join</a>
                <a onClick={()=>{view(item.id)}}>  View</a></>}><p>{item.nickname}</p></Card>
        ))) ||
      [];
    return src;
  };

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
      key: "nickname",
      render: (text) => <a>{text}</a>,
    },
  ];
  const data = props.ListonlineUser;
  data.forEach((data) => (data.key = data.nickname));
  return (
    <Layout className="layout-home">
      <Header />
      <Content style={{ padding: "0 50px" }}>
        <Layout className="site-layout-background" style={{ margin: "24px 0" }}>
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
        <div className="list-room">{showListRoom()} </div>
      </Content>

      <Footer />
    </Layout>
  );
}

export default Home;
