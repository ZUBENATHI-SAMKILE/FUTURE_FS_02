import { C, STATUS } from "../theme";
import { StatCard, Badge, Avatar } from "../components/UI";

export default function Dashboard({ leads, onViewLeads, onOpenLead }) {
  // Compute stats 
  const total     = leads.length;
  const convRate  = total ? Math.round((leads.filter(l => l.status === "converted").length / total) * 100) : 0;
  const recentLeads = [...leads]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <div style={{ padding: 32, maxWidth: 960, margin: "0 auto" }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, marginBottom: 4 }}>Dashboard</h1>
      <p style={{ color: C.muted, fontSize: 14, marginBottom: 28 }}>Your lead pipeline at a glance.</p>

      {/*Stat cards */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 32 }}>
        <StatCard label="Total Leads"  value={total}           color={C.text}            />
        <StatCard label="New"          value={leads.filter(l => l.status === "new").length}       color={STATUS.new.color}       />
        <StatCard label="Contacted"    value={leads.filter(l => l.status === "contacted").length} color={STATUS.contacted.color} />
        <StatCard label="Qualified"    value={leads.filter(l => l.status === "qualified").length} color={STATUS.qualified.color} />
        <StatCard label="Converted"    value={leads.filter(l => l.status === "converted").length} color={STATUS.converted.color} />
        <StatCard label="Conv. Rate"   value={convRate + "%"}  color={STATUS.converted.color}     />
      </div>

      {/*Two column row */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 24 }}>

        {/* Pipeline funnel */}
        <section style={{
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: 22,
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 18 }}>
            Pipeline Funnel
          </h2>
          {Object.entries(STATUS).map(([key, cfg]) => {
            const count = leads.filter(l => l.status === key).length;
            const pct   = total ? (count / total) * 100 : 0;
            return (
              <div key={key} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: cfg.color, fontWeight: 600 }}>{cfg.label}</span>
                  <span style={{ fontSize: 12, color: C.muted }}>{count}</span>
                </div>
                <div style={{ height: 7, background: C.bg, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: cfg.color,
                    borderRadius: 4,
                    transition: "width 0.7s ease",
                  }} />
                </div>
              </div>
            );
          })}
        </section>

        {/* Source breakdown */}
        <section style={{
          background: C.white,
          border: `1px solid ${C.border}`,
          borderRadius: 12,
          padding: 22,
        }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 18 }}>
            Leads by Source
          </h2>
          {["Website", "Referral", "LinkedIn", "Cold Outreach", "Other"].map(src => {
            const count = leads.filter(l => l.source === src).length;
            const pct   = total ? (count / total) * 100 : 0;
            return (
              <div key={src} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{src}</span>
                  <span style={{ fontSize: 12, color: C.muted }}>{count}</span>
                </div>
                <div style={{ height: 7, background: C.bg, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{
                    height: "100%",
                    width: `${pct}%`,
                    background: C.accent,
                    borderRadius: 4,
                    transition: "width 0.7s ease",
                    opacity: 0.7,
                  }} />
                </div>
              </div>
            );
          })}
        </section>
      </div>

      {/*Recent leads*/}
      <section style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 22,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h2 style={{ fontSize: 13, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>
            Recent Leads
          </h2>
          <button
            onClick={onViewLeads}
            style={{ background: "none", border: "none", color: C.accent, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}
          >
            View All →
          </button>
        </div>

        {recentLeads.map((lead, i) => (
          <div
            key={lead.id}
            onClick={() => onOpenLead(lead)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "11px 8px",
              borderBottom: i < recentLeads.length - 1 ? `1px solid ${C.border}` : "none",
              cursor: "pointer",
              borderRadius: 8,
              transition: "background 0.1s",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = C.bg)}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
          >
            <Avatar name={lead.name} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{lead.name}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{lead.company || lead.email}</div>
            </div>
            <Badge status={lead.status} />
            <span style={{ fontSize: 12, color: C.muted, whiteSpace: "nowrap" }}>{lead.createdAt}</span>
          </div>
        ))}
      </section>
    </div>
  );
}