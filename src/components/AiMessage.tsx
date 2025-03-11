import React, { useState, useEffect } from "react";
import { ChatMessage } from "../types";
import { RiRobot3Fill } from "react-icons/ri";
import AnimatedText from "./AnimatedText";

interface AIMessageProps {
    message: ChatMessage;
}

const AIMessage: React.FC<AIMessageProps> = ({ message }) => {
    const [showLinks, setShowLinks] = useState(false);
    const [finalText, setFinalText] = useState("");

    useEffect(() => {
        if (message.text) {
            setFinalText(message.text);
        }
    }, [message.text]);

    return (
        <>
            <div className="flex items-start gap-2">

                {/* AI Icon */}
                <div className="w-7 h-7 flex mt-1 items-center justify-center bg-zinc-800 rounded-full">
                    <RiRobot3Fill className="text-md text-white" />
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
                        <AnimatedText fullText={finalText} onComplete={() => setShowLinks(true)} />
                    )}
                </li>
            </div>

            {showLinks && message.links && message.links.length > 0 && (
                <div className="flex justify-start pl-10">
                    <li className="mt-1 min-w-[87%] flex flex-col gap-1">
                        {message.links.map((link, idx) => (
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
        </>
    );
};

export default AIMessage;
