
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen, Code, FileText, Globe, Sparkles } from "lucide-react";

const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-gradient">About TextScribe</h1>
          
          <div className="bg-card p-6 rounded-xl shadow-md border border-border mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <FileText className="mr-2 h-6 w-6 text-primary" />
              Our Mission
            </h2>
            <p className="text-muted-foreground mb-4">
              TextScribe was created to simplify the process of extracting, translating, and summarizing text from images.
              We believe in making information accessible, regardless of its original format or language.
            </p>
            <p className="text-muted-foreground">
              Whether you're a student digitizing notes, a researcher processing documents, or a professional handling multilingual content,
              TextScribe provides the tools you need to work efficiently with text in images.
            </p>
          </div>
          
          <div className="bg-card p-6 rounded-xl shadow-md border border-border mb-8">
            <h2 className="text-2xl font-semibold mb-4 flex items-center">
              <Code className="mr-2 h-6 w-6 text-primary" />
              Technologies
            </h2>
            <p className="text-muted-foreground mb-4">
              TextScribe leverages cutting-edge technologies to deliver accurate and efficient results:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start">
                <span className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                  <BookOpen className="h-4 w-4 text-primary" />
                </span>
                <span>
                  <strong>Tesseract OCR</strong> - For precise text extraction from images
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                  <Globe className="h-4 w-4 text-primary" />
                </span>
                <span>
                  <strong>Language Detection</strong> - Automatically identifies the source language
                </span>
              </li>
              <li className="flex items-start">
                <span className="bg-primary/10 p-1 rounded mr-2 mt-0.5">
                  <Sparkles className="h-4 w-4 text-primary" />
                </span>
                <span>
                  <strong>Google Gemini AI</strong> - Powers our advanced text summarization
                </span>
              </li>
            </ul>
            <p className="text-muted-foreground">
              Our application is built with React, TypeScript, and TailwindCSS, ensuring a responsive and accessible user experience.
            </p>
          </div>
          
          <div className="text-center">
            <h2 className="text-2xl font-semibold mb-4">Ready to try TextScribe?</h2>
            <Button asChild size="lg" className="bg-gradient-to-r from-primary to-secondary text-white">
              <Link to="/process">Get Started</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
