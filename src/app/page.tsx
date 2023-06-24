import { useState } from "react";
import ChatBox from "./ChatBox";
import Header from "./Header";
import ChatDisplay from "./ChatDisplay";

export default function Home() {
  return (
    <>
      <body>
        <Header/>
        <ChatDisplay/>
        <ChatBox/>
      </body>
    </>
  );
}
