'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { pb } from "./pocketbase";
import ChatBox from "./ChatBox";
import Header from "./Header";
import ChatDisplay from "./ChatDisplay";

export default function Home() {
  const [user, setUser] = useState(pb.authStore.model);
  const {push} = useRouter();

  useEffect(() => {
    pb.authStore.onChange(() => {
      setUser(pb.authStore.model);
    });
  }, [])

  const onLoginClick = async () => {
    try {
      push('/login')
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  const onSignupClick = async () => {
    try {
      push('/signup')
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
        <button onClick={onSignupClick}>Signup</button>
      </div>
      <ChatDisplay/>
      <ChatBox user={user} chatroom={""}/>
    </>
  );
}
