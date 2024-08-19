import React, { useContext } from "react";
import HorseIcon from "./Re-useables/Icons/HorseIcon";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa";
import HoverScaleButton from "./Re-useables/HoverScaleButton";
import UserContext from "./store/UserContext";

function QueueScreen() {
  const { setUserStatus } = useContext(UserContext);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
      className="d-flex flex-column justify-content-center align-items-center"
    >
      <div
        style={{
          position: "absolute",
          top: 0,

          height: "3rem",
          width: "100%",
          display: "flex",

          alignItems: "center",
        }}
      >
        <div>
          <HoverScaleButton
            onClick={() => setUserStatus("Home Page")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
            }}
          >
            <FaArrowLeft size={"1.3rem"} className="ms-3" />
          </HoverScaleButton>
        </div>
      </div>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          type: "tween", // Or 'spring' for a bouncy effect
          duration: 3, // Adjust duration as needed
          repeat: Infinity, // Continuous rotation
        }}
      >
        <HorseIcon />
      </motion.div>
      <h3>Searching for players...</h3>
    </div>
  );
}

export default QueueScreen;
