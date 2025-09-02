import Footer from "@/components/shared/footer";
import CTA from "@/components/shared/cta";
import FAQ from "@/components/shared/faq";
import Stats from "@/components/shared/stats";
import Features from "@/components/shared/features";
import Hero from "@/components/shared/hero";
import Navbar from "@/components/shared/navbar";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Features />
      <Stats />
      <FAQ />
      <CTA />
      <Footer />
    </div>
  );
}
