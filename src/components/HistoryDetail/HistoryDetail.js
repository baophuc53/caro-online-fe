import React, { useState, useEffect } from "react";
import { Button, Layout, Menu, List } from "antd";
import Axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import {
  Widget,
  addResponseMessage,
  addLinkSnippet,
  addUserMessage,
} from "react-chat-widget";
import avatar from "../../assets/avatar.jpg";
import "react-chat-widget/lib/styles.css";
import "./HistoryDetail.scss";
import Board from "../GameBoard/Board";
import config from "../../config/config.json";

const { Sider, Content } = Layout;

function Room(props) {
  const [squares, setSquares] = useState(Array(400).fill(null));
  const [data, setChatData] = useState([]);
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

  useEffect(() => {
    Axios.get(`${config.dev.path}/user/history/${props.match.params.id}`, {
        headers: {
          Authorization: `token ${token}`,
        },
      })
        .then((result) => {
          if (result.data.code === 0) {
            console.log(result.data.data);
            if (result.data.data.history)
                setSquares(result.data.data.history.square);
            setChatData(result.data.data.chat);
          } else {
            alert(result.data.data.message);
          }
        })
        .catch((error) => {
          console.log(error); // Xử lý lỗi
          alert(error.message);
        });
  }, []);

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
      </Layout>
    </div>
  );
}

export default Room;
