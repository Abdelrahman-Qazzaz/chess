import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import io from "socket.io-client";

export interface SocketContextType {
  socket: any;
}
const SocketContext = createContext<SocketContextType>({
  socket: null,
});
export function SocketProvider({ children }: { children: ReactNode }) {
  const socket = useMemo(() => {
    return io(`${process.env.REACT_APP_BACKENDAPI}`, {
      transports: ["websocket"],
    });
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}

export default SocketContext;
