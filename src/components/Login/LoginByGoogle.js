import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import Axios from "axios";
import config from "../../config/config.json";

const clientId = config.google_client_id;

function LoginByGoogle() {
  const loginbyGoogle = (entity) => {
    Axios.post(`${config.dev.path}/user/login-with-google`, entity)
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          localStorage.setItem("token", res.data.data.token);
          window.location.href = "/home";
        } else if (res.data.code === 1) {
          localStorage.setItem("profile", JSON.stringify(res.data.data.profile));
          window.location.href = "/register-other";
        } else alert(res.data.message);
      })
      .catch((err) => {
        console.log(err);
        alert(err.message);
      });
  };

  const onSuccess = (res) => {
    console.log(res.profileObj);
    const profile = res.profileObj;
    const entity = {
      googleId: profile.googleId,
      username: profile.email,
    };
    loginbyGoogle(entity);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={clientId}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={"single_host_origin"}
        style={{ marginTop: "10px" }}
      />
    </div>
  );
}

export default LoginByGoogle;
