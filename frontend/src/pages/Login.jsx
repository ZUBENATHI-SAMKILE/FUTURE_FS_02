import { useState } from "react";
import { C, inputStyle } from "../theme";
import { Btn } from "../components/UI";
import { User } from "lucide-react";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Login({ onLogin, onGoToRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error,    setError]    = useState("");
  const [loading,  setLoading]  = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res  = await fetch(`${API}/api/auth/login`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed. Please try again.");
        return;
      }

      // Save token to stay logged in on page refresh
      localStorage.setItem("crm_token",    data.token);
      localStorage.setItem("crm_username", username);

      onLogin(data.token, username);

    } catch {
      setError("Cannot reach the server. Is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    }}>
      <div style={{
        background: C.white,
        border: `1px solid ${C.border}`,
        borderRadius: 16,
        padding: 40,
        width: "100%",
        maxWidth: 400,
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
      }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{
            width: 52, height: 52,
            borderRadius: 14,
            background: C.accent,
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px",
            fontSize: 24,
          }}>
            <User size={24} />
          </div>
          <h1 style={{ fontSize: 24, fontWeight: 800, color: C.text, marginBottom: 4 }}>
            <span style={{ color: C.accent }}>Lead</span>Base CRM
          </h1>
          <p style={{ color: C.muted, fontSize: 14 }}>Sign in to your admin account</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Error message */}
          {error && (
            <div style={{
              background: "#fff5f5",
              border: `1px solid ${C.danger}33`,
              color: C.danger,
              borderRadius: 8,
              padding: "10px 14px",
              fontSize: 13,
              marginBottom: 16,
            }}>
              {error}
            </div>
          )}

          <div style={{ marginBottom: 14 }}>
            <label style={{
              display: "block", fontSize: 12, fontWeight: 600,
              color: C.muted, marginBottom: 5,
              textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              Username
            </label>
            <input
              style={inputStyle}
              type="text"
              value={username}
              onChange={e => setUsername(e.target.value)}
              placeholder="admin"
              required
              autoFocus
            />
          </div>

          <div style={{ marginBottom: 24 }}>
            <label style={{
              display: "block", fontSize: 12, fontWeight: 600,
              color: C.muted, marginBottom: 5,
              textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              Password
            </label>
            <input
              style={inputStyle}
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <Btn full style={{ justifyContent: "center" }}>
            {loading ? "Signing in…" : "Sign In"}
          </Btn>
        </form>

        <p style={{ color: C.muted, fontSize: 13, textAlign: "center", marginTop: 24 }}>
          No account?{" "}
          <button
            onClick={onGoToRegister}
            style={{
              background: "none", border: "none",
              color: C.accent, fontWeight: 700,
              cursor: "pointer", fontSize: 13,
              fontFamily: "inherit", padding: 0,
            }}
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}