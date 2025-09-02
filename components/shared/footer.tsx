import { Video } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-card py-12 px-4 border-t border-border">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Video className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                Shohoj Niyog
              </span>
            </div>
            <p className="text-muted-foreground">
              Streamline your hiring process with professional video interviews.
            </p>
          </div>
          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground">
              Product
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="#features"
                  className="hover:text-primary transition-colors"
                >
                  Features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Security
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground">
              Company
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a
                  href="#about"
                  className="hover:text-primary transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Careers
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-heading font-semibold mb-4 text-foreground">
              Support
            </h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#faq" className="hover:text-primary transition-colors">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2025 InterviewFlow. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
