import React from "react";

interface LanguageSelectorProps {
    selected: string;
    onSelect: (lang: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ selected, onSelect }) => {
    return (
        <select
            value={selected}
            onChange={(e) => onSelect(e.target.value)}
            className="p-2 border border-gray-400 rounded-md m-2"
        >
            <option value="EN">English</option>
            <option value="GUJ">Gujarati</option>
            <option value="HIN">Hindi</option>
            <option value="TAM">Tamil</option>
        </select>
    );
};

export default LanguageSelector;
