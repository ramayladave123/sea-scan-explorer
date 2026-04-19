import { Smartphone, Box, Globe2 } from "lucide-react";
import { Button } from "./ui/button";
import { Bubbles } from "./Bubbles";
import seagrass2 from "@/assets/seagrass-2.png";

export const ARSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-deep" />
      <Bubbles count={12} />
      <div className="absolute inset-0 bg-gradient-glow opacity-50" />

      <div className="container relative text-foam">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Phone mockup */}
          <div className="relative mx-auto">
            <div className="relative w-[280px] md:w-[320px] aspect-[9/19] rounded-[3rem] border-[10px] border-abyss bg-abyss shadow-deep overflow-hidden">
              {/* notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-abyss rounded-b-2xl z-20" />
              {/* AR scene */}
              <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-orange-50 to-stone-200">
                {/* simulated room floor */}
                <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-stone-400/40 to-transparent" />
                {/* AR seagrass */}
                <img
                  src={seagrass2}
                  alt="AR seagrass projection"
                  className="absolute bottom-12 left-1/2 -translate-x-1/2 w-56 drop-shadow-2xl animate-sway"
                />
                {/* AR HUD */}
                <div className="absolute top-12 inset-x-4 flex items-center justify-between text-[10px] font-mono">
                  <span className="rounded-full bg-bio/90 text-abyss px-2 py-1 font-bold flex items-center gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-abyss animate-pulse" />
                    AR · ACTIVE
                  </span>
                  <span className="rounded-full bg-abyss/80 text-aqua px-2 py-1">1.2m</span>
                </div>
                {/* tracking corners */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-32">
                  <span className="absolute top-0 left-0 h-4 w-4 border-l-2 border-t-2 border-bio" />
                  <span className="absolute top-0 right-0 h-4 w-4 border-r-2 border-t-2 border-bio" />
                  <span className="absolute bottom-0 left-0 h-4 w-4 border-l-2 border-b-2 border-bio" />
                  <span className="absolute bottom-0 right-0 h-4 w-4 border-r-2 border-b-2 border-bio" />
                </div>
                {/* info card */}
                <div className="absolute bottom-4 inset-x-4 rounded-xl bg-abyss/85 backdrop-blur p-3 text-foam">
                  <div className="text-[9px] font-mono text-aqua">SCANNED</div>
                  <div className="text-sm font-display font-bold italic">Thalassia hemprichii</div>
                </div>
              </div>
            </div>
            {/* glow */}
            <div className="absolute -inset-10 bg-gradient-bio opacity-20 blur-3xl -z-10 rounded-full" />
          </div>

          <div>
            <div className="font-mono text-xs uppercase tracking-widest text-bio">/ 04 — Augmented Reality</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
              Bring the ocean <span className="text-gradient">into your room.</span>
            </h2>
            <p className="mt-5 text-lg text-foam/80 leading-relaxed">
              Point your phone at any flat surface. Watch a life-sized Mati City seagrass species rise from your floor — perfect for classrooms, museums, and field briefings.
            </p>

            <div className="mt-10 grid sm:grid-cols-3 gap-4">
              {[
                { icon: Smartphone, label: "Mobile-first", desc: "iOS & Android" },
                { icon: Box, label: "True scale", desc: "1:1 species size" },
                { icon: Globe2, label: "Offline ready", desc: "Field-tested" },
              ].map((f) => (
                <div key={f.label} className="rounded-2xl border border-aqua/20 bg-abyss/40 backdrop-blur p-4">
                  <f.icon className="h-5 w-5 text-bio" />
                  <div className="mt-3 font-display font-semibold">{f.label}</div>
                  <div className="text-xs text-foam/60">{f.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button variant="bio" size="lg">Try AR Demo</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
