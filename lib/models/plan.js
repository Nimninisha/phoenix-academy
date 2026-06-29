import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema({
  // quiz / lab / printed
  planKind: {
    type: String,
    enum: ["quiz", "lab", "printed"],
    required: true,
  },

  // digital / printed
  resourceType: {
    type: String,
    enum: ["digital", "printed"],
    required: true,
  },

  // monthly / yearly
  billingPeriod: {
    type: String,
    enum: ["monthly", "yearly"],
    required: true,
  },

  // price in EUR
  price: { type: Number, required: true },

  // Stripe price ID
  stripePriceId: { type: String, required: true },
});

export default mongoose.models.Plan || mongoose.model("Plan", PlanSchema);
