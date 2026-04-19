import { useRef, useState } from "react";
import { Camera, Upload, ScanLine, Loader2, CheckCircle2, Leaf, ShieldCheck, Crosshair, Zap, MapPin } from "lucide-react";
import { Button } from "./ui/button";

const result = {
  scientific: "Enhalus acoroides",
  common: "Tape Seagrass",
  confidence: 94.7,
  status: "Least Concern",
  family: "Hydrocharitaceae",
  habitat: "Pujada Bay · Sandy substrate · 1.2–3.5m depth",
  description:
    "The largest seagrass species in the Indo-Pacific, forming vast meadows that shelter dugongs, sea turtles, and juvenile fish across Mati City's coastal waters.",
  alternates: [
    { name: "Thalassia hemprichii", c: 3.1 },
    { name: "Cymodocea serrulata", c: 1.8 },
  ],
};

export const Scanner = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const [preview, setPreview] = useState<string | null>(null);

  const onUpload = (file: File) => {
    setPreview(URL.createObjectURL(file));
    setPhase("scanning");
    setTimeout(() => setPhase("done"), 2400);
  };

  const reset = () => {
    setPhase("idle");
    setPreview(null);
  };

  return (
    <section id="scanner" className="relative px-6 lg:px-12 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between gap-6 flex-wrap">
          <div className="max-w-2xl">
            <div className="label-mono text-aqua">/ 01 — Vision Pipeline</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Live AI Scanner
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Capture or upload imagery — SeaNet-v2 returns a species match with taxonomic and conservation context in under 50ms.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
            <span className="rounded-full bg-bio/15 text-bio px-2 py-0.5">● Inference Online</span>
            <span>Model · SeaNet-v2</span>
          </div>
        </div>

        <div className="mt-8 grid lg:grid-cols-5 gap-4">
          {/* Scanner viewport */}
          <div className="lg:col-span-3 glass-strong rounded-2xl p-4 md:p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
                <span className="rounded bg-coral/15 text-coral px-1.5 py-0.5">REC</span>
                <span className="text-muted-foreground">CAM-04 · Pujada Bay</span>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono text-muted-foreground">
                <span>1920×1080</span>
                <span>30 FPS</span>
                <span className="text-aqua">ISO 800</span>
              </div>
            </div>

            <div
              className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-abyss border border-border"
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files[0]) onUpload(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {/* Background */}
              <div className="absolute inset-0 bg-gradient-deep" />
              <div className="absolute inset-0 caustics animate-caustic-shift opacity-50" />
              <div className="absolute inset-0 neural-grid opacity-30" />
              <div className="absolute inset-0 scanline opacity-50" />

              {preview ? (
                <img src={preview} alt="Scanned seagrass" className="absolute inset-0 h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-aqua/10 border border-aqua/30 backdrop-blur">
                      <Camera className="h-7 w-7 text-aqua" />
                    </div>
                    <p className="mt-4 font-display text-lg text-foam">Awaiting capture</p>
                    <p className="mt-1 text-xs text-foam/60 font-mono">Drag image · or use controls below</p>
                  </div>
                </div>
              )}

              {/* Targeting reticle */}
              <div className="pointer-events-none absolute inset-0">
                {/* center crosshair */}
                <Crosshair className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-5 w-5 text-aqua/60" />
                {/* corner brackets */}
                <span className="absolute top-3 left-3 h-6 w-6 border-l-2 border-t-2 border-aqua/80" />
                <span className="absolute top-3 right-3 h-6 w-6 border-r-2 border-t-2 border-aqua/80" />
                <span className="absolute bottom-3 left-3 h-6 w-6 border-l-2 border-b-2 border-aqua/80" />
                <span className="absolute bottom-3 right-3 h-6 w-6 border-r-2 border-b-2 border-aqua/80" />

                {/* Detection box (when done) */}
                {phase === "done" && (
                  <div className="absolute top-[18%] left-[22%] w-[56%] h-[60%] rounded border-2 border-bio shadow-bio animate-fade-in">
                    <div className="absolute -top-6 left-0 rounded-t bg-bio px-2 py-0.5 text-[10px] font-mono font-bold text-abyss uppercase tracking-wider">
                      enhalus acoroides · 94.7%
                    </div>
                    <span className="absolute -top-1 -left-1 h-2 w-2 bg-bio" />
                    <span className="absolute -top-1 -right-1 h-2 w-2 bg-bio" />
                    <span className="absolute -bottom-1 -left-1 h-2 w-2 bg-bio" />
                    <span className="absolute -bottom-1 -right-1 h-2 w-2 bg-bio" />
                  </div>
                )}

                {/* Telemetry overlay */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 flex items-center gap-3 text-[9px] font-mono text-aqua/90 bg-abyss/60 backdrop-blur rounded px-2 py-1 border border-aqua/20">
                  <span>NEURAL · ACTIVE</span>
                  <span className="text-foam/50">|</span>
                  <span>12 CLASSES</span>
                  <span className="text-foam/50">|</span>
                  <span>CONF ≥ 80%</span>
                </div>

                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-foam/60">
                  06°56'12"N · 126°13'04"E · 1.4m
                </div>
              </div>

              {/* Scanning sweep */}
              {phase === "scanning" && (
                <>
                  <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-aqua to-transparent shadow-glow animate-scan" />
                  <div className="absolute inset-0 bg-aqua/[0.04]" />
                </>
              )}
            </div>

            {/* Controls */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
              />
              <Button variant="hero" onClick={() => fileRef.current?.click()}>
                <Upload className="h-3.5 w-3.5" /> Upload
              </Button>
              <Button variant="glass">
                <Camera className="h-3.5 w-3.5" /> Camera
              </Button>
              {phase !== "idle" && (
                <Button variant="ghost" onClick={reset} size="sm">Reset</Button>
              )}
              <div className="ml-auto flex items-center gap-2 text-[10px] font-mono text-muted-foreground">
                <Zap className="h-3 w-3 text-bio" /> 42ms · GPU T4
              </div>
            </div>
          </div>

          {/* Result panel */}
          <div className="lg:col-span-2 glass-strong rounded-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 label-mono">
                <ScanLine className="h-3 w-3 text-aqua" />
                Identification Result
              </div>
              {phase === "done" && (
                <span className="rounded-full bg-bio/15 text-bio text-[9px] font-mono px-2 py-0.5">MATCH</span>
              )}
            </div>

            {phase !== "done" ? (
              <div className="flex-1 grid place-items-center text-center text-muted-foreground py-12">
                {phase === "scanning" ? (
                  <div>
                    <Loader2 className="h-7 w-7 animate-spin mx-auto text-primary" />
                    <p className="mt-4 text-sm font-medium text-foreground">Analysing morphology…</p>
                    <p className="text-xs mt-1">Comparing against 12 local species</p>
                    <div className="mt-5 mx-auto w-48 h-1 rounded-full bg-secondary overflow-hidden">
                      <div className="h-full bg-gradient-aqua animate-pulse w-2/3" />
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="mx-auto h-10 w-10 rounded-full bg-secondary grid place-items-center">
                      <Leaf className="h-4 w-4" />
                    </div>
                    <p className="mt-3 text-sm">Awaiting input frame…</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-4 animate-fade-in flex-1 flex flex-col">
                <div className="text-[10px] font-mono uppercase tracking-widest text-aqua">Top Match</div>
                <h3 className="mt-1 font-display text-2xl font-bold italic">{result.scientific}</h3>
                <p className="text-xs text-muted-foreground">{result.common} · {result.family}</p>

                {/* Confidence */}
                <div className="mt-4 rounded-xl border border-bio/30 bg-bio/5 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">AI Confidence</span>
                    <span className="font-mono font-bold text-bio">{result.confidence}%</span>
                  </div>
                  <div className="mt-2 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-gradient-bio rounded-full" style={{ width: `${result.confidence}%` }} />
                  </div>
                  <div className="mt-3 space-y-1.5">
                    {result.alternates.map((a) => (
                      <div key={a.name} className="flex items-center gap-2 text-[10px] font-mono">
                        <span className="text-muted-foreground italic flex-1 truncate">{a.name}</span>
                        <span className="text-muted-foreground">{a.c}%</span>
                        <div className="w-12 h-0.5 rounded-full bg-secondary overflow-hidden">
                          <div className="h-full bg-muted-foreground/60" style={{ width: `${a.c * 10}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground">
                  <MapPin className="h-3.5 w-3.5 text-accent mt-0.5 shrink-0" />
                  <span>{result.habitat}</span>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-foreground/80">{result.description}</p>

                <div className="mt-4 flex items-center gap-2 rounded-lg border border-border bg-secondary/40 px-3 py-2 text-xs">
                  <ShieldCheck className="h-3.5 w-3.5 text-bio" />
                  <span className="text-muted-foreground">IUCN:</span>
                  <span className="font-semibold text-bio">{result.status}</span>
                </div>

                <div className="mt-auto pt-4 flex gap-2">
                  <Button variant="hero" size="sm" className="flex-1" asChild><a href="#viewer">View 3D Model</a></Button>
                  <Button variant="glass" size="sm" asChild><a href="#library">Library</a></Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
