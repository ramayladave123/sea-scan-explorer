import { useRef, useState } from "react";
import { Camera, Upload, ScanLine, Loader2, CheckCircle2, Leaf, ShieldCheck } from "lucide-react";
import { Button } from "./ui/button";

const result = {
  scientific: "Enhalus acoroides",
  common: "Tape Seagrass",
  confidence: 98.4,
  status: "Least Concern",
  description:
    "The largest seagrass species in the Indo-Pacific, forming vast meadows that shelter dugongs, sea turtles, and juvenile fish across Mati City's coastal waters.",
};

export const Scanner = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [phase, setPhase] = useState<"idle" | "scanning" | "done">("idle");
  const [preview, setPreview] = useState<string | null>(null);

  const onUpload = (file: File) => {
    setPreview(URL.createObjectURL(file));
    setPhase("scanning");
    setTimeout(() => setPhase("done"), 2200);
  };

  const reset = () => {
    setPhase("idle");
    setPreview(null);
  };

  return (
    <section id="scanner" className="relative py-24 md:py-32">
      <div className="container">
        <div className="max-w-2xl">
          <div className="font-mono text-xs uppercase tracking-widest text-accent">/ 01 — AI Recognition</div>
          <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
            Snap. Scan. <span className="text-gradient">Know.</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Upload an image or open your camera. Our AI identifies the species in seconds and surfaces conservation insight.
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-5 gap-6">
          {/* Scanner panel */}
          <div className="lg:col-span-3 glass rounded-3xl p-6 md:p-8 shadow-deep">
            <div
              className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gradient-deep"
              onDrop={(e) => {
                e.preventDefault();
                if (e.dataTransfer.files[0]) onUpload(e.dataTransfer.files[0]);
              }}
              onDragOver={(e) => e.preventDefault()}
            >
              {preview ? (
                <img src={preview} alt="Scanned seagrass" className="h-full w-full object-cover" />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-foam">
                  <div className="text-center">
                    <div className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-aqua/10 border border-aqua/30 backdrop-blur">
                      <Camera className="h-9 w-9 text-aqua" />
                    </div>
                    <p className="mt-5 font-display text-xl">Drop a seagrass photo</p>
                    <p className="mt-1 text-sm text-foam/60">or use one of the actions below</p>
                  </div>
                </div>
              )}

              {/* corner brackets */}
              <span className="pointer-events-none absolute top-4 left-4 h-8 w-8 border-l-2 border-t-2 border-aqua/80 rounded-tl-lg" />
              <span className="pointer-events-none absolute top-4 right-4 h-8 w-8 border-r-2 border-t-2 border-aqua/80 rounded-tr-lg" />
              <span className="pointer-events-none absolute bottom-4 left-4 h-8 w-8 border-l-2 border-b-2 border-aqua/80 rounded-bl-lg" />
              <span className="pointer-events-none absolute bottom-4 right-4 h-8 w-8 border-r-2 border-b-2 border-aqua/80 rounded-br-lg" />

              {phase === "scanning" && (
                <>
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-aqua to-transparent shadow-glow animate-scan" />
                  <div className="absolute inset-0 bg-aqua/5" />
                </>
              )}

              {phase === "done" && (
                <div className="absolute top-4 right-4 flex items-center gap-1.5 rounded-full bg-bio/90 px-3 py-1 text-xs font-semibold text-abyss">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Match {result.confidence}%
                </div>
              )}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => e.target.files?.[0] && onUpload(e.target.files[0])}
              />
              <Button variant="hero" onClick={() => fileRef.current?.click()}>
                <Upload className="h-4 w-4" /> Upload image
              </Button>
              <Button variant="glass">
                <Camera className="h-4 w-4" /> Open camera
              </Button>
              {phase !== "idle" && (
                <Button variant="ghost" onClick={reset}>Reset</Button>
              )}
            </div>
          </div>

          {/* Result panel */}
          <div className="lg:col-span-2 glass rounded-3xl p-6 md:p-8 shadow-deep flex flex-col">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <ScanLine className="h-3.5 w-3.5 text-accent" />
              Identification Result
            </div>

            {phase !== "done" ? (
              <div className="flex-1 grid place-items-center text-center text-muted-foreground py-16">
                {phase === "scanning" ? (
                  <div>
                    <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
                    <p className="mt-4 font-medium">Analysing morphology…</p>
                    <p className="text-sm">Comparing against 12 local species</p>
                  </div>
                ) : (
                  <div>
                    <div className="mx-auto h-12 w-12 rounded-full bg-muted grid place-items-center">
                      <Leaf className="h-5 w-5" />
                    </div>
                    <p className="mt-4">Awaiting scan…</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-6 animate-fade-in flex-1 flex flex-col">
                <div className="text-xs font-mono text-accent">Most likely match</div>
                <h3 className="mt-1 font-display text-3xl font-bold italic">{result.scientific}</h3>
                <p className="text-muted-foreground">{result.common}</p>

                <div className="mt-5 rounded-2xl bg-gradient-to-br from-bio/10 to-aqua/5 border border-bio/30 p-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">AI Confidence</span>
                    <span className="font-mono font-bold text-primary">{result.confidence}%</span>
                  </div>
                  <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div className="h-full bg-gradient-aqua rounded-full" style={{ width: `${result.confidence}%` }} />
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-foreground/80">{result.description}</p>

                <div className="mt-5 flex items-center gap-2 rounded-xl bg-secondary px-3 py-2 text-sm">
                  <ShieldCheck className="h-4 w-4 text-teal" />
                  <span className="text-muted-foreground">IUCN Status:</span>
                  <span className="font-semibold text-teal">{result.status}</span>
                </div>

                <div className="mt-auto pt-6 flex gap-2">
                  <Button variant="hero" className="flex-1" asChild><a href="#viewer">View in 3D</a></Button>
                  <Button variant="glass" asChild><a href="#library">Library</a></Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
