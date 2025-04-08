
// This file contains mock implementations of APIs for demo purposes
// In a real application, you would replace these with actual API calls

// Mock translation service
export const mockTranslate = async (text: string, sourceLanguage: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (sourceLanguage === 'en') {
    return text;
  }
  
  // For non-English text, return a mock translation
  // This would be replaced with an actual translation API in production
  return `[This is a simulated translation of the text from ${sourceLanguage} to English]\n\n${text}`;
};

// Mock AI summarization service
export const mockSummarize = async (text: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Simple summarization logic for demo purposes
  const sentences = text.split(/[.!?]+/).filter(sentence => sentence.trim().length > 0);
  
  if (sentences.length <= 3) {
    return text;
  }
  
  // For longer text, create a mock summary with bullet points
  const firstSentence = sentences[0].trim();
  const middleSentence = sentences[Math.floor(sentences.length / 2)].trim();
  const lastSentence = sentences[sentences.length - 1].trim();
  
  return `Summary of the extracted text:\n\n• ${firstSentence}.\n• ${middleSentence}.\n• ${lastSentence}.`;
};
