'use client'
import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import PocketBase from 'pocketbase'
import ChatBox from "./ChatBox";
import Header from "./Header";
import ChatDisplay from "./ChatDisplay";

export const pb = new PocketBase('http://127.0.0.1:8090')

export const guestId = 'vfoe0vud0aptg8q'
export const testroomId = 'y7buloawltx1dw1'
export const guestPass = 'password'

//For later use when selecting diffirent chatrooms
const chatrooms = {
  'testroom': 'y7buloawltx1dw1'
}

// function useForceUpdate() {
//   const [value, setValue] = useState(0)
//   return () => setValue(value => value + 1)
// }

export function getUsername(userId : string, users : Record<any, any>[]) {
  let user = users.find(record => record.id === userId)
  return user === null || user === undefined ? 'guest' : user.username
}

export const useFetchData = () => {
  const [messageList, setMessageList] = useState<Record<any, any>[]>([]);
  const [userList, setUserList] = useState<Record<any, any>[]>([])
  const [error, setError] = useState<Error | null>(null)

  const fetchData = useCallback(async () => {
      try {
          const result = await pb.collection('messages').getFullList({
              // filter: "chatroom = 'testroom'",
              sort: "+created"
          })
          console.log(JSON.stringify(result))
          
          const users = await pb.collection('users').getFullList()
          
          setMessageList(result)
          setUserList(users)
      } catch (error) {
          console.error("Error fetching data:", error)
          setError(error)
      }
  }, []);

  useEffect(() => {fetchData()}, [fetchData])

  return {
    messages: messageList,
    users: userList,
    fetchData
  }
}

export default function Home() {
  const [user, setUser] = useState(pb.authStore.model !== null ? pb.authStore.model.id : guestId);
  const [chatroom, setChatroom] = useState(localStorage.getItem("chatroom") !== null ? localStorage.getItem('chatroom') : testroomId)
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
