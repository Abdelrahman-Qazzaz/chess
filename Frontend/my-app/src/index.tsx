import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import { WindowSizeProvider } from "./store/WindowSizeContext";
import { SocketProvider } from "./store/SocketContext";
import { UserContextProvider } from "./store/UserContext";
import { BoardPreferencesContextPreferencesContextProvider } from "./store/BoardPreferencesContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <SocketProvider>
    <UserContextProvider>
      <WindowSizeProvider>
        <BoardPreferencesContextPreferencesContextProvider>
          <App />
        </BoardPreferencesContextPreferencesContextProvider>
      </WindowSizeProvider>
    </UserContextProvider>
  </SocketProvider>
);
