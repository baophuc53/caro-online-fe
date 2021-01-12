import React, { useEffect, useState } from "react";
import { Button, Menu, Table, Layout, Typography, Tag } from "antd";
import Axios from "axios";
import config from "../../config/config.json";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import "./ranking.scss";

const { Title, Text } = Typography;

function Ranking(props) {
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

  const [toprank, setTopRank] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    Axios.get(`${config.dev.path}/user/get-top-rank`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((result) => {
        if (result.data.code === 0) {
          //   console.log(result.data.data.info);
          setTopRank(result.data.data.toprank);
        } else {
          alert(result.data.data.message);
        }
      })
      .catch((error) => {
        console.log(error); // Xử lý lỗi
        alert(error.message);
      });
  }, []);

  const columns = [
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "Rank",
      dataIndex: "rank",
      key: "rank",
      width: "100px",
      align: "center",
      render: (text, _, index) => {
        let color = '';
        if (index === 0) color = "success";
        else if (index === 1) color = "processing";
        else if (index === 2) color = "warning";
        return (
          <Tag color={color} style={{fontSize: '1rem'}}>
            {text}
          </Tag>
        );
      },
    },
  ];

  return (
    <>
      <Layout className="layout-home">
        <Header>
          <Menu.Item key="5" style={{ marginLeft: "40px" }}>
            <BacktoHome />
          </Menu.Item>
        </Header>
        <Title level={2} type="warning" style={{ textAlign: "center" }}>
          RANKING
        </Title>
        <Table
          dataSource={toprank}
          columns={columns}
          className="listRank"
          pagination={false}
        />
        ;{/*  */}
        {/* <List
          size="large"
          header={
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div>Nickname</div>
              <div>Rank</div>
            </div>
          }
          bordered
          dataSource={toprank}
          renderItem={(item) => (
            
            <List.Item>
              <div className="listRank">
                <div>{item.nickname}</div>
                <div>{item.rank}</div>
              </div>
            </List.Item>
          )}
        /> */}
        <Footer />
      </Layout>
    </>
  );
}

export default Ranking;
