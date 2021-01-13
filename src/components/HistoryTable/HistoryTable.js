import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, Menu, Table, Layout, Typography, Tag } from "antd";
import config from "../../config/config.json";
import Header from "../Header/Header";
import ViewChat from "../ViewChat/ViewChat";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import "./HistoryTable.scss";
const HistoryTable = () => {
  const [data, setData] = useState([]);
  const token = localStorage.getItem("token");
  useEffect(() => {
    Axios.get(`${config.dev.path}/user/history`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((result) => {
        if (result.data.code === 0) {
          console.log(result.data.data);
          setData(result.data.data.rows);
        } else {
          alert(result.data.data.message);
        }
      })
      .catch((error) => {
        console.log(error); // Xử lý lỗi
        alert(error.message);
      });
  }, []);

  const BacktoHome = (props) => (
    <Button
      style={{ width: "150px" }}
      onClick={() => {
        window.location.href = "/home";
      }}
    >
      Back to home
    </Button>
  );

  const columns = [
    {
        title: "Room name",
        dataIndex: "name_room",
        key: "id",
    },
    {
        title: "Room owner",
        dataIndex: "owner",
        key: "owner",
    },
    {
        title: "Time per turn",
        dataIndex: "time",
        key: "time",
    },
    {
        title: "Winner",
        dataIndex: "winner",
        key: "winner",
    },
    {
        title: "Time",
        dataIndex: "create_at",
        key: "create_at"
    },
    {
        title: "Board",
        render: (_, record) => (
          <Link
            to={`/history/${record.id}`}
            style={{ color: "#a0d911", fontWeight: "600" }}
          >
            View
          </Link>
        ),
      },
      {
        title: "Chat",
        render: (_,record) => <ViewChat id={record.id}/>,
      },
  ]

  return (
    <>
      <Layout className="layout-home">
        <Header>
          <Menu.Item key="5" style={{ marginLeft: "40px" }}>
            <BacktoHome />
          </Menu.Item>
        </Header>
        <Table
          dataSource={data}
          columns={columns}
          className="listMatches"
        />
        <Footer/>
      </Layout>
    </>
  );
};

export default HistoryTable;
