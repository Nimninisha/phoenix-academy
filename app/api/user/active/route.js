import { connectDB } from "@/lib/mongodb";
import User from "@/lib/models/user";
import Subscription from "@/lib/models/subscription";
import Purchase from ".@/lib/models/purchase";
import Simulation from "@/models/simulation";

export async function GET() {
  await connectDB();

  const user = await User.findOne({ email: "demo@phoenixacademy.com" });
  if (!user)
    return Response.json({ activeSimulations: [], purchases: [], subs: [] });

  const subs = await Subscription.find({ userId: user._id, active: true });

  const purchases = await Purchase.find({ userId: user._id }).populate(
    "simulationId"
  );

  const activeSimulations = purchases.map((p) => ({
    id: p.simulationId._id,
    title: p.simulationId.title,
    category: p.simulationId.category,
    free: p.simulationId.free,
  }));

  return Response.json({
    subs,
    activeSimulations,
  });
}
