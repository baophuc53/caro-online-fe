import React from "react";
import { Row, Col } from "antd";
import NormalLoginForm from "../../components/Login/Login";
import "./style.scss";
LoginScreen.propTypes = {};

function LoginScreen(props) {
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
        <Col span={9} className="form-login">
          <NormalLoginForm />
        </Col>
      </Row>

      {/* <RegistrationForm/> */}
    </div>
  );
}

export default LoginScreen;
