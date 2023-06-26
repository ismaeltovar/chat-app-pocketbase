"use client"
import { ChangeEvent, useState } from "react";
import PocketBase from 'pocketbase';

const pb = new PocketBase('http://127.0.0.1:8090')

export default function ChatBox({user, chatroom} : {user: any, chatroom: any}) {
    const [text, setText] = useState("Enter something to chat");
  
    const onInputChanged = (event : ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
      console.log(text);
    }

    const onSend = async () => {
      const record = await pb.collection('messages').create({
        text: `${text}`,
        author: `${user}`,
        chatroom: `${chatroom}`
      })
    }
  
    return (
      <div className="text-center sticky">
        <input name="text-in" className="text-black" value={text} onChange={onInputChanged}/>
        <button className="send-btn" onClick={onSend}>Send</button>
      </div>
    );
  }