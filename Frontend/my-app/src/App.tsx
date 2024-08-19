import { useContext } from "react";
import HomePage from "./Home Page/HomePage";
import MatchPage from "./Match Page/MatchPage";
import "./App.css";
import QueueScreen from "./QueueScreen";
import UserContext, { UserContextType } from "./store/UserContext";
import Notification from "./Notification";
import { motion, AnimatePresence } from "framer-motion";

function App() {
  const { userStatus, notification } = useContext<UserContextType>(UserContext);

  return (
    <AnimatePresence>
      <div className="app" style={{ height: "100vh", width: "100vw" }}>
        {userStatus === "Home Page" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ height: "100%" }}
            className="d-flex align-items-center"
          >
            <HomePage />
          </motion.div>
        )}
        {userStatus === "In Queue" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <QueueScreen />
          </motion.div>
        )}
        {userStatus === "In Match" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{ height: "100%" }}
          >
            <MatchPage />
          </motion.div>
        )}

        {notification.message !== "" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Notification />
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
}
export default App;
