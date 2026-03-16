import { useState } from "react";
import { C } from "./theme";
import { SEED_LEADS } from "./data/leads";

import Navbar       from "./components/Navbar";
import AddLeadModal from "./components/AddLeadModal";

import Login      from "./pages/Login";
import Register   from "./pages/Register";
import Dashboard  from "./pages/Dashboard";
import LeadsList  from "./pages/LeadsList";
import LeadDetail from "./pages/LeadDetail";
import Profile    from "./pages/Profile";

export default function App() {
  
  const [token,    setToken]    = useState(() => localStorage.getItem("crm_token")    || "");
  const [username, setUsername] = useState(() => localStorage.getItem("crm_username") || "");
  const [authPage, setAuthPage] = useState("login"); 

  const [leads,      setLeads]      = useState(SEED_LEADS);
  const [page,       setPage]       = useState("dashboard"); 
  const [activeLead, setActiveLead] = useState(null);
  const [showAdd,    setShowAdd]    = useState(false);

  // Auth actions
  function handleLogin(newToken, newUsername) {
    setToken(newToken);
    setUsername(newUsername);
    setPage("dashboard");
  }

  function handleLogout() {
    localStorage.removeItem("crm_token");
    localStorage.removeItem("crm_username");
    setToken("");
    setUsername("");
    setPage("dashboard");
  }

  // Lead actions 
  function addLead(newLead) {
    setLeads(prev => [newLead, ...prev]);
  }

  function updateLead(updated) {
    setLeads(prev => prev.map(l => l.id === updated.id ? updated : l));
    setActiveLead(updated);
  }

  function deleteLead(id) {
    setLeads(prev => prev.filter(l => l.id !== id));
    setPage("leads");
    setActiveLead(null);
  }

  // Navigation helpers 
  function openLead(lead) {
    setActiveLead(lead);
    setPage("detail");
  }


  if (!token) {
    return (
      <div style={{ fontFamily: "'Outfit', sans-serif" }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        `}</style>
        {authPage === "login" ? (
          <Login
            onLogin={handleLogin}
            onGoToRegister={() => setAuthPage("register")}
          />
        ) : (
          <Register
            onGoToLogin={() => setAuthPage("login")}
          />
        )}
      </div>
    );
  }

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: C.bg, minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: ${C.bg}; }
      `}</style>

     
      <Navbar
        page={page}
        setPage={setPage}
        username={username}
        onLogout={handleLogout}
      />

      {/* Page renderer */}
      {page === "dashboard" && (
        <Dashboard
          leads={leads}
          onViewLeads={() => setPage("leads")}
          onOpenLead={openLead}
        />
      )}

      {page === "leads" && (
        <LeadsList
          leads={leads}
          onOpenLead={openLead}
          onDeleteLead={deleteLead}
          onAddLead={() => setShowAdd(true)}
        />
      )}

      {page === "detail" && activeLead && (
        <LeadDetail
          lead={activeLead}
          onUpdate={updateLead}
          onDelete={deleteLead}
          onBack={() => setPage("leads")}
        />
      )}

      {page === "profile" && (
        <Profile
          username={username}
          leads={leads}
          onLogout={handleLogout}
          onRegister={() => setPage("register")}
        />
      )}

      {/* Register page — create additional admin accounts while logged in */}
      {page === "register" && (
        <Register
          onGoToLogin={() => setPage("dashboard")}
        />
      )}

      {/* Add Lead modal — available from any page */}
      {showAdd && (
        <AddLeadModal
          onAdd={addLead}
          onClose={() => setShowAdd(false)}
        />
      )}
    </div>
  );
}