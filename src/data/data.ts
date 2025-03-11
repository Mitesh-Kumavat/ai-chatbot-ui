// Languages that will be used by the chatbots, you can add and remove.
export const languageMap: { [key: string]: string } = {
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

// These will be usefull for the dropdown selection, make sure code will be same as the key of languageMap
export const languages = [
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