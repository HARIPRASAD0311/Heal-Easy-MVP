const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/ai.controller");

const router = express.Router();

router.post("/followup", asyncHandler(controller.followup));
router.post("/summary", asyncHandler(controller.summary));
router.post("/casesheet", asyncHandler(controller.casesheet));

module.exports = router;
