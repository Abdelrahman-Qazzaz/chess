import React, { useContext } from "react";

import WindowSizeContext from "../../store/WindowSizeContext";

function Bishup() {
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
            fill="none"
            fillRule="evenodd"
            stroke="white"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
          >
            <g fill="#000" strokeLinecap="butt">
              <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z"></path>
              <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z"></path>
              <path d="M25 8a2.5 2.5 0 11-5 0 2.5 2.5 0 115 0z"></path>
            </g>
            <path
              stroke="#FFF"
              strokeLinejoin="miter"
              d="M17.5 26h10M15 30h15m-7.5-14.5v5M20 18h5"
            ></path>
          </g>
        </svg>
      </svg>
      {/* */}
    </div>
  );
}

export default Bishup;
