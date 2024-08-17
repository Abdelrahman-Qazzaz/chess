import React, { useContext } from "react";
import UserContext from "./store/UserContext";
import UserAvatar from "./UserAvatar";
import { FaCheck, FaTimes } from "react-icons/fa";
import "./App.css";
import { Button } from "react-bootstrap";
import SocketContext from "./store/SocketContext";
function Notification() {
  const { socket } = useContext(SocketContext);
  const { notification, setNotification, acceptRematch, userProfile } =
    useContext(UserContext);
  console.log(notification);
  return (
    <div
      className="d-flex justify-content-end"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 0,
        height: "100px",
        width: "100%",
      }}
    >
      <div
        className="m-3 d-flex bg-green align-items-center"
        style={{ width: "300px", borderRadius: "0.6rem", overflow: "hidden" }}
      >
        <UserAvatar src={notification.requestOwnerData.avatar} />
        <div style={{ fontSize: "1.3rem" }} className="d-flex ms-2">
          <div className="d-flex">{notification.requestOwnerData?.name}</div>
        </div>
        <div className="flex-grow-1 d-flex justify-content-end">
          <div className="me-3">
            {" "}
            <Button
              onClick={() =>
                acceptRematch(notification.requestOwnerData, {
                  ...userProfile,
                  socketID: socket.id,
                })
              }
              className=""
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              {" "}
              <FaCheck size="1.2rem" />
            </Button>
            <Button
              onClick={() => {
                setNotification({ message: "", requestOwnerData: {} });
              }}
              className=""
              style={{ backgroundColor: "transparent", border: "none" }}
            >
              {" "}
              <FaTimes size="1.2rem" color="red" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Notification;
