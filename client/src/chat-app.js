import React from "react";
import { useEffect, useState } from "react";
import io from "socket.io-client";

function ChatApp(props) {
  const [activeSocket, setActiveSocket] = useState();
  const [activeRoom, setActiveRoom] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, addChatMessages] = useState([]);

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
    activeSocket.on("message", (message) => {
      console.log("message received: ", message);
      addChatMessages(messages => [...messages, message]);
    });
  }

  const sendMessage = _ => {
    activeSocket.emit("message", activeRoom, message);
    setMessage("");
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
      {activeRoom && (
        <>
          <div>
            <textarea
              name="message"
              rows={5}
              cols={100}
              placeholder="Type message here."
              onChange={e => setMessage(e.target.value)}
              value={message}
            />
          </div>
          <input type="button" onClick={sendMessage} value="Send Message" />
        </>
      )}
      <div>
        <hr/>
        <h3>Messages from peers</h3>
        <textarea
          name="chat-messages"
          rows={20}
          cols={100}
          value={chatMessages.join("\n")}
          readOnly
        />
      </div>
    </>
  );
}

export default ChatApp;
