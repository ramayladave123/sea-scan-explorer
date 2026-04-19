import { Activity, MapPin, TrendingUp, AlertTriangle } from "lucide-react";

const sites = [
  { name: "Dahican Beach", coverage: 87, trend: "+2.4%", status: "healthy" },
  { name: "Pujada Island", coverage: 73, trend: "+0.8%", status: "healthy" },
  { name: "Mayo Bay", coverage: 54, trend: "−1.2%", status: "watch" },
  { name: "Guang-guang Reef", coverage: 91, trend: "+3.1%", status: "healthy" },
  { name: "Sigaboy Cove", coverage: 38, trend: "−4.7%", status: "alert" },
];

const stats = [
  { label: "Total area mapped", value: "287.4", unit: "ha", trend: "+12.3% YoY", color: "text-aqua" },
  { label: "Carbon sequestered", value: "342", unit: "tCO₂/yr", trend: "Blue carbon", color: "text-bio" },
  { label: "Species detected", value: "12", unit: "of 60 PH", trend: "Endemic: 0", color: "text-foam" },
  { label: "Avg confidence", value: "94.2", unit: "%", trend: "F1 0.984", color: "text-primary" },
];

export const ResearchData = () => {
  return (
    <section id="data" className="relative px-6 lg:px-12 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <div className="label-mono text-aqua">/ 05 — Research Telemetry</div>
            <h2 className="mt-2 font-display text-3xl md:text-4xl font-bold tracking-tight">
              Pujada Bay · Live Conservation Data
            </h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
              Aggregated from 14 monitoring stations along the Mati City coastline. Data refreshed every 6 hours.
            </p>
          </div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest">
            <span className="rounded-full bg-bio/15 text-bio px-2 py-0.5">● Synced 4m ago</span>
          </div>
        </div>

        {/* KPI cards */}
        <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
          {stats.map((s) => (
            <div key={s.label} className="glass rounded-xl p-4">
              <div className="label-mono">{s.label}</div>
              <div className="mt-2 flex items-baseline gap-1">
                <span className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</span>
                <span className="text-xs font-mono text-muted-foreground">{s.unit}</span>
              </div>
              <div className="mt-1 text-[10px] font-mono text-muted-foreground">{s.trend}</div>
            </div>
          ))}
        </div>

        {/* Sites table */}
        <div className="mt-6 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-2 glass-strong rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-aqua" />
                <h3 className="font-display font-semibold text-sm">Monitoring Sites</h3>
              </div>
              <span className="label-mono">{sites.length} active</span>
            </div>

            <div className="space-y-2">
              {sites.map((site) => (
                <div key={site.name} className="grid grid-cols-12 items-center gap-3 rounded-lg border border-border bg-secondary/30 px-3 py-2.5 hover:bg-secondary/50 transition-colors">
                  <div className="col-span-4 flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${site.status === "healthy" ? "bg-bio" : site.status === "watch" ? "bg-coral" : "bg-destructive"} animate-pulse`} />
                    <span className="text-sm font-medium truncate">{site.name}</span>
                  </div>
                  <div className="col-span-5">
                    <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full ${site.status === "healthy" ? "bg-gradient-aqua" : site.status === "watch" ? "bg-coral" : "bg-destructive"}`}
                        style={{ width: `${site.coverage}%` }}
                      />
                    </div>
                  </div>
                  <div className="col-span-2 font-mono text-xs text-aqua text-right">{site.coverage}%</div>
                  <div className={`col-span-1 font-mono text-[10px] text-right ${site.trend.startsWith("+") ? "text-bio" : "text-coral"}`}>
                    {site.trend}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity panel */}
          <div className="space-y-4">
            <div className="glass-strong rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <Activity className="h-4 w-4 text-bio" />
                <h3 className="font-display font-semibold text-sm">Recent Activity</h3>
              </div>
              <ul className="space-y-3 text-xs">
                {[
                  { t: "12s ago", e: "New scan · Enhalus acoroides", c: "text-bio" },
                  { t: "4m ago", e: "Sync · 14 stations", c: "text-aqua" },
                  { t: "1h ago", e: "Model retrained · v2.1", c: "text-primary" },
                  { t: "3h ago", e: "Alert · Sigaboy −4.7%", c: "text-coral" },
                ].map((a, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className={`mt-1 h-1.5 w-1.5 rounded-full ${a.c.replace("text-", "bg-")} shrink-0`} />
                    <div className="flex-1">
                      <div className="text-foreground">{a.e}</div>
                      <div className="font-mono text-[10px] text-muted-foreground">{a.t}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-coral/30 bg-coral/5 p-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-coral shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-semibold text-coral">Conservation Alert</div>
                  <p className="mt-1 text-[11px] text-foreground/80 leading-relaxed">
                    Sigaboy Cove showing −4.7% biomass decline over 30 days. Suspected anchor damage. Field team dispatched.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
