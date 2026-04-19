import { Smartphone, Box, Globe2, Sun, Ruler } from "lucide-react";
import { Button } from "./ui/button";
import seagrass1 from "@/assets/seagrass-1.png";
import seabed from "@/assets/ar-seabed.jpg";

export const ARSection = () => {
  return (
    <section id="ar" className="relative px-6 lg:px-12 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Phone mockup */}
          <div className="relative mx-auto">
            <div className="absolute -inset-16 bg-gradient-bio opacity-15 blur-3xl rounded-full -z-10" />
            <div className="relative w-[290px] md:w-[330px] aspect-[9/19] rounded-[3rem] border-[10px] border-abyss bg-abyss shadow-deep overflow-hidden">
              {/* notch */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 h-6 w-32 bg-abyss rounded-b-2xl z-30" />

              {/* AR camera feed */}
              <div className="absolute inset-0">
                <img src={seabed} alt="AR seabed background" className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-b from-aqua/20 via-transparent to-abyss/40" />
                <div className="absolute inset-0 caustics animate-caustic-shift opacity-80" />

                {/* AR seagrass placed on seabed with realistic shadow */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-44">
                  {/* contact shadow */}
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-4 bg-abyss/40 blur-md rounded-full" />
                  <img
                    src={seagrass1}
                    alt="AR seagrass projection"
                    className="relative w-full drop-shadow-[0_10px_25px_rgba(0,30,40,0.6)] animate-sway"
                    loading="lazy"
                  />
                </div>

                {/* AR HUD top */}
                <div className="absolute top-10 inset-x-3 flex items-center justify-between text-[9px] font-mono">
                  <span className="rounded bg-bio/90 text-abyss px-1.5 py-0.5 font-bold flex items-center gap-1">
                    <span className="h-1 w-1 rounded-full bg-abyss animate-pulse" />
                    AR · TRACKING
                  </span>
                  <span className="rounded bg-abyss/80 text-aqua px-1.5 py-0.5">1.2m</span>
                </div>

                {/* tracking corners around plant */}
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 w-48 h-44">
                  <span className="absolute top-0 left-0 h-3 w-3 border-l border-t border-bio" />
                  <span className="absolute top-0 right-0 h-3 w-3 border-r border-t border-bio" />
                  <span className="absolute bottom-0 left-0 h-3 w-3 border-l border-b border-bio" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 border-r border-b border-bio" />
                </div>

                {/* scale ruler */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col items-center gap-0.5 text-[8px] font-mono text-bio">
                  <span>1.5m</span>
                  <div className="h-24 w-px bg-bio/60" />
                  <span>0m</span>
                </div>

                {/* info card */}
                <div className="absolute bottom-3 inset-x-3 rounded-xl bg-abyss/90 backdrop-blur p-2.5 border border-aqua/20">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-[8px] font-mono text-aqua uppercase tracking-widest">Detected · 94.7%</div>
                      <div className="text-xs font-display font-bold italic text-foam">Enhalus acoroides</div>
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] font-mono text-muted-foreground">Height</div>
                      <div className="text-xs font-mono text-bio">1.42 m</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div>
            <div className="label-mono text-bio">/ 03 — Augmented Reality</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Project life-sized specimens<br />
              <span className="text-gradient-bio">into the field.</span>
            </h2>
            <p className="mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">
              Anchor photogrammetric models to the seabed or classroom floor with WebXR. Compare biomass against
              live environment, capture measurements, and export annotated reports.
            </p>

            <div className="mt-8 grid sm:grid-cols-3 gap-3">
              {[
                { icon: Smartphone, label: "WebXR", desc: "iOS · Android" },
                { icon: Ruler, label: "True scale", desc: "± 2cm precision" },
                { icon: Sun, label: "Caustics", desc: "Live light bake" },
              ].map((f) => (
                <div key={f.label} className="rounded-xl border border-border bg-card/40 p-4">
                  <f.icon className="h-4 w-4 text-bio" />
                  <div className="mt-3 font-display font-semibold text-sm">{f.label}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{f.desc}</div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex gap-2">
              <Button variant="bio" size="lg">Launch AR</Button>
              <Button variant="glass" size="lg">View Documentation</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
