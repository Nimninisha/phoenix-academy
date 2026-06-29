import { connectDB } from "../../../../lib/mongodb";
import Subscription from "../../../../lib/models/subscription";

export async function hasActiveSubscription({ userId, planKind }) {
  await connectDB();

  const now = new Date();

  const sub = await Subscription.findOne({
    userId,
    planKind,
    status: "active",
    currentPeriodEnd: { $gt: now },
  });

  return !!sub;
}
