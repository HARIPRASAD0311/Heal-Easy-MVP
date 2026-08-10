const { readCollection } = require("../config/jsonDb");

const COLLECTION = "hospitals";

function getAllHospitals() {
  return readCollection(COLLECTION);
}

function getHospitalById(hospitalId) {
  return getAllHospitals().find((h) => h.hospitalId === hospitalId) || null;
}

module.exports = {
  getAllHospitals,
  getHospitalById,
};
