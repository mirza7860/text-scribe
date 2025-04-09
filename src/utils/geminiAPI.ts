
import { GoogleGenerativeAI } from "@google/generative-ai";

// This is a placeholder API key for demonstration. In a production environment, 
// this should be stored in a secure environment variable
const API_KEY = "YOUR_GEMINI_API_KEY";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Generate a summary of text using Google's Gemini API
 * @param text Text to summarize
 * @returns Generated summary
 */
export const summarizeWithGemini = async (text: string): Promise<string> => {
  try {
    if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY") {
      throw new Error("Gemini API key not configured. Using fallback summarization.");
    }

    // For texts that are too short, return original
    if (text.split(" ").length < 20) {
      return text;
    }

    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `Summarize the following text in a concise and clear manner. 
    Focus on the main points and key information. Format the summary with bullet points.
    
    TEXT TO SUMMARIZE:
    ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    
    return summary || text;
  } catch (error) {
    console.error("Error using Gemini API:", error);
    
    // Fallback to basic summarization
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    if (sentences.length <= 3) {
      return text;
    }
    
    const firstSentence = sentences[0];
    const middleSentence = sentences[Math.floor(sentences.length / 2)];
    const lastSentence = sentences[sentences.length - 1];
    
    return `Summary:\n\n• ${firstSentence}.\n• ${middleSentence}.\n• ${lastSentence}.`;
  }
};
