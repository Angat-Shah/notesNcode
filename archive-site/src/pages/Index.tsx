import { Hero } from "@/components/Hero";
import { WhatYoullFind } from "@/components/WhatYoullFind";
import { SemesterSection } from "@/components/SemesterSection";
import { HighlightedResources } from "@/components/HighlightedResources";
import { DatasetsSection } from "@/components/DatasetsSection";
import { AboutSection } from "@/components/AboutSection";
import { SupportContribute } from "@/components/SupportContribute";
import { Footer } from "@/components/Footer";
import { ThemeToggle } from "@/components/ThemeToggle";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <ThemeToggle />
      <Hero />
      <WhatYoullFind />
      <SemesterSection />
      <HighlightedResources />
      <DatasetsSection />
      <AboutSection />
      <SupportContribute />
      <Footer />
    </main>
  );
};

export default Index;
