import { Button, Modal, Spin } from "antd";
import { useEffect, useState } from "react";
import { Socket } from "../Socket/Socket";

const QuickPlay = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const handleClick = () => {
        setIsModalVisible(true);
        Socket.emit("quick-play", "");
      };

    const handleCancel = () => {
      setIsModalVisible(false);
      Socket.emit("cancel-quick-play");
    }

      useEffect(() => {
        Socket.on("matched", (room) => {
            console.log(room);
          setIsModalVisible(false);
          localStorage.setItem("room", room);
          window.location.href = "/room";
        })
      }, []);

    return (
    <><Button onClick={handleClick}>Chơi nhanh</Button>
     <Modal title="Basic Modal"  footer={null} visible={isModalVisible} onCancel={handleCancel}>
        <Spin/>
      </Modal>
    </>
  )
}


export default QuickPlay;