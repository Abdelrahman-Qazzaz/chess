import React, {
  ReactNode,
  useContext,
  useEffect,
  useState,
  createContext,
} from "react";

import SocketContext from "./SocketContext";

export interface UserContextType {
  userProfile: { name: string; avatar: string };
  setUserProfile: (data: any) => void;
  userStatus: string;
  setUserStatus: (string: string) => void;
  notification: { message: string; requestOwnerData: any };
  setNotification: (data: any) => void;
  room: any;
  setRoom: (data: any) => void;
  queue: () => void;

  requestRematch: (data: {
    opponentData: { name: string; avatar: string; socketID: string };
    yourData: { name: string; avatar: string; socketID: string };
  }) => void;
  acceptRematch: (
    opponentData: { name: string; socketID: string },
    yourData: { name: string; avatar: string; socketID: string }
  ) => void;
}

const UserContext = createContext<UserContextType>({
  userProfile: { name: "", avatar: "" },
  setUserProfile: (data) => {},
  userStatus: "",
  setUserStatus: () => {},
  notification: { message: "", requestOwnerData: {} },
  setNotification: () => {},
  room: {},
  setRoom: () => {},
  queue: () => {},
  requestRematch: (data) => {},
  acceptRematch: (data) => {},
});

export function UserContextProvider({ children }: { children: ReactNode }) {
  const avatars = ["Avatar-1.jpeg", "Avatar-2.png", "Avatar-3.png"];
  const [userProfile, setUserProfile] = useState(
    JSON.parse(
      localStorage.getItem("userProfile") ??
        JSON.stringify({
          name: "Player",
          avatar: avatars[Math.floor(Math.random() * 3)],
        })
    )
  );

  const [userStatus, setUserStatus] = useState("Home Page"); // Home Page, In Queue, In Match
  const [room, setRoom] = useState(null);
  const [notification, setNotification] = useState<{
    message: string;
    requestOwnerData: any;
  }>({
    message: "",
    requestOwnerData: null,
  });
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (userStatus !== "In Match" && userStatus !== "In Match vs. Bot") {
      setRoom(null);
    }
  }, [userStatus]);

  useEffect(() => {
    localStorage.setItem("userProfile", JSON.stringify(userProfile));
  }, [userProfile]);

  function queue() {
    socket.emit("Enter Queue", userProfile);
    setUserStatus("In Queue");
  }

  socket.on("Found Match", (room: any) => {
    console.log(room);
    setNotification({ message: "", requestOwnerData: null });
    setRoom(room);
    setUserStatus("In Match");
  });
  socket.on(
    "Rematch Request",
    (requestOwnerData: { name: string; avatar: string; socketID: string }) => {
      setNotification({
        message: `${requestOwnerData.name} wants a rematch!`,
        requestOwnerData, //name,socketID
      });
    }
  );
  function requestRematch(data: {
    opponentData: { name: string; avatar: string; socketID: string };
    yourData: { name: string; avatar: string; socketID: string };
  }) {
    socket.emit("Request rematch", data);
  }

  function acceptRematch(
    opponentData: { name: string; socketID: string },
    yourData: { name: string; avatar: string; socketID: string }
  ) {
    socket.emit("Accept rematch request", opponentData, yourData);

    //
  }

  socket.on("test", (room: any) => {
    console.log("dsa");
  });

  return (
    <UserContext.Provider
      value={{
        userProfile,
        setUserProfile,
        userStatus,
        setUserStatus,
        room,
        setRoom,
        queue,
        requestRematch,
        notification,
        setNotification,
        acceptRematch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserContext;
