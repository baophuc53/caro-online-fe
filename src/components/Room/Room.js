import React, { useState, useEffect } from "react";
import { Button, Row, Col, Table, Input, Layout } from "antd";
import Axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Widget, addResponseMessage, addLinkSnippet, addUserMessage } from 'react-chat-widget';
import { Socket } from "../Socket/Socket";
import avatar from "../../assets/avatar.jpg";
import 'react-chat-widget/lib/styles.css';
import './Room.scss';

const { Sider, Content } = Layout;

function Room() {
  const [player1, setPlayer1] = useState({});

  //load user

  //load trạng thái bàn cờ

  //load chat

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
      key: "id",
      render: (text) => <a>{text}</a>,
    },
  ];

  useEffect(() => {

    Socket.on("chat-message", (data) => {
      addResponseMessage(data);
    });
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    Socket.emit("send-chat-message", newMessage);
    // addResponseMessage("hello!");
    // Now send the message throught the backend API
  }
  return (
    <div>


      <Layout className="layout-home">
        <Header />
        <Content style={{ padding: "0 50px" }}>
          <BacktoHome/>
          <Layout
            className="site-layout-background"
            style={{ margin: "24px 0" }}
          >
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              Game
            </Content>

          </Layout>
        </Content>
        <Footer />
        <Widget
          handleNewUserMessage={handleNewUserMessage}
          senderPlaceHolder="Type a message"
          profileAvatar={avatar}
          title="Chat with player"
          subtitle=""
        />
      </Layout>
    </div>
  );
}

export default Room;
