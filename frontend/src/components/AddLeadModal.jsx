import { useState } from "react";
import { Modal, Field, Btn } from "./UI";
import { inputStyle, STATUS, SOURCES } from "../theme";
import { uid } from "../data/leads";

const BLANK = { name: "", email: "", phone: "", company: "", source: "Website", status: "new", note: "" };

export default function AddLeadModal({ onAdd, onClose }) {
  const [form, setForm] = useState(BLANK);

  function set(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit() {
    if (!form.name.trim())  return alert("Name is required.");
    if (!form.email.trim()) return alert("Email is required.");
    onAdd({ ...form, id: uid(), createdAt: new Date().toISOString().slice(0, 10) });
    onClose();
  }

  return (
    <Modal title="Add New Lead" onClose={onClose}>
      <Field label="Full Name *">
        <input
          style={inputStyle}
          value={form.name}
          onChange={e => set("name", e.target.value)}
          placeholder="Jane Smith"
        />
      </Field>

      <Field label="Email *">
        <input
          style={inputStyle}
          type="email"
          value={form.email}
          onChange={e => set("email", e.target.value)}
          placeholder="jane@company.com"
        />
      </Field>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Phone">
          <input
            style={inputStyle}
            value={form.phone}
            onChange={e => set("phone", e.target.value)}
            placeholder="+1 415 555 0100"
          />
        </Field>
        <Field label="Company">
          <input
            style={inputStyle}
            value={form.company}
            onChange={e => set("company", e.target.value)}
            placeholder="Acme Corp"
          />
        </Field>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <Field label="Source">
          <select style={inputStyle} value={form.source} onChange={e => set("source", e.target.value)}>
            {SOURCES.map(s => <option key={s}>{s}</option>)}
          </select>
        </Field>
        <Field label="Status">
          <select style={inputStyle} value={form.status} onChange={e => set("status", e.target.value)}>
            {Object.entries(STATUS).map(([k, v]) => (
              <option key={k} value={k}>{v.label}</option>
            ))}
          </select>
        </Field>
      </div>

      <Field label="Note">
        <textarea
          style={{ ...inputStyle, resize: "vertical" }}
          rows={3}
          value={form.note}
          onChange={e => set("note", e.target.value)}
          placeholder="Any initial notes about this lead…"
        />
      </Field>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 6 }}>
        <Btn variant="secondary" onClick={onClose}>Cancel</Btn>
        <Btn onClick={handleSubmit}>Add Lead</Btn>
      </div>
    </Modal>
  );
}