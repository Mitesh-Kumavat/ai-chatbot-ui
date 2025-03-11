import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChatMessage } from "../types";
import { useChatAPI } from "../hooks/useChatAPI";
import MessageList from "./MessageList";
import InputBox from "./InputBox";
import ChatMenu from "./ChatMenu";
import { BiChat, BiDotsHorizontalRounded } from "react-icons/bi";
import { IoChevronBack } from "react-icons/io5";

interface ChatModalProps {
    onClose: () => void;
    messages: ChatMessage[];
    isOpen: boolean,
    setMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose, messages, setMessages, isOpen }) => {
    const [language, setLanguage] = useState("EN");
    const { sendQuery } = useChatAPI();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // This is to reach the latest message(scroll automatically to the end of the message)
    useEffect(() => {
        const scrollToBottom = () => {
            if (messagesEndRef.current) {
                messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
            }
        };

        const timer = setTimeout(scrollToBottom, 100);

        return () => {
            clearTimeout(timer)
        };
    }, [messages, isOpen]);

    //  Function to handle send button
    const handleSend = async (query: string) => {
        const userMessage: ChatMessage = { id: Date.now(), sender: "user", text: query };
        setMessages((prev) => [...prev, userMessage]);

        const thinkingMessage: ChatMessage = {
            id: Date.now() + 1,
            sender: "ai",
            text: "",
            isThinking: true,
        };
        setMessages((prev) => [...prev, thinkingMessage]);

        const response = await sendQuery(query, language);

        setMessages((prev) =>
            prev.filter((msg) => !msg.isThinking).concat(response)
        );

    };

    // Function to handle the clear chats
    const handleClearChat = () => {
        setMessages([{ id: Date.now(), sender: "ai", text: "How can I help you today?" }]);
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: 25, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, scale: 1, y: 0, transformOrigin: "bottom right" }}
            exit={{ opacity: 0, scale: 0, y: 25, transformOrigin: "bottom right" }}
            transition={{ type: "spring", stiffness: 200, damping: 21 }}
            className="fixed bottom-20 border-zinc-200 border-[1px] right-5 w-80 min-h-[550px] max-h-[550px] bg-white rounded-lg shadow-lg flex flex-col z-50 overflow-hidden"
        >
            {/* Header */}
            <div className="bg-white text-zinc-800 gap-2 p-3 flex flex-col justify-between items-center border-b-zinc-200 border-b">
                <div className="flex items-center justify-between w-full">
                    {/* Back Button */}
                    <button
                        onClick={onClose}
                        className="text-zinc-800 p-1 rounded-full text-center bg-gray-200 hover:opacity-75"
                    >
                        <IoChevronBack size={18} />
                    </button>

                    {/* Title */}
                    <div className="flex flex-col items-center gap-2">
                        <span className="font-semibold">AI Chatbot</span>
                    </div>

                    {/* Menu Button */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-black p-1 rounded-full text-center bg-gray-200 hover:opacity-75 transition-all duration-200"
                    >
                        <BiDotsHorizontalRounded size={18} />
                    </button>

                    <AnimatePresence>
                        {/* Dropdown Menu */}
                        {isMenuOpen && (
                            <ChatMenu
                                language={language}
                                setLanguage={setLanguage}
                                onClearChat={handleClearChat}
                                onClose={() => setIsMenuOpen(false)}
                            />
                        )}
                    </AnimatePresence>
                </div>
                <span className="font-normal flex gap-1 items-center text-xs font-white bg-gray-200 px-2 py-1 rounded-xl">
                    <div className="bg-green-400 text-green-400 w-1.5 h-1.5 rounded-full"></div>
                    online
                </span>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-3 overflow-y-auto bg-gray-100">
                <MessageList messages={messages} />
                <div ref={messagesEndRef} />
            </div>


            {/* Input Box */}
            <InputBox onSend={handleSend} selectedLanguage={language} />

            {/* Footer */}
            <span className="flex bg-zinc-900 text-white justify-center items-center w-full mx-auto text-center text-xs gap-1 py-3">
                powered by <BiChat />
                <strong>
                    <a href="https://github.com/NeuralTechies/" target="_blank">Neural Techies</a>
                </strong>
            </span>
        </motion.div>
    );
};

export default ChatModal;
