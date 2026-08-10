import { createContext, useContext, useState } from "react";

const STORAGE_KEY = "healeasy_session";

// Read persisted session from localStorage on first load
function loadSession() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  return {
    patientId: null,
    hospitalId: null,
    consultationId: null,
    symptoms: "",
    followUpQuestions: [],
    summary: null,
    caseSheet: null,
  };
}

// Write session to localStorage whenever it changes
function saveSession(session) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch (_) {}
}

const SessionContext = createContext(null);

export function SessionProvider({ children }) {
  const [session, setSession] = useState(loadSession);

  const update = (patch) => {
    setSession((prev) => {
      const next = { ...prev, ...patch };
      saveSession(next);
      return next;
    });
  };

  const clearSession = () => {
    const empty = {
      patientId: null,
      hospitalId: null,
      consultationId: null,
      symptoms: "",
      followUpQuestions: [],
      summary: null,
      caseSheet: null,
    };
    saveSession(empty);
    setSession(empty);
  };

  return (
    <SessionContext.Provider value={{ session, update, clearSession }}>
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  return useContext(SessionContext);
}
