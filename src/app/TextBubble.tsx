import React from "react";

function TextBubble({ text, sender, time} : {text: string, sender: string, time: string}) {
  return (
    <div className="text-center w-3/4 flex flex-col">
        <div id="bubble-header" className="">{sender} | {time}</div>
        <div id="bubble-body" className="px-3 py-5 my-3 bg-green-200 rounded-2xl break-words" >{text}</div>
    </div>
    );
}

export default TextBubble