"use client"
import { ChangeEvent, useState } from "react";

export default function ChatBox() {
    const [text, setText] = useState("Enter something to chat");
  
    const onInputChanged = (event : ChangeEvent<HTMLInputElement>) => {
      setText(event.target.value);
    }
  
    return (
      <div className="text-center sticky">
        <input name="text-in" className="text-black" value={text} onChange={onInputChanged}/>
        <button className="send-btn">Send</button>
      </div>
    );
  }