import mongoose from "mongoose";

const PurchaseSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

    amount: { type: Number, required: true },

    paymentMethod: { type: String, default: "stripe" },

    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Purchase ||
  mongoose.model("Purchase", PurchaseSchema);
``