
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, Home, Info, Menu, X } from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <nav className="bg-background sticky top-0 z-50 border-b border-border shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <FileText className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-gradient">TextScribe</span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-foreground hover:text-primary transition-colors">
              Home
            </Link>
            <Link to="/process" className="px-3 py-2 rounded-md text-foreground hover:text-primary transition-colors">
              Process Text
            </Link>
            <Link to="/about" className="px-3 py-2 rounded-md text-foreground hover:text-primary transition-colors">
              About
            </Link>
            <Button asChild variant="default">
              <Link to="/process" className="px-4">
                Get Started
              </Link>
            </Button>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-2 pb-4 space-y-2 animate-fade-in">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/process" 
              className="block px-3 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Process Text
            </Link>
            <Link 
              to="/about" 
              className="block px-3 py-2 rounded-md text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Button asChild variant="default" className="w-full mt-2">
              <Link to="/process" onClick={() => setIsMenuOpen(false)}>
                Get Started
              </Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
