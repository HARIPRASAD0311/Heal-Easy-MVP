const { GoogleGenerativeAI } = require("@google/generative-ai");
const ApiError = require("../utils/ApiError");

const MODEL_NAME = process.env.GEMINI_MODEL || "gemini-3.5-flash-lite";

let cachedClient = null;

/**
 * Lazily creates the Gemini client so a missing API key only breaks the
 * AI endpoints (not the whole server) and produces a clear error message.
 */
function getModel() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    throw new ApiError(
      500,
      "GEMINI_API_KEY is not configured. Add a valid key to backend/.env (see .env.example)."
    );
  }

  if (!cachedClient) {
    cachedClient = new GoogleGenerativeAI(apiKey);
  }

  return cachedClient.getGenerativeModel({
    model: MODEL_NAME,
    generationConfig: {
      temperature: 0.2,
      responseMimeType: "application/json",
    },
  });
}

/**
 * Strips accidental markdown code fences and parses the model's JSON output.
 * Throws a clear ApiError if the model did not return valid JSON.
 */
function parseJsonResponse(rawText) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(json)?/i, "").replace(/```$/, "").trim();
  }

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    console.error("Gemini returned non-JSON output:", rawText);
    throw new ApiError(502, "AI service returned an unexpected response format.");
  }
}

async function callGemini(prompt) {
  const model = getModel();
  let result;
  try {
    result = await model.generateContent(prompt);
  } catch (err) {
    console.error("Gemini API call failed:", err.message || err);
    throw new ApiError(502, "Failed to reach the Gemini AI service. Please try again.");
  }

  const text = result.response.text();
  return parseJsonResponse(text);
}

const SAFETY_RULES = `
Rules you must always follow:
- Only use information explicitly given below. Never invent symptoms, history, vitals, or answers that were not provided.
- If a piece of information is missing or unclear, use the exact string "Not provided" for that field.
- Never state or imply a definitive medical diagnosis. You may mention possible, non-definitive impressions only in a clearly hedged way, and only if directly asked to produce an "assessment" field.
- Never prescribe, recommend, or name specific medications, dosages, or treatments.
- Do not add disclaimers as extra fields; just follow the rules above within the requested JSON fields.
- Respond with ONLY valid JSON matching the requested structure. No markdown, no commentary, no code fences.
`;

/**
 * Generates clarifying follow-up questions based on the patient's raw
 * symptom description, the way a triage nurse would before a doctor visit.
 */
async function generateFollowUpQuestions(symptoms) {
  const prompt = `
You are a medical intake assistant helping prepare a patient for a doctor's consultation.

Patient's reported symptoms (verbatim, from voice-to-text):
"""
${symptoms}
"""
${SAFETY_RULES}

Task: Based ONLY on the symptoms above, generate 3 to 6 short, specific, relevant follow-up questions
that would help a doctor understand the situation better (e.g. duration, severity, triggers, associated
symptoms, prior treatment already tried, relevant medical history directly related to these symptoms).
Do not ask about anything unrelated to the reported symptoms.

Respond with ONLY this JSON shape:
{
  "questions": ["question 1", "question 2", "..."]
}
`;

  const data = await callGemini(prompt);
  if (!Array.isArray(data.questions) || data.questions.length === 0) {
    throw new ApiError(502, "AI service did not return any follow-up questions.");
  }
  return data.questions;
}

/**
 * Generates a structured, doctor-ready pre-consultation summary from the
 * patient's symptoms plus their follow-up question answers.
 */
async function generateSummary({ symptoms, followUpQuestions = [], followUpAnswers = [] }) {
  const qaPairs = followUpQuestions
    .map((q, i) => `Q: ${q}\nA: ${followUpAnswers[i] ?? "Not provided"}`)
    .join("\n\n");

  const prompt = `
You are a medical intake assistant preparing a pre-consultation summary for a doctor.

Patient's original reported symptoms:
"""
${symptoms}
"""

Follow-up questions and the patient's answers:
"""
${qaPairs || "No follow-up questions were answered."}
"""
${SAFETY_RULES}

Task: Produce a structured, doctor-ready pre-consultation summary using ONLY the information above.

Respond with ONLY this JSON shape:
{
  "chiefComplaint": "short description of the main reported problem",
  "duration": "how long symptoms have been present, or 'Not provided'",
  "severity": "reported severity/scale if given, or 'Not provided'",
  "associatedSymptoms": "any other symptoms mentioned, or 'Not provided'",
  "medicationTaken": "any medication or self-treatment already tried, or 'Not provided'",
  "relevantHistory": "any relevant history mentioned by the patient, or 'Not provided'",
  "additionalNotes": "anything else worth flagging for the doctor, or 'Not provided'"
}
`;

  const data = await callGemini(prompt);
  return data;
}

/**
 * Converts a doctor-patient consultation transcript (plus the earlier
 * pre-consultation summary, for context) into a structured case sheet draft.
 */
async function generateCaseSheet({ transcript, doctorSummary = null, symptoms = null }) {
  const contextParts = [];
  if (symptoms) {
    contextParts.push(`Original patient-reported symptoms:\n"""\n${symptoms}\n"""`);
  }
  if (doctorSummary) {
    contextParts.push(`Pre-consultation summary:\n"""\n${JSON.stringify(doctorSummary, null, 2)}\n"""`);
  }
  contextParts.push(`Consultation transcript:\n"""\n${transcript}\n"""`);

  const prompt = `
You are a medical documentation assistant helping a doctor draft a case sheet immediately after a consultation.

${contextParts.join("\n\n")}
${SAFETY_RULES}

Task: Convert the information above into a structured case sheet draft, using ONLY what was said in the
transcript and the earlier summary. The doctor will review and edit this draft before finalizing it, so it
is fine (and required) to mark missing sections as "Not provided" rather than guessing.

The "assessment" field must be a clinical impression only, clearly non-definitive (e.g. phrased as
"consistent with" or "suggestive of" if the transcript supports it), never a certain diagnosis.
The "plan" field must NOT name any specific medication, dosage, or drug class - only general,
non-prescriptive next steps that were actually discussed (e.g. rest, follow-up timing, tests to
consider), or "Not provided" if none were discussed.

Respond with ONLY this JSON shape:
{
  "chiefComplaint": "...",
  "historyOfPresentIllness": "...",
  "examinationFindings": "...",
  "assessment": "...",
  "plan": "..."
}
`;

  const data = await callGemini(prompt);
  return data;
}

module.exports = {
  generateFollowUpQuestions,
  generateSummary,
  generateCaseSheet,
};
