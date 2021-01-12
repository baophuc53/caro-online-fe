import React, { useEffect, useState } from "react";
import { Button, Descriptions, List, Layout, Typography } from "antd";
import Axios from "axios";
import config from "../../config/config.json";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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

  return (
    <>
      <Layout className="layout-home">
        <Header/>
        <BacktoHome />
        <Title level={2} type="warning" style={{ textAlign: "center" }}>
          RANKING
        </Title>
        <List
          itemLayout="horizontal"
          dataSource={toprank}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta
                title={<Text type="success">{item.nickname}</Text>}
                description={<Text>{item.rank}</Text>}
              />
            </List.Item>
          )}
        />
        <Footer />
      </Layout>
    </>
  );
}

export default Ranking;
