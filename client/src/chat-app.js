import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function ChatApp(props) {
  const [isConnected, setConnected] = useState(false);
  const [sockets, addSocket] = useState([]);

  const connectionHandler = _ => {
    const url = "http://localhost:4000";
    const socket = io(url, { autoConnect: false });

    socket.connect();
    socket.on("connect", () => {
      addSocket(sockets => [...sockets, socket.id]);
      setConnected(socket.connected);
    });

    socket.on("disconnect", () => {
      console.log("disconnected: ", socket.id);
    });
  }

  return (
    <>
      <h2>Connected Socket IDs:</h2>
      {sockets.map(
        (id, index) => <div key={index}>{id}</div>
      )}
      <span>
        <button onClick={connectionHandler}>
          Connect
        </button>
      </span>
    </>
  );
}

export default ChatApp;
