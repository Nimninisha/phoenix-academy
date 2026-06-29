import { connectDB } from "@/lib/mongodb";
import Subscription from "@/lib/models/subscription";
import User from "@/lib/models/User";

export async function GET() {
  await connectDB();

  const user = await User.findOne({ email: "demo@phoenixacademy.com" });
  if (!user) return Response.json([]);

  const subs = await Subscription.find({ userId: user._id, active: true });
  return Response.json(subs);
}

export async function POST(req) {
  await connectDB();
  const body = await req.json();

  const user = await User.findOne({ email: "demo@phoenixacademy.com" });
  if (!user) return Response.json({ error: "User not found" }, { status: 400 });

  const sub = await Subscription.create({
    userId: user._id,
    plan: body.plan || "premium",
    allowedCategories: body.allowedCategories || ["IMAT", "A1-Starters"],
  });

  return Response.json(sub);
}
