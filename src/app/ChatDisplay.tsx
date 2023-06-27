'use client'
import React, { useEffect, useState } from "react";
import PocketBase from 'pocketbase';
import TextBubble from "./TextBubble";

const pb = new PocketBase('http://127.0.0.1:8090')

function ChatDisplay() {
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await pb.collection('messages').getFullList({
                    // filter: "chatroom = 'testroom'",
                    sort: "+created"
                });
                setMessageList(result);
                
            } catch (error) {
                console.error("Error fetching data:", error)
            }
        }

        fetchData();
    }, []);

    return (
        <div className="chat-display text-center">
            {messageList.map((item: any) => {
                return <TextBubble key={item.id} text={item.text} sender={item.author} time={item.created}/>
            })}
        </div>
    );
}

export default ChatDisplay;