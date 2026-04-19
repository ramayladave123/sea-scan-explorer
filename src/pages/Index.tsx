import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Hero } from "@/components/Hero";
import { Scanner } from "@/components/Scanner";
import { Viewer3D } from "@/components/Viewer3D";
import { ARSection } from "@/components/ARSection";
import { Library } from "@/components/Library";
import { ResearchData } from "@/components/ResearchData";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar title="Overview" subtitle="Pujada Bay · Real-time seagrass intelligence" breadcrumb="Workspace / Overview" />
        <main className="overflow-x-hidden">
          <Hero />
          <Scanner />
          <Viewer3D />
          <ARSection />
          <Library />
          <ResearchData />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Index;
