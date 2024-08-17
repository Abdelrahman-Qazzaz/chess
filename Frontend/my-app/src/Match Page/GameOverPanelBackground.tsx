import React from "react";

import "../App.css";
function GameOverPanelBackground() {
  return (
    <div
      className="bg-white"
      style={{
        position: "absolute",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          backgroundColor: "#504c4a",
          height: "40%",
          borderRadius: "0 0 50% 50%",
        }}
      ></div>
    </div>
  );
}

export default GameOverPanelBackground;
