import React, { useState, useEffect } from "react";
import { Button, Layout, Menu } from "antd";
import Axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage,
} from "react-chat-widget";
import { Socket } from "../Socket/Socket";
import avatar from "../../assets/avatar.jpg";
import "react-chat-widget/lib/styles.css";
import "./ShowRoom.scss";
import Board from "../GameBoard/Board";
import config from "../../config/config.json";

const { Sider, Content } = Layout;

function Room() {
  const [squares, setSquares] = useState(Array(400).fill(null));
  const token = localStorage.getItem("token");
  const room = localStorage.getItem("room");

  const BacktoHome = (props) => (
    <Button
      onClick={() => {
        window.location.href = "/home";
      }}
    >
      Back to home
    </Button>
  );

  const columns = [
    {
      title: "Chat",
      dataIndex: "nickname",
      key: "nickname",
      render: (text) => <a>{text}</a>,
    },
  ];

  useEffect(() => {
    Axios.get(`${config.dev.path}/room/play`, { params: { room_id: room } })
      .then((response) => {
        console.log(response.data);
        if (response.data.data) {
          setSquares(response.data.data.square);
        }
      })
      .catch((err) => {});
    Socket.emit("room", room);
    Socket.on("chat-message", (data) => {
        addResponseMessage(data);
      });
    Socket.on("update-board", (message) => {
        Axios.get(`${config.dev.path}/room/play`, { params: { room_id: room } })
      .then((response) => {
        console.log(response.data);
        if (response.data.data) {
          setSquares(response.data.data.square);
        }
      })
      .catch((err) => {});
      if (message === "end") alert("End game!");
    })
  }, []);


  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    Socket.emit("send-chat-message", newMessage);
    // addResponseMessage("hello!");
    // Now send the message throught the backend API
  };

  return (
    <div>
      <Layout className="layout-home">
        <Header>
          <Menu.Item key="5" style={{ marginLeft: "130px" }}>
            <BacktoHome />
          </Menu.Item>
        </Header>
        <Content style={{ padding: "0 50px" }}>
            <Layout
              className="site-layout-background"
              style={{ margin: "24px 0" }}
            >
              <Content className="playBoard">
                <Board
                  squares={squares.slice()}
                  onClick={(i) => {}}
                />
              </Content>
            </Layout>
        </Content>
        {/* <Footer /> */}
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          senderPlaceHolder="Type a message"
          profileAvatar={avatar}
          title="Chat with player"
          subtitle=""
        />
        <Footer />
      </Layout>
    </div>
  );
}

export default Room;
