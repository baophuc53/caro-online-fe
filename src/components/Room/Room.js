import React, { useState, useEffect } from "react";
import { Button, Row, Col, Menu, Input, Layout, Spin, Modal } from "antd";
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
import { AiOutlineClockCircle, AiOutlineFieldTime } from "react-icons/ai";

const { Sider, Content } = Layout;

function Room(props) {
  const [squares, setSquares] = useState(Array(400).fill(null));
  const [turn, setTurn] = useState(true);
  const [mark, setMark] = useState("X");
  const [wait, setWait] = useState(false);
  const [counter, setCounter] = useState(-1);
  const token = localStorage.getItem("token");
  const room = localStorage.getItem("room");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [inviteName, setInviteName] = useState("");
  let time;
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    Socket.emit("invite", inviteName);
    Socket.on("invite-response", (message) => {
      alert(message);
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClick = (i) => {
    if (!turn) return;
    let s = squares.slice();
    if (s[i] === null) {
      s[i] = mark;
      setSquares(s);
      Axios.post(
        `${config.dev.path}/room/play`,
        { room_id: room, data: { square: s, move: i } },
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      )
        .then((_result) => {
          if (_result.data.code === 0) {
            Socket.emit("swap-turn", room);
            setTurn(false);
          } else if (_result.data.code === 1) {
            Modal.success({
              content: 'You win!',
            });
            Socket.emit("end-game", "win");
            setTurn(false);
          }
        })
        .catch((_error) => {
          alert(_error.message);
        });
    }
  };

  const BacktoHome = (props) => (
    <Button
      onClick={() => {
        window.location.href = "/home";
      }}
    >
      Back to home
    </Button>
  );

  const GiveUp = (props) => (
    <Button
      danger
      type="primary"
      onClick={() => {
        if (turn) {
          Socket.emit("end-game", "lose");
          setTurn(false);
          Modal.error({
            content: 'You lose!',
          });
        }
      }}
    >
      Give up
    </Button>
  );

  const Invite = (props) => <Button onClick={showModal}>Invite</Button>;

  const columns = [
    {
      title: "Chat",
      dataIndex: "nickname",
      key: "nickname",
      render: (text) => <a>{text}</a>,
    },
  ];

  useEffect(() => {
    Socket.emit("room", room);
    Socket.emit("join-room", room);
    //get data of game board
    fetchData();
    //check turn
    Axios.post(
      `${config.dev.path}/room/turn`,
      { room_id: room },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    )
      .then((_result) => {
        if (!_result.data.goFirst) setMark("O");
        if (_result.data.code === 0) {
          setTurn(true);
        } else if (_result.data.code === 3) {
          setWait(true);
          setTurn(false);
          Socket.on("end-waiting", (message) => {
            setWait(false);
            if (_result.data.goFirst) {
              setTurn(true);
              setCounter(time);
            }
          });
        } else setTurn(false);
      })
      .catch((_error) => {
        alert(_error.message);
      });
    // Socket.on("default-message", (data) => {
    //   addResponseMessage(data);
    // });

    Socket.on("chat-message", (data) => {
      addResponseMessage(data);
    });
    //get game board again when in turn
    Socket.on("get-turn", (message) => {
      fetchData();
      if (message === "continue") {
        setTurn(true);
      } else if (message === "lose") {
        Modal.error({
          content: 'You lose!',
        });
        setTurn(false);
      } else {
        Modal.success({
          content: 'You win!',
        });
        setTurn(false);
      }
    });
  }, []);

  useEffect(() => {
    turn && counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) {
      Socket.emit("end-game", "lose");
      setTurn(false);
      Modal.error({
        content: 'You lose!',
      });
    }
  }, [counter]);

  const fetchData = () => {
    Axios.get(`${config.dev.path}/room/play`, { params: { room_id: room } })
      .then((response) => {
        if (response.data.data) {
          setSquares(response.data.data.square);
        }
        if (response.data.time) {
          setCounter(response.data.time);
          time = response.data.time;
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleNewUserMessage = (newMessage) => {
    console.log(`New message incoming! ${newMessage}`);
    Socket.emit("room", room);
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
          <Menu.Item key="6">
            <Invite />
          </Menu.Item>
          <Menu.Item key="7">
            <GiveUp />
          </Menu.Item>
        </Header>
        <Content style={{ padding: "0 50px" }}>
          {wait ? (
            <Spin tip="Waiting for other join room...">
              <Layout
                className="site-layout-background"
                style={{ margin: "24px 0" }}
              >
                <Content
                  style={{ padding: "0 24px", minHeight: 280 }}
                  className="playBoard"
                >
                  <Board
                    squares={squares.slice()}
                    onClick={(i) => handleClick(i)}
                  />
                </Content>
              </Layout>
            </Spin>
          ) : (
            <Layout
              className="site-layout-background"
              style={{ margin: "24px 0" }}
            >
              <Content className="playBoard">
                <div className={"timePlay"}>
                  {/* <div className= "timePlay"> */}
                  <div className="time">
                    <AiOutlineFieldTime />
                  </div>
                   <div className="coutdown">{turn ? counter : 0}s</div>
                </div>
                <Board
                  squares={squares.slice()}
                  onClick={(i) => handleClick(i)}
                />
              </Content>
            </Layout>
          )}
        </Content>
        <Modal
          title="Room"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>Tên người chơi:</p>
          <Input
            placeholder="Nhập nickname người chơi..."
            allowClear
            onChange={(e) => setInviteName(e.target.value)}
          />
        </Modal>
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
