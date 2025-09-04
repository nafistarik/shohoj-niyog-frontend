import { Button } from "../ui/button";
import Link from "next/link";

function CTA() {
  return (
    <section className="py-20 bg-card animate-fade-in">
      <div className="container mx-auto max-w-3xl text-center glass-effect p-8 rounded-lg shadow-soft">
        <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 font-body">
          Join hundreds of companies already using InterviewFlow to streamline
          their hiring process.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 bg-primary text-primary-foreground hover:bg-primary-light shadow-primary animate-scale-in"
            asChild
          >
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 border-primary text-primary hover:bg-secondary/50 hover:text-primary-dark shadow-soft animate-scale-in"
            asChild
          >
            <Link href="/contact-sales">Contact Sales</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTA;