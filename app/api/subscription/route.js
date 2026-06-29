import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Subscription from "@/lib/models/subscription";

export async function POST(req) {
  try {
    const { userId } = await req.json();

    await connectDB();

    const sub = await Subscription.findOne({ userId }).sort({
      currentPeriodEnd: -1,
    });

    return NextResponse.json({ subscription: sub || null });
  } catch (err) {
    console.error("Subscription fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
