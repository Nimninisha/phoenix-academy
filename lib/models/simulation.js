import mongoose from "mongoose";

const SimulationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: String, // e.g. "IMAT", "A1-Starters"
  index: Number, // 1..10
  free: { type: Boolean, default: false },
});

export default mongoose.models.Simulation ||
  mongoose.model("Simulation", SimulationSchema);
