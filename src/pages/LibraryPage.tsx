import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Library } from "@/components/Library";
import { Footer } from "@/components/Footer";

const LibraryPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar />
      <div className="lg:pl-64">
        <Topbar title="Species Library" subtitle="Pujada Bay seagrass database" breadcrumb="Workspace / Library" />
        <main className="overflow-x-hidden">
          <Library />
          <Footer />
        </main>
      </div>
    </div>
  );
};

export default LibraryPage;
