import CTA from "@/app/_components/cta";
import FAQ from "@/app/_components/faq";
import Features from "@/app/_components/features";
import Hero from "@/app/_components/hero";
import Stats from "@/app/_components/stats";
import Footer from "@/components/shared/footer";
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
