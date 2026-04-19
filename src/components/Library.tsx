import { useState } from "react";
import { Search, ArrowUpRight, ShieldCheck } from "lucide-react";
import seagrass1 from "@/assets/seagrass-1.png";
import seagrass2 from "@/assets/seagrass-2.png";
import seagrass3 from "@/assets/seagrass-3.png";
import seagrass4 from "@/assets/seagrass-4.png";

const species = [
  { name: "Enhalus acoroides", common: "Tape Seagrass", img: seagrass1, status: "Least Concern", depth: "0.5–4 m", tag: "Pioneer" },
  { name: "Thalassia hemprichii", common: "Sickle Seagrass", img: seagrass2, status: "Least Concern", depth: "1–5 m", tag: "Climax" },
  { name: "Cymodocea rotundata", common: "Round-tipped Seagrass", img: seagrass3, status: "Least Concern", depth: "0–3 m", tag: "Common" },
  { name: "Halophila ovalis", common: "Paddle Weed", img: seagrass4, status: "Least Concern", depth: "0–10 m", tag: "Pioneer" },
  { name: "Syringodium isoetifolium", common: "Noodle Seagrass", img: seagrass1, status: "Least Concern", depth: "1–6 m", tag: "Common" },
  { name: "Halodule uninervis", common: "Needle Seagrass", img: seagrass4, status: "Least Concern", depth: "0–4 m", tag: "Pioneer" },
];

export const Library = () => {
  const [query, setQuery] = useState("");
  const filtered = species.filter(
    (s) => s.name.toLowerCase().includes(query.toLowerCase()) || s.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="library" className="relative py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <div className="font-mono text-xs uppercase tracking-widest text-accent">/ 03 — Digital Library</div>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-bold tracking-tight">
              Mati City's seagrass <span className="text-gradient">codex.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A living archive of every species documented along the Davao Oriental coast.
            </p>
          </div>

          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search species…"
              className="w-full rounded-2xl border border-border bg-card/60 backdrop-blur pl-11 pr-4 py-3 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
            />
          </div>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((s, i) => (
            <article
              key={s.name + i}
              className="group relative overflow-hidden rounded-3xl glass shadow-soft hover:shadow-deep hover:-translate-y-1 transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-foam to-secondary">
                <div className="absolute inset-0 bg-gradient-to-br from-aqua/20 to-transparent" />
                <img
                  src={s.img}
                  alt={s.name}
                  loading="lazy"
                  width={768}
                  height={768}
                  className="absolute inset-0 h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-700 origin-bottom animate-sway"
                  style={{ animationDelay: `${i * 0.3}s` }}
                />
                <div className="absolute top-3 left-3 rounded-full bg-abyss/60 backdrop-blur px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider text-aqua border border-aqua/30">
                  {s.tag}
                </div>
                <div className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-card/80 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="h-4 w-4 text-primary" />
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-display text-xl font-bold italic leading-tight">{s.name}</h3>
                <p className="text-sm text-muted-foreground">{s.common}</p>

                <div className="mt-4 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-teal">
                    <ShieldCheck className="h-3.5 w-3.5" />
                    <span className="font-medium">{s.status}</span>
                  </div>
                  <span className="font-mono text-muted-foreground">{s.depth}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-muted-foreground mt-12">No species match "{query}".</p>
        )}
      </div>
    </section>
  );
};
