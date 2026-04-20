import { Topbar } from "@/components/Topbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ScanLine, BookOpen, LogIn, Waves } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Landing navbar */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 lg:px-12 h-16">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-aqua shadow-glow">
              <Waves className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-base font-bold tracking-tight">SeaScan</span>
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Marine AI · v2.1</span>
            </div>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link to="/scan" className="text-muted-foreground hover:text-foreground transition-colors">Scanner</Link>
            <Link to="/library" className="text-muted-foreground hover:text-foreground transition-colors">Library</Link>
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/login"><LogIn className="h-3.5 w-3.5" /> Sign In</Link>
            </Button>
            <Button variant="hero" size="sm" asChild>
              <Link to="/login">Researcher Access</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="overflow-x-hidden">
        <Hero />

        {/* Feature cards */}
        <section id="features" className="relative px-6 lg:px-12 py-20">
          <div className="mx-auto max-w-7xl">
            <div className="label-mono text-aqua">/ Platform</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight max-w-2xl">
              A complete toolkit for seagrass researchers.
            </h2>
            <div className="mt-10 grid md:grid-cols-2 gap-5">
              <Link to="/scan" className="group glass-strong rounded-2xl p-6 hover:border-aqua/40 transition-all hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-aqua/10 border border-aqua/30">
                  <ScanLine className="h-5 w-5 text-aqua" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">Live AI Scanner</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Upload or capture imagery and identify seagrass species in under 50ms with SeaNet-v2.
                </p>
                <div className="mt-4 text-xs font-mono uppercase tracking-widest text-aqua group-hover:translate-x-1 transition-transform">
                  Open scanner →
                </div>
              </Link>
              <Link to="/library" className="group glass-strong rounded-2xl p-6 hover:border-bio/40 transition-all hover:-translate-y-1">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-bio/10 border border-bio/30">
                  <BookOpen className="h-5 w-5 text-bio" />
                </div>
                <h3 className="mt-5 font-display text-xl font-bold">Species Library</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Browse the complete Pujada Bay seagrass catalog with taxonomy, habitat, and conservation data.
                </p>
                <div className="mt-4 text-xs font-mono uppercase tracking-widest text-bio group-hover:translate-x-1 transition-transform">
                  Explore library →
                </div>
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
};

export default Index;
