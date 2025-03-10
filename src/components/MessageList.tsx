import React from "react";
import { ChatMessage } from "../types";

interface MessageListProps {
    messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <ul className="list-none p-0 m-0 flex flex-col">
            {messages.map((msg) => (
                <li
                    key={msg.id}
                    className={`p-3 my-2 max-w-[80%] rounded-lg relative flex ${msg.sender === "ai"
                        ? "bg-gray-200 text-black self-start justify-start"
                        : "bg-blue-500 text-white self-end justify-end"
                        }`}
                >
                    <div>
                        {msg.text}
                        {msg.isThinking && (
                            <div className="flex items-center mt-1">
                                <span className="typing-dots">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                        )}
                        {msg.links && msg.links.length > 0 && (
                            <div className="mt-2 flex flex-col gap-2">
                                {msg.links.map((link, index) => (
                                    <button
                                        key={index}
                                        onClick={() => window.location.assign(link.path)}
                                        className="px-3 py-1 bg-blue-600 text-white rounded-md"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default MessageList;
