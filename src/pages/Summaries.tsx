
import React, { useState, useEffect } from "react";
import { getSummaries } from "@/utils/storage";
import { SummaryItem } from "@/utils/types";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ExternalLink, FileText, X, Trash2, ChevronLeft } from "lucide-react";
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
  const [dialogOpen, setDialogOpen] = useState(false);

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
      setDialogOpen(false);
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

  const openSummaryDialog = (summary: SummaryItem) => {
    setSelectedSummary(summary);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 max-w-6xl">
        <header className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 text-gradient">My Summaries</h1>
          <p className="text-muted-foreground">
            View and manage all your processed text summaries
          </p>
        </header>

        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            Saved Summaries ({summaries.length})
          </h2>
          {summaries.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Trash2 size={16} className="mr-2" />
                  Clear All
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
          )}
        </div>

        {summaries.length === 0 ? (
          <Card className="p-8 text-center bg-muted/30">
            <FileText className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h3 className="text-xl font-medium mb-2">No summaries yet</h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Process some text to create summaries. Your saved summaries will appear here.
            </p>
            <Button asChild variant="default" size="lg">
              <a href="/process">Process Text</a>
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.map((summary) => (
              <Card
                key={summary.id}
                className="hover:shadow-md transition-all cursor-pointer hover:border-primary/50 overflow-hidden flex flex-col"
                onClick={() => openSummaryDialog(summary)}
              >
                <div className="relative h-40 bg-muted overflow-hidden">
                  {summary.imageUrl ? (
                    <img
                      src={summary.imageUrl}
                      alt="Summary"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-muted/50">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                  )}
                </div>
                <CardContent className="p-4 flex-grow">
                  <p className="line-clamp-3 text-sm mb-2">
                    {getPreviewText(summary.originalText, 150)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {formatDate(summary.timestamp)}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent className="sm:max-w-4xl max-h-[85vh] overflow-hidden p-0">
            <DialogHeader className="p-6 pb-0">
              <div className="flex items-center justify-between w-full">
                <DialogTitle className="text-xl font-semibold text-gradient">
                  Summary Details
                </DialogTitle>
              </div>
            </DialogHeader>

            {selectedSummary && (
              <div className="p-6 pt-2 overflow-hidden max-h-[calc(85vh-80px)]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  {/* Image Column */}
                  <div className="flex flex-col space-y-4">
                    <div className="rounded-lg overflow-hidden border border-muted flex-1 bg-muted/30 flex items-center justify-center">
                      {selectedSummary.imageUrl ? (
                        <img
                          src={selectedSummary.imageUrl}
                          alt="Original image"
                          className="max-w-full max-h-[400px] object-contain"
                        />
                      ) : (
                        <FileText className="h-16 w-16 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">
                        Processed on {formatDate(selectedSummary.timestamp)}
                      </p>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button variant="outline" size="sm">
                            <Trash2 size={16} className="mr-2" />
                            Delete
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
                      <TabsList className="mb-4 w-full justify-start">
                        <TabsTrigger value="summary">Summary</TabsTrigger>
                        <TabsTrigger value="original">Original Text</TabsTrigger>
                        {selectedSummary.translatedText && (
                          <TabsTrigger value="translated">Translated</TabsTrigger>
                        )}
                      </TabsList>

                      <ScrollArea className="flex-1 max-h-[380px]">
                        <TabsContent value="summary" className="m-0 p-0">
                          <div className="bg-muted/30 p-4 rounded-lg border border-muted">
                            <p className="whitespace-pre-wrap text-sm">
                              {selectedSummary.summary}
                            </p>
                          </div>
                        </TabsContent>

                        <TabsContent value="original" className="m-0 p-0">
                          <div className="bg-muted/30 p-4 rounded-lg border border-muted">
                            <p className="whitespace-pre-wrap text-sm">
                              {selectedSummary.originalText}
                            </p>
                          </div>
                        </TabsContent>

                        {selectedSummary.translatedText && (
                          <TabsContent value="translated" className="m-0 p-0">
                            <div className="bg-muted/30 p-4 rounded-lg border border-muted">
                              <p className="whitespace-pre-wrap text-sm">
                                {selectedSummary.translatedText}
                              </p>
                            </div>
                          </TabsContent>
                        )}
                      </ScrollArea>
                    </Tabs>

                    {selectedSummary.sourceLanguage && selectedSummary.sourceLanguage !== "English" && (
                      <div className="mt-4">
                        <p className="text-sm">
                          <span className="font-medium">Source Language:</span>{" "}
                          {selectedSummary.sourceLanguage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Summaries;
