const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

async function request(method, path, body = null) {
  const opts = {
    method,
    headers: { "Content-Type": "application/json" },
  };
  if (body) opts.body = JSON.stringify(body);

  console.log(`[API] ${method} ${BASE_URL}${path}`, body || "");

  const res = await fetch(`${BASE_URL}${path}`, opts);
  const data = await res.json();

  if (!res.ok) {
    console.error(`[API] Error ${res.status}:`, data);
    throw new Error(data.message || data.error || `Request failed (${res.status})`);
  }
  return data;
}

export const registerPatient   = (p) => request("POST", "/api/patients", p);
export const getHospitals      = ()  => request("GET",  "/api/hospitals");
export const createConsultation = (p) => request("POST", "/api/consultations", p);
export const getFollowup       = (p) => request("POST", "/api/ai/followup", p);
export const generateSummary   = (p) => request("POST", "/api/ai/summary", p);
export const generateCaseSheet = (p) => request("POST", "/api/ai/casesheet", p);
