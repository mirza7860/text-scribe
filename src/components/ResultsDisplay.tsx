
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Save, Share2, Volume2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import { jsPDF } from "jspdf";
import { saveSummary } from "@/utils/storage";
import { SummaryItem } from "@/utils/types";
import { v4 as uuidv4 } from "uuid";
import html2canvas from "html2canvas";

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

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success("Text copied to clipboard");
  };

  const handleTextToSpeech = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    toast.success("Playing audio");
  };

  const downloadAsPDF = async () => {
    if (resultRef.current) {
      const canvas = await html2canvas(resultRef.current);
      const imgData = canvas.toDataURL('image/png');
      
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      });
      
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      
      pdf.addImage(imgData, 'PNG', imgX, 10, imgWidth * ratio, imgHeight * ratio);
      pdf.save('text-scribe-results.pdf');
      
      toast.success("Downloaded as PDF");
    }
  };

  const shareViaEmail = () => {
    const subject = "Text Scribe Summary";
    const body = `Original Text: ${originalText}\n\n${
      translatedText ? `Translated Text: ${translatedText}\n\n` : ""
    }Summary: ${summary}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    
    toast.success("Email client opened");
  };

  const saveResult = () => {
    const timestamp = new Date().toISOString();
    const newSummary: SummaryItem = {
      id: uuidv4(),
      timestamp,
      originalText,
      translatedText,
      summary,
      sourceLanguage,
      imageUrl: processingImage,
    };
    
    saveSummary(newSummary);
    onResultSaved();
    toast.success("Result saved successfully");
  };

  const hasResults = originalText || translatedText || summary;

  if (!hasResults) {
    return null;
  }

  return (
    <Card className="p-6 shadow-md border border-border mt-6" ref={resultRef}>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gradient">Results</h2>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => copyToClipboard(
              activeTab === "original" 
                ? originalText 
                : activeTab === "translated" 
                  ? translatedText || "" 
                  : summary
            )}
            title="Copy to clipboard"
          >
            <Copy size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => handleTextToSpeech(
              activeTab === "original" 
                ? originalText 
                : activeTab === "translated" 
                  ? translatedText || "" 
                  : summary
            )}
            title="Text to speech"
          >
            <Volume2 size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={downloadAsPDF}
            title="Download as PDF"
          >
            <Download size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={shareViaEmail}
            title="Share via email"
          >
            <Share2 size={16} />
          </Button>
          <Button
            variant="secondary"
            size="icon"
            onClick={saveResult}
            title="Save to library"
          >
            <Save size={16} />
          </Button>
        </div>
      </div>

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
    </Card>
  );
};

export default ResultsDisplay;
