import React, { useContext, useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Board from "../Match Page/Board";
import PlayWhiteSVG from "../play-white.svg";
import "../App.css";

import UserContext, { UserContextType } from "../store/UserContext";

import UserAvatar from "../UserAvatar";

import UserProfileEditScreen from "./UserProfileEditScreen";
import HoverScaleButton from "../Re-useables/HoverScaleButton";
import CustomizeBoardPanel from "./Customize Board/CustomizeBoardPanel";
import { AnimatePresence } from "framer-motion";
function HomePage() {
  const { queue, userProfile } = useContext<UserContextType>(UserContext);

  const boardColRef = useRef<HTMLDivElement>();
  const board2ndColRef = useRef<HTMLDivElement>();
  const [boardSizeProp, setBoardSizeProp] = useState<number>(
    boardColRef?.current?.clientWidth ||
      board2ndColRef?.current?.clientWidth ||
      0
  );

  const [showUserProfileEditScreen, setShowUserProfileEditScreen] =
    useState(false);

  const [showCustomizeBoardPanel, setShowCustomizeBoardPanel] = useState(false);

  function toggleUserProfileEditScreen() {
    setShowUserProfileEditScreen(!showUserProfileEditScreen);
  }
  useEffect(() => {
    setBoardSizeProp(
      boardColRef?.current?.clientWidth ||
        board2ndColRef?.current?.clientWidth ||
        0
    );
  }, []);
  useEffect(() => {
    window.addEventListener("resize", () => {
      if (boardColRef.current?.clientWidth) {
        setBoardSizeProp(boardColRef?.current?.clientWidth);
      } else if (board2ndColRef.current) {
        setBoardSizeProp(board2ndColRef?.current?.clientWidth || 0);
      }
    });

    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  function toggleCustomizeBoardPanel() {
    setShowCustomizeBoardPanel(!showCustomizeBoardPanel);
  }

  return (
    <>
      <AnimatePresence>
        {showCustomizeBoardPanel && (
          <CustomizeBoardPanel
            toggleCustomizeBoardPanel={toggleCustomizeBoardPanel}
          />
        )}
      </AnimatePresence>
      {showUserProfileEditScreen && (
        <UserProfileEditScreen
          toggleUserProfileEditScreen={toggleUserProfileEditScreen}
        />
      )}
      <Container
        style={{
          maxWidth: "100%",
          height: "100%",
          position: "relative",
        }}
        className="d-flex flex-column align-items-center p-0"
      >
        <div
          style={{
            zIndex: 0,
            width: "100%",
            position: "absolute",
          }}
          className="d-flex justify-content-end"
        >
          <HoverScaleButton
            onClick={toggleUserProfileEditScreen}
            className="mt-3 me-4 p-0"
            style={{
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "transparent",
            }}
          >
            <UserAvatar src={userProfile.avatar} width="4.5rem" />
          </HoverScaleButton>
        </div>
        <Row
          style={{
            marginTop: "4.5rem",
            top: 0,
            zIndex: 1,
            width: "80%",
          }}
          className="mb-md-5 flex-grow-1 d-flex align-items-center"
        >
          <Col
            className="d-none d-md-block p-0"
            ref={boardColRef}
            md={6}
            style={{ position: "relative" }}
          >
            {boardColRef.current?.clientWidth && <Board size={boardSizeProp} />}
            <div
              onClick={toggleCustomizeBoardPanel}
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "transparent",
                position: "absolute",
                top: 0,
                cursor: "pointer",
              }}
            ></div>
          </Col>
          <Col
            className=" p-0  d-flex flex-column align-items-center justify-content-center"
            xs={12}
            md={6}
            style={{ border: "" }}
          >
            <div
              style={{ width: "95%" }}
              className="d-flex flex-column align-items-center justify-content-center"
            >
              <div
                className="d-flex flex-column align-items-center"
                style={{ border: "", width: "100%" }}
              >
                <h1
                  style={{
                    fontSize: "2.7rem",
                    width: "100%",
                    border: "",
                    textAlign: "center",
                    margin: "1rem",
                  }}
                >
                  Play Chess Online!
                </h1>
                <div className="d-flex mb-3 text-center">
                  <h5 className="mx-2" style={{ fontSize: "1.1rem" }}>
                    1000{" "}
                    <span className="secondary-text bold">
                      Games played today
                    </span>
                  </h5>
                  <h5 className="mx-2" style={{ fontSize: "1.1rem" }}>
                    1000{" "}
                    <span className="secondary-text bold">Playing Now</span>
                  </h5>
                </div>
              </div>
              <HoverScaleButton
                onClick={queue}
                className="px-5 py-2 bg-green d-flex align-items-center text-light"
                style={{
                  fontSize: "1.1rem",
                  border: "none",
                  height: "fit-content",
                  borderRadius: "0.5rem",
                }}
              >
                <img
                  src={PlayWhiteSVG}
                  alt="Description of image"
                  width="50"
                  height="50"
                  className="me-2"
                />
                Play Online
              </HoverScaleButton>
            </div>
          </Col>
          <Col
            className="d-flex d-md-none justify-content-center mt-4  p-0"
            xs={12}
            style={{ position: "relative" }}
            ref={board2ndColRef}
          >
            {board2ndColRef.current?.clientWidth && (
              <Board size={boardSizeProp * 0.9} />
            )}

            <div
              onClick={queue}
              style={{
                height: "100%",
                width: "100%",
                backgroundColor: "transparent",
                position: "absolute",
                top: 0,
                cursor: "pointer",
              }}
            ></div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;
