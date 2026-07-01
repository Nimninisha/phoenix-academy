import mongoose from "mongoose";

const PlanSchema = new mongoose.Schema(
  {
    planKind: {
      type: String,
      enum: [
        "quiz",
        "lab",
        "revision-library",
      ],
      required: true,
    },

    resourceType: {
      type: String,
      enum: ["digital"],
      default: "digital",
      required: true,
    },

    billingPeriod: {
      type: String,
      enum: ["monthly", "yearly"],
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stripePriceId: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

export default mongoose.models.Plan ||
  mongoose.model("Plan", PlanSchema);