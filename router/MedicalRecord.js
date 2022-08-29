const express = require("express");
const router = express.Router();
const MedicalRecordController = require("../controller/MedicalRecord");
const VerifyToken = require("../middleware/auth");
router.post("/getmedicalrecordbyid/:id",VerifyToken.verifyToken, MedicalRecordController.getMedicalRecordByID);
router.post("/addmedicalrecord",VerifyToken.verifyToken, MedicalRecordController.addMedicalRecord);
router.put("/updatemedicalrecord/:id",VerifyToken.verifyToken, MedicalRecordController.updateMedicalRecord);
router.delete("/deletemedicalrecord/:id",VerifyToken.verifyToken, MedicalRecordController.deleteMedicalRecord);
module.exports = router;