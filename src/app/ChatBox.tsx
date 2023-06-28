"use client"
import { ChangeEvent, useState } from "react";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090')

export default function ChatBox({user, chatroom, fetchData} : {user: any, chatroom: any, fetchData: any}) {
    const [text, setText] = useState("");
  
    const onInputChanged = (event : ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
      console.log(text);
    }

    const onSend = async () => {
      const record = await pb.collection('messages').create({
        text: `${text}`,
        author: `${user}`,
        chatroom: `${chatroom}`
      })

      fetchData()
    }
  
    return (
      <div className="flex justify-center fixed mb-5 min-w-full bottom-0 right-0 left-0">
          <textarea name="text-in" className="px-4 m-2 text-black resize-none border rounded-full" 
          value={text} onChange={onInputChanged} placeholder="Enter something to chat" autoFocus={false}/>
        <button className="send-btn" onClick={onSend}>Send</button>
      </div>
    );
  }