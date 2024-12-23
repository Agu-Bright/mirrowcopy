import mongoose from "mongoose";

const withdrawalModel = new mongoose.Schema({
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
  walletAddress: {
    type: String,
  },
  coin: { type: String },
  plan: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Withdrawal =
  mongoose.models.Withdrawal || mongoose.model("Withdrawal", withdrawalModel);

export default Withdrawal;
