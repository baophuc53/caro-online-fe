import React, { useState, useEffect } from "react";
import { Button, Row, Col, Table } from "antd";
import Axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

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
  const data = [
    {
      id: 1,
      nickname:'oke',
    }
  ]

  return (
    <div>

      <Header/>

      {BacktoHome()}
      <Row gutter={16}>
      <Col className="gutter-row" span={18}>
        <div>Bàn cờ</div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div> <Table
              columns={columns}
              dataSource={data}
              pagination={false}
              bordered
            /></div>
      </Col>
     
    </Row>
      
      <Footer/>
    </div>
  );
}

export default Room;
