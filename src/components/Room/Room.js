import React, { useState, useEffect } from "react";
import { Button, Row, Col, Table, Input, Layout } from "antd";
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
import "./Room.scss";
import Board from "../GameBoard/Board";
import config from "../../config/config.json";

const { Sider, Content } = Layout;

function Room() {
  const [player1, setPlayer1] = useState({});
  const [squares, setSquares] = useState(Array(900).fill(null));
  const [turn, setTurn] = useState(true);
  const [mark, setMark] = useState("X");
  const token = localStorage.getItem("token");
  const room = localStorage.getItem("room");
  const handleClick = (i) => {
    if (!turn) return;
    let s = squares.slice();
    s[i] = mark;
    setSquares(s);
    Axios.post(
      `${config.dev.path}/room/play`,
      { room_id: room, data: { square: s } },
      {
        headers: {
          token: token,
        },
      }
    )
      .then((_result) => {
        if (_result.data.code === 0) {
          Socket.emit("swap-turn", room);
          setTurn(false);
        }
      })
      .catch((_error) => {
        alert(_error.message);
      });
  };
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
    //get data of game board
    Axios.get(`${config.dev.path}/room/play`, { params: { room_id: room } })
      .then((response) => {
        if (response.data.data)
          setSquares(response.data.data.square);
      })
      .catch((err) => {});

    //check turn
    Axios.post(
      `${config.dev.path}/room/turn`,
      { room_id: room },
      {
        headers: {
          token: token,
        },
      }
    )
      .then((_result) => {
        if (!_result.data.goFirst)
          setMark("O");
        if (_result.data.code === 0) {
          setTurn(true);
        } else{
          setTurn(false);
        }
      })
      .catch((_error) => {
        alert(_error.message);
      });

    Socket.on("chat-message", (data) => {
      addResponseMessage(data);
    });

    //get game board again when in turn
    Socket.on("get-turn", (message) => {
      Axios.get(`${config.dev.path}/room/play`, { params: { room_id: room } })
        .then((response) => {
          console.log(response.data.data);
          setSquares(response.data.data.square);
        })
        .catch((err) => {
          alert(err);
        });
      setTurn(true);
    });
  }, []);

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incomig! ${newMessage}`);
    Socket.emit("send-chat-message", newMessage);
    // addResponseMessage("hello!");
    // Now send the message throught the backend API
  };
  return (
    <div>
      <Layout className="layout-home">
        <Header />
        <Content style={{ padding: "0 50px" }}>
          <BacktoHome />
          <Layout
            className="site-layout-background"
            style={{ margin: "24px 0" }}
          >
            <Content style={{ padding: "0 24px", minHeight: 280 }}>
              <Board
                squares={squares.slice()}
                onClick={(i) => handleClick(i)}
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
      </Layout>
    </div>
  );
}

export default Room;
