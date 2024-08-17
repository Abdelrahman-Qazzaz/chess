import { motion } from "framer-motion";
import { Chessboard } from "react-chessboard";
import { useContext, useEffect, useRef, useState } from "react";
import WindowSizeContext from "../store/WindowSizeContext";
import BoardPreferencesContext from "../store/BoardPreferencesContext";
import BlackPiecesWithWhiteBorders from "../Re-useables/BlackPiecesWithWhiteBorders";
function Board(props) {
  let { size, boardContainerRef, setSquareWidth } =
    useContext(WindowSizeContext);
  const { selectedTheme } = useContext(BoardPreferencesContext);
  useEffect(() => {
    setSquareWidth(props.size ? props.size / 8 : size / 8);
  }, []);
  return (
    <div ref={boardContainerRef}>
      {props.game ? (
        <>
          <div style={{ position: "relative" }}>
            <Chessboard
              boardWidth={props.size ? props.size : size}
              position={props.game.fen()}
              onPieceDrop={props.onDrop}
              boardOrientation={props.flip ? "black" : "white"}
              customDarkSquareStyle={selectedTheme.customDarkSquareStyle}
              customLightSquareStyle={selectedTheme.customLightSquareStyle}
              customPieces={
                selectedTheme.customDarkSquareStyle.backgroundColor === "black"
                  ? BlackPiecesWithWhiteBorders
                  : null
              }
            />
            {props.children ?? null}
          </div>
        </>
      ) : (
        <Chessboard
          boardWidth={props.size ? props.size : size}
          customDarkSquareStyle={selectedTheme.customDarkSquareStyle}
          customLightSquareStyle={selectedTheme.customLightSquareStyle}
          customPieces={
            selectedTheme.customDarkSquareStyle.backgroundColor === "black"
              ? BlackPiecesWithWhiteBorders
              : null
          }
        />
      )}
    </div>
  );
}

export default Board;
