import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import Draggable from "react-draggable";
import Axios from "axios";
import config from "../../config/config.json";

function JoinRoomDialog() {
  const [statusform, setStatusForm] = useState({
    visible: false,
    disabled: true,
  });
  const [join_code, setJoinCode] = useState("");

  const show_JoinRoomDialog = () => {
    setStatusForm({
      // ...statusform,
      visible: true,
    });
  };

  const handle_JoinRoomDialog_OK = (e) => {
    console.log(e);
    //xử lý gọi API tạo phòng ở đây
    handle_JoinToRoom();
    setStatusForm({
      // ...statusform,
      visible: false,
    });
  };

  const handle_JoinRoomDialog_Cancel = (e) => {
    console.log(e);
    //Không làm gì cả
    setStatusForm({
      // ...statusform,
      visible: false,
    });
  };

  const handle_JoinToRoom = () => {
    const token = localStorage.getItem("token");
    Axios.get(`${config.dev.path}/room/room-by-join-code`, { params: { join_code: join_code } })
      .then((result) => {
        console.log(result);
        if (result.data.code === 0) {
          localStorage.setItem("room", result.data.data.room_id);
          Axios.post(
            `${config.dev.path}/room/join-room`,
            { room_id: result.data.data.room_id },
            {
              headers: {
                Authorization: `token ${token}`,
              },
            }
          )
            .then((_result) => {
              if (_result.data.code === 0) {
                window.location.href = "/room";
              } else alert("Room is full!");
            })
            .catch((_error) => {
              alert(_error.message);
            });
        }
      })
      .catch((error) => {
        console.log(error); // Xử lý lỗi
        alert(error.message);
      });
  };

  return (
    <>
      <Button onClick={show_JoinRoomDialog} type="primary">Vào Phòng</Button>
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
            Vào phòng
          </div>
        }
        visible={statusform.visible}
        onOk={handle_JoinRoomDialog_OK}
        onCancel={handle_JoinRoomDialog_Cancel}
        modalRender={(modal) => (
          <Draggable disabled={statusform.disabled}>{modal}</Draggable>
        )}
      >
        <p>Mã vào phòng:</p>
        <Input
          placeholder="Vui lòng mã vào phòng"
          allowClear
          onChange={(e) => setJoinCode(e.target.value)}
        />
      </Modal>
    </>
  );
}

export default JoinRoomDialog;
