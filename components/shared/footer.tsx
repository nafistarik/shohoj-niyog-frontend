import { Video } from "lucide-react";
import { Button } from "../ui/button";

const productItems = [
  { label: "Features", href: "#features", id: 1 },
  { label: "Pricing", href: "#pricing", id: 2 },
  { label: "Security", href: "#security", id: 3 },
];

const companyItems = [
  { label: "About", href: "#about", id: 1 },
  { label: "Careers", href: "#careers", id: 2 },
  { label: "Contact", href: "#contact", id: 3 },
];

const supportItems = [
  { label: "FAQ", href: "#faq", id: 1 },
  { label: "Help Center", href: "#help-center", id: 2 },
  { label: "Documentation", href: "#documentation", id: 3 },
];

function Footer() {
  return (
    <footer className="bg-card py-12 px-4 border-t border-sidebar-border animate-fade-in">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="animate-slide-in">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-primary">
                <Video className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                Shohoj Niyog
              </span>
            </div>
            <p className="text-muted-foreground font-body">
              Streamline your hiring process with professional video interviews.
            </p>
          </div>
          <div className="animate-slide-in">
            <h3 className="font-heading font-semibold mb-4 text-foreground">
              Product
            </h3>
            <div className="flex flex-col">
              {productItems.map((item) => (
                <Button asChild className="p-0 justify-start" variant="link" key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </Button>
              ))}
            </div>
          </div>
          <div className="animate-slide-in">
            <h3 className="font-heading font-semibold mb-4 text-foreground">
              Company
            </h3>
            <div className="flex flex-col">
              {companyItems.map((item) => (
                <Button asChild className="p-0 justify-start" variant="link" key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </Button>
              ))}
            </div>
          </div>
          <div className="animate-slide-in">
            <h3 className="font-heading font-semibold mb-4 text-foreground">
              Support
            </h3>
            <div className="flex flex-col">
              {supportItems.map((item) => (
                <Button asChild className="p-0 justify-start" variant="link" key={item.id}>
                  <a href={item.href}>{item.label}</a>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-sidebar-border mt-8 pt-8 text-center text-muted-foreground font-body animate-fade-in">
          <p>&copy; 2025 InterviewFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
