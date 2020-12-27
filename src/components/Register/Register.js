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

  const onFinish = (values) => {
    const { username, password, nickname, email } = values;
    console.log(email);
    Axios.put(`${config.dev.path}/user`, { username, password, nickname, email })
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          window.location.href = `/activate-email`;
        } else alert(res.data.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
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
          <div>
            <h2 className="register">Đăng ký</h2>
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
                name="username"
                label="Username"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Username!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập Password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập lại password để xác nhận!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        "Mật khẩu nhập lại không khớp!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="nickname"
                label={
                  <span>
                    Nickname
                    <Tooltip title="Đây là tên hiển thị của bạn mà mọi người sẽ nhìn thấy trên trò chơi">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập email!",
                  },
                  {
                    type: 'email',
                    message: 'Email không hợp lệ!'
                  }
                ]}
              >
                <Input
                  type="email"
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
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
