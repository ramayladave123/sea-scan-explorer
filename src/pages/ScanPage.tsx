import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Scanner } from "@/components/Scanner";
import { Footer } from "@/components/Footer";

const ScanPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar title="Scanner" subtitle="AI species identification" breadcrumb="Workspace / Scan" />
        <main className="overflow-x-hidden">
          <Scanner />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default ScanPage;
