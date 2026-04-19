import { Bubbles } from "./Bubbles";
import { LightRays } from "./LightRays";
import { Button } from "./ui/button";
import { ArrowRight, ScanLine, Sparkles } from "lucide-react";
import heroOcean from "@/assets/hero-ocean.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden pt-32 pb-24">
      {/* Background image */}
      <div className="absolute inset-0">
        <img src={heroOcean} alt="Underwater seagrass meadow" width={1920} height={1080} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/80 via-deep-sea/60 to-background" />
      </div>

      <LightRays />
      <Bubbles count={22} />

      <div className="container relative z-10">
        <div className="mx-auto max-w-4xl text-center text-foam">
          <div className="inline-flex items-center gap-2 rounded-full border border-aqua/30 bg-abyss/40 backdrop-blur px-4 py-1.5 text-xs font-medium text-aqua animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="font-mono uppercase tracking-widest">AI · AR · 3D · Mati City</span>
          </div>

          <h1 className="mt-6 font-display text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Identify the <span className="text-gradient">unseen meadows</span> beneath our seas.
          </h1>

          <p className="mt-7 mx-auto max-w-2xl text-lg md:text-xl text-foam/80 leading-relaxed animate-fade-in" style={{ animationDelay: "0.2s" }}>
            SeaScan uses artificial intelligence, augmented reality, and immersive 3D models to help students, tourists, and researchers discover the seagrass species protecting Mati City's coast.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <a href="#scanner">
                <ScanLine className="h-5 w-5" />
                Start Identifying
              </a>
            </Button>
            <Button variant="glass" size="xl" asChild>
              <a href="#library">
                Explore Library
                <ArrowRight className="h-4 w-4" />
              </a>
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-3 gap-4 md:gap-8 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            {[
              { v: "12", l: "Species mapped" },
              { v: "98.4%", l: "AI accuracy" },
              { v: "24/7", l: "Reef monitoring" },
            ].map((s) => (
              <div key={s.l} className="rounded-2xl border border-aqua/20 bg-abyss/30 backdrop-blur-md p-4 md:p-6">
                <div className="font-display text-2xl md:text-4xl font-bold text-gradient">{s.v}</div>
                <div className="mt-1 text-xs md:text-sm text-foam/70">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
