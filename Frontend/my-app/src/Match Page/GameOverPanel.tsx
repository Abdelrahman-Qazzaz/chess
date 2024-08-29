import React, { useContext, useEffect, useState } from "react";
import "../App.css";
import GameOverPanelBackground from "./GameOverPanelBackground";
import UserAvatar from "../UserAvatar";
import { FaArrowRight } from "react-icons/fa";
import { Button } from "react-bootstrap";
import UserContext from "../store/UserContext";
import { motion } from "framer-motion";
function GameOverPanel(props: any) {
  const { queue, requestRematch, setUserStatus } = useContext(UserContext);
  const [showOptions, setSowOptions] = useState(false);

  return (
    <>
      {showOptions ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="bg-white d-flex justify-content-center"
          style={{ zIndex: 1, height: "100%" }}
        >
          <div
            style={{ height: "100%", width: "90%" }}
            className=" d-flex flex-column justify-content-center align-items-center"
          >
            {props.opponent.socketID !== -1 ? (
              <Button
                onClick={() =>
                  requestRematch({
                    opponentData: {
                      name: props.opponent.name,
                      avatar: props.opponent.avatar,
                      socketID: props.opponent.socketID,
                    },
                    yourData: {
                      name: props.you.name,
                      avatar: props.you.avatar,
                      socketID: props.you.socketID,
                    },
                  })
                }
                className="bg-green my-2"
                style={{
                  border: "none",
                  width: "100%",
                  height: "fit-content",
                }}
              >
                Request Rematch
              </Button>
            ) : (
              <Button
                onClick={props.playAgainstBot}
                className="bg-green my-2"
                style={{
                  border: "none",
                  width: "100%",
                  height: "fit-content",
                }}
              >
                Rematch
              </Button>
            )}

            <Button
              onClick={queue}
              className="bg-green my-2"
              style={{
                border: "none",
                width: "100%",
                height: "fit-content",
              }}
            >
              Queue
            </Button>
            <Button
              onClick={() => {
                setUserStatus("Home Page");
              }}
              className="bg-green my-2"
              style={{
                border: "none",
                width: "100%",
                height: "fit-content",
              }}
            >
              Go back to Home Page
            </Button>
          </div>
        </motion.div>
      ) : (
        <>
          <GameOverPanelBackground />
          <div
            style={{
              zIndex: 1,
              width: "100%",
              height: "100%",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "absolute",

                width: "100%",
              }}
              className="d-flex justify-content-end"
            >
              <Button
                onClick={() => {
                  setSowOptions(true);
                }}
                className="mt-1 me-2 p-0"
                style={{ backgroundColor: "transparent", border: "none" }}
              >
                <FaArrowRight size={"1.2rem"} />
              </Button>
            </div>
            <div className="mt-3">
              <h4 className="text-center mt-2" style={{ color: "#ffffff" }}>
                {props.winner.color === "b" ? "Black" : "White"} Won
              </h4>
            </div>
            <div className="text-center secondary-text ">
              {props.winner.method}
            </div>
            <div
              className="d-flex justify-content-around mt-3"
              style={{ backgroundColor: "" }}
            >
              <UserAvatar width="80px" user={props.you} winner={props.winner} />
              <div
                style={{ color: "black" }}
                className="d-flex align-items-center"
              >
                <div className="mb-4 secondary-text">vs</div>
              </div>
              <UserAvatar
                width="80px"
                user={props.opponent}
                winner={props.winner}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default GameOverPanel;
