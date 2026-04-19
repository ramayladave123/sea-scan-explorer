import { Waves, Github, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer id="about" className="relative border-t border-border/50 bg-secondary/30">
      <div className="container py-16">
        <div className="grid md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-aqua shadow-glow">
                <Waves className="h-5 w-5 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <span className="font-display text-xl font-bold">SeaScan</span>
            </div>
            <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
              An open initiative to map, identify, and protect the seagrass meadows of Mati City — built with AI, AR, and a love for the sea.
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 text-accent" />
              Mati City, Davao Oriental, Philippines
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold">Platform</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li><a href="#scanner" className="hover:text-primary">AI Scanner</a></li>
              <li><a href="#viewer" className="hover:text-primary">3D Viewer</a></li>
              <li><a href="#library" className="hover:text-primary">Species Library</a></li>
              <li><a href="#" className="hover:text-primary">AR Mode</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold">Connect</h4>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> hello@seascan.ph</li>
              <li className="flex items-center gap-2"><Github className="h-4 w-4" /> github/seascan</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} SeaScan. Protecting blue carbon, one blade at a time.</span>
          <span className="font-mono uppercase tracking-widest">v1.0 · Mati City Edition</span>
        </div>
      </div>
    </footer>
  );
};
