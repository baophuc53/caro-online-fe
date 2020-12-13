import React, { useState } from "react";
import { Modal, Button, Input } from "antd";
import Draggable from "react-draggable";
import Axios from "axios";
import config from "../../config/config.json";

function NewRoomDialog() {
  const [statusform, setStatusForm] = useState({
    visible: false,
    disabled: true
  });
  const [roomName, setRoomName] = useState("");

  const show_NewRoomDialog = () => {
    setStatusForm({
      // ...statusform,
      visible: true
    });
  };

  const handle_NewRoomDialog_Ok = (e) => {
    console.log(e);
    //xử lý gọi API tạo phòng ở đây
    handle_AddNewRoom();
    setStatusForm({
      // ...statusform,
      visible: false
    });
  };

  const handle_NewRoomDialog_Cancel = (e) => {
    console.log(e);
    //Không làm gì cả
    setStatusForm({
      // ...statusform,
      visible: false
    });
  };

  const handle_AddNewRoom = () => {
    const token = localStorage.getItem("token");
    Axios
      .put(`${config.dev.path}/room/new-room`, { name_room: roomName }, {headers: {
        token: token
      }})
      .then((result) => {
        console.log(result);
        if (result.data.code === 0) {
          alert("Mã tham gia phòng là: " + result.data.data.join_code);
          window.location.href = "/room";
        }

        // const temp = {
        //   boardID: result.data.result.id,
        //   boardName: boardName,
        //   owner: owner,
        //   timeCreate: timeCreate.format("YYYY-MM-DDTHH:mm:ss"),
        //   timeUpdate: null,
        // };
        // setBoard([...boards, temp]);
      })
      .catch((error) => {
        console.log(error); // Xử lý lỗi
      });
  }

  return (
    <>
      <Button onClick={show_NewRoomDialog}>Tạo Phòng</Button>
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
                  disabled: false
                });
              }
            }}
            onMouseOut={() => {
              setStatusForm({
                // ...statusform,  
                visible: true
              });
            }}
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Tạo phòng mới
          </div>
        }
        visible={statusform.visible}
        onOk={handle_NewRoomDialog_Ok}
        onCancel={handle_NewRoomDialog_Cancel}
        modalRender={(modal) => (
          <Draggable disabled={statusform.disabled}>{modal}</Draggable>
        )}
      >
        <p>Tên phòng:</p>
        <Input placeholder="Vui lòng nhập tên phòng" allowClear onChange={(e) => setRoomName(e.target.value)}/>
      </Modal>
    </>
  );
}

export default NewRoomDialog;
