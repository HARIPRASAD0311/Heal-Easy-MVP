const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/consultations.controller");

const router = express.Router();

router.post("/", asyncHandler(controller.createConsultation));
router.get("/:id", asyncHandler(controller.getConsultation));
router.put("/:id/casesheet", asyncHandler(controller.updateCaseSheet));

module.exports = router;
