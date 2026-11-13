const express = require("express");
const router = express.Router();
const Authmiddleware = require("../middleware/auth.middleware");
router.get("/profile", Authmiddleware, (req, res) => {
  res.status(200).json({
    message: "Authenticated successfully",
    user: req.user,
  });
});

module.exports = router;
