
import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface ProcessingControlsProps {
  onProcess: () => void;
  isProcessing: boolean;
  hasImage: boolean;
}

const ProcessingControls: React.FC<ProcessingControlsProps> = ({
  onProcess,
  isProcessing,
  hasImage,
}) => {
  return (
    <Card className="p-6 shadow-md border border-border mt-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gradient">Process Image</h2>
        <Button
          onClick={onProcess}
          disabled={isProcessing || !hasImage}
          className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
        >
          {isProcessing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            "Extract & Analyze Text"
          )}
        </Button>
      </div>
      {!hasImage && (
        <p className="text-sm text-muted-foreground mt-2">
          Please upload or capture an image containing text first.
        </p>
      )}
    </Card>
  );
};

export default ProcessingControls;
