import mongoose from "mongoose";

const SubscriptionSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },

    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Plan",
      required: true,
    },

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

    stripeCustomerId: { type: String, required: true },
    stripeSubscriptionId: { type: String, required: true },

    status: {
      type: String,
      enum: ["active", "canceled"],
      default: "active",
    },

    currentPeriodStart: { type: Date, required: true },
    currentPeriodEnd: { type: Date, required: true },
  },
  { timestamps: true }
);

export default
  mongoose.models.Subscription ||
  mongoose.model("Subscription", SubscriptionSchema);
