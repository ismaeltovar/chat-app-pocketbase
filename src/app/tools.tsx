import PocketBase from 'pocketbase'
import { SetStateAction, useCallback, useEffect, useState } from 'react'

export const pb = new PocketBase('http://127.0.0.1:8090')

export const guestId = 'vfoe0vud0aptg8q'
export const testroomId = 'y7buloawltx1dw1'
export const guestPass = 'password'

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