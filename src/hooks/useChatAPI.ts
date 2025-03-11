import { useState } from "react";
import { ChatMessage } from "../types";

export const useChatAPI = () => {
    const [isLoading, setIsLoading] = useState(false);

    const sendQuery = (query: string, lang: string): Promise<ChatMessage> => {
        console.log(query, lang);
        setIsLoading(true);
        return new Promise((resolve) => {
            setTimeout(() => {
                // Static simulated responses (one with links, one without)
                const staticResponses: ChatMessage[] = [
                    {
                        id: Date.now(),
                        sender: "ai",
                        text: "This is a static response without any link.",
                        links: [],
                    },
                    {
                        id: Date.now(),
                        sender: "ai",
                        text: "Here is a response with useful links.",
                        links: [
                            { label: "Learn More", path: "/learn-more" },
                            { label: "Contact Us", path: "/contact" },
                        ],
                    },
                ];
                const response = staticResponses[Math.floor(Math.random() * staticResponses.length)];
                setIsLoading(false);
                resolve(response);
            }, 1000);
        });
    };

    return { sendQuery, isLoading };
};
