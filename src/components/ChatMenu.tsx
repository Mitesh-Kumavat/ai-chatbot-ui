import React from "react";
import { motion } from "framer-motion";
import LanguageSelector from "./LanguageSelector";
import { PiChatSlashFill } from "react-icons/pi";

interface ChatMenuProps {
    language: string;
    setLanguage: (lang: string) => void;
    onClearChat: () => void;
    onClose: () => void;
}

const ChatMenu: React.FC<ChatMenuProps> = ({ language, setLanguage, onClearChat, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="absolute z-[999] top-12 right-3 bg-gray-200 shadow-lg rounded-lg p-2.5 w-36 text-gray-200"
        >
            {/* Language Selector */}
            <LanguageSelector selected={language} onSelect={setLanguage} onClose={onClose} />

            {/* Clear Chat */}
            <button
                onClick={() => {
                    onClearChat();
                    onClose();
                }}
                className="w-full flex gap-2 justify-center items-center text-center text-sm text-zinc-800 bg-gray-100 hover:bg-zinc-300 p-2 rounded mt-2 transition-all duration-200"
            >
                <PiChatSlashFill className="text-zinc-800 " />
                Clear Chat
            </button>
        </motion.div>
    );
};

export default ChatMenu;
