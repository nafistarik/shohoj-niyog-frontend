import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Badge } from "../ui/badge";

function Hero() {
  return (
    <section className="py-20 px-4 relative overflow-hidden">
      <div className="absolute inset-0 gradient-bg-subtle -z-10 opacity-60"></div>
      <div className="container mx-auto text-center max-w-4xl animate-fade-in">
        <Badge
          variant="secondary"
          className="mb-6 bg-primary/10 text-primary border-primary/20 font-medium"
        >
          <Star className="w-3 h-3 mr-1 fill-primary" />
          Trusted by 500+ Companies
        </Badge>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Streamline Your
          <span className="text-primary block">Video Interviews</span>
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform your hiring process with our comprehensive video interview
          platform. Create sessions, evaluate candidates, and make informed
          decisions—all in one place.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 shadow-primary hover:shadow-glow transition-all duration-300"
            asChild
          >
            <Link href="/interviewer/dashboard">Start Free Trial</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 border-primary text-primary hover:bg-primary/10 transition-colors"
            asChild
          >
            <Link href="/candidate/dashboard">
              Watch Demo <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-sm text-muted-foreground">
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            <span>Setup in 5 minutes</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;