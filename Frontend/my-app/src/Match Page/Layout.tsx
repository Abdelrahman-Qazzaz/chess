import React, { ReactNode, useContext, useState } from "react";
import UserTabHeaderOrFooter from "./Layout Components/UserTabHeaderOrFooter";
import SocketContext from "../store/SocketContext";

function Layout({
  children,
  timeLeft,
  turn,
  you,
  opponent,
}: {
  children: ReactNode;
  timeLeft: { youTimeLeft: number; opponentTimeLeft: number };
  turn: string;
  you: any;
  opponent: any;
}) {
  return (
    <div className="d-flex flex-column align-items-center">
      <div style={{ width: "fit-content" }}>
        <UserTabHeaderOrFooter
          user={opponent}
          timeLeft={timeLeft.opponentTimeLeft}
          turn={turn}
        />
        {/* board */}
        {children}
        {/* board */}
        <UserTabHeaderOrFooter
          user={you}
          timeLeft={timeLeft.youTimeLeft}
          turn={turn}
        />
      </div>
    </div>
  );
}

export default Layout;
