import { Video } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";

const navItems = [
  { label: "Features", href: "#features" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

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
        <nav className="hidden md:flex items-center space-x-2 font-body">
          {navItems.map((item) => (
            <Button key={item.href} variant="ghost" size="lg" asChild>
              <a href={item.href}>{item.label}</a>
            </Button>
          ))}
        </nav>
        <div className="flex items-center space-x-3">
          <Button variant="outline" asChild>
            <Link href="/login">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
