import { C, STATUS, inputStyle } from "../theme";
import { Btn, Field } from "../components/UI";

export default function Profile({ username, leads, onLogout, onRegister }) {

  //  Compute a quick personal summary 
  const total     = leads.length;
  const converted = leads.filter(l => l.status === "converted").length;
  const convRate  = total ? Math.round((converted / total) * 100) : 0;
  const newest    = [...leads].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0];

  return (
    <div style={{ padding: 32, maxWidth: 700, margin: "0 auto" }}>

      <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, marginBottom: 4 }}>Profile</h1>
      <p style={{ color: C.muted, fontSize: 14, marginBottom: 28 }}>
        Your account details and CRM summary.
      </p>

      {/* Account card */}
      <section style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 24,
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 20,
      }}>
        {/* Avatar */}
        <div style={{
          width: 64, height: 64,
          borderRadius: "50%",
          background: C.accent,
          color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26, fontWeight: 800,
          flexShrink: 0,
        }}>
          {username?.[0]?.toUpperCase() ?? "A"}
        </div>

        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 20, fontWeight: 800, color: C.text }}>{username}</div>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "#e6f9f1", color: "#0a9e6e",
            borderRadius: 20, padding: "3px 12px",
            fontSize: 12, fontWeight: 700, marginTop: 6,
          }}>
            ✓ Admin
          </div>
        </div>

        {/* Logout */}
        <Btn variant="danger" onClick={onLogout}>Sign Out</Btn>
      </section>

      {/*CRM Summary */}
      <section style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 24,
        marginBottom: 20,
      }}>
        <h2 style={{
          fontSize: 13, fontWeight: 700, color: C.muted,
          textTransform: "uppercase", letterSpacing: "0.07em",
          marginBottom: 20,
        }}>
          CRM Summary
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "Total Leads",   value: total,          color: C.text            },
            { label: "Converted",     value: converted,      color: STATUS.converted.color },
            { label: "Conv. Rate",    value: convRate + "%", color: STATUS.converted.color },
          ].map(s => (
            <div key={s.label} style={{
              background: C.bg,
              border: `1px solid ${C.border}`,
              borderRadius: 10,
              padding: "16px 18px",
              textAlign: "center",
            }}>
              <div style={{ fontSize: 28, fontWeight: 800, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Status breakdown */}
        <div style={{ marginTop: 20, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Leads by Status
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {Object.entries(STATUS).map(([key, cfg]) => {
              const count = leads.filter(l => l.status === key).length;
              const pct   = total ? (count / total) * 100 : 0;
              return (
                <div key={key} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 13, color: cfg.color, fontWeight: 600, width: 90, flexShrink: 0 }}>
                    {cfg.label}
                  </span>
                  <div style={{ flex: 1, height: 8, background: C.bg, borderRadius: 4, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${pct}%`,
                      background: cfg.color, borderRadius: 4,
                      transition: "width 0.6s ease",
                    }} />
                  </div>
                  <span style={{ fontSize: 12, color: C.muted, width: 24, textAlign: "right" }}>{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Last lead added */}
        {newest && (
          <div style={{
            marginTop: 20, paddingTop: 20,
            borderTop: `1px solid ${C.border}`,
            display: "flex", justifyContent: "space-between",
            fontSize: 13,
          }}>
            <span style={{ color: C.muted }}>Most recent lead</span>
            <span style={{ fontWeight: 600, color: C.text }}>
              {newest.name} — {newest.createdAt}
            </span>
          </div>
        )}
      </section>

      {/*Session info*/}
      <section style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        padding: 24,
      }}>
        <h2 style={{
          fontSize: 13, fontWeight: 700, color: C.muted,
          textTransform: "uppercase", letterSpacing: "0.07em",
          marginBottom: 16,
        }}>
          Session Info
        </h2>
        {[
          { label: "Logged in as",   value: username         },
          { label: "Role",           value: "Administrator"  },
          { label: "Token storage",  value: "localStorage"   },
          { label: "Token expires",  value: "8 hours"        },
        ].map(item => (
          <div key={item.label} style={{
            display: "flex", justifyContent: "space-between",
            padding: "9px 0",
            borderBottom: `1px solid ${C.border}`,
            fontSize: 14,
          }}>
            <span style={{ color: C.muted }}>{item.label}</span>
            <span style={{ fontWeight: 600, color: C.text }}>{item.value}</span>
          </div>
        ))}

        <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 10 }}>
          <Btn onClick={onRegister} full style={{ justifyContent: "center" }}>
            + Register New Admin
          </Btn>
          <Btn variant="danger" onClick={onLogout} full style={{ justifyContent: "center" }}>
            Sign Out of CRM
          </Btn>
        </div>
      </section>

    </div>
  );
}