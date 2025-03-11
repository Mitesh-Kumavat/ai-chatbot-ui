import React, { useEffect, useState } from "react";

interface AnimatedTextProps {
    fullText: string;
    onComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({ fullText, onComplete }) => {
    const [displayedText, setDisplayedText] = useState("");
    const words = fullText.split(" ");

    useEffect(() => {
        let index = 0;
        setDisplayedText("");

        const interval = setInterval(() => {
            if (index < words.length) {
                setDisplayedText((_) => words.slice(0, index + 1).join(" "));
                index++;
            } else {
                clearInterval(interval);
                if (onComplete) onComplete();
            }
        }, 150);

        return () => clearInterval(interval);
    }, [fullText]);

    return <span>{displayedText}</span>;
};

export default AnimatedText;
