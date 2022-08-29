const express = require("express");
const router = express.Router();
const AccountController = require('../controller/Account');
router.get("/getallaccount", AccountController.getAllAccount);
router.post("/signin", AccountController.signIn);
module.exports = router;