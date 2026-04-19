import { useState } from "react";
import { Search, ArrowUpRight, ShieldCheck, Filter } from "lucide-react";
import seagrass1 from "@/assets/seagrass-1.png";
import seagrass2 from "@/assets/seagrass-2.png";
import seagrass3 from "@/assets/seagrass-3.png";
import seagrass4 from "@/assets/seagrass-4.png";

const species = [
  { id: "EAC-01", name: "Enhalus acoroides", common: "Tape Seagrass", img: seagrass1, status: "Least Concern", depth: "0.5–4 m", family: "Hydrocharitaceae", tag: "Pioneer", coverage: 32 },
  { id: "THE-02", name: "Thalassia hemprichii", common: "Sickle Seagrass", img: seagrass2, status: "Least Concern", depth: "1–5 m", family: "Hydrocharitaceae", tag: "Climax", coverage: 24 },
  { id: "CRO-03", name: "Cymodocea rotundata", common: "Round-tipped Seagrass", img: seagrass3, status: "Least Concern", depth: "0–3 m", family: "Cymodoceaceae", tag: "Common", coverage: 14 },
  { id: "HOV-04", name: "Halophila ovalis", common: "Paddle Weed", img: seagrass4, status: "Least Concern", depth: "0–10 m", family: "Hydrocharitaceae", tag: "Pioneer", coverage: 11 },
  { id: "SIS-05", name: "Syringodium isoetifolium", common: "Noodle Seagrass", img: seagrass1, status: "Least Concern", depth: "1–6 m", family: "Cymodoceaceae", tag: "Common", coverage: 9 },
  { id: "HUN-06", name: "Halodule uninervis", common: "Needle Seagrass", img: seagrass4, status: "Least Concern", depth: "0–4 m", family: "Cymodoceaceae", tag: "Pioneer", coverage: 6 },
];

export const Library = () => {
  const [query, setQuery] = useState("");
  const filtered = species.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="library" className="relative px-6 lg:px-12 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="label-mono text-aqua">/ 04 — Marine Codex</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Pujada Bay Species Database
            </h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">
              Curated by the Davao Oriental State University Marine Lab. {species.length} indexed species, updated weekly.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search species, family, code…"
                className="w-full rounded-lg border border-border bg-card/40 backdrop-blur pl-9 pr-3 py-2 text-xs placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring focus:border-primary/50 transition-all"
              />
            </div>
            <button className="grid h-9 w-9 place-items-center rounded-lg border border-border bg-card/40 hover:bg-card text-muted-foreground hover:text-foreground transition-colors">
              <Filter className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Table-like header */}
        <div className="mt-8 hidden md:grid grid-cols-12 gap-4 px-5 py-2 label-mono text-muted-foreground border-b border-border">
          <div className="col-span-1">ID</div>
          <div className="col-span-4">Species</div>
          <div className="col-span-2">Family</div>
          <div className="col-span-2">Depth</div>
          <div className="col-span-2">Coverage</div>
          <div className="col-span-1 text-right">Status</div>
        </div>

        <div className="mt-5 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s, i) => (
            <article
              key={s.id}
              className="group relative overflow-hidden rounded-2xl glass hover:border-primary/40 hover:-translate-y-0.5 hover:shadow-deep transition-all duration-500"
            >
              {/* Image plate */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-b from-deep-sea to-abyss">
                <div className="absolute inset-0 caustics opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-br from-aqua/10 via-transparent to-bio/10" />
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="absolute inset-0 h-full w-full object-contain p-5 group-hover:scale-110 transition-transform duration-700 origin-bottom animate-sway"
                  style={{ animationDelay: `${i * 0.3}s`, filter: "drop-shadow(0 10px 20px rgba(0,40,60,0.6))" }}
                />
                {/* corner ID */}
                <div className="absolute top-3 left-3 rounded bg-abyss/80 backdrop-blur px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-aqua border border-aqua/25">
                  {s.id}
                </div>
                <div className="absolute top-3 right-3 rounded bg-bio/15 backdrop-blur px-2 py-0.5 text-[9px] font-mono uppercase tracking-widest text-bio border border-bio/30">
                  {s.tag}
                </div>
                <div className="absolute bottom-3 right-3 grid h-8 w-8 place-items-center rounded-lg bg-aqua/20 border border-aqua/40 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-3.5 w-3.5 text-aqua" />
                </div>
              </div>

              {/* Body */}
              <div className="p-4">
                <h3 className="font-display text-base font-bold italic leading-tight">{s.name}</h3>
                <p className="text-xs text-muted-foreground">{s.common} · {s.family}</p>

                {/* Coverage bar */}
                <div className="mt-3">
                  <div className="flex items-center justify-between text-[10px] font-mono">
                    <span className="text-muted-foreground uppercase tracking-widest">Bay coverage</span>
                    <span className="text-aqua">{s.coverage}%</span>
                  </div>
                  <div className="mt-1 h-1 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full bg-gradient-aqua" style={{ width: `${s.coverage * 3}%` }} />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <div className="flex items-center gap-1.5 text-bio">
                    <ShieldCheck className="h-3 w-3" />
                    <span className="font-medium">{s.status}</span>
                  </div>
                  <span className="font-mono text-muted-foreground">{s.depth}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-12 text-sm">No species match "{query}".</p>
        )}
      </div>
    </section>
  );
};
