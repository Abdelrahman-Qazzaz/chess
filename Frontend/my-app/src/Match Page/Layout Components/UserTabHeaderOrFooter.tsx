import React, { useContext, useEffect, useState } from "react";
import UserAvatar from "../../UserAvatar";
import SocketContext from "../../store/SocketContext";

function UserTabHeaderOrFooter(props: {
  user: any;
  timeLeft: number | undefined;
  turn: string | null;
}) {
  const [formattedTime, setFormattedTime] = useState("");
  useEffect(() => {
    console.log(props.timeLeft);
    const mins = props.timeLeft ? Math.floor(props.timeLeft / 60) : null;
    const secs = props.timeLeft ? props.timeLeft % 60 : null;

    if (mins && secs)
      setFormattedTime(
        `${mins}:${countDigits(secs) === 1 ? `0${secs}` : secs}`
      );
  }, [props.timeLeft]);

  function countDigits(num: number) {
    return num.toString().length;
  }
  return (
    <div
      style={{
        height: "40px",
        width: "",
        overflow: "hidden",
      }}
      className="d-flex align-items-center my-2"
    >
      <UserAvatar forUserTabHeaderOrFooter src={props.user.avatar} />
      <div className="flex-grow-1 d-flex align-items-center ms-2">
        {props.user.name}
      </div>
      <div
        style={{
          height: "fit-content",
          color: "#EEEEEE",
          backgroundColor: "#1E201E",
          opacity: props.turn === props.user.color ? "1" : "0.4",
          padding: "0.1rem 2rem",
        }}
      >
        {formattedTime}
      </div>
    </div>
  );
}

export default UserTabHeaderOrFooter;
