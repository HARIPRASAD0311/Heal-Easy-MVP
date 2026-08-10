const crypto = require("crypto");
const { readCollection, writeCollection } = require("../config/jsonDb");

const COLLECTION = "patients";

function getAllPatients() {
  return readCollection(COLLECTION);
}

function getPatientById(patientId) {
  return getAllPatients().find((p) => p.patientId === patientId) || null;
}

function createPatient({ fullName, email, phone, age, gender }) {
  const patients = getAllPatients();

  const patient = {
    patientId: crypto.randomUUID(),
    fullName,
    email,
    phone,
    age,
    gender,
    createdAt: new Date().toISOString(),
  };

  patients.push(patient);
  writeCollection(COLLECTION, patients);
  return patient;
}

module.exports = {
  getAllPatients,
  getPatientById,
  createPatient,
};
