import { Waves, Github, Mail } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative border-t border-border bg-sidebar/30 mt-8">
      <div className="px-6 lg:px-12 py-10">
        <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-aqua shadow-glow">
              <Waves className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </div>
            <div>
              <div className="font-display text-sm font-bold">SeaScan · Mati City</div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                In partnership with DOSCST Marine Lab · DENR-BMB
              </div>
            </div>
          </div>

          <div className="flex items-center gap-5 text-xs text-muted-foreground">
            <a href="#" className="hover:text-primary flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" /> research@seascan.ph</a>
            <a href="#" className="hover:text-primary flex items-center gap-1.5"><Github className="h-3.5 w-3.5" /> /seascan</a>
            <span className="font-mono text-[10px]">v2.1 · Build 2026.04</span>
          </div>
        </div>

        <div className="mx-auto max-w-7xl mt-6 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-2 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
          <span>© {new Date().getFullYear()} SeaScan Research Platform</span>
          <span>Protecting blue carbon · One blade at a time</span>
        </div>
      </div>
    </footer>
  );
};
