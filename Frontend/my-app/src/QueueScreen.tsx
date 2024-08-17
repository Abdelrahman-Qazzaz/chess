import React from "react";
import HorseIcon from "./Re-useables/Icons/HorseIcon";
import { motion } from "framer-motion";

function QueueScreen() {
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
