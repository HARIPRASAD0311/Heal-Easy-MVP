const crypto = require("crypto");
const { readCollection, writeCollection } = require("../config/jsonDb");

const COLLECTION = "consultations";

const STATUS = {
  SYMPTOMS_RECORDED: "symptoms_recorded",
  FOLLOWUP_READY: "followup_ready",
  SUMMARY_READY: "summary_ready",
  CASE_SHEET_READY: "case_sheet_ready",
  COMPLETED: "completed",
};

function getAllConsultations() {
  return readCollection(COLLECTION);
}

function getConsultationById(consultationId) {
  return getAllConsultations().find((c) => c.consultationId === consultationId) || null;
}

function getConsultationsByPatientId(patientId) {
  return getAllConsultations()
    .filter((c) => c.patientId === patientId)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

function createConsultation({ patientId, hospitalId, symptoms }) {
  const consultations = getAllConsultations();

  const now = new Date().toISOString();
  const consultation = {
    consultationId: crypto.randomUUID(),
    patientId,
    hospitalId,
    symptoms,
    followUpQuestions: [],
    followUpAnswers: [],
    doctorSummary: null,
    doctorTranscript: null,
    caseSheet: null,
    status: STATUS.SYMPTOMS_RECORDED,
    createdAt: now,
    updatedAt: now,
  };

  consultations.push(consultation);
  writeCollection(COLLECTION, consultations);
  return consultation;
}

/**
 * Shallow-merges `patch` into the consultation with the given id,
 * always bumping `updatedAt`. Returns the updated record, or null
 * if no consultation with that id exists.
 */
function updateConsultation(consultationId, patch) {
  const consultations = getAllConsultations();
  const index = consultations.findIndex((c) => c.consultationId === consultationId);
  if (index === -1) return null;

  const updated = {
    ...consultations[index],
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  consultations[index] = updated;
  writeCollection(COLLECTION, consultations);
  return updated;
}

module.exports = {
  STATUS,
  getAllConsultations,
  getConsultationById,
  getConsultationsByPatientId,
  createConsultation,
  updateConsultation,
};
