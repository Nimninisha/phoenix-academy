import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    planKind: {
      type: String,
      enum: ["quiz", "lab", "printed"],
      required: true,
    },

    resourceType: {
      type: String,
      enum: ["digital", "printed"],
      required: true,
    },

    billingPeriod: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },

    price: { type: Number, required: true },

    stripePriceId: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);