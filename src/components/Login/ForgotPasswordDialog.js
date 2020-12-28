import React, { useState } from "react";
import { Modal, Button, Input, Checkbox } from "antd";
import Draggable from "react-draggable";
import Axios from "axios";
import config from "../../config/config.json";
import { responsiveArray } from "antd/lib/_util/responsiveObserve";

function ForgotPasswordDialog() {
  const [statusform, setStatusForm] = useState({
    visible: false,
    disabled: true,
  });

  const [username, setUsername] = useState("");

  const show_ForgotPasswordDialog = () => {
    setStatusForm({
      // ...statusform,
      visible: true,
    });
  };

  const handle_ForgotPasswordDialog_Ok = (e) => {
    console.log(e);
    //xử lý gọi API tạo phòng ở đây
    handle_ForgotPassword();
    setStatusForm({
      // ...statusform,
      visible: false,
    });
  };

  const handle_ForgotPasswordDialog_Cancel = (e) => {
    console.log(e);
    //Không làm gì cả
    setStatusForm({
      // ...statusform,
      visible: false,
    });
  };

  const handle_ForgotPassword = () => {
    Axios.get(`${config.dev.path}/user/forgot-password/find-user`, {
      params: { username: username },
    })
      .then((result) => {
        console.log(result);
        if (result.data.code === 0) {
          localStorage.setItem("otp_token", result.data.data.otp_token);
          localStorage.setItem("email_token", result.data.data.email_token);
          window.location.href = `/forgot-password`;
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
    <>
      <a
        className="login-form-forgot"
        onClick={() => show_ForgotPasswordDialog()}
      >
        Quên mật khẩu?
      </a>
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (statusform.disabled) {
                setStatusForm({
                  // ...statusform,
                  disabled: false,
                });
              }
            }}
            onMouseOut={() => {
              setStatusForm({
                // ...statusform,
                visible: true,
              });
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Tìm tài khoản
          </div>
        }
        visible={statusform.visible}
        onOk={handle_ForgotPasswordDialog_Ok}
        onCancel={handle_ForgotPasswordDialog_Cancel}
        modalRender={(modal) => (
          <Draggable disabled={statusform.disabled}>{modal}</Draggable>
        )}
      >
        <p>Username:</p>
        <Input
          placeholder="Vui lòng nhập username của bạn"
          allowClear
          onChange={(e) => setUsername(e.target.value)}
        />
      </Modal>
    </>
  );
}

export default ForgotPasswordDialog;
