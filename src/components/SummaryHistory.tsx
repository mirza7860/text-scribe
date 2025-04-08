
import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { SummaryItem } from "@/utils/types";
import { ChevronDown, ChevronUp, Trash2 } from "lucide-react";
import { deleteSummary, clearAllSummaries } from "@/utils/storage";
import { toast } from "@/components/ui/sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SummaryHistoryProps {
  summaries: SummaryItem[];
  onHistoryChange: () => void;
}

const SummaryHistory: React.FC<SummaryHistoryProps> = ({
  summaries,
  onHistoryChange,
}) => {
  const [openSummaryId, setOpenSummaryId] = useState<string | null>(null);

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleDeleteSummary = (id: string) => {
    deleteSummary(id);
    onHistoryChange();
    toast.success("Summary deleted");
  };

  const handleClearAll = () => {
    clearAllSummaries();
    onHistoryChange();
    toast.success("All summaries cleared");
  };

  if (summaries.length === 0) {
    return (
      <Card className="p-6 shadow-md border border-border mt-6 text-center">
        <h2 className="text-xl font-semibold mb-4 text-gradient">My Summaries</h2>
        <p className="text-muted-foreground">No saved summaries yet.</p>
      </Card>
    );
  }

  return (
    <Card className="p-6 shadow-md border border-border mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gradient">My Summaries</h2>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm">
              <Trash2 size={16} className="mr-2" /> Clear All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all your saved summaries. This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleClearAll}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {summaries.map((summary) => (
          <Card
            key={summary.id}
            className="p-4 border border-muted hover:border-primary/30 transition-colors"
          >
            <Collapsible
              open={openSummaryId === summary.id}
              onOpenChange={() =>
                setOpenSummaryId(
                  openSummaryId === summary.id ? null : summary.id
                )
              }
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-medium">
                    {summary.originalText.substring(0, 50).trim()}
                    {summary.originalText.length > 50 ? "..." : ""}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {formatDate(summary.timestamp)}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 size={16} className="text-destructive/70 hover:text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete this summary. This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteSummary(summary.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="icon">
                      {openSummaryId === summary.id ? (
                        <ChevronUp size={16} />
                      ) : (
                        <ChevronDown size={16} />
                      )}
                    </Button>
                  </CollapsibleTrigger>
                </div>
              </div>
              <CollapsibleContent className="mt-2 space-y-2">
                {summary.imageUrl && (
                  <div className="mb-2">
                    <img
                      src={summary.imageUrl}
                      alt="Original image"
                      className="max-h-[200px] object-contain rounded border border-muted"
                    />
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium">Original Text:</h4>
                  <p className="text-sm whitespace-pre-wrap bg-muted p-2 rounded max-h-[150px] overflow-y-auto">
                    {summary.originalText}
                  </p>
                </div>
                {summary.translatedText && (
                  <div>
                    <h4 className="text-sm font-medium">Translated Text:</h4>
                    <p className="text-sm whitespace-pre-wrap bg-muted p-2 rounded max-h-[150px] overflow-y-auto">
                      {summary.translatedText}
                    </p>
                  </div>
                )}
                <div>
                  <h4 className="text-sm font-medium">Summary:</h4>
                  <p className="text-sm whitespace-pre-wrap bg-muted p-2 rounded max-h-[150px] overflow-y-auto">
                    {summary.summary}
                  </p>
                </div>
              </CollapsibleContent>
            </Collapsible>
          </Card>
        ))}
      </div>
    </Card>
  );
};

export default SummaryHistory;
