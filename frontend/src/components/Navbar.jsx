import { C } from "../theme";

export default function Navbar({ page, setPage, username, onLogout }) {
  const links = [
    { id: "dashboard", label: "Dashboard"                    },
    { id: "leads",     label: "Leads",  also: "detail" },
  ];

  return (
    <header style={{
      background: C.white,
      borderBottom: `1px solid ${C.border}`,
      padding: "0 28px",
      height: 56,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>

      {/* Logo */}
      <span
        onClick={() => setPage("dashboard")}
        style={{ fontWeight: 800, fontSize: 18, cursor: "pointer", userSelect: "none" }}
      >
        <span style={{ color: C.accent }}>Lead</span>
        <span style={{ color: C.text }}>Base</span>
      </span>

      {/* Nav links */}
      <nav style={{ display: "flex", gap: 4 }}>
        {links.map(link => {
          const active = page === link.id || page === link.also;
          return (
            <button
              key={link.id}
              onClick={() => setPage(link.id)}
              style={{
                background:  active ? C.accentBg   : "transparent",
                color:       active ? C.accent      : C.muted,
                border:      "none",
                borderRadius: 8,
                padding:     "6px 16px",
                fontSize:    14,
                fontWeight:  active ? 700 : 500,
                cursor:      "pointer",
                fontFamily:  "inherit",
                transition:  "all 0.15s",
              }}
              onMouseEnter={e => { if (!active) e.currentTarget.style.color = C.text; }}
              onMouseLeave={e => { if (!active) e.currentTarget.style.color = C.muted; }}
            >
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* Right side , profile pill + sign out */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>

        {/* Profile pill */}
        <div
          onClick={() => setPage("profile")}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            background:  page === "profile" ? C.accentBg : C.bg,
            border:      `1px solid ${page === "profile" ? C.accent : C.border}`,
            borderRadius: 20,
            padding:     "5px 12px 5px 6px",
            cursor:      "pointer",
            transition:  "all 0.15s",
          }}
          onMouseEnter={e => { if (page !== "profile") e.currentTarget.style.borderColor = C.accent; }}
          onMouseLeave={e => { if (page !== "profile") e.currentTarget.style.borderColor = C.border; }}
        >
          {/* Avatar circle */}
          <div style={{
            width: 26, height: 26, borderRadius: "50%",
            background: C.accent, color: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 700, flexShrink: 0,
          }}>
            {username?.[0]?.toUpperCase() ?? "A"}
          </div>
          <span style={{
            fontSize: 13, fontWeight: 600,
            color: page === "profile" ? C.accent : C.text,
          }}>
            {username || "Admin"}
          </span>
        </div>

        {/* Sign out */}
        <button
          onClick={onLogout}
          title="Sign out"
          style={{
            background:   "transparent",
            border:       `1px solid ${C.border}`,
            borderRadius:  8,
            padding:      "6px 12px",
            fontSize:      13,
            color:         C.muted,
            cursor:        "pointer",
            fontFamily:   "inherit",
            fontWeight:    500,
            transition:   "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.danger; e.currentTarget.style.color = C.danger; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.muted;  }}
        >
          Sign Out
        </button>
      </div>
    </header>
  );
}