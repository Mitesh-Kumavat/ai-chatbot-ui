import React, { useState, useEffect, useRef } from "react";
import useVoiceToText from "../hooks/useVoiceToText";
import { TbSend } from "react-icons/tb";
import { IoIosMic, IoIosMicOff } from "react-icons/io";

interface InputBoxProps {
    onSend: (message: string) => void;
    selectedLanguage: string;
}

const languageMap: { [key: string]: string } = {
    EN: "en-US",
    GUJ: "gu-IN",
    HIN: "hi-IN",
    TAM: "ta-IN",
    URD: "ur-IN",
    PUN: "pa-IN",
    MAR: "mr-IN",
    BEN: "bn-IN",
    MAL: "ml-IN",
    TEL: "te-IN",
};


const InputBox: React.FC<InputBoxProps> = ({ onSend, selectedLanguage }) => {
    const [message, setMessage] = useState("");
    const langCode = languageMap[selectedLanguage] || "en-US";
    const options = {
        lang: langCode,
        continuous: true
    };

    const { transcript, isRecording, startRecording, stopRecording } = useVoiceToText({ options });

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const adjustTextareaHeight = () => {
        if (textareaRef.current && (message == "" || message.length < 20)) {
            textareaRef.current.style.height = "1px";
        }
        if (textareaRef.current && (message !== "" || message.length > 23)) {
            const scrollHeight = textareaRef.current.scrollHeight;
            textareaRef.current.style.height = `${Math.min(scrollHeight, 48)}px`;
        }
    };

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    const startStopRecording = () => {
        isRecording ? stopVoiceInput() : startRecording();
    };

    const handleSend = () => {
        if (message.trim() !== "") {
            onSend(message);
            setMessage("");
        }
    };

    const stopVoiceInput = () => {
        setMessage((prev) => prev + (transcript.length ? (prev.length ? " " : "") + transcript : ""));
        stopRecording();
    };

    return (
        <div className="flex items-center border-t-gray-100 bg-white">
            <div className="flex items-center w-full bg-white px-3 py-2 border border-gray-300">
                {/* Auto-Resizing Textarea */}
                <textarea
                    ref={textareaRef}
                    placeholder="Ask a question..."
                    disabled={isRecording}
                    value={isRecording ? message + (transcript.length ? (message.length ? " " : "") + transcript : message) : message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                    className="flex-1 items-center text-start transition-all text-sm bg-transparent outline-none px-1 mt-1 text-gray-800 resize-none overflow-hidden"
                    style={{ minHeight: "24px", maxHeight: "48px", lineHeight: "20px" }}
                />

                <div className="flex gap-2">
                    <button
                        onClick={startStopRecording}
                        className="text-xl text-white hover:bg-zinc-800 p-2 rounded-full bg-zinc-900 "
                    >
                        {isRecording ? <IoIosMicOff size={18} color="#ff0000" /> : <IoIosMic size={18} className="text-white" />}
                    </button>

                    <button
                        onClick={handleSend}
                        disabled={isRecording || message === ""}
                        className={`text-xl text-white hover:bg-zinc-800 p-2 bg-zinc-900 rounded-full text-center items-center  
                    ${(isRecording || message === "") && "cursor-not-allowed"}`}
                    >

                        <TbSend size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputBox;