

import { GoogleGenerativeAI } from "@google/generative-ai";

// Using the provided API key
const API_KEY = "AIzaSyBo7a64UiZZIkxPNvt4Q36cPsutf-UJ_YQ";

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Generate a summary of text using Google's Gemini API
 * @param text Text to summarize
 * @returns Generated summary
 */
export const summarizeWithGemini = async (text: string): Promise<string> => {
  try {
    // Use the specified model: gemini-2.0-flash-lite
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-lite" 
    });
    
    const prompt = `Summarize the following text concisely and clearly. 
    Focus on the most important points and key information:
    
    TEXT TO SUMMARIZE:
    ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();
    
    return summary || text;
  } catch (error) {
    console.error("Error using Gemini API:", error);
    
    // Fallback to basic summarization if API call fails
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

/**
 * Translate text using Google's Gemini API
 * @param text Text to translate
 * @param sourceLanguage Source language name
 * @returns Translated text
 */
export const translateWithGemini = async (text: string, sourceLanguage: string): Promise<string> => {
  try {
    // Use the specified model: gemini-2.0-flash-lite
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash-lite" 
    });
    
    const prompt = `Translate the following text from ${sourceLanguage} to English. 
    Maintain the original meaning, tone, and style as much as possible.
    
    TEXT TO TRANSLATE:
    ${text}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const translation = response.text();
    
    return translation || text;
  } catch (error) {
    console.error("Error using Gemini API for translation:", error);
    
    // Fallback if API call fails
    return `[Translation from ${sourceLanguage} to English failed - API error]\n\n${text}`;
  }
};
