import mongoose from "mongoose";
import User from "../models/User.js";
import Transaction from "../models/Transaction.js";

export const processPayment = async (req, res) => {
  const { receiverId, amount } = req.body;
  const senderId = req.user.id;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const sender = await User.findById(senderId).session(session);
    const receiver = await User.findById(receiverId).session(session);

    if (!sender || !receiver) {
      throw new Error("Invalid sender or receiver");
    }
    if (sender.balance < amount) {
      throw new Error("Insufficient funds");
    }

    sender.balance -= amount;
    receiver.balance += amount;

    await sender.save({ session });
    await receiver.save({ session });

    const transaction = await Transaction.create(
      [{ sender: senderId, receiver: receiverId, amount, status: "completed" }],
      { session }
    );

    await session.commitTransaction();
    
    res.status(200).json({
      success: true,
      message: "Payment successful",
      transaction: transaction[0]
    });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ success: false, message: error.message });
  } finally {
    session.endSession();
  }
};
