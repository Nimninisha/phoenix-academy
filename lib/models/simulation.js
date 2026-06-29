import mongoose from "mongoose";

const SimulationSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },

    category: { type: String, required: true },

    index: { type: Number, required: true },

    free: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Simulation ||
  mongoose.model("Simulation", SimulationSchema);
``