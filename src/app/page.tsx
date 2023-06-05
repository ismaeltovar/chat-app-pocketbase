import { useState } from "react";
import ChatBox from "./ChatBox";

export default function Home() {
  return (
    <>
      <body>
        <div className="text-center ">
          {/* <button className="left-panel-btn"></button> */}
          <h1>Chat App</h1>
        </div>
        <div className="chat-display">
        </div>
        <ChatBox/>
      </body>
    </>
  );
}
