const express = require("express");
const router = express.Router();
const account = require("./Account");
const doctor = require("./Doctor");
const patient = require("./Patient");
const medicalrecord = require("./MedicalRecord");
router.use("/account", account);
router.use("/doctor", doctor);
router.use("/patient", patient);
router.use("/medicalrecord", medicalrecord);
module.exports = router;