'use client'
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import PocketBase from 'pocketbase'
import ChatBox from "./ChatBox";
import Header from "./Header";
import ChatDisplay from "./ChatDisplay";

export const pb = new PocketBase('http://127.0.0.1:8090')

export const samplemanId = 'aa82g8vc60r01tf'
export const testroomId = 'y7buloawltx1dw1'
export const samplemanPass = 'password'

export default function Home() {
  const [user, setUser] = useState(pb.authStore.model !== null ? pb.authStore.model.id : samplemanId);
  const [chatroom, setChatroom] = useState(localStorage.getItem("chatroom") !== null ? localStorage.getItem('chatroom') : testroomId)
  const {push} = useRouter();

  useEffect(() => {
    pb.authStore.onChange(() => {
      if (pb.authStore.model !== null)
        setUser(pb.authStore.model.id);
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
      <ChatBox user={user} chatroom={chatroom}/>
    </>
  );
}
