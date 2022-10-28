import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function ChatApp(props) {
  const [activeSocket, setActiveSocket] = useState();
  const [activeRoom, setActiveRoom] = useState("")
  const [room, setRoom] = useState("");

  useEffect(() => {
    const url = `http://localhost:4000`;
    const socket = io(url, { autoConnect: false });
    socket.connect();
    socket.on("connect", () => {
      setActiveSocket(socket);
    });

    socket.on("disconnect", () => {
      setActiveSocket(null);
    });
  }, []);

  const join = _ => {
    activeSocket.emit("join", room);
    activeSocket.on(`joined:${activeSocket.id}`, (room) => {
      setActiveRoom(room);
    });
  }

  return (
    <>
      <h2>Toy Chat App</h2>
      <div>
        <span>
          Status: {activeSocket ? "Connected": "Offline"}
        </span>
      </div>
      <div>
        <input
          name="room"
          type="text"
          onChange={e => setRoom(e.target.value)}
          placeholder="Room Name"
        />
        <input type="button" onClick={join} value="Join" />
      </div>
      <div>
        <span>
          Active Room: {activeRoom ? activeRoom : ""}
        </span>
      </div>
    </>
  );
}

export default ChatApp;
