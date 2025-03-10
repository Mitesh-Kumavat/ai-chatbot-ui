import React, { useState, useEffect } from "react";
import { FiMic, FiMicOff } from "react-icons/fi";
import { IoSend } from "react-icons/io5";
import useVoiceToText from "../hooks/useVoiceToText";

interface InputBoxProps {
    onSend: (message: string) => void;
}

const indianLanguages = [
    { code: "hi-IN", name: "Hindi" },
    { code: "gu-IN", name: "Gujarati" },
    { code: "mr-IN", name: "Marathi" },
    { code: "ta-IN", name: "Tamil" },
    { code: "te-IN", name: "Telugu" },
    { code: "kn-IN", name: "Kannada" },
    { code: "ml-IN", name: "Malayalam" },
    { code: "bn-IN", name: "Bengali" },
    { code: "pa-IN", name: "Punjabi" },
    { code: "ur-IN", name: "Urdu" }
];


const options = {
    lang: 'en-US',
    continuous: true,
}

const InputBox: React.FC<InputBoxProps> = ({ onSend }) => {
    const [message, setMessage] = useState("");
    const { transcript, isRecording, startRecording, stopRecording } = useVoiceToText({ options });

    const startStopRecording = () => {
        isRecording ? stopVoiceInput() : startRecording();
    }

    const handleSend = () => {
        if (message.trim() !== "") {
            onSend(message);
            setMessage("");
        }
    };

    const stopVoiceInput = () => {
        setMessage((prev) => prev + (transcript.length ? (prev.length ? '' : '') + transcript : ''))
        stopRecording();
    }

    return (
        <div className="flex items-center p-2 border-t border-gray-300 bg-white">
            <div className="flex items-center w-full bg-gray-100 rounded-full px-3 py-2 border border-gray-300">
                <button onClick={() => { startStopRecording() }} className="text-xl text-gray-600 hover:text-black mr-2">
                    {isRecording ? <FiMicOff color="#ff0000" /> : <FiMic color="#000" />}
                </button>
                <input
                    type="text"
                    placeholder="Type your query..."
                    disabled={isRecording}
                    value={isRecording ? message + (transcript.length ? (message.length ? "" : "") + transcript : message) : message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    className="flex-1 bg-transparent outline-none p-1 text-gray-800"
                />
                <button onClick={handleSend} disabled={isRecording} className="text-xl text-blue-500 hover:text-blue-700 ml-2">
                    <IoSend />
                </button>
            </div>
        </div>
    );
};

export default InputBox;
