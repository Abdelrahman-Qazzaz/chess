import Bishup from "./Black Pieces with White Borders Components/Bishup";
import Castle from "./Black Pieces with White Borders Components/Castle";
import King from "./Black Pieces with White Borders Components/King";
import Knight from "./Black Pieces with White Borders Components/Knight";
import Pawn from "./Black Pieces with White Borders Components/Pawn";
import Queen from "./Black Pieces with White Borders Components/Queen";

const BlackPiecesWithWhiteBorders = {
  bP: Pawn,
  bB: Bishup,
  bQ: Queen,
  bK: King,
  bR: Castle,
  bN: Knight,
};

export default BlackPiecesWithWhiteBorders;

/*    <div
      style={{
        width: squareWidth,
        height: squareWidth,
        backgroundImage: `url(${pieceImage})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        opacity: isDragging ? 0.5 : 1,
      }}
    /> */
