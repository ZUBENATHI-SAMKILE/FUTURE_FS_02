import { useState } from "react";
import { C, inputStyle } from "../theme";
import { User, CheckCircle  } from "lucide-react";
import { Btn } from "../components/UI";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function Register({ onGoToLogin }) {
  const [username,  setUsername]  = useState("");
  const [password,  setPassword]  = useState("");
  const [confirm,   setConfirm]   = useState("");
  const [error,     setError]     = useState("");
  const [success,   setSuccess]   = useState(false);
  const [loading,   setLoading]   = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (username.trim().length < 3) {
      return setError("Username must be at least 3 characters.");
    }
    if (password.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    if (password !== confirm) {
      return setError("Passwords do not match.");
    }

    setLoading(true);

    try {
      const res  = await fetch(`${API}/api/auth/register`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify({ username: username.trim(), password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Registration failed. Please try again.");
        return;
      }

      setSuccess(true);
      setTimeout(() => onGoToLogin(), 2000);

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
          <p style={{ color: C.muted, fontSize: 14 }}>Create your admin account</p>
        </div>

        {/* Success state */}
        {success ? (
          <div style={{
            background: "#f0fdf4",
            border: `1px solid #86efac`,
            borderRadius: 10,
            padding: "20px 16px",
            textAlign: "center",
          }}>
            <div style={{ fontSize: 32, marginBottom: 10 }}><CheckCircle size={24} />
</div>
            <div style={{ fontWeight: 700, color: "#166534", fontSize: 16, marginBottom: 4 }}>
              Account created!
            </div>
            <div style={{ color: "#15803d", fontSize: 13 }}>
              Redirecting you to login…
            </div>
          </div>
        ) : (

          // Register form 
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

            {/* Username */}
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
                placeholder="e.g. admin"
                required
                autoFocus
              />
            </div>

            {/* Password */}
            <div style={{ marginBottom: 14 }}>
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
                placeholder="Min. 6 characters"
                required
              />
            </div>

            {/* Confirm password */}
            <div style={{ marginBottom: 24 }}>
              <label style={{
                display: "block", fontSize: 12, fontWeight: 600,
                color: C.muted, marginBottom: 5,
                textTransform: "uppercase", letterSpacing: "0.05em",
              }}>
                Confirm Password
              </label>
              <input
                style={{
                  ...inputStyle,
                  
                  borderColor: confirm && password !== confirm ? C.danger : C.border,
                }}
                type="password"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                required
              />
              {/* Inline mismatch hint */}
              {confirm && password !== confirm && (
                <p style={{ color: C.danger, fontSize: 12, marginTop: 5 }}>
                  Passwords do not match.
                </p>
              )}
            </div>

            <Btn full style={{ justifyContent: "center" }}>
              {loading ? "Creating account…" : "Create Account"}
            </Btn>
          </form>
        )}

        {/* Link back to login */}
        {!success && (
          <p style={{ color: C.muted, fontSize: 13, textAlign: "center", marginTop: 24 }}>
            Already have an account?{" "}
            <button
              onClick={onGoToLogin}
              style={{
                background: "none", border: "none",
                color: C.accent, fontWeight: 700,
                cursor: "pointer", fontSize: 13,
                fontFamily: "inherit", padding: 0,
              }}
            >
              Sign in
            </button>
          </p>
        )}

      </div>
    </div>
  );
}