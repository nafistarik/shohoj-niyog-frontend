import CTA from "@/app/_components/cta";
import FAQ from "@/app/_components/faq";
import Features from "@/app/_components/features";
import Hero from "@/app/_components/hero";
import ImpactStats from "@/app/_components/impact-stats";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />
      <Features />
      <ImpactStats />
      <FAQ />
      <CTA />
    </div>
  );
}
