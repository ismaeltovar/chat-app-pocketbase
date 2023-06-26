'use client'
import { useState, useEffect } from "react";
import { pb } from "./pocketbase";
import ChatBox from "./ChatBox";
import Header from "./Header";
import ChatDisplay from "./ChatDisplay";

export default function Home() {
  const [user, setUser] = useState(pb.authStore.model);

  useEffect(() => {
    pb.authStore.onChange(() => {
      setUser(pb.authStore.model);
    });
  }, [])

  const onLoginClick = async () => {
    try {
      const authData = await pb.collection('users').authWithOAuth2({ provider: 'google' });
      // let username = pb.authStore.model.username
      // setUser(username !== null ? username : "sampleman");
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  return (
    <>
      <div className="text-center ">
        {/* <button className="left-panel-btn"></button> */}
        <h1>Chat App</h1>
        <button onClick={onLoginClick}>Log in</button>
      </div>
      <ChatDisplay/>
      <ChatBox user={user} chatroom={""}/>
    </>
  );
}
