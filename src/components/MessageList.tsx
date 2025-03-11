import React from "react";
import { ChatMessage } from "../types";
import AIMessage from "./AiMessage";

interface MessageListProps {
    messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <ul className="list-none p-0 m-0 flex flex-col">
            {messages.map((msg) => (
                <React.Fragment key={msg.id}>
                    {msg.sender === "ai" ? <AIMessage message={msg} /> : (
                        <li className="relative px-4 py-2 my-2 text-sm max-w-[75%] rounded-xl rounded-tr-none bg-zinc-800 text-white self-end">
                            {msg.text}
                        </li>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default MessageList;
