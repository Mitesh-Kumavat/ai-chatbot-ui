import React, { useState } from "react";
import { motion } from "framer-motion";
import MessageList from "./MessageList";
import InputBox from "./InputBox";
import LanguageSelector from "./LanguageSelector";
import { ChatMessage } from "../types";
import { useChatAPI } from "../hooks/useChatAPI";

interface ChatModalProps {
    onClose: () => void;
}

const ChatModal: React.FC<ChatModalProps> = ({ onClose }) => {
    const [messages, setMessages] = useState<ChatMessage[]>([
        { id: Date.now(), sender: "ai", text: "How can I help you today?" },
    ]);
    const [language, setLanguage] = useState("EN");
    const { sendQuery } = useChatAPI();

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

    const handleClearChat = () => {
        setMessages([{ id: Date.now(), sender: "ai", text: "How can I help you today?" }]);
    };

    return (
        <>
            {/* Overlay Animation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="fixed inset-0 bg-black bg-opacity-30 z-40"
            />

            {/* Chat Modal Animation */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="fixed bottom-20 right-5 w-80 max-h-[500px] bg-white rounded-lg shadow-lg flex flex-col z-50 overflow-hidden"
            >
                {/* Header */}
                <div className="bg-blue-500 text-white p-3 flex justify-between items-center">
                    <span>Chat with AI</span>
                    <button onClick={handleClearChat} className="text-white hover:opacity-75">
                        Clear
                    </button>
                </div>

                {/* Chat Body */}
                <div className="flex-1 p-3 overflow-y-auto bg-gray-100">
                    <MessageList messages={messages} />
                </div>

                {/* Language Selector */}
                <LanguageSelector selected={language} onSelect={setLanguage} />

                {/* Input Box */}
                <InputBox onSend={handleSend} />
            </motion.div>
        </>
    );
};

export default ChatModal;
