'use client'
import React, { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import TextBubble from "./TextBubble";

const pb = new PocketBase('http://127.0.0.1:8090')

function ChatDisplay({msgList} : {msgList : Record<any, any>}) {
    // const [messageList, setMessageList] = useState([]);

    return (
        <div className="chat-display text-center">
            {msgList.map((item: any) => {
                return <TextBubble key={item.id} text={item.text} sender={item.author} time={item.created}/>
            })}
        </div>
    );
}

export default ChatDisplay;