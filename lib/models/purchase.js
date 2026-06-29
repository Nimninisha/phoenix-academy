import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  simulationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Simulation",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Purchase ||
  mongoose.model("Purchase", PurchaseSchema);
