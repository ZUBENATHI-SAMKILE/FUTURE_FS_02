import { useState } from "react";
import { C, STATUS, inputStyle } from "../theme";
import { Badge, Avatar, Btn } from "../components/UI";

export default function LeadsList({ leads, onOpenLead, onDeleteLead, onAddLead }) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const visible = leads.filter(lead => {
    const matchesStatus = filter === "all" || lead.status === filter;
    const matchesSearch = `${lead.name} ${lead.email} ${lead.company}`
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div style={{ padding: 32, maxWidth: 1100, margin: "0 auto" }}>

      {/*Page header*/}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, marginBottom: 4 }}>Leads</h1>
          <p style={{ color: C.muted, fontSize: 14 }}>
            Showing {visible.length} of {leads.length} leads
          </p>
        </div>
        <Btn onClick={onAddLead}>＋ Add Lead</Btn>
      </div>

      {/* Search + filter bar*/}
      <div style={{ display: "flex", gap: 10, marginBottom: 18, flexWrap: "wrap" }}>
        <input
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by name, email, or company…"
          style={{ ...inputStyle, flex: 1, minWidth: 220 }}
        />
        <select
          value={filter}
          onChange={e => setFilter(e.target.value)}
          style={{ ...inputStyle, width: "auto", cursor: "pointer" }}
        >
          <option value="all">All Status</option>
          {Object.entries(STATUS).map(([k, v]) => (
            <option key={k} value={k}>{v.label}</option>
          ))}
        </select>

        {/* Clear filters button, only shows when filters are active */}
        {(search || filter !== "all") && (
          <Btn small variant="secondary" onClick={() => { setSearch(""); setFilter("all"); }}>
            ✕ Clear
          </Btn>
        )}
      </div>

      {/* Table */}
      <div style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 12,
        overflow: "hidden",
      }}>

        {/* Table header */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "2fr 2fr 1.2fr 1fr 1fr 40px",
          padding: "10px 18px",
          borderBottom: `1px solid ${C.border}`,
          fontSize: 11,
          fontWeight: 700,
          color: C.muted,
          textTransform: "uppercase",
          letterSpacing: "0.07em",
        }}>
          <span>Name</span>
          <span>Email</span>
          <span>Company</span>
          <span>Source</span>
          <span>Status</span>
          <span />
        </div>

        {/* Empty state */}
        {visible.length === 0 && (
          <div style={{ padding: 48, textAlign: "center", color: C.muted, fontSize: 14 }}>
            No leads match your search.
          </div>
        )}

        {/* Rows */}
        {visible.map((lead, i) => (
          <div
            key={lead.id}
            style={{
              display: "grid",
              gridTemplateColumns: "2fr 2fr 1.2fr 1fr 1fr 40px",
              padding: "13px 18px",
              borderBottom: i < visible.length - 1 ? `1px solid ${C.border}` : "none",
              alignItems: "center",
              transition: "background 0.1s",
              cursor: "pointer",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = C.bg)}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            onClick={() => onOpenLead(lead)}
          >
            {/* Name + avatar */}
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Avatar name={lead.name} size={34} />
              <span style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{lead.name}</span>
            </div>

            <span style={{ fontSize: 13, color: C.muted }}>{lead.email}</span>
            <span style={{ fontSize: 13, color: C.muted }}>{lead.company || "—"}</span>
            <span style={{ fontSize: 13, color: C.muted }}>{lead.source}</span>
            <Badge status={lead.status} />

            {/* Delete button */}
            <button
              onClick={e => {
                e.stopPropagation(); 
                if (window.confirm(`Delete ${lead.name}?`)) onDeleteLead(lead.id);
              }}
              style={{
                background: "none", border: "none",
                color: C.muted, fontSize: 16,
                cursor: "pointer", padding: 4,
                borderRadius: 4,
              }}
              title="Delete lead"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}