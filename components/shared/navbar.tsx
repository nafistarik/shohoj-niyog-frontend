import { Video } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

function Navbar() {
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-50 border-b border-sidebar-border glass-effect">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between animate-fade-in">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-primary">
            <Video className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-heading font-bold text-foreground">
            Shohoj Niyog
          </span>
        </div>
        <nav className="hidden md:flex items-center space-x-6 font-body">
          <a
            href="#features"
            className="text-muted-foreground hover:text-primary transition-colors animate-slide-in"
          >
            Features
          </a>
          <a
            href="#about"
            className="text-muted-foreground hover:text-primary transition-colors animate-slide-in"
          >
            About
          </a>
          <a
            href="#testimonials"
            className="text-muted-foreground hover:text-primary transition-colors animate-slide-in"
          >
            Testimonials
          </a>
          <a
            href="#faq"
            className="text-muted-foreground hover:text-primary transition-colors animate-slide-in"
          >
            FAQ
          </a>
        </nav>
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            asChild
            className="text-muted-foreground hover:bg-secondary/50 hover:text-primary-dark animate-scale-in"
          >
            <Link href="/login">Sign In</Link>
          </Button>
          <Button
            asChild
            className="bg-primary text-primary-foreground hover:bg-primary-light shadow-primary animate-scale-in"
          >
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;