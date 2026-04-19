import { Bubbles } from "./Bubbles";
import { LightRays } from "./LightRays";
import { Button } from "./ui/button";
import { ArrowRight, ScanLine, Sparkles, Activity, Database, Cpu } from "lucide-react";
import heroOcean from "@/assets/hero-ocean.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroOcean}
          alt="Underwater seagrass meadow with caustic light rays in Pujada Bay"
          width={1920}
          height={1080}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-abyss/85 via-deep-sea/55 to-background" />
        <div className="absolute inset-0 caustics animate-caustic-shift" />
      </div>

      <LightRays />
      <Bubbles count={18} />

      <div className="relative z-10 px-6 lg:px-12 pt-20 pb-16">
        {/* Top telemetry strip */}
        <div className="mx-auto max-w-7xl flex flex-wrap items-center gap-3 text-[10px] font-mono uppercase tracking-widest text-foam/70">
          <span className="rounded-full border border-aqua/30 bg-abyss/50 backdrop-blur px-3 py-1 text-aqua flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-bio animate-pulse" /> Live · Pujada Bay
          </span>
          <span>06°56'N · 126°13'E</span>
          <span>SST 28.4°C</span>
          <span>Salinity 33.8 PSU</span>
          <span>Visibility 14m</span>
        </div>

        <div className="mx-auto max-w-7xl mt-12 grid lg:grid-cols-12 gap-10 items-end">
          {/* Headline */}
          <div className="lg:col-span-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-aqua/30 bg-abyss/50 backdrop-blur px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-aqua">
              <Sparkles className="h-3 w-3" />
              Marine Vision Platform · v2.1
            </div>

            <h1 className="mt-5 font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold leading-[0.98] tracking-tight text-foam">
              The seagrass meadows of <span className="text-gradient">Mati City,</span> mapped in real time.
            </h1>

            <p className="mt-6 max-w-xl text-base md:text-lg text-foam/75 leading-relaxed">
              SeaScan is a research-grade platform combining computer vision, photogrammetry-based 3D models,
              and AR field tools to identify and protect Pujada Bay's twelve seagrass species.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button variant="hero" size="lg" asChild>
                <a href="#scanner">
                  <ScanLine className="h-4 w-4" /> Open Scanner
                </a>
              </Button>
              <Button variant="glass" size="lg" asChild>
                <a href="#viewer">
                  Launch 3D Viewer <ArrowRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Side data card */}
          <div className="lg:col-span-4">
            <div className="glass-strong rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="label-mono">Detection Pipeline</span>
                <span className="rounded-full bg-bio/15 text-bio text-[9px] font-mono px-2 py-0.5 uppercase tracking-widest">Stable</span>
              </div>

              <div className="mt-4 space-y-3">
                {[
                  { icon: Cpu, l: "Inference", v: "42 ms", c: "text-aqua" },
                  { icon: Activity, l: "F1 Score", v: "0.984", c: "text-bio" },
                  { icon: Database, l: "Training set", v: "18,420 imgs", c: "text-foam" },
                ].map((m) => (
                  <div key={m.l} className="flex items-center gap-3 rounded-lg border border-border bg-card/40 px-3 py-2.5">
                    <m.icon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground flex-1">{m.l}</span>
                    <span className={`font-mono text-sm font-semibold ${m.c}`}>{m.v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-border">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Model</span>
                  <span className="font-mono text-foam">SeaNet-v2 · ResNeXt-101</span>
                </div>
                <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full bg-gradient-aqua rounded-full" style={{ width: "94%" }} />
                </div>
                <div className="mt-1 text-right font-mono text-[10px] text-muted-foreground">94% mAP</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
