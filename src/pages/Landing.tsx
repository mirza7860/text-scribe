
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Camera, FileText, Sparkles, Text } from "lucide-react";

const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      {/* Hero Section */}
      <section className="container mx-auto pt-16 pb-20 px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              <span className="text-gradient">Transform</span> Your Images{" "}
              <br />
              Into Clear Text
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              Extract, translate, and summarize text from images with our
              AI-powered tool. Perfect for students, researchers, and
              professionals.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-primary to-secondary text-white"
              >
                <Link to="/process">Get Started</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-75"></div>
              <div className="relative bg-background p-6 rounded-lg shadow-xl">
                <img
                  src="/undraw_document-analysis_3c0y.png"
                  alt="TextScribe Demo"
                  className="rounded-md w-full max-w-md mx-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gradient">
            Powerful Features
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Camera className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Image to Text</h3>
              <p className="text-muted-foreground">
                Accurately extract text from images with our advanced OCR
                technology.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Text className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Translation</h3>
              <p className="text-muted-foreground">
                Automatically detect languages and translate text to English.
              </p>
            </div>

            <div className="bg-card p-6 rounded-xl shadow-sm border border-border hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Summarization</h3>
              <p className="text-muted-foreground">
                Generate concise summaries with Google's Gemini AI technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto py-16 px-4">
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-8 md:p-12 rounded-2xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Images?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Try TextScribe today and experience the power of AI-driven text
            extraction and processing.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-primary to-secondary text-white"
          >
            <Link to="/process">Get Started Now</Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Landing;
