import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";

function Hero() {
  return (
    <section className="py-20 px-4 relative overflow-hidden bg-background">
      <div className="absolute inset-0 gradient-bg-subtle -z-10"></div>
      <div className="container mx-auto text-center max-w-4xl animate-fade-in">
        <Badge
          variant="secondary"
          className="mb-6 bg-secondary/50 text-secondary-foreground border-sidebar-border shadow-soft"
        >
          <Star className="w-3 h-3 mr-1 fill-primary text-primary" />
          Trusted by 500+ Companies
        </Badge>
        <h1 className="text-5xl md:text-6xl font-heading font-bold text-foreground mb-6 leading-tight">
          Streamline Your
          <span className="text-primary block">Video Interviews</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed font-body">
          Transform your hiring process with our comprehensive video interview
          platform. Create sessions, evaluate candidates, and make informed
          decisions—all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 bg-primary text-primary-foreground hover:bg-primary-light shadow-primary animate-scale-in"
            asChild
          >
            <Link href="/signup">Start Free Trial</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 border-primary text-primary hover:bg-secondary/50 hover:text-primary-dark shadow-soft animate-scale-in"
            asChild
          >
            <Link href="#demo">
              Watch Demo <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground font-body">
          <div className="flex items-center space-x-2 animate-slide-in">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center space-x-2 animate-slide-in">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Setup in 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
