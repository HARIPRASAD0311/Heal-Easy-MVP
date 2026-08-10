const ApiError = require("../utils/ApiError");
const consultationsModel = require("../models/consultations.model");
const patientsModel = require("../models/patients.model");
const hospitalsModel = require("../models/hospitals.model");

function createConsultation(req, res) {
  const { patientId, hospitalId, symptoms } = req.body || {};

  if (!patientId) throw new ApiError(400, "patientId is required.");
  if (!hospitalId) throw new ApiError(400, "hospitalId is required.");
  if (!symptoms || !String(symptoms).trim()) {
    throw new ApiError(400, "symptoms is required.");
  }

  if (!patientsModel.getPatientById(patientId)) {
    throw new ApiError(404, `No patient found with id ${patientId}.`);
  }
  if (!hospitalsModel.getHospitalById(hospitalId)) {
    throw new ApiError(404, `No hospital found with id ${hospitalId}.`);
  }

  const consultation = consultationsModel.createConsultation({
    patientId,
    hospitalId,
    symptoms: String(symptoms).trim(),
  });

  res.status(201).json(consultation);
}

function getConsultation(req, res) {
  const consultation = consultationsModel.getConsultationById(req.params.id);
  if (!consultation) {
    throw new ApiError(404, `No consultation found with id ${req.params.id}.`);
  }
  res.json(consultation);
}

function updateCaseSheet(req, res) {
  const { caseSheet } = req.body || {};

  if (!caseSheet || typeof caseSheet !== "object" || Array.isArray(caseSheet)) {
    throw new ApiError(400, "caseSheet (object) is required in the request body.");
  }

  const existing = consultationsModel.getConsultationById(req.params.id);
  if (!existing) {
    throw new ApiError(404, `No consultation found with id ${req.params.id}.`);
  }

  const updated = consultationsModel.updateConsultation(req.params.id, {
    caseSheet: { ...existing.caseSheet, ...caseSheet },
    status: consultationsModel.STATUS.COMPLETED,
  });

  res.json(updated);
}

module.exports = {
  createConsultation,
  getConsultation,
  updateCaseSheet,
};
