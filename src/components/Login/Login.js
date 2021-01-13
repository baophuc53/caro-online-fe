import { Form, Input, Button, Row, Col, Divider, Modal } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Axios from "axios";
import config from "../../config/config.json";
import "./Login.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import OtherLogin from "./LoginOther";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
import ForgotPassword from "./ForgotPassword";

const NormalLoginForm = () => {

  const onClickForgotPassword = () => {

  }

  const token = localStorage.getItem("token");
  const onFinish = async (values) => {
    const { username, password } = values;
    await Axios.post(`${config.dev.path}/user`, { username, password })
      .then(async (res) => {
        console.log(res);
        if (res.data.code === 0) {
          localStorage.setItem("token", res.data.data.token);
          localStorage.setItem("nickname", res.data.data.nickname);
          window.location.href = "/home";
        } else if (res.data.code === 3) {
          //gửi mail xác thực
          const email_token = res.data.data.email_token;
          await Axios.post(`${config.dev.path}/user/send-email`, {
            email_token: email_token,
          }).then((res) => {
            if (res.data.code === 0) {
              localStorage.setItem("otp_token", res.data.data.otp_token);
              localStorage.setItem("email_token", email_token);
              window.location.href = `/activate-email`;
            } else {
              alert("Không thể gửi mã xác thực tới email của bạn !");
            }
          });
        } else alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <>
      {!token ? (
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          layout="vertical"
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <ForgotPasswordDialog/>
            <Link to="/register" className="login-form-register" href="">
              Đăng ký tài khoản!
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Đăng nhập
            </Button>
          </Form.Item>

          <OtherLogin />
        </Form>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
};
export default NormalLoginForm;
