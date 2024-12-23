import mongoose from "mongoose";

const KycModel = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  idFront: {
    type: String,
  },
  idBack: {
    type: String,
  },
  fullName: {
    type: String,
  },
  address: {
    type: String,
  },
  maritalStatus: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const Kyc = mongoose.models.KycModel || mongoose.model("Kyc", KycModel);

export default Kyc;
