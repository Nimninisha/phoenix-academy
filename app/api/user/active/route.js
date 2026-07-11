export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import Subscription from "@/lib/models/subscription";
import Purchase from "@/lib/models/purchase";

export async function GET() {
  try {
    await dbConnect();

    const user = await User.findOne({
      email: "demo@phoenixacademy.com",
    });

    if (!user) {
      return Response.json({
        subs: [],
        activeSimulations: [],
      });
    }

    const subs = await Subscription.find({
      userId: user._id,
    });

    const purchases =
      await Purchase.find({
        userId: user._id,
      }).populate("simulationId");

    const activeSimulations =
      purchases
        .filter((p) => p.simulationId)
        .map((p) => ({
          id: p.simulationId._id,
          title: p.simulationId.title,
          category:
            p.simulationId.category,
          free: p.simulationId.free,
        }));

    return Response.json({
      subs,
      activeSimulations,
    });
  } catch (error) {
    console.error(
      "ACTIVE USER ERROR:",
      error
    );

    return Response.json(
      {
        error: error.message,
      },
      {
        status: 500,
      }
    );
  }
}