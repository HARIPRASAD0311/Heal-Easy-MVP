const ApiError = require("../utils/ApiError");
const patientsModel = require("../models/patients.model");
const consultationsModel = require("../models/consultations.model");

function registerPatient(req, res) {
  const { fullName, email, phone, age, gender } = req.body || {};

  if (!fullName || !String(fullName).trim()) {
    throw new ApiError(400, "fullName is required.");
  }
  if (!email || !String(email).trim()) {
    throw new ApiError(400, "email is required.");
  }
  if (!phone || !String(phone).trim()) {
    throw new ApiError(400, "phone is required.");
  }

  const patient = patientsModel.createPatient({
    fullName: String(fullName).trim(),
    email: String(email).trim(),
    phone: String(phone).trim(),
    age: age !== undefined && age !== null && age !== "" ? Number(age) : null,
    gender: gender ? String(gender).trim() : null,
  });

  res.status(201).json(patient);
}

function getPatient(req, res) {
  const patient = patientsModel.getPatientById(req.params.id);
  if (!patient) {
    throw new ApiError(404, `No patient found with id ${req.params.id}.`);
  }
  res.json(patient);
}

function getPatientConsultations(req, res) {
  const patient = patientsModel.getPatientById(req.params.id);
  if (!patient) {
    throw new ApiError(404, `No patient found with id ${req.params.id}.`);
  }
  const consultations = consultationsModel.getConsultationsByPatientId(req.params.id);
  res.json(consultations);
}

module.exports = {
  registerPatient,
  getPatient,
  getPatientConsultations,
};
