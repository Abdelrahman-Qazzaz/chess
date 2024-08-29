import React, { useContext, useEffect, useState } from "react";
import { Chess } from "chess.js";
import Board from "./Board";
import WindowSizeContext from "../store/WindowSizeContext";
import Layout from "./Layout";
import UserContext from "../store/UserContext";
import GameOverPanel from "./GameOverPanel";
import { motion } from "framer-motion";
import axios from "axios";

function MatchPageVsBot() {
  const { userProfile } = useContext(UserContext);
  const { size } = useContext(WindowSizeContext);
  const [game, setGame] = useState(new Chess());
  const [winner, setWinner] = useState<any>(null);
  const [room, setRoom] = useState<{ name: string; players: any[] }>();
  const [you, setYou] = useState<{
    name: string;
    avatar: string;
    color: string;
  }>();
  const [opponent, setOpponent] = useState<{
    name: string;
    avatar: string;
    color: string;
  }>();

  useEffect(() => {
    const white = Math.random() < 0.5;
    setRoom({
      name: `${userProfile.name} vs Bot`,
      players: [
        { ...userProfile, color: white ? "w" : "b" },
        { name: "Bot", avatar: "", color: white ? "b" : "w" },
      ],
    });
  }, []);
  useEffect(() => {
    if (room) {
      newMatch();
    }
  }, [room]);

  async function newMatch() {
    const game = new Chess();
    setWinner(null);
    setGame(game);

    setYou(room!.players[0]);
    setOpponent(room!.players[1]);

    if (room!.players[1].color === "w") {
      await botMakeMove(game);
    }
  }

  async function onDrop(sourceSquare: string, targetSquare: string) {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    };

    await makeAMove(move);
  }

  async function makeAMove(move: any) {
    if (you!.color !== game.turn()) {
      // if you try to move your opponent's piece
      return;
    }

    const FEN = game.fen();
    const gameCopy = new Chess();
    gameCopy.load(FEN);
    try {
      gameCopy.move(move);

      if (gameCopy.isGameOver()) {
        // you win
        setWinner({ ...you, method: "By Checkmate" });
      }

      setGame(gameCopy);

      await botMakeMove(gameCopy);
    } catch (error) {
      console.log("illegal");
    }
  }

  async function botMakeMove(gameCopy: any) {
    if (gameCopy.isGameOver()) return;
    // make the bot move
    // TO DO : MAKE SURE THIS DOESNT EXECUTE IF THE GAME IS OVER (IF GAME IS OVER: return)
    const copyOfGameCopy = new Chess();
    copyOfGameCopy.load(gameCopy.fen());
    let botMove;
    setTimeout(async () => {
      try {
        const { data } = await axios.get(
          `https://stockfish.online/api/s/v2.php?fen=${gameCopy.fen()}&depth=15`
        );

        botMove = {
          from: data.continuation.split(" ")[0].substring(0, 2),
          to: data.continuation.split(" ")[0].substring(2),
          promotion: "q",
        };
      } catch (error) {
        const possibleMoves = gameCopy.moves(); // array of possible moves
        const randomIndex = Math.floor(Math.random() * possibleMoves.length);
        botMove = possibleMoves[randomIndex];
      }

      copyOfGameCopy.move(botMove);

      setGame(copyOfGameCopy);
      if (copyOfGameCopy.isGameOver()) {
        setWinner({ ...opponent, method: "By Checkmate" });
      }
    }, 200);
  }

  return you && opponent ? (
    <div
      style={{ height: "100%", width: "100vw" }}
      className="d-flex align-items-center justify-content-center"
    >
      <Layout you={you} opponent={opponent}>
        <Board
          game={game}
          onDrop={onDrop}
          flip={you!.color === "b"}
          size={size - 150}
          id="BasicBoard"
        >
          {winner && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                height: "100%",
                width: "100%",
                zIndex: 1,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                className=" d-flex flex-column"
                style={{
                  width: "80%",
                  maxWidth: "300px",
                  aspectRatio: "1.3/1",
                  borderRadius: "0.4rem",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <GameOverPanel winner={winner} you={you} opponent={opponent} />
              </div>
              {/*TEMP*/}
            </motion.div>
          )}
        </Board>
      </Layout>
    </div>
  ) : (
    <></>
  );
}

export default MatchPageVsBot;
