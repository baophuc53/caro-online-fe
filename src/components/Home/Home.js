import React, { useState, useEffect } from "react";
import { Button, Layout, Table, Menu, Card, Modal } from "antd";
import "./Home.scss";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import config from "../../config/config.json";
import NewRoomDialog from "./CreateRoom";
import JoinRoomDialog from "./JoinRoom";
import QuickPlay from "./QuickPlay";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Board from "../GameBoard/Board";
import Axios from "axios";
import { Socket } from "../Socket/Socket";

const { Sider, Content } = Layout;
const { SubMenu } = Menu;
const ENDPOINT = config.dev.path;

function Home(props) {
  const [roomWaiting, setRoomWaiting] = useState([]);
  const [roomPlaying, setRoomPlaying] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roomId, setRoomId] = useState("");
  const [senderName, setSenderName] = useState("");
  const token = localStorage.getItem("token");

  const showModal = (data) => {
    setSenderName(data.nickname);
    setRoomId(data.room);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
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
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    Socket.on("invite-noti", (data) => {
      showModal(data);
    })
    Axios.get(`${config.dev.path}/room`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((res) => {
        if (res.data.code === 0) {
          console.log(res.data);
          setRoomWaiting(res.data.data.waiting);
          setRoomPlaying(res.data.data.playing);
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
  };

  const view = () => {};

  const showListWaiting = () => {
    const src =
      (roomWaiting &&
        roomWaiting.map((item, key) => (
          <Card
            className="room"
            title={item.name_room}
            extra={<a onClick={() => {join(item.id);}}>Join</a>}
            >
            <p>{item.nickname}</p>
          </Card>
        ))) ||
      [];
    return src;
  };

  const showListPlaying = () => {
    const src =
      (roomPlaying &&
        roomPlaying.map((item, key) => (
          <Card
            className="room"
            title={item.name_room}
            extra={<a onClick={() => {view(item.id);}}>View</a>}
            >
            <p>{item.nickname}</p>
          </Card>
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
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            <QuickPlay />
          </Content>
        </Layout>
        <h2>Waiting room list</h2>
        <div className="list-room">{showListWaiting()} </div>
        <h2>Playing room list</h2>
        <div className="list-room">{showListPlaying()} </div>
      </Content>
      <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <p>Người chơi: <b>{senderName}</b> mời bạn vào phòng</p>
      </Modal>
      <Footer />
    </Layout>
  );
}

export default Home;
