export const LightRays = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div className="absolute -top-20 left-1/4 h-[140%] w-32 rotate-12 bg-gradient-to-b from-aqua/30 via-aqua/10 to-transparent blur-2xl animate-shimmer" />
    <div className="absolute -top-20 left-1/2 h-[140%] w-40 -rotate-6 bg-gradient-to-b from-bio/25 via-aqua/10 to-transparent blur-3xl animate-shimmer" style={{ animationDelay: "1s" }} />
    <div className="absolute -top-20 right-1/4 h-[140%] w-24 rotate-[20deg] bg-gradient-to-b from-foam/40 via-aqua/10 to-transparent blur-2xl animate-shimmer" style={{ animationDelay: "2s" }} />
  </div>
);
