const express = require("express");
const router = express.Router();
const DoctorController = require("../controller/Doctor");
const VerifyToken = require("../middleware/auth");
router.put("/updateDoctor/:id",VerifyToken.verifyToken, DoctorController.updateDoctor);
module.exports = router;
