import React, { useContext } from "react";
import { motion } from "framer-motion";
import "../App.css";
import HoverScaleButton from "../Re-useables/HoverScaleButton";
import UserContext from "../store/UserContext";
function AvatarOptions(props: { setShowAvatarSelectionSection: Function }) {
  const { setUserProfile } = useContext(UserContext);
  function handleClick(choice: string) {
    setUserProfile((prev: any) => ({ ...prev, avatar: `Avatar-${choice}` }));
    props.setShowAvatarSelectionSection(false);
  }
  return (
    <div
      style={{ width: "100%", height: "100%" }}
      className="d-flex justify-content-around"
    >
      <HoverScaleButton
        className="p-0"
        onClick={() => handleClick("1.jpeg")}
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          width: "50px",
          border: "none",
          backgroundColor: "transparent",
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src="Avatar-1.jpeg"
          alt=""
        />
      </HoverScaleButton>
      <HoverScaleButton
        className="p-0"
        onClick={() => handleClick("2.png")}
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          width: "50px",
          border: "none",
          backgroundColor: "transparent",
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src="Avatar-2.png"
          alt=""
        />
      </HoverScaleButton>
      <HoverScaleButton
        className="p-0"
        onClick={() => handleClick("3.png")}
        style={{
          borderRadius: "50%",
          overflow: "hidden",
          width: "50px",
          border: "none",
          backgroundColor: "transparent",
        }}
      >
        <img
          style={{ width: "100%", height: "100%" }}
          src="Avatar-3.png"
          alt=""
        />
      </HoverScaleButton>
    </div>
  );
}

export default AvatarOptions;
