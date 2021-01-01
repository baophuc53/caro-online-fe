import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import FaceBookLogin from "react-facebook-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import Axios from "axios";
import config from "../../config/config.json";
import { AiFillGoogleCircle, AiFillFacebook } from "react-icons/ai";
import "./Login.scss";
import { Divider } from "antd";
const clientId = config.google_client_id;
const app_Id = config.facebook_app_id;

function LoginOther() {
  const loginOther = (entity) => {
    Axios.post(`${config.dev.path}/user/login-other`, entity)
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          localStorage.setItem("token", res.data.data.token);
          window.location.href = "/home";
        } else if (res.data.code === 1) {
          localStorage.setItem(
            "profile",
            JSON.stringify(res.data.data.profile)
          );
          window.location.href = "/register-other";
        } else alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const onSuccess = (res) => {
    console.log(res);
    loginOther({ platform: "google", token: res.tokenId });
  };

  const responseFacebook = (res) => {
    console.log(res);
    loginOther({ platform: "facebook", token: res.accessToken });
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <>
      {/* <div>OR</div> */}
      <Divider>Hoặc</Divider>
      <div className="loginOther">
        <GoogleLogin
          clientId={clientId}
          fields="name,email,picture"
          buttonText={false}
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={"single_host_origin"}
          style={{ marginTop: "10px" }}
          render={(renderProps) => (
            <button
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              className="btnFBGG"
            >
              <AiFillGoogleCircle className="gg" />
            </button>
          )}
        />

        <FacebookLogin
          appId={app_Id}
          autoLoad={false}
          fields="name,email,picture"
          callback={responseFacebook}
          icon="fa-facebook"
          // buttonStyle={{ marginTop: "10px" }}
          size="small"
          render={(renderProps) => (
            <button onClick={renderProps.onClick} className="btnFBGG">
              <AiFillFacebook className="fb" />
            </button>
          )}
        />
      </div>
    </>
  );
}

export default LoginOther;
