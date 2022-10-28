import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function ChatApp(props) {
  const [connections, setConnected] = useState({});
  const [room, setRoom] = useState("");

  const connectionHandler = _ => {
    const url = `http://localhost:4000`;
    const socket = io(url, { autoConnect: false });

    socket.connect();
    socket.on("connect", (socket) => {
      setConnected(cx => ({
        ...cx,
        [room]: true
      }));
    });

    socket.emit("join", room);

    socket.on("disconnect", () => {
      console.log("disconnected: ", socket.id);
    });
  }

  return (
    <>
      <h2>Toy Chat App</h2>
      <div>
        <input
          name="room"
          type="text"
          onChange={e => setRoom(e.target.value)}
        />
        <input type="button" onClick={connectionHandler} value="Join" />
      </div>
      <span>
        {connections[room] ? `Joined Room: ${room}` : "Offline"}
      </span>
    </>
  );
}

export default ChatApp;
