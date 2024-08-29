import React, { useContext, useEffect, useState } from "react";
import { Chess } from "chess.js";
import Board from "./Board";
import SocketContext from "../store/SocketContext";
import WindowSizeContext from "../store/WindowSizeContext";
import Layout from "./Layout";
import UserContext from "../store/UserContext";
import GameOverPanel from "./GameOverPanel";
import { motion } from "framer-motion";
import axios from "axios";
import ComputerIconSvg from "../Re-useables/ComputerIcon.svg";
function MatchPage(props: { againstBot?: boolean }) {
  const { size } = useContext(WindowSizeContext);
  const { socket } = useContext(SocketContext);
  const { room } = useContext(UserContext);
  const [game, setGame] = useState(new Chess());
  const [winner, setWinner] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    youTimeLeft: 300,
    opponentTimeLeft: 300,
  });
  const [turn, setTurn] = useState("w"); // this is for UI updates only.
  const { userProfile, setRoom } = useContext(UserContext);

  useEffect(() => {
    newMatch();
  }, [room]);

  function newMatch() {
    setWinner(null);
    setGame(new Chess());
    //i dont think the below is necessary, but just in case:
    if (room) {
      if (props.againstBot) {
        const botIndex = room.players.findIndex(
          (player: any) => player.socketID === -1
        );
        opponent = room.players[botIndex];
        you =
          room.players[
            room.players.findIndex((player: any) => player.socketID !== -1)
          ];
      } else {
        if (socket.id == room.players[0].socketID) {
          you = room.players[0];
          opponent = room.players[1];
        } else {
          you = room.players[1];
          opponent = room.players[0];
        }
      }
      if (you!.color !== game.turn() && opponent.socketID === -1) {
        // if this is the start of the match, and the bot is playing white
        botMakeMove(game);
      }
    }
  }
  socket.on("Opponent moved", (newFEN: string) => {
    const gameCopy = new Chess();
    gameCopy.load(newFEN);
    setGame(gameCopy);
  });
  function makeAMove(move: any) {
    if (you!.color !== game.turn()) return; // if you try to move your opponent's piece

    const FEN = game.fen();
    const gameCopy = new Chess();
    gameCopy.load(FEN);
    try {
      gameCopy.move(move);
      setGame(gameCopy);
      if (gameCopy.isGameOver()) {
        // you win
        setWinner({ ...you, method: "By Checkmate" });

        if (opponent.socketID !== -1) {
          socket.emit("Make a move", gameCopy.fen());
          socket.emit("Game over", you, opponent, "By Checkmate");
        }
      } else {
        if (opponent.socketID !== -1) {
          socket.emit("Make a move", gameCopy.fen());
        } else {
          botMakeMove(gameCopy);
        }
      }
    } catch (error) {
      console.log("illegal");
    }
  }

  function botMakeMove(gameCopy: any) {
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
  function onDrop(sourceSquare: string, targetSquare: string) {
    const move = {
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // always promote to a queen for example simplicity
    };

    makeAMove(move);
  }

  socket.on("Game over", (method: string, loser: any = null) => {
    if (loser.socketID === opponent.socketID) {
      setWinner({ ...you, method });
    } else if (loser.socketID === you.socketID) {
      setWinner({ ...opponent, method });
    }
  });
  let you: any;
  let opponent: any;
  useEffect(() => {
    if (props.againstBot) {
      const white = Math.random() < 0.5;
      setRoom({
        name: `${userProfile.name} vs Bot`,
        players: [
          {
            name: userProfile.name,
            avatar: userProfile.avatar,
            socketID: socket.id,
            color: white ? "w" : "b",
            timeLeft: {
              value: 300,
            },
          },
          {
            name: "Bot",
            avatar: ComputerIconSvg,
            socketID: -1,
            color: white ? "b" : "w",
            timeLeft: {
              value: 300,
            },
          },
        ],
      });
    }
  }, []);

  if (room) {
    if (socket.id == room.players[0].socketID) {
      you = room.players[0];
      opponent = room.players[1];
    } else {
      you = room.players[1];
      opponent = room.players[0];
    }
  }

  socket.on("Opponent left", () => {
    setWinner({ ...you, method: "Game abandoned" });
  });

  socket.on("Time update", (player: any) => {
    if (socket.id === player.socketID) {
      setTimeLeft((prev) => ({ ...prev, youTimeLeft: player.timeLeft.value }));
    } else if (opponent.socketID === player.socketID) {
      setTimeLeft((prev) => ({
        ...prev,
        opponentTimeLeft: player.timeLeft.value,
      }));
    }
    if (turn !== player.color) {
      setTurn(player.color);
    }
  });
  return (
    room && (
      <div
        style={{ height: "100%", width: "100vw" }}
        className="d-flex align-items-center justify-content-center"
      >
        <Layout turn={turn} timeLeft={timeLeft} you={you} opponent={opponent}>
          <Board
            game={game}
            onDrop={onDrop}
            flip={you.color === "b"}
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
                  <GameOverPanel
                    winner={winner}
                    you={you}
                    opponent={opponent}
                  />
                </div>
                {/*TEMP*/}
              </motion.div>
            )}
          </Board>
        </Layout>
      </div>
    )
  );
}

export default MatchPage;
