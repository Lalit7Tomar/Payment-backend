const usermodel = require("../models/user.models");
const jwt = require("jsonwebtoken");

async function Authmiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access, token is missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // FIX 1: Match the exact key from your JWT payload (userId)
    // FIX 2: Name the variable 'user' so it matches the rest of your logic
    const user = await usermodel.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    req.user = user;
    return next();
  } catch (err) {
    // Pro-tip: Always log the actual error during development
    // so a JavaScript typo doesn't disguise itself as a JWT error!
    console.log("Middleware Error:", err.message);

    return res.status(401).json({
      message: "Unauthorized access, token is invalid",
    });
  }
}

module.exports = { Authmiddleware };
