
import React, { useState, useEffect } from "react";
import { getSummaries } from "@/utils/storage";
import { SummaryItem } from "@/utils/types";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { ExternalLink, FileText, X } from "lucide-react";
import { clearAllSummaries, deleteSummary } from "@/utils/storage";
import { toast } from "sonner";
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

const Summaries = () => {
  const [summaries, setSummaries] = useState<SummaryItem[]>([]);
  const [selectedSummary, setSelectedSummary] = useState<SummaryItem | null>(null);

  useEffect(() => {
    loadSummaries();
  }, []);

  const loadSummaries = () => {
    const savedSummaries = getSummaries();
    setSummaries(savedSummaries);
  };

  const handleDeleteSummary = (id: string) => {
    deleteSummary(id);
    if (selectedSummary?.id === id) {
      setSelectedSummary(null);
    }
    loadSummaries();
    toast.success("Summary deleted");
  };

  const handleClearAll = () => {
    clearAllSummaries();
    setSelectedSummary(null);
    loadSummaries();
    toast.success("All summaries cleared");
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getPreviewText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto py-8 px-4">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 text-gradient">My Summaries</h1>
          <p className="text-muted-foreground">
            View and manage all your processed text summaries
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* List of Summaries */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                Saved Summaries ({summaries.length})
              </h2>
              {summaries.length > 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="outline" size="sm">Clear All</Button>
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
              )}
            </div>

            {summaries.length === 0 ? (
              <Card className="p-6 text-center bg-muted/50">
                <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                <h3 className="font-medium mb-1">No summaries yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Process some text to create summaries
                </p>
                <Button asChild variant="default">
                  <a href="/process">Go to Process</a>
                </Button>
              </Card>
            ) : (
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-3 pr-2">
                  {summaries.map((summary) => (
                    <Card
                      key={summary.id}
                      className={`p-4 cursor-pointer transition-all hover:border-primary/50 ${
                        selectedSummary?.id === summary.id
                          ? "border-primary bg-primary/5"
                          : "border-muted"
                      }`}
                      onClick={() => setSelectedSummary(summary)}
                    >
                      {summary.imageUrl && (
                        <div className="mb-2 overflow-hidden rounded-md">
                          <img
                            src={summary.imageUrl}
                            alt="Summary"
                            className="w-full h-24 object-cover"
                          />
                        </div>
                      )}
                      <h3 className="font-medium line-clamp-2">
                        {getPreviewText(summary.originalText, 50)}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatDate(summary.timestamp)}
                      </p>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            )}
          </div>

          {/* Detail View */}
          <div className="md:col-span-2">
            {selectedSummary ? (
              <Card className="p-6 shadow-md border border-border h-[calc(100vh-300px)]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-gradient">
                    Summary Details
                  </h2>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setSelectedSummary(null)}
                    >
                      <X size={18} />
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-[calc(100%-60px)]">
                  {/* Image Column */}
                  <div className="flex flex-col">
                    {selectedSummary.imageUrl ? (
                      <div className="rounded overflow-hidden border border-muted flex-1 bg-muted/30 flex items-center justify-center">
                        <img
                          src={selectedSummary.imageUrl}
                          alt="Original image"
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                    ) : (
                      <div className="rounded border border-muted flex-1 bg-muted/30 flex items-center justify-center">
                        <FileText className="h-16 w-16 text-muted-foreground" />
                      </div>
                    )}
                    <div className="mt-4 flex justify-between">
                      <p className="text-sm text-muted-foreground">
                        Processed on {formatDate(selectedSummary.timestamp)}
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">Delete</Button>
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
                            <AlertDialogAction onClick={() => handleDeleteSummary(selectedSummary.id)}>
                              Continue
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </div>

                  {/* Text Content Column */}
                  <div className="flex flex-col">
                    <Tabs defaultValue="summary" className="flex-1 flex flex-col">
                      <TabsList className="mb-4">
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="original">Original Text</TabsTrigger>
                        {selectedSummary.translatedText && (
                          <TabsTrigger value="translated">Translated</TabsTrigger>
                        )}
                      </TabsList>

                      <ScrollArea className="flex-1">
                        <TabsContent value="summary" className="m-0 p-0">
                          <div className="bg-muted/30 p-4 rounded border border-muted h-full">
                            <p className="whitespace-pre-wrap">
                              {selectedSummary.summary}
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="original" className="m-0 p-0">
                          <div className="bg-muted/30 p-4 rounded border border-muted h-full">
                            <p className="whitespace-pre-wrap">
                              {selectedSummary.originalText}
                            </p>
                          </div>
                        </TabsContent>

                        {selectedSummary.translatedText && (
                          <TabsContent value="translated" className="m-0 p-0">
                            <div className="bg-muted/30 p-4 rounded border border-muted h-full">
                              <p className="whitespace-pre-wrap">
                                {selectedSummary.translatedText}
                              </p>
                            </div>
                          </TabsContent>
                        )}
                      </ScrollArea>
                    </Tabs>

                    {selectedSummary.sourceLanguage !== "English" && (
                      <div className="mt-4">
                        <p className="text-sm">
                          <span className="font-medium">Source Language:</span>{" "}
                          {selectedSummary.sourceLanguage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ) : (
              <Card className="p-6 shadow-md border border-border h-[calc(100vh-300px)] flex items-center justify-center">
                <div className="text-center max-w-md">
                  <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-medium mb-2">No Summary Selected</h3>
                  <p className="text-muted-foreground mb-6">
                    Select a summary from the list to view its details
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summaries;
