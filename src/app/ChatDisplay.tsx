'use client'
import React, { useEffect, useRef, useState } from "react";
import PocketBase from 'pocketbase';
import TextBubble from "./TextBubble";
import { getUsername } from "./page";

const pb = new PocketBase('http://127.0.0.1:8090')

function ChatDisplay({msgList, users} : {msgList : Record<any, any>, users : Record<any, any>[]}) {
    // const [messageList, setMessageList] = useState([]);
    const dummyRef = useRef(null)

    useEffect(() => {
      dummyRef.current.scrollIntoView({behavior: "smooth"})
    }, [])

    return (
        <div id="chat-display" className="flex flex-col pt-20 pb-24 items-center">
            {msgList.map((item: any) => {
              const date = new Date(item.created)
              const author = users.find(record => record.id === item.author)
              console.log(JSON.stringify(users))

              return <TextBubble key={item.id} text={item.text} sender={author !== null ? author.username : ""} time={date.toLocaleTimeString()}/>
            })}
            <div ref={dummyRef}/>
        </div>
    );
}

export default ChatDisplay;