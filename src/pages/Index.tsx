
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import ImageInput from "@/components/ImageInput";
import ProcessingControls from "@/components/ProcessingControls";
import ResultsDisplay from "@/components/ResultsDisplay";
import { extractTextFromImage, detectLanguage, summarizeText } from "@/utils/textProcessing";
import { translateText } from "@/utils/textProcessing";
import { toast } from "sonner";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Camera, FileText, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState("");
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [summary, setSummary] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState({ code: "", name: "" });
  const [isProcessing, setIsProcessing] = useState(false);

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
        const translated = await translateText(text, lang.code);
        setTranslatedText(translated);
        toast.success("Translation complete");
      }

      // Step 4: Summarize the text
      toast.info("Generating summary with Gemini AI...");
      const textToSummarize = translatedText || text;
      const summarized = await summarizeText(textToSummarize);
      setSummary(summarized);
      toast.success("Summary generated");

    } catch (error) {
      console.error("Processing error:", error);
      toast.error("An error occurred during processing");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gradient">Process Your Images</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Extract text from images, detect the language, translate if needed, 
            and generate concise summaries using Gemini AI
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="p-6 shadow-md border border-border">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              <span>Capture Image</span>
            </h2>
            <div className="space-y-6">
              <ImageInput onImageCapture={handleImageCapture} />
              
              <ProcessingControls
                onProcess={processImage}
                isProcessing={isProcessing}
                hasImage={!!capturedImage}
              />
            </div>
          </Card>

          <ScrollArea className="h-[calc(100vh-250px)]">
            <div className="space-y-4">
              {(extractedText || translatedText || summary) ? (
                <ResultsDisplay
                  originalText={extractedText}
                  translatedText={translatedText}
                  summary={summary}
                  sourceLanguage={sourceLanguage.name}
                  processingImage={capturedImage}
                  onResultSaved={() => {
                    toast.success("Summary saved to your collection");
                  }}
                />
              ) : (
                <Card className="p-6 shadow-md border border-border text-center">
                  <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No Text Processed Yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Upload or capture an image and press "Process Image" to extract and summarize text
                  </p>
                  
                  <div className="mt-6 border-t pt-6 border-border">
                    <h4 className="font-medium mb-2">View Your Saved Summaries</h4>
                    <Button asChild variant="outline" className="mt-2">
                      <Link to="/summaries" className="flex items-center gap-2">
                        Go to Summaries
                        <ArrowRight size={16} />
                      </Link>
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};

export default Index;
