import React from "react";
import { Layout, Menu } from "antd";
import "../Home/Home.scss";

const { Footer } = Layout;

function footer() {
  return (
    <Footer style={{ textAlign: "center" }}>
      Ant Design ©2018 Created by Ant UED
    </Footer>
  );
}

export default footer;
