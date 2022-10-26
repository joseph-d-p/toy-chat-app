import React from "react";
import { createRoot } from 'react-dom/client';

import ChatApp from "./chat-app";

function App(props) {
  return (
    <div>
      <ChatApp />
    </div>
  );
}

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
