import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import "../App.css";

import UserContext, { UserContextType } from "../store/UserContext";

import UserAvatar from "../UserAvatar";
import { motion } from "framer-motion";
import AvatarOptions from "./AvatarOptions";
import HoverScaleButton from "../Re-useables/HoverScaleButton";
import { FaTimes } from "react-icons/fa";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
import TickIcon from "../Re-useables/Icons/TickIcon";

function UserProfileEditScreen(props: {
  toggleUserProfileEditScreen: () => void;
}) {
  const { queue, userProfile, setUserProfile } =
    useContext<UserContextType>(UserContext);
  const [inputValue, setInputValue] = useState(userProfile.name);
  const backgroundRef = useRef(null);
  const [showAvatarSelectionSection, setShowAvatarSelectionSection] =
    useState(false);
  function toggleAvatarSelectionSection() {
    setShowAvatarSelectionSection(!showAvatarSelectionSection);
  }
  const [changesConfirmed, setChangesConfirmed] = useState(true);

  const handleClick = (event: any) => {
    if (
      backgroundRef.current &&
      (backgroundRef.current as HTMLElement).contains(event.target)
    ) {
      props.toggleUserProfileEditScreen();
    }
  };

  useEffect(() => {
    // Add event listener

    window.addEventListener("click", handleClick);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, []);

  function confirmChanges() {
    setUserProfile((prev: any) => ({ ...prev, name: inputValue }));
    setChangesConfirmed(true);
  }

  return (
    <div>
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          height: "100vh",
          width: "100vw",
          zIndex: 2,
        }}
        className="d-flex justify-content-center align-items-center"
        initial={{ y: "100px" }}
        animate={{ y: "0" }}
      >
        {/* blackbackground */}
        <div
          ref={backgroundRef}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "black",
            zIndex: 2,
            opacity: "0.5",
          }}
        ></div>
        {/* end of blackbackground */}
        <div
          style={{
            maxWidth: "350px",
            width: "100%",
            aspectRatio: "1.3/1",
            backgroundColor: "#151515",
            borderRadius: "1.2rem",
            position: "relative",
            zIndex: 3,
          }}
          className="d-flex align-items-center justify-content-center flex-column border"
        >
          <div
            style={{
              position: "absolute",
              top: "0",
              width: "100%",
            }}
            className="d-flex justify-content-end"
          >
            <HoverScaleButton
              style={{
                backgroundColor: "transparent",
                border: "none",
                color: "#EEEEEE",
              }}
              onClick={props.toggleUserProfileEditScreen}
            >
              <FaTimes className="mt-2 m-1" size={"1.2rem"} />
            </HoverScaleButton>
          </div>
          {showAvatarSelectionSection && (
            <div
              className="mb-1"
              style={{
                width: "90%",
                backgroundColor: "white",
                borderRadius: "1.2rem",
                zIndex: 2,
              }}
            >
              <AvatarOptions
                setShowAvatarSelectionSection={setShowAvatarSelectionSection}
              />
            </div>
          )}

          <HoverScaleButton
            onClick={toggleAvatarSelectionSection}
            style={{
              width: "100px",
              aspectRatio: "1/1",
              borderRadius: "50%",
              overflow: "hidden",
              border: "none",
              backgroundColor: "transparent",
            }}
            className="p-0"
          >
            {" "}
            <UserAvatar width="" src={userProfile.avatar} />
          </HoverScaleButton>
          <div className="my-4">
            <InputGroup
              style={{ backgroundColor: "#2c2b29", borderRadius: "0.4rem" }}
              className="border"
            >
              <FormControl
                value={inputValue}
                onChange={(e) => {
                  setChangesConfirmed(false);
                  setInputValue(e.target.value);
                }}
                style={{
                  backgroundColor: "transparent",
                  color: "#EEEEEE",
                  border: "none",

                  boxShadow: "none",
                }}
              />
              <InputGroupText style={{ backgroundColor: "transparent" }}>
                <HoverScaleButton
                  onClick={confirmChanges}
                  className="p-0"
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  <TickIcon fill={changesConfirmed} />
                </HoverScaleButton>
              </InputGroupText>
            </InputGroup>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UserProfileEditScreen;
