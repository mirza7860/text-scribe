
// Import ISO language utilities
const ISO6391 = {
  getName: (code: string): string => {
    const languages: { [key: string]: string } = {
      en: "English",
      fr: "French",
      es: "Spanish",
      de: "German",
      it: "Italian",
      pt: "Portuguese",
      nl: "Dutch",
      ru: "Russian",
      zh: "Chinese",
      ja: "Japanese",
      ko: "Korean",
      ar: "Arabic",
      hi: "Hindi",
      bn: "Bengali",
      pa: "Punjabi",
      te: "Telugu",
      mr: "Marathi",
      ta: "Tamil",
      ur: "Urdu",
      gu: "Gujarati",
      kn: "Kannada",
      ml: "Malayalam",
      th: "Thai",
      vi: "Vietnamese",
      // Add more as needed
    };
    return languages[code] || "Unknown";
  },
  getCode: (name: string): string => {
    const languages: { [key: string]: string } = {
      "English": "en",
      "French": "fr",
      "Spanish": "es",
      "German": "de",
      "Italian": "it",
      "Portuguese": "pt",
      "Dutch": "nl",
      "Russian": "ru",
      "Chinese": "zh",
      "Japanese": "ja",
      "Korean": "ko",
      "Arabic": "ar",
      "Hindi": "hi",
      "Bengali": "bn",
      "Punjabi": "pa",
      "Telugu": "te",
      "Marathi": "mr",
      "Tamil": "ta",
      "Urdu": "ur",
      "Gujarati": "gu",
      "Kannada": "kn",
      "Malayalam": "ml",
      "Thai": "th",
      "Vietnamese": "vi",
      // Add more as needed
    };
    return languages[name] || "en";
  }
};

export default ISO6391;
