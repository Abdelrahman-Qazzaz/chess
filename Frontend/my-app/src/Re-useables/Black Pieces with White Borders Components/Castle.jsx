import React, { useContext } from "react";
import BoardPreferencesContext from "../../store/BoardPreferencesContext";
import WindowSizeContext from "../../store/WindowSizeContext";

function Castle() {
  const { squareWidth } = useContext(WindowSizeContext);
  return (
    <>
      <div
        style={{
          width: squareWidth,
          height: squareWidth,

          backgroundSize: "contain",
          backgroundPosition: "center",
        }}
        className="d-flex justify-content-center align-items-center"
      >
        {/*svg width and height, second svg width and height, g stroke */}
        <svg
          width={squareWidth}
          height={squareWidth}
          display="block"
          viewBox="1 1 43 43"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
            <g
              fillRule="evenodd"
              stroke="white"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            >
              <path
                strokeLinecap="butt"
                d="M9 39h27v-3H9v3zM12.5 32l1.5-2.5h17l1.5 2.5h-20zM12 36v-4h21v4H12z"
              ></path>
              <path
                strokeLinecap="butt"
                strokeLinejoin="miter"
                d="M14 29.5v-13h17v13H14z"
              ></path>
              <path
                strokeLinecap="butt"
                d="M14 16.5L11 14h23l-3 2.5H14zM11 14V9h4v2h5V9h5v2h5V9h4v5H11z"
              ></path>
              <path
                fill="none"
                stroke="#FFF"
                strokeLinejoin="miter"
                strokeWidth="1"
                d="M12 35.5h21M13 31.5h19M14 29.5h17M14 16.5h17M11 14h23"
              ></path>
            </g>
          </svg>
        </svg>
        {/* */}
      </div>
    </>
  );
}

export default Castle;

/**

 */
