import { Button } from "../ui/button";
import Link from "next/link";

function CTA() {
  return (
    <section className="py-20 px-4 bg-primary/10">
      <div className="container mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Join hundreds of companies already using InterviewFlow to streamline
          their hiring process.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="text-lg px-8 bg-primary text-primary-foreground hover:bg-primary/90"
            asChild
          >
            <Link href="/signup">Start Your Free Trial</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 border-primary text-primary hover:bg-primary/10"
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CTA;
