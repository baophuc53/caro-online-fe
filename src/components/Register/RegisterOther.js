import React, { useState } from "react";
import "./Register.scss";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import config from "../../config/config.json";
import {
  Form,
  Input,
  Tooltip,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import Axios from "axios";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 10 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 10,
      offset: 15,
    },
  },
};

const RegistrationForm = () => {
  const [form] = Form.useForm();

  const profile = JSON.parse(localStorage.getItem("profile"));
  console.log(profile);

  const onFinish = (values) => {
    const nickname  = values;
    Axios.post(`${config.dev.path}/user/login-with-google/recieve-nickname`, {
        nickname: nickname,
        profile: profile,
      })
        .then((result) => {
          console.log(result);
          if (result.data.code === 0) {
            localStorage.clear();
            localStorage.setItem("token", result.data.data.token);
            window.location.href = "/home";
          } else {
            alert(result.data.data.message);
          }
        })
        .catch((error) => {
          console.log(error); // Xử lý lỗi
          alert(error.message);
        });
  };

  return (
    <div className="bg-login">
      <Row className="login-screen">
        <Col span={9}>
          <div className="welcome">Welcome To</div>
          <div className="name-game">
            <div className="c">C</div>
            <div className="a">A</div>
            <div className="r">R</div>
            <div className="o">O</div>
            <div className="online">Online</div>
          </div>
          <div className="board">
            <div>
              <div className="xo">
                <div className="x">X</div>
                <div className="o">O</div>
              </div>
              <div className="xo">
                <div className="o">O</div>
                <div className="x">X</div>
              </div>
            </div>
            <div className="loser">LOSER</div>
            <div className="winner">WINNER</div>
          </div>
        </Col>
        <Col span={9} className="form-register">
          <div >
            <h2 className="register">NICKNAME</h2>
            <Form
              {...formItemLayout}
              form={form}
              className="register-form"
              name="register"
              onFinish={onFinish}
              scrollToFirstError
              // className="register-form"
            >

              <Form.Item
                name="nickname"
                label={
                  <span>
                    Nickname
                    <Tooltip title="What do you want others to call you?">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Submit
                  {/* <Link to ='/'></Link> */}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </Col>
      </Row>

      {/* <RegistrationForm/> */}
    </div>
  );
};

export default RegistrationForm;
