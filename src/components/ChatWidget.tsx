import React, { useState } from "react";
import ChatModal from "./ChatModal";
import { motion, AnimatePresence } from "framer-motion";
import { RiRobot3Fill } from "react-icons/ri";
import { CgClose } from "react-icons/cg";
import { ChatMessage } from "../types";

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([
        {
            id: Date.now(),
            sender: "ai",
            text: "How can I help you today?"
        }
    ]);

    return (
        <>
            {/* Floating Chat Button */}
            <motion.button
                whileTap={{ scale: 0.9 }}
                animate={{
                    rotate: isOpen ? 180 : 0,
                }}
                transition={{
                    duration: 0.25,
                    delay: -0.2,
                    ease: 'easeOut',
                }}
                onClick={() => setIsOpen((prev) => !prev)}
                className="fixed bottom-5 right-5 bg-zinc-900 text-white p-4 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-zinc-800 transition-all"
            >
                {isOpen ? <CgClose size={24} /> : <RiRobot3Fill size={24} />}
            </motion.button >


            {/* Chat Modal with Animation */}
            <AnimatePresence>
                {isOpen &&
                    <ChatModal
                        messages={messages}
                        setMessages={setMessages}
                        onClose={() => setIsOpen(false)}
                    />}
            </AnimatePresence >
        </>
    );
};

export default ChatWidget;
