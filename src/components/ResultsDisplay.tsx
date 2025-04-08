
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import ResultsHeader from "@/components/results/ResultsHeader";
import ResultsTabContent from "@/components/results/ResultsTabContent";

interface ResultsDisplayProps {
  originalText: string;
  translatedText: string | null;
  summary: string;
  sourceLanguage: string;
  processingImage: string | null;
  onResultSaved: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({
  originalText,
  translatedText,
  summary,
  sourceLanguage,
  processingImage,
  onResultSaved,
}) => {
  const [activeTab, setActiveTab] = useState("original");
  const resultRef = React.useRef<HTMLDivElement>(null);

  const hasResults = originalText || translatedText || summary;

  if (!hasResults) {
    return null;
  }

  return (
    <Card className="p-6 shadow-md border border-border mt-6" ref={resultRef}>
      <ResultsHeader
        activeTab={activeTab}
        originalText={originalText}
        translatedText={translatedText}
        summary={summary}
        sourceLanguage={sourceLanguage}
        processingImage={processingImage}
        resultRef={resultRef}
        onResultSaved={onResultSaved}
      />

      <ResultsTabContent
        originalText={originalText}
        translatedText={translatedText}
        summary={summary}
        sourceLanguage={sourceLanguage}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </Card>
  );
};

export default ResultsDisplay;
