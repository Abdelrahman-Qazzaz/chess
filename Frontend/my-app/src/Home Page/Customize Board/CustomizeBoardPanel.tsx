import React, { useContext } from "react";

import { FaArrowLeft, FaArrowRight, FaTimes } from "react-icons/fa";
import HoverScaleButton from "../../Re-useables/HoverScaleButton";
import BoardPreferencesContext from "../../store/BoardPreferencesContext";
import Board from "../../Match Page/Board";
import SlideUpDiv from "../../Re-useables/SlideUpDiv";
import WindowSizeContext from "../../store/WindowSizeContext";

function CustomizeBoardPanel(props: { toggleCustomizeBoardPanel: any }) {
  const { setSelectedThemeIndex, numOfThemes } = useContext(
    BoardPreferencesContext
  );
  const { size } = useContext(WindowSizeContext);
  function prev() {
    setSelectedThemeIndex(
      (prevIndex: number) => (prevIndex - 1 + numOfThemes) % numOfThemes
    );
  }
  function next() {
    setSelectedThemeIndex(
      (prevIndex: number) => (prevIndex - 1 + numOfThemes) % numOfThemes
    );
  }
  return (
    <>
      <div
        style={{
          position: "fixed",
          height: "100vh",
          width: "100vw",
          backgroundColor: "black",
          opacity: "0.85",
          zIndex: 2,
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          height: "100vh",
          width: "100vw",
          zIndex: 3,
        }}
        className="d-flex flex-column justify-content-center align-items-center"
      >
        <button
          onClick={props.toggleCustomizeBoardPanel}
          style={{
            position: "absolute",
            width: "100%",
            border: "none",
            backgroundColor: "transparent",
            color: "white",
            top: 0,
          }}
          className="d-flex justify-content-end"
        >
          <div
            style={{
              border: "1px solid white",
              borderRadius: "50%",
            }}
            className="d-flex justify-content-center align-items-center m-3 p-1"
          >
            <FaTimes size={"1.5rem"} />
          </div>
        </button>
        <div
          className="d-flex flex-column flex-md-row  justify-content-center align-items-center"
          style={{ width: "100%", height: "100%" }}
        >
          <HoverScaleButton
            onClick={prev}
            style={{
              backgroundColor: "transparent",
              color: "#EEEEEE",
              height: "fit-content",
              border: "none",
            }}
            className="mx-3 mb-2"
          >
            <FaArrowLeft size={"1.7rem"} />
          </HoverScaleButton>
          {/* want to change: 

        board: */}
          <SlideUpDiv
            style={{ width: "100%" }}
            className="d-flex justify-content-around align-items-center"
          >
            <div>
              <Board size={size * 0.8} />
            </div>
          </SlideUpDiv>

          {/* pieces:  <PiecesOptions/>
           */}
          <HoverScaleButton
            onClick={next}
            style={{
              border: "none",
              backgroundColor: "transparent",
              color: "#EEEEEE",
            }}
            className="mx-3 mt-2"
          >
            <FaArrowRight size={"1.7rem"} />
          </HoverScaleButton>
        </div>
      </div>
    </>
  );
}

export default CustomizeBoardPanel;
