import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Scanner } from "@/components/Scanner";
import { Viewer3D } from "@/components/Viewer3D";
import { ARSection } from "@/components/ARSection";
import { Library } from "@/components/Library";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <Scanner />
      <Viewer3D />
      <ARSection />
      <Library />
      <Footer />
    </main>
  );
};

export default Index;
