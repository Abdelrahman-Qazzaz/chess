import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

type Preference = {
  selectedTheme: any;
  setSelectedThemeIndex: Function;
  numOfThemes: number;
};
const BoardPreferencesContext = createContext<Preference>({
  selectedTheme: null,
  setSelectedThemeIndex: () => {},
  numOfThemes: 0,
});
export function BoardPreferencesContextPreferencesContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const themes = [
    {
      customDarkSquareStyle: { backgroundColor: "rgb(181, 136, 99)" },
      customLightSquareStyle: { backgroundColor: "rgb(240, 217, 181)" },
    },
    {
      customDarkSquareStyle: { backgroundColor: "black" },
      customLightSquareStyle: { backgroundColor: "white" },
    },
    {
      customDarkSquareStyle: { backgroundColor: "#C80036" },
      customLightSquareStyle: { backgroundColor: "#EEEEEE" },
    },
    {
      customDarkSquareStyle: { backgroundColor: "#059212" },
      customLightSquareStyle: { backgroundColor: "#EEEEEE" },
    },
  ];
  const [selectedThemeIndex, setSelectedThemeIndex] = useState(
    parseInt(localStorage.getItem("selectedThemeIndex") ?? "0", 10) || 0
  );
  const [selectedTheme, setSelectedTheme] = useState({
    ...themes[selectedThemeIndex],
  });

  useEffect(() => {
    localStorage.setItem("selectedThemeIndex", selectedThemeIndex.toString());
  }, [selectedThemeIndex]);

  useEffect(() => {
    setSelectedTheme(themes[selectedThemeIndex]);
  }, [selectedThemeIndex]);

  const numOfThemes = themes.length;
  return (
    <BoardPreferencesContext.Provider
      value={{
        selectedTheme,
        setSelectedThemeIndex,
        numOfThemes,
      }}
    >
      {children}
    </BoardPreferencesContext.Provider>
  );
}

export default BoardPreferencesContext;
