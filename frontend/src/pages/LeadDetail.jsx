import { useState, useEffect } from "react";
import { C, STATUS, SOURCES, inputStyle } from "../theme";
import { Badge, Avatar, Btn, Field } from "../components/UI";

export default function LeadDetail({ lead, onUpdate, onDelete, onBack }) {
  // Local editable copies — saved only when user clicks "Save"
  const [status, setStatus] = useState(lead.status);
  const [note,   setNote]   = useState(lead.note);

  // Sync when a different lead is passed in
  useEffect(() => {
    setStatus(lead.status);
    setNote(lead.note);
  }, [lead.id]);

  function handleSave() {
    onUpdate({ ...lead, status, note });
    alert("Changes saved!");
  }

  function handleDelete() {
    if (window.confirm(`Delete ${lead.name}? This cannot be undone.`)) {
      onDelete(lead.id);
    }
  }

  return (
    <div style={{ padding: 32, maxWidth: 860, margin: "0 auto" }}>

      {/* Back button*/}
      <button
        onClick={onBack}
        style={{
          background: "none", border: "none",
          color: C.muted, cursor: "pointer",
          fontSize: 14, fontFamily: "inherit",
          display: "flex", alignItems: "center", gap: 6,
          marginBottom: 24, padding: 0,
        }}
      >
        ← Back to Leads
      </button>

      {/*Two-column layout */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 300px", gap: 24 }}>

        {/*LEFT: main info */}
        <div>

          {/* Profile card */}
          <section style={{
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 24,
            marginBottom: 20,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
              <Avatar name={lead.name} size={52} />
              <div>
                <h1 style={{ fontSize: 22, fontWeight: 800, color: C.text, marginBottom: 2 }}>{lead.name}</h1>
                <div style={{ fontSize: 14, color: C.muted }}>{lead.email}</div>
                {lead.phone   && <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{lead.phone}</div>}
                {lead.company && <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{lead.company}</div>}
              </div>
              <div style={{ marginLeft: "auto" }}>
                <Badge status={lead.status} />
              </div>
            </div>

            {/* Meta row */}
            <div style={{
              display: "flex", gap: 32,
              paddingTop: 16,
              borderTop: `1px solid ${C.border}`,
            }}>
              {[
                { label: "Source",  value: lead.source    },
                { label: "Added",   value: lead.createdAt },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{item.value}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Notes editor */}
          <section style={{
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 24,
          }}>
            <h2 style={{ fontSize: 14, fontWeight: 700, color: C.text, marginBottom: 16 }}>
              Notes & Follow-up
            </h2>
            <Field label="Note">
              <textarea
                style={{ ...inputStyle, resize: "vertical" }}
                rows={5}
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Write notes, next steps, or follow-up reminders here…"
              />
            </Field>
            <Btn onClick={handleSave}>Save Changes</Btn>
          </section>
        </div>

        {/* RIGHT: actions */}
        <div>

          {/* Status updater */}
          <section style={{
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
          }}>
            <h2 style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
              Update Status
            </h2>
            <Field label="Current Status">
              <select
                style={{ ...inputStyle, cursor: "pointer" }}
                value={status}
                onChange={e => setStatus(e.target.value)}
              >
                {Object.entries(STATUS).map(([k, v]) => (
                  <option key={k} value={k}>{v.label}</option>
                ))}
              </select>
            </Field>

            {/* Quick-pick buttons */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 4 }}>
              {Object.entries(STATUS)
                .filter(([k]) => k !== status)
                .map(([k, v]) => (
                  <button
                    key={k}
                    onClick={() => setStatus(k)}
                    style={{
                      background: v.bg,
                      color: v.color,
                      border: `1px solid ${v.color}33`,
                      borderRadius: 8,
                      padding: "9px 14px",
                      fontSize: 13,
                      fontWeight: 600,
                      cursor: "pointer",
                      fontFamily: "inherit",
                      textAlign: "left",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = "0.75")}
                    onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
                  >
                    Mark as {v.label}
                  </button>
                ))}
            </div>
          </section>

          {/* Contact details */}
          <section style={{
            background: C.white,
            border: `1px solid ${C.border}`,
            borderRadius: 12,
            padding: 20,
            marginBottom: 16,
          }}>
            <h2 style={{ fontSize: 12, fontWeight: 700, color: C.muted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>
              Contact Details
            </h2>
            {[
              { label: "Email",   value: lead.email         },
              { label: "Phone",   value: lead.phone   || "—" },
              { label: "Company", value: lead.company || "—" },
              { label: "Source",  value: lead.source        },
            ].map(item => (
              <div key={item.label} style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>
                  {item.label}
                </div>
                <div style={{ fontSize: 13, color: C.text, fontWeight: 500, wordBreak: "break-all" }}>
                  {item.value}
                </div>
              </div>
            ))}
          </section>

          {/* Danger zone */}
          <section style={{
            background: "#fff5f5",
            border: `1px solid ${C.danger}33`,
            borderRadius: 12,
            padding: 16,
          }}>
            <h2 style={{ fontSize: 12, fontWeight: 700, color: C.danger, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>
              Danger Zone
            </h2>
            <Btn variant="danger" full onClick={handleDelete}>Delete This Lead</Btn>
          </section>
        </div>
      </div>
    </div>
  );
}