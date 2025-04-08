
import React from "react";
import { Button } from "@/components/ui/button";
import { Copy, Download, Save, Share2, Volume2 } from "lucide-react";
import { toast } from "sonner";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import { saveSummary } from "@/utils/storage";
import { SummaryItem } from "@/utils/types";
import { v4 as uuidv4 } from "uuid";

interface ResultActionButtonsProps {
  activeTab: string;
  originalText: string;
  translatedText: string | null;
  summary: string;
  sourceLanguage: string;
  processingImage: string | null;
  resultRef: React.RefObject<HTMLDivElement>;
  onResultSaved: () => void;
}

const ResultActionButtons: React.FC<ResultActionButtonsProps> = ({
  activeTab,
  originalText,
  translatedText,
  summary,
  sourceLanguage,
  processingImage,
  resultRef,
  onResultSaved,
}) => {
  const getActiveText = () => {
    switch (activeTab) {
      case "original":
        return originalText;
      case "translated":
        return translatedText || "";
      case "summary":
        return summary;
      default:
        return "";
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(getActiveText());
    toast.success("Text copied to clipboard");
  };

  const handleTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(getActiveText());
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

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={copyToClipboard}
        title="Copy to clipboard"
      >
        <Copy size={16} />
      </Button>
      <Button
        variant="outline"
        size="icon"
        onClick={handleTextToSpeech}
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
  );
};

export default ResultActionButtons;
