'use client'
//Possibly use for environment variables
// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import ChatBox from "./ChatBox";
import Header from "./Header";
import ChatDisplay from "./ChatDisplay";
import { guestId, pb, testroomId, getUsername, useFetchData } from "./tools";

//For later use when selecting diffirent chatrooms
const chatrooms = {
  'testroom': 'y7buloawltx1dw1'
}

// function useForceUpdate() {
//   const [value, setValue] = useState(0)
//   return () => setValue(value => value + 1)
// }

export default function Home() {
  const [user, setUser] = useState(pb.authStore.model !== null ? pb.authStore.model.id : guestId);
  const [chatroom, setChatroom] = useState(testroomId)
  const {push} = useRouter();

  const {messages, users, fetchData} = useFetchData()

  const onUserChange = useCallback(() => {
    if (localStorage.getItem('loggedin') == 'true' && user == guestId)
      localStorage.setItem('loggedin', 'false')
    pb.authStore.onChange(() => {
      if (pb.authStore.model !== null) {
        console.log(JSON.stringify(pb.authStore.model))
        setUser(pb.authStore.model.id);
        if (pb.authStore.model.username == 'guest')
          localStorage.setItem('loggedin', 'false')
        else 
          localStorage.setItem('loggedin', 'true')
      }
    })
  }, [user])

  useEffect(onUserChange, [onUserChange])

  return (
    <>
      <Header currentUser={getUsername(user, users)}/>
      <ChatDisplay msgList={messages} users={users}/>
      <ChatBox user={user} chatroom={chatroom} fetchData={fetchData}/>
    </>
  );
}
