const express = require("express");
const router = express.Router();
const PatientController = require("../controller/Patient");
router.post("/getmedicalrecordbyid/:id", PatientController.getPartientByID);
router.post("/createnumber", PatientController.createNumber);
module.exports = router;
