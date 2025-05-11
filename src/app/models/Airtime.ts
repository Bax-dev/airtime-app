import mongoose from "mongoose";

const AirtimeSchema = new mongoose.Schema(
  {
    phone: { type: String, required: true },
    firstLevel: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, required: true },
    response: { type: Object, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Airtime ||
  mongoose.model("Airtime", AirtimeSchema);
