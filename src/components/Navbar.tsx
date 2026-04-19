import { Waves, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const links = [
  { href: "#scanner", label: "Scanner" },
  { href: "#viewer", label: "3D Viewer" },
  { href: "#library", label: "Library" },
  { href: "#about", label: "About" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <header className="fixed top-0 z-50 w-full">
      <div className="mx-auto mt-4 max-w-7xl px-4">
        <nav className="glass flex items-center justify-between rounded-2xl px-5 py-3 shadow-soft">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-aqua shadow-glow">
              <Waves className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              <div className="absolute inset-0 rounded-xl bg-gradient-aqua opacity-50 blur-md group-hover:opacity-80 transition-opacity" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display text-lg font-bold tracking-tight">SeaScan</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Mati City</span>
            </div>
          </a>

          <ul className="hidden md:flex items-center gap-1">
            {links.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="rounded-lg px-4 py-2 text-sm font-medium text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex items-center gap-2">
            <Button variant="hero" size="sm">Launch Scanner</Button>
          </div>

          <button onClick={() => setOpen(!open)} className="md:hidden rounded-lg p-2 hover:bg-primary/10" aria-label="Menu">
            <Menu className="h-5 w-5" />
          </button>
        </nav>

        {open && (
          <div className="glass mt-2 rounded-2xl p-4 md:hidden animate-fade-in">
            <ul className="flex flex-col gap-1">
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href} onClick={() => setOpen(false)} className="block rounded-lg px-4 py-2.5 text-sm font-medium hover:bg-primary/10">
                    {l.label}
                  </a>
                </li>
              ))}
              <li className="mt-2"><Button variant="hero" className="w-full">Launch Scanner</Button></li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};
