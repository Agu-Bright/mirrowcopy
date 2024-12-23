import mongoose from "mongoose";

const depositModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  wallet: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Wallet",
  },
  screenShot: {
    type: String,
  },
  transactionHash: {
    type: String,
  },
  method: {
    type: String,
  },
  amount: {
    type: String,
  },
  interest: {
    type: String,
    default: 0,
  },
  status: {
    type: String,
    default: "pending",
  },
  coin: { type: String },
  plan: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Deposit =
  mongoose.models.Deposit || mongoose.model("Deposit", depositModel);

export default Deposit;
