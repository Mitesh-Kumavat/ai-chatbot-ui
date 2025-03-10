import { useEffect, useRef, useState } from "react";

interface VoiceToTextOptions {
    interimResults?: boolean;
    lang?: string;
    continuous?: boolean;
}

const useVoiceToText = ({ options }: { options: VoiceToTextOptions }) => {
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [transcript, setTranscript] = useState<string>("");
    const recognitionRef = useRef<any>(null);

    useEffect(() => {
        if (!("webkitSpeechRecognition" in window)) {
            console.log("Web Speech API is not supported");
            return;
        }

        const SpeechRecognitionAPI =
            (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        const SpeechGrammarListAPI =
            (window as any).SpeechGrammarList || (window as any).webkitSpeechGrammarList;

        recognitionRef.current = new SpeechRecognitionAPI();
        const recognition = recognitionRef.current;

        recognition.interimResults = options?.interimResults ?? true;
        recognition.lang = options?.lang ?? "en-US";
        recognition.continuous = options?.continuous ?? false;

        if (SpeechGrammarListAPI) {
            const grammar = `#JSGF V1.0; grammar punctuation; public <punc> = , | . | ; | : |! ;`;
            const speechRecognitionList = new SpeechGrammarListAPI();
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList;
        }

        recognition.onresult = (e: any) => {
            let text = "";
            for (let i = 0; i < e.results.length; i++) {
                text += e.results[i][0].transcript;
            }
            setTranscript(text);
        };

        recognition.onerror = (e: any) => {
            console.error("Speech recognition error:", e.error);
        };

        recognition.onend = () => {
            setIsRecording(false);
            setTranscript("");
        };

        return () => {
            recognition.stop();
        };
    }, [options?.interimResults, options?.lang, options?.continuous]);

    const startRecording = () => {
        if (recognitionRef.current && !isRecording) {
            recognitionRef.current.start();
            setIsRecording(true);
        }
    };

    const stopRecording = () => {
        if (recognitionRef.current && isRecording) {
            recognitionRef.current.stop();
            setIsRecording(false);
        }
    };

    return { isRecording, transcript, startRecording, stopRecording };
};

export default useVoiceToText;
