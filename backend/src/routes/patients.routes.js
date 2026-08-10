const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/patients.controller");

const router = express.Router();

router.post("/", asyncHandler(controller.registerPatient));
router.get("/:id", asyncHandler(controller.getPatient));
router.get("/:id/consultations", asyncHandler(controller.getPatientConsultations));

module.exports = router;
