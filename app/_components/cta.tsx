// import { Button } from "@/components/ui/button";
// import { Flame, UserRoundPlus } from "lucide-react";
// import Link from "next/link";

function CTA() {
  return (
    <section className="py-20 animate-fade-in">
      <div className="container mx-auto max-w-3xl text-center  p-8 rounded-lg">
        <h2 className="text-4xl font-heading font-bold text-foreground mb-6">
          Ready to Get Started?
        </h2>
        <p className="text-lg text-muted-foreground mb-8 font-body">
          Join hundreds of companies already using InterviewFlow to streamline
          their hiring process.
        </p>
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/signup">
              <Flame />
              Start Free Trial
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact-sales">
              Contact Sales
              <UserRoundPlus />
            </Link>
          </Button>
        </div> */}
      </div>
    </section>
  );
}

export default CTA;
