import { C, STATUS, inputStyle } from "../theme";

//  Status badge pill 
export function Badge({ status }) {
  const s = STATUS[status] ?? STATUS.new;
  return (
    <span style={{
      background: s.bg,
      color: s.color,
      border: `1px solid ${s.color}30`,
      borderRadius: 6,
      padding: "3px 10px",
      fontSize: 12,
      fontWeight: 700,
      whiteSpace: "nowrap",
    }}>
      {s.label}
    </span>
  );
}

// Button 
export function Btn({ children, onClick, variant = "primary", small, full, style: extra }) {
  const map = {
    primary:   { background: C.accent,      color: "#fff",    border: "none" },
    secondary: { background: "transparent", color: C.muted,   border: `1px solid ${C.border}` },
    danger:    { background: "transparent", color: C.danger,  border: `1px solid ${C.danger}55` },
    ghost:     { background: "transparent", color: C.accent,  border: "none" },
  };
  return (
    <button
      onClick={onClick}
      style={{
        ...map[variant],
        padding: small ? "5px 12px" : "9px 18px",
        fontSize: small ? 12 : 14,
        fontWeight: 600,
        borderRadius: 8,
        cursor: "pointer",
        fontFamily: "inherit",
        width: full ? "100%" : "auto",
        transition: "opacity 0.15s",
        ...extra,
      }}
      onMouseEnter={e => (e.currentTarget.style.opacity = "0.8")}
      onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
    >
      {children}
    </button>
  );
}

// Label + input wrapper
export function Field({ label, children }) {
  return (
    <div style={{ marginBottom: 14 }}>
      {label && (
        <label style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          color: C.muted,
          marginBottom: 5,
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}>
          {label}
        </label>
      )}
      {children}
    </div>
  );
}

// Modal backdrop + card
export function Modal({ title, onClose, children, width = 460 }) {
  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0,
        background: "rgba(24,32,46,0.45)",
        backdropFilter: "blur(4px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 200, padding: 16,
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: C.white,
          borderRadius: 14,
          width: "100%",
          maxWidth: width,
          boxShadow: "0 16px 48px rgba(0,0,0,0.15)",
        }}
      >
        {/* Modal header */}
        <div style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "16px 22px",
          borderBottom: `1px solid ${C.border}`,
        }}>
          <strong style={{ fontSize: 16, color: C.text }}>{title}</strong>
          <button
            onClick={onClose}
            style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: C.muted, lineHeight: 1 }}
          >
            ✕
          </button>
        </div>

        {/* Modal body */}
        <div style={{ padding: 22 }}>{children}</div>
      </div>
    </div>
  );
}

// Avatar (initials circle)
export function Avatar({ name, size = 38 }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map(w => w[0])
    .join("")
    .toUpperCase();

  // deterministic colour from name
  const hue = [...name].reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % 360;

  return (
    <div style={{
      width: size, height: size,
      borderRadius: "50%",
      background: `hsl(${hue},55%,88%)`,
      color: `hsl(${hue},55%,30%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.36,
      fontWeight: 700,
      flexShrink: 0,
    }}>
      {initials}
    </div>
  );
}


export function StatCard({ label, value, color }) {
  return (
    <div style={{
      background: C.white,
      border: `1px solid ${C.border}`,
      borderRadius: 10,
      padding: "14px 20px",
      minWidth: 100,
    }}>
      <div style={{ fontSize: 26, fontWeight: 800, color: color ?? C.text, lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{label}</div>
    </div>
  );
}