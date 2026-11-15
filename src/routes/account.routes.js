const express = require("express");
const router = express.Router();
const { Authmiddleware } = require("../middleware/auth.middleware");
const { createAccountController } = require("../controller/account.controller");
router.post("/profile", Authmiddleware, createAccountController);

module.exports = router;
