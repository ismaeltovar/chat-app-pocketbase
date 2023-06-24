import React from "react";

function TextBubble({ text, sender, time} : {text: string, sender: string, time: string}) {
  return (
    <div>
        <div className="bubble-header">{sender} | {time}</div>
        <div className="bubble-body">{text}</div>
    </div>
    );
}