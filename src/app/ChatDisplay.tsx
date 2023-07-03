'use client'
import React, { useEffect, useRef, useState } from "react";
import PocketBase from 'pocketbase';
import TextBubble from "./TextBubble";

const pb = new PocketBase(process.env.NODE_ENV === "production" ? process.env.prod_ip : process.env.test_ip)

function ChatDisplay({msgList, users} : {msgList : Record<any, any>, users : Record<any, any>[]}) {
    // const [messageList, setMessageList] = useState([]);
    const dummyRef = useRef(null)

    useEffect(() => {
      // if (dummyRef.current !== null)
      //   dummyRef.current.scrollIntoView({behavior: "smooth"})
    }, [])

    return (
        <div id="chat-display" className="flex flex-col pt-28 pb-24 items-center">
            {msgList.map((item: any) => {
              const date = new Date(item.created)
              const author = users.find(record => record.id === item.author)

              return <TextBubble key={item.id} text={item.text} sender={author === undefined ?  "": author.username} time={date.toLocaleTimeString()}/>
            })}
            <div ref={dummyRef}/>
        </div>
    );
}

export default ChatDisplay;