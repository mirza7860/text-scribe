
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Webcam from "react-webcam";
import { Camera, Upload, X } from "lucide-react";

interface ImageInputProps {
  onImageCapture: (imageData: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onImageCapture }) => {
  const [image, setImage] = useState<string | null>(null);
  const [showCamera, setShowCamera] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setImage(result);
        onImageCapture(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCameraCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setImage(imageSrc);
        onImageCapture(imageSrc);
        setShowCamera(false);
      }
    }
  };

  const clearImage = () => {
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card className="p-6 shadow-md border border-border relative">
      <h2 className="text-xl font-semibold mb-4 text-gradient">Image Input</h2>
      
      {!image && !showCamera && (
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={() => fileInputRef.current?.click()} 
            className="flex items-center space-x-2"
          >
            <Upload size={18} />
            <span>Upload Image</span>
          </Button>
          <Button 
            onClick={() => setShowCamera(true)}
            variant="secondary"
            className="flex items-center space-x-2"
          >
            <Camera size={18} />
            <span>Use Camera</span>
          </Button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="hidden"
          />
        </div>
      )}
      
      {showCamera && (
        <div className="relative">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full rounded-md mb-4"
          />
          <div className="flex justify-center gap-2 mt-2">
            <Button onClick={handleCameraCapture} variant="default">Capture</Button>
            <Button onClick={() => setShowCamera(false)} variant="outline">Cancel</Button>
          </div>
        </div>
      )}
      
      {image && (
        <div className="relative">
          <Button 
            variant="outline" 
            size="icon"
            className="absolute top-2 right-2 bg-white/80 z-10 hover:bg-white" 
            onClick={clearImage}
          >
            <X size={18} />
          </Button>
          <img 
            src={image} 
            alt="Captured" 
            className="w-full rounded-md object-contain max-h-[400px]" 
          />
        </div>
      )}
    </Card>
  );
};

export default ImageInput;
