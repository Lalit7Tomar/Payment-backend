import express from "express";
import { processPayment } from "../controllers/paymentController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/process", verifyToken, processPayment);

export default router;
