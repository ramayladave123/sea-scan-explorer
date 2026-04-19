import { useState } from "react";
import { ScanLine, BookOpen, Box, Sparkles, BarChart3, Waves, Settings, ChevronLeft } from "lucide-react";

const items = [
  { id: "scan", label: "Scan", icon: ScanLine, href: "#scanner", badge: "AI" },
  { id: "viewer", label: "3D Viewer", icon: Box, href: "#viewer" },
  { id: "ar", label: "AR Mode", icon: Sparkles, href: "#ar" },
  { id: "library", label: "Library", icon: BookOpen, href: "#library" },
  { id: "data", label: "Research Data", icon: BarChart3, href: "#data" },
];

export const Sidebar = () => {
  const [active, setActive] = useState("scan");

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-64 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground">
      {/* Brand */}
      <div className="flex items-center gap-2.5 px-5 h-16 border-b border-sidebar-border">
        <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-aqua shadow-glow">
          <Waves className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-display text-base font-bold tracking-tight text-foreground">SeaScan</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">Marine AI · v2.1</span>
        </div>
      </div>

      {/* Status */}
      <div className="mx-4 mt-4 rounded-xl border border-sidebar-border bg-sidebar-accent/40 p-3">
        <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-bio opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bio" />
          </span>
          System Online
        </div>
        <div className="mt-2 text-xs text-sidebar-accent-foreground">Pujada Bay · Node 04</div>
        <div className="mt-2 grid grid-cols-2 gap-2 text-[10px] font-mono">
          <div>
            <div className="text-muted-foreground">GPU</div>
            <div className="text-aqua">94%</div>
          </div>
          <div>
            <div className="text-muted-foreground">Latency</div>
            <div className="text-aqua">42ms</div>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="mt-6 flex-1 px-3">
        <div className="px-2 label-mono mb-2">Workspace</div>
        <ul className="space-y-0.5">
          {items.map((it) => {
            const isActive = active === it.id;
            return (
              <li key={it.id}>
                <a
                  href={it.href}
                  onClick={() => setActive(it.id)}
                  className={`group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-soft"
                      : "text-sidebar-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <span
                    className={`grid h-7 w-7 place-items-center rounded-md transition-colors ${
                      isActive ? "bg-primary/15 text-primary" : "bg-sidebar-accent/40 text-muted-foreground group-hover:text-primary"
                    }`}
                  >
                    <it.icon className="h-3.5 w-3.5" />
                  </span>
                  <span className="flex-1 font-medium">{it.label}</span>
                  {it.badge && (
                    <span className="rounded-full bg-primary/15 px-1.5 py-0.5 text-[9px] font-mono text-primary">{it.badge}</span>
                  )}
                  {isActive && <span className="h-1 w-1 rounded-full bg-primary shadow-glow" />}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="px-2 label-mono mb-2 mt-8">Telemetry</div>
        <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/30 p-3 space-y-2 text-xs">
          {[
            { l: "Species indexed", v: "12", c: "text-foreground" },
            { l: "Scans today", v: "2,431", c: "text-aqua" },
            { l: "Coverage", v: "87.4 ha", c: "text-bio" },
          ].map((s) => (
            <div key={s.l} className="flex items-center justify-between">
              <span className="text-muted-foreground">{s.l}</span>
              <span className={`font-mono font-semibold ${s.c}`}>{s.v}</span>
            </div>
          ))}
        </div>
      </nav>

      {/* User */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-sidebar-accent/60 transition-colors cursor-pointer">
          <div className="h-8 w-8 rounded-full bg-gradient-bio grid place-items-center text-xs font-bold text-abyss">DR</div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-semibold truncate">Dr. R. Cabanlit</div>
            <div className="text-[10px] text-muted-foreground truncate">Marine Biologist</div>
          </div>
          <Settings className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
      </div>
    </aside>
  );
};
