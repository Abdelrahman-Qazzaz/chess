import React, { useContext } from "react";
import WindowSizeContext from "../../store/WindowSizeContext";

function Queen() {
  const { squareWidth } = useContext(WindowSizeContext);
  return (
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
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="butt"
              d="M9 26c8.5-1.5 21-1.5 27 0l2.5-12.5L31 25l-.3-14.1-5.2 13.6-3-14.5-3 14.5-5.2-13.6L14 25 6.5 13.5 9 26z"
            ></path>
            <path d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1 2.5-1 2.5-1.5 1.5 0 2.5 0 2.5 6.5 1 16.5 1 23 0 0 0 1.5-1 0-2.5 0 0 .5-1.5-1-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0zM11.5 30c3.5-1 18.5-1 22 0M12 33.5c6-1 15-1 21 0"></path>
            <circle cx="6" cy="12" r="2"></circle>
            <circle cx="14" cy="9" r="2"></circle>
            <circle cx="22.5" cy="8" r="2"></circle>
            <circle cx="31" cy="9" r="2"></circle>
            <circle cx="39" cy="12" r="2"></circle>
            <path
              fill="none"
              strokeLinecap="butt"
              d="M11 38.5a35 35 1 0023 0"
            ></path>
            <g fill="none" stroke="#FFF">
              <path d="M11 29a35 35 1 0123 0M12.5 31.5h20M11.5 34.5a35 35 1 0022 0M10.5 37.5a35 35 1 0024 0"></path>
            </g>
          </g>
        </svg>
      </svg>
      {/* */}
    </div>
  );
}

export default Queen;
