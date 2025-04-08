
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResultsTabContentProps {
  originalText: string;
  translatedText: string | null;
  summary: string;
  sourceLanguage: string;
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const ResultsTabContent: React.FC<ResultsTabContentProps> = ({
  originalText,
  translatedText,
  summary,
  sourceLanguage,
  activeTab,
  setActiveTab,
}) => {
  return (
    <Tabs 
      defaultValue="original" 
      value={activeTab} 
      onValueChange={setActiveTab}
      className="w-full"
    >
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="original">
          Original Text {sourceLanguage && `(${sourceLanguage})`}
        </TabsTrigger>
        {translatedText && (
          <TabsTrigger value="translated">Translated (EN)</TabsTrigger>
        )}
        <TabsTrigger value="summary">Summary</TabsTrigger>
      </TabsList>
      
      <TabsContent value="original" className="mt-4 max-h-96 overflow-y-auto">
        <p className="whitespace-pre-wrap">{originalText}</p>
      </TabsContent>
      
      {translatedText && (
        <TabsContent value="translated" className="mt-4 max-h-96 overflow-y-auto">
          <p className="whitespace-pre-wrap">{translatedText}</p>
        </TabsContent>
      )}
      
      <TabsContent value="summary" className="mt-4 max-h-96 overflow-y-auto">
        <p className="whitespace-pre-wrap">{summary}</p>
      </TabsContent>
    </Tabs>
  );
};

export default ResultsTabContent;
