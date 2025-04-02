import Hero from "@/components/landing/Hero";
import HowItWorks from "@/components/landing/HowItWorks";
import CTA from "@/components/landing/CTA";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Hero />
      <HowItWorks />
      <CTA />
    </div>
  );
}
