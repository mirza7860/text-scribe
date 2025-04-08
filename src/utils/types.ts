
export interface SummaryItem {
  id: string;
  timestamp: string;
  originalText: string;
  translatedText: string | null;
  summary: string;
  sourceLanguage: string;
  imageUrl: string | null;
}
