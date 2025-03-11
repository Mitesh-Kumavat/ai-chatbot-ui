import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BiChevronDown } from "react-icons/bi";

interface LanguageSelectorProps {
    selected: string;
    onSelect: (lang: string) => void;
}

const languages = [
    { code: "EN", name: "English" },
    { code: "GUJ", name: "Gujarati" },
    { code: "HIN", name: "Hindi" },
    { code: "TAM", name: "Tamil" },
    { code: "URD", name: "Urdu" },
    { code: "PUN", name: "Punjabi" },
    { code: "TEL", name: "Telugu" },
    { code: "MAL", name: "Malayalam" },
    { code: "BEN", name: "Bengali" },
    { code: "MAR", name: "Marathi" },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selected, onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            {/* Dropdown Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between bg-zinc-100 text-zinc-800 py-2 px-3 rounded-md text-sm font-medium transition duration-200 hover:bg-zinc-300"
            >
                {languages.find((lang) => lang.code === selected)?.name || "Select Language"}
                <BiChevronDown className={`transition-transform ${isOpen ? "rotate-180" : ""}`} size={18} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.ul
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                        className="absolute mt-2 w-full bg-white rounded-md overflow-hidden z-50 text-zinc-800 border border-zinc-300 shadow-lg"
                    >
                        {languages.map(({ code, name }) => (
                            <li
                                key={code}
                                onClick={() => {
                                    onSelect(code);
                                    setIsOpen(false);
                                }}
                                className={`px-3 py-2 text-sm  text-zinc-900 cursor-pointer hover:bg-zinc-200 transition ${selected === code ? "bg-zinc-200 font-semibold" : ""
                                    }`}
                            >
                                {name}
                            </li>
                        ))}
                    </motion.ul>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LanguageSelector;
