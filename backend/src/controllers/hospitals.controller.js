const hospitalsModel = require("../models/hospitals.model");

function listHospitals(req, res) {
  res.json(hospitalsModel.getAllHospitals());
}

module.exports = {
  listHospitals,
};
