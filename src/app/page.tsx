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

//For later use when selecting diffirent chatrooms
const chatrooms = {
  'testroom': 'y7buloawltx1dw1'
}

function useForceUpdate() {
  const [value, setValue] = useState(0)
  return () => setValue(value => value + 1)
}

export default function Home() {
  const [user, setUser] = useState(pb.authStore.model !== null ? pb.authStore.model.id : samplemanId);
  const [chatroom, setChatroom] = useState(localStorage.getItem("chatroom") !== null ? localStorage.getItem('chatroom') : testroomId)
  const {push} = useRouter();

  const forceUpdate = useForceUpdate()

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
      <div className="flex justify-center p-4 bg-green-400">
        {/* <button className="left-panel-btn"></button> */}
        <h1 className="ml-auto font-semibold">Chat App</h1>
        <div className="ml-auto">
          <button className="flex-initial px-4" onClick={onLoginClick}>Log in</button>
          <button className="flex-initial px-4" onClick={onSignupClick}>Signup</button>
        </div>
      </div>
      <ChatDisplay/>
      <ChatBox user={user} chatroom={chatroom} forceUpdate={forceUpdate}/>
    </>
  );
}
