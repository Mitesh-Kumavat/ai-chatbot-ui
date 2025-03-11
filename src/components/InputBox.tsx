import React, { useState, useEffect, useRef } from "react";
import useVoiceToText from "../hooks/useVoiceToText";

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
                        {isRecording ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="red" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mic-off">
                                <line x1="2" x2="22" y1="2" y2="22" /><path d="M18.89 13.23A7.12 7.12 0 0 0 19 12v-2" /><path d="M5 10v2a7 7 0 0 0 12 5" /><path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" /><path d="M9 9v3a3 3 0 0 0 5.12 2.12" /><line x1="12" x2="12" y1="19" y2="22" />
                            </svg>
                        )
                            : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mic">
                                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" /><path d="M19 10v2a7 7 0 0 1-14 0v-2" /><line x1="12" x2="12" y1="19" y2="22" />
                                </svg>
                            )
                        }
                    </button>

                    <button
                        onClick={handleSend}
                        disabled={isRecording || message === ""}
                        className={`text-xl text-white hover:bg-zinc-800 p-2 bg-zinc-900 rounded-full text-center items-center  
                    ${(isRecording || message === "") && "cursor-not-allowed"}`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="text-center lucide lucide-send"><path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" /><path d="m21.854 2.147-10.94 10.939" /></svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InputBox;