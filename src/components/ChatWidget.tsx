import React, { useState } from "react";
import ChatModal from "./ChatModal";
import { FaRobot } from "react-icons/fa";
import { motion } from "framer-motion";

const ChatWidget: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <motion.button
                whileTap={{ scale: 0.85 }}
                animate={{ scale: isOpen ? 0.8 : 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 10 }}
                onClick={() => setIsOpen((prev) => !prev)}
                className="fixed bottom-5 right-5 bg-blue-500 text-white p-4 rounded-full shadow-lg flex items-center justify-center text-2xl hover:bg-blue-600 transition-all"
            >
                <FaRobot />
            </motion.button>

            {isOpen && <ChatModal onClose={() => setIsOpen(false)} />}
        </>
    );
};

export default ChatWidget;
