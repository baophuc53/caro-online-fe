import { Form, Input, Button, Row, Col, Divider  } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import Axios from "axios";
import config from "../../config/config.json";
import "./Login.scss";
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from "react-router-dom";

Axios.defaults.withCredentials = true;
const NormalLoginForm = () => {
  const token = localStorage.getItem("token");
  const onFinish = (values) => {
    const { username, password } = values;
    Axios.post(`${config.dev.path}/user`, { username, password })
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          localStorage.setItem("token", res.data.data.token);
          window.location.href = "/home";
        } else alert("Login fail!");
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
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
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
                message: "Please input your Password!",
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
            <a className="login-form-forgot" href="">
              Forgot password
            </a>
            <Link to="/register" className="login-form-register" href="">
              Register now!
            </Link>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
};
export default NormalLoginForm;
