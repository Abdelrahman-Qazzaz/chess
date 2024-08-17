import { useState, useEffect, createContext, ReactNode, useRef } from "react";

export interface WindowSizeContextType {
  size: number;
  boardContainerRef: any;
  squareWidth: number;
  setSquareWidth: Function;
}

const WindowSizeContext = createContext<WindowSizeContextType>({
  size: 0,
  boardContainerRef: null,
  squareWidth: 0,
  setSquareWidth: () => {},
});

export function WindowSizeProvider({ children }: { children: ReactNode }) {
  const boardContainerRef = useRef<HTMLDivElement>(null);

  const [size, setSize] = useState(
    window.innerHeight >= window.innerWidth
      ? window.innerWidth
      : window.innerHeight
  );
  const [squareWidth, setSquareWidth] = useState(0);

  function handleResize() {
    console.log("trigger");
    setSize(
      window.innerWidth >= window.innerHeight
        ? window.innerHeight
        : window.innerWidth
    );
    if (boardContainerRef.current) {
      setSquareWidth(boardContainerRef.current.clientWidth / 8);
      console.log(boardContainerRef.current.clientWidth);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <WindowSizeContext.Provider
      value={{ size, boardContainerRef, squareWidth, setSquareWidth }}
    >
      {children}
    </WindowSizeContext.Provider>
  );
}

export default WindowSizeContext;
