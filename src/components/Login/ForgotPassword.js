import { Form, Input, Button, Row, Col, Divider, Tooltip } from "antd";
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
import { QuestionCircleOutlined } from "@ant-design/icons";

const ForgotPassword = () => {
  const resendEmail = () => {
    const email_token = localStorage.getItem("email_token");
    console.log(email_token);
    if (email_token !== null || typeof email_token !== undefined) {
      Axios.post(`${config.dev.path}/user/send-email`, {
        email_token: email_token,
      }).then((res) => {
        if (res.data.code === 0) {
          localStorage.setItem("otp_token", res.data.data.otp_token);
        } else {
          alert("Không thể gửi mã xác thực tới email của bạn !");
        }
      });
    } else {
      alert("Không tìm thấy email của bạn");
    }
  };
  const token = localStorage.getItem("token");
  const onFinish = async (values) => {
    const { activate_code, password } = values;
    const otp_token = localStorage.getItem("otp_token");
    await Axios.post(`${config.dev.path}/user/forgot-password/change-password`, {
      otp_token,
      activate_code,
      password,
    })
      .then(async (res) => {
        if (res.data.code === 0) {
          localStorage.clear();
          window.location.href = "/login";
        } else alert(res.data.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  return (
    <>
      {!token ? (
        <div>
          <h2 className="forgot-password" style={{ textAlign: "center" }}>
            Quên mật khẩu
          </h2>
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
              name="activate_code"
              label={
                <span>
                  Code
                  <Tooltip title="Vui lòng nhập mã code được gửi đến email của bạn để kích hoạt email!">
                    <QuestionCircleOutlined />
                  </Tooltip>
                </span>
              }
              rules={[
                {
                  required: true,
                  message: "Vui lòng nhập mã kích hoạt!",
                  whitespace: true,
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
                    return Promise.reject("Mật khẩu nhập lại không khớp!");
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <div style={{ textAlign: "center" }}>
                <Button
                  type="primary"
                  style={{ margin: "10px" }}
                  onClick={() => resendEmail()}
                >
                  Gửi lại
                </Button>
                <Button type="primary" htmlType="submit">
                  Đồng ý{/* <Link to ='/'></Link> */}
                </Button>
              </div>
            </Form.Item>
          </Form>
        </div>
      ) : (
        <Redirect to="/home" />
      )}
    </>
  );
};
export default ForgotPassword;
