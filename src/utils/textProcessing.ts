
import { createWorker } from "tesseract.js";
import { franc } from "franc";
import ISO6391 from "@/utils/languageUtils";

// Helper function to map language codes between franc and ISO standards
const mapLangCode = (francCode: string): string => {
  const isoMap: { [key: string]: string } = {
    eng: "en",
    deu: "de",
    fra: "fr",
    spa: "es",
    ita: "it",
    por: "pt",
    rus: "ru",
    jpn: "ja",
    zho: "zh",
    kor: "ko",
    ara: "ar",
    hin: "hi",
    // Add more mappings as needed
  };

  return isoMap[francCode] || francCode;
};

// Extract text using tesseract.js
export const extractTextFromImage = async (imageData: string): Promise<string> => {
  try {
    const worker = await createWorker();
    await worker.loadLanguage("eng+fra+deu+spa+ita+por+rus+jpn+ara");
    await worker.initialize("eng+fra+deu+spa+ita+por+rus+jpn+ara");
    
    const { data } = await worker.recognize(imageData);
    await worker.terminate();
    
    return data.text;
  } catch (error) {
    console.error("OCR error:", error);
    throw new Error("Failed to extract text from the image");
  }
};

// Detect language using franc
export const detectLanguage = (text: string): { code: string; name: string } => {
  try {
    if (!text || text.trim().length < 10) {
      return { code: "en", name: "English" };
    }
    
    const langCode = franc(text, { minLength: 10 });
    
    if (langCode === "und") {
      return { code: "en", name: "English" };
    }
    
    const isoCode = mapLangCode(langCode);
    const langName = ISO6391.getName(isoCode) || "Unknown";
    
    return { code: isoCode, name: langName };
  } catch (error) {
    console.error("Language detection error:", error);
    return { code: "en", name: "English" };
  }
};

// Translate text (simplified mock version for now - in production you would use a real translation API)
export const translateText = async (
  text: string,
  sourceLang: string
): Promise<string | null> => {
  // If the text is already in English, no translation needed
  if (sourceLang === "en") {
    return null;
  }
  
  try {
    // In a real application, you would use Google Translate API here
    // For demonstration, we'll simply add a note indicating this would be translated
    return `[Translation from ${ISO6391.getName(sourceLang) || sourceLang} to English]\n\n${text}`;
    
    // Actual Google Translation API implementation would be something like:
    // const translate = new Translate({ projectId: 'your-project-id' });
    // const [translation] = await translate.translate(text, 'en');
    // return translation;
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Failed to translate text");
  }
};

// Summarize text (simplified mock version for now - in production you would use a real AI API)
export const summarizeText = async (text: string): Promise<string> => {
  try {
    // In a real application, you would use an AI API here
    // For demonstration, we'll create a simple summary
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length <= 3) {
      return text;
    }
    
    // Simple summarization: take first sentence and some key sentences
    const firstSentence = sentences[0];
    const middleSentence = sentences[Math.floor(sentences.length / 2)];
    const lastSentence = sentences[sentences.length - 1];
    
    return `Summary:\n\n${firstSentence}. ${middleSentence}. ${lastSentence}.`;
    
    // Actual AI API implementation would be something like:
    // const response = await fetch('https://api.openai.com/v1/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: "gpt-3.5-turbo-instruct",
    //     prompt: `Summarize this text in a few bullet points:\n\n${text}`,
    //     max_tokens: 250
    //   })
    // });
    // const data = await response.json();
    // return data.choices[0].text.trim();
  } catch (error) {
    console.error("Summarization error:", error);
    throw new Error("Failed to summarize text");
  }
};
