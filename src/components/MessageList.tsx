import React from "react";
import { ChatMessage } from "../types";
import { RiRobot3Fill } from "react-icons/ri";

interface MessageListProps {
    messages: ChatMessage[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
    return (
        <ul className="list-none p-0 m-0 flex flex-col">
            {messages.map((msg) => (
                <React.Fragment key={msg.id}>
                    {/* AI Message */}
                    {msg.sender === "ai" ? (
                        <div className="flex items-start gap-2">
                            {/* AI Icon */}
                            <div className="w-7 h-7 flex mt-1 items-center justify-center bg-zinc-800 rounded-full">
                                <RiRobot3Fill className="text-md text-white" />
                            </div>

                            {/* AI Response Bubble */}
                            <li className="p-3 my-1 rounded-tl-none text-sm max-w-[75%] rounded-xl relative bg-zinc-200 text-zinc-800">
                                {msg.text}

                                {/* Typing Dots */}
                                {msg.isThinking && (
                                    <div className="flex items-center mt-1">
                                        <span className="typing-dots flex space-x-1">
                                            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"></span>
                                            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce delay-150"></span>
                                            <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce delay-300"></span>
                                        </span>
                                    </div>
                                )}
                            </li>
                        </div>
                    ) : (
                        // User Message
                        <li className="relative px-4 py-2 my-2 text-sm max-w-[75%] rounded-xl rounded-tr-none bg-zinc-800 text-white self-end">
                            {msg.text}

                        </li>
                    )}

                    {/* Links (if any) */}
                    {msg.links && msg.links.length > 0 && (
                        <div className="flex justify-start pl-10">
                            <li className="mt-1 min-w-[87%] flex flex-col gap-1">
                                {msg.links.map((link, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => window.location.assign(link.path)}
                                        className="text-sm font-normal min-w-full py-1.5 bg-zinc-800 text-white rounded-lg"
                                    >
                                        {link.label}
                                    </button>
                                ))}
                            </li>
                        </div>
                    )}
                </React.Fragment>
            ))}
        </ul>
    );
};

export default MessageList; 