const express = require("express");
const asyncHandler = require("../utils/asyncHandler");
const controller = require("../controllers/hospitals.controller");

const router = express.Router();

router.get("/", asyncHandler(controller.listHospitals));

module.exports = router;
