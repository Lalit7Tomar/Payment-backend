const express = require("express");
const { userRegistrationController } = require("../controller/auth.controller");
const router = express.Router(); // <-- must be defined
const { userLoginController } = require("../controller/auth.controller");
router.post("/register", userRegistrationController);
router.post("/login", userLoginController);
module.exports = router;
