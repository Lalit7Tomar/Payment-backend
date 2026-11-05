import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  amount: { type: Number, required: true, min: 1 },
  status: { type: String, enum: ["pending", "completed", "failed"], default: "completed" }
}, { timestamps: true });

export default mongoose.models.Transaction || mongoose.model("Transaction", transactionSchema);
