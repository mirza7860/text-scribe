
import { createWorker } from "tesseract.js";
import { franc } from "franc";
import ISO6391 from "@/utils/languageUtils";
import { summarizeWithGemini, translateWithGemini } from "./geminiAPI";

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

// Translate text using Gemini
export const translateText = async (
  text: string,
  sourceLang: string
): Promise<string | null> => {
  if (sourceLang === "en") {
    return null;
  }
  
  try {
    const languageName = ISO6391.getName(sourceLang) || sourceLang;
    return await translateWithGemini(text, languageName);
  } catch (error) {
    console.error("Translation error:", error);
    throw new Error("Failed to translate text");
  }
};

// Summarize text using Gemini API
export const summarizeText = async (text: string): Promise<string> => {
  try {
    return await summarizeWithGemini(text);
  } catch (error) {
    console.error("Summarization error:", error);
    throw new Error("Failed to summarize text");
  }
};
