import { Search, Bell, Command } from "lucide-react";

interface Props {
  title?: string;
  subtitle?: string;
  breadcrumb?: string;
}

export const Topbar = ({ title = "Overview", subtitle = "Real-time seagrass intelligence", breadcrumb = "Workspace / Overview" }: Props) => {
  return (
    <header className="sticky top-0 z-30 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="flex items-center gap-4 px-6 lg:px-8 h-16">
        <div className="flex-1 min-w-0">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{breadcrumb}</div>
          <div className="flex items-baseline gap-3">
            <h1 className="font-display text-base md:text-lg font-semibold truncate">{title}</h1>
            <span className="hidden sm:inline text-xs text-muted-foreground truncate">{subtitle}</span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-2 rounded-lg border border-border bg-card/40 px-3 py-1.5 text-xs text-muted-foreground w-72">
          <Search className="h-3.5 w-3.5" />
          <span className="flex-1">Search species, scans, locations…</span>
          <kbd className="flex items-center gap-1 rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px]">
            <Command className="h-2.5 w-2.5" /> K
          </kbd>
        </div>

        <button className="relative rounded-lg border border-border bg-card/40 p-2 hover:bg-card transition-colors">
          <Bell className="h-3.5 w-3.5" />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-coral animate-pulse" />
        </button>

        <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-card/40 px-3 py-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-bio animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-foam/80">Live · Pujada Bay</span>
        </div>
      </div>
    </header>
  );
};
