
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import ImageInput from "@/components/ImageInput";
import ProcessingControls from "@/components/ProcessingControls";
import ResultsDisplay from "@/components/ResultsDisplay";
import SummaryHistory from "@/components/SummaryHistory";
import { extractTextFromImage, detectLanguage } from "@/utils/textProcessing";
import { mockTranslate, mockSummarize } from "@/utils/mockAPI";
import { getSummaries } from "@/utils/storage";
import { SummaryItem } from "@/utils/types";
import { toast } from "@/components/ui/sonner";
import ISO6391 from "@/utils/languageUtils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Camera, FileText, ListChecks } from "lucide-react";

const Index = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState({ code: "", name: "" });
  const [isProcessing, setIsProcessing] = useState(false);
  const [summaries, setSummaries] = useState<SummaryItem[]>([]);
  const [activeTab, setActiveTab] = useState<"input" | "history">("input");

  useEffect(() => {
    loadSavedSummaries();
  }, []);

  const loadSavedSummaries = () => {
    const savedSummaries = getSummaries();
    setSummaries(savedSummaries);
  };

  const handleImageCapture = (imageData: string) => {
    setCapturedImage(imageData);
    resetResults();
  };

  const resetResults = () => {
    setExtractedText("");
    setTranslatedText(null);
    setSummary("");
    setSourceLanguage({ code: "", name: "" });
  };

  const processImage = async () => {
    if (!capturedImage) {
      toast.error("Please upload or capture an image first");
      return;
    }

    try {
      setIsProcessing(true);
      toast.info("Processing image...");

      // Step 1: Extract text using OCR
      const text = await extractTextFromImage(capturedImage);
      setExtractedText(text);
      toast.success("Text extracted successfully");

      // Step 2: Detect language
      const lang = detectLanguage(text);
      setSourceLanguage(lang);

      // Step 3: Translate if not in English
      if (lang.code !== "en") {
        toast.info(`Translating from ${lang.name} to English...`);
        const translated = await mockTranslate(text, lang.code);
        setTranslatedText(translated);
        toast.success("Translation complete");
      }

      // Step 4: Summarize the text
      toast.info("Generating summary...");
      const textToSummarize = translatedText || text;
      const summarized = await mockSummarize(textToSummarize);
      setSummary(summarized);
      toast.success("Summary generated");

    } catch (error) {
      console.error("Processing error:", error);
      toast.error("An error occurred during processing");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleResultSaved = () => {
    loadSavedSummaries();
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gradient">Text Scribe</h1>
          <p className="text-muted-foreground">
            Extract, translate, and summarize text from images
          </p>
        </header>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Button
            variant={activeTab === "input" ? "default" : "outline"}
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => setActiveTab("input")}
          >
            <Camera size={18} />
            <span>Capture & Process</span>
          </Button>
          <Button
            variant={activeTab === "history" ? "default" : "outline"}
            className="flex-1 flex items-center justify-center gap-2"
            onClick={() => setActiveTab("history")}
          >
            <ListChecks size={18} />
            <span>My Summaries {summaries.length > 0 && `(${summaries.length})`}</span>
          </Button>
        </div>

        {activeTab === "input" ? (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <div className="space-y-4">
              <ImageInput onImageCapture={handleImageCapture} />
              
              <ProcessingControls
                onProcess={processImage}
                isProcessing={isProcessing}
                hasImage={!!capturedImage}
              />
              
              {(extractedText || translatedText || summary) && (
                <ResultsDisplay
                  originalText={extractedText}
                  translatedText={translatedText}
                  summary={summary}
                  sourceLanguage={sourceLanguage.name}
                  processingImage={capturedImage}
                  onResultSaved={handleResultSaved}
                />
              )}
            </div>
          </ScrollArea>
        ) : (
          <ScrollArea className="h-[calc(100vh-200px)]">
            <SummaryHistory
              summaries={summaries}
              onHistoryChange={loadSavedSummaries}
            />
          </ScrollArea>
        )}
      </div>
    </div>
  );
};

export default Index;
