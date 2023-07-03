import PocketBase from 'pocketbase'
import { useCallback, useEffect, useState } from 'react'

export const pb = new PocketBase(process.env.NODE_ENV === "production" ? process.env.NEXT_PUBLIC_PROD_IP : process.env.NEXT_PUBLIC_TEST_IP)

export const guestId = process.env.NEXT_PUBLIC_GUEST_ID
export const guestPass = process.env.NEXT_PUBLIC_GUEST_PASS
export const testroomId = process.env.NEXT_PUBLIC_TESTROOM_ID

export function getUsername(userId : string | undefined, users : Record<any, any>[]) {
  if (userId == undefined)
    throw new Error("user undefined in function getUsername. Check if the process.env variable is working.")
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
      } catch (error : any) {
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