export const C = {
  bg:       "#f4f6fb",
  white:    "#ffffff",
  border:   "#e3e8f0",
  text:     "#18202e",
  muted:    "#8492a6",
  accent:   "#3b6cf6",
  accentBg: "#eef1fe",
  danger:   "#e53e3e",
  success:  "#0a9e6e",
};

export const STATUS = {
  new:       { label: "New",       color: "#3b6cf6", bg: "#eef1fe" },
  contacted: { label: "Contacted", color: "#d97706", bg: "#fef3c7" },
  qualified: { label: "Qualified", color: "#7c3aed", bg: "#ede9fe" },
  converted: { label: "Converted", color: "#0a9e6e", bg: "#d1fae5" },
  lost:      { label: "Lost",      color: "#e53e3e", bg: "#fee2e2" },
};

export const SOURCES = ["Website", "Referral", "LinkedIn", "Cold Outreach", "Other"];

export const inputStyle = {
  width: "100%",
  padding: "9px 12px",
  fontSize: 14,
  border: `1px solid ${C.border}`,
  borderRadius: 8,
  fontFamily: "inherit",
  outline: "none",
  background: C.bg,
  color: C.text,
  boxSizing: "border-box",
};