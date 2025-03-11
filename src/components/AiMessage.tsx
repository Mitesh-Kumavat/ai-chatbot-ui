import React, { useEffect } from "react";
import { ChatMessage } from "../types";

interface AIMessageProps {
    message: ChatMessage;
}

const AIMessage: React.FC<AIMessageProps> = ({ message }) => {

    useEffect(() => {
    }, [message.id]);

    return (
        <>
            <div className="flex items-start gap-2">
                {/* AI Icon */}
                <div className="w-7 h-7 flex mt-1 items-center justify-center bg-zinc-800 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide text-white lucide-bot">
                        <path d="M12 8V4H8" />
                        <rect width="16" height="12" x="4" y="8" rx="2" />
                        <path d="M2 14h2" />
                        <path d="M20 14h2" />
                        <path d="M15 13v2" />
                        <path d="M9 13v2" />
                    </svg>
                </div>

                {/* AI Response */}
                <li className="p-3 my-1 rounded-tl-none text-sm max-w-[75%] rounded-xl relative bg-zinc-200 text-zinc-800">
                    {message.isThinking ? (
                        <div className="flex items-center mt-1">
                            <span className="typing-dots flex space-x-1">
                                <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce delay-150"></span>
                                <span className="w-1.5 h-1.5 bg-zinc-600 rounded-full animate-bounce delay-300"></span>
                            </span>
                        </div>
                    ) : (
                        <span>
                            {message.text}
                        </span>
                    )}
                </li>
            </div>

            {/* Links Section */}
            {message.links && message.links.length > 0 && (
                <div className="flex justify-start pl-10">
                    <li className=" min-w-[87%] flex flex-col gap-1">
                        {message.links.map((link, idx) => (
                            <button
                                key={idx}
                                onClick={() => window.location.assign(link.path)}
                                className="text-sm font-normal min-w-full py-1.5 bg-zinc-200 text-zinc-900 border border-zinc-900 hover:bg-zinc-800 hover:text-white transition-all duration-200 ease-in-out rounded-lg"
                            >
                                {link.label}
                            </button>
                        ))}
                    </li>
                </div>
            )}
        </>
    );
};

export default AIMessage;
