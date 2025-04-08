
import { SummaryItem } from "./types";

const STORAGE_KEY = "text-scribe-summaries";

export const saveSummary = (summary: SummaryItem): void => {
  try {
    const existingSummaries = getSummaries();
    const newSummaries = [summary, ...existingSummaries];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSummaries));
  } catch (error) {
    console.error("Error saving summary:", error);
  }
};

export const getSummaries = (): SummaryItem[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error retrieving summaries:", error);
    return [];
  }
};

export const deleteSummary = (id: string): void => {
  try {
    const summaries = getSummaries();
    const filteredSummaries = summaries.filter(item => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredSummaries));
  } catch (error) {
    console.error("Error deleting summary:", error);
  }
};

export const clearAllSummaries = (): void => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing summaries:", error);
  }
};
