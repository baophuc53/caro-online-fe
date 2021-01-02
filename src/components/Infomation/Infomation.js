import React, { useEffect, useState } from "react";
import { Modal, Button, Descriptions } from "antd";
import Draggable from "react-draggable";
import Axios from "axios";
import config from "../../config/config.json";
import Text from "antd/lib/typography/Text";

function InfomationDialog() {
  const [statusform, setStatusForm] = useState({
    visible: false,
    disabled: true,
  });
  const [info, setInfo] = useState({});

  const show_InfomationDialog = () => {
    setStatusForm({
      // ...statusform,
      visible: true,
    });
  };

  const handle_InfomationDialog_Ok = (e) => {
    console.log(e);
    setStatusForm({
      // ...statusform,
      visible: false,
    });
  };

  const getUserInfo = () => {
    const token = localStorage.getItem("token");
    Axios.get(`${config.dev.path}/user/user-info`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })
      .then((result) => {
        console.log(result);
        if (result.data.code === 0) {
          console.log(result.data.data.info);
          setInfo(result.data.data.info);
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
      <Button
        type="text"
        onClick={() => {
          show_InfomationDialog();
          getUserInfo();
        }}
      >
        About you
      </Button>
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
            About you
          </div>
        }
        visible={statusform.visible}
        cancelButtonProps={{ hidden: true }}
        onOk={handle_InfomationDialog_Ok}
        modalRender={(modal) => (
          <Draggable disabled={statusform.disabled}>{modal}</Draggable>
        )}
      >
        <Descriptions bordered>
          <Descriptions.Item label="Username" span={3}>
            {info.username}
          </Descriptions.Item>
          <Descriptions.Item label="Nickname" span={3}>
            {info.nickname}
          </Descriptions.Item>
          <Descriptions.Item label="Email" span={3}>
            {info.email}
          </Descriptions.Item>
          <Descriptions.Item label="Day join" span={3}>
            {info.day_join}
          </Descriptions.Item>
          <Descriptions.Item label="Achievements" />
          <Descriptions.Item label="Won">{info.won}</Descriptions.Item>
          <Descriptions.Item label="Played">{info.played}</Descriptions.Item>
          <Descriptions.Item label="Rank">Rank</Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
}

export default InfomationDialog;
