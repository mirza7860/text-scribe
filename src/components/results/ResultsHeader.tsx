
import React from "react";
import ResultActionButtons from "./ResultActionButtons";

interface ResultsHeaderProps {
  activeTab: string;
  originalText: string;
  translatedText: string | null;
  summary: string;
  sourceLanguage: string;
  processingImage: string | null;
  resultRef: React.RefObject<HTMLDivElement>;
  onResultSaved: () => void;
}

const ResultsHeader: React.FC<ResultsHeaderProps> = ({
  activeTab,
  originalText,
  translatedText,
  summary,
  sourceLanguage,
  processingImage,
  resultRef,
  onResultSaved,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-gradient">Results</h2>
      <ResultActionButtons
        activeTab={activeTab}
        originalText={originalText}
        translatedText={translatedText}
        summary={summary}
        sourceLanguage={sourceLanguage}
        processingImage={processingImage}
        resultRef={resultRef}
        onResultSaved={onResultSaved}
      />
    </div>
  );
};

export default ResultsHeader;
