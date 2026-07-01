import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import Plan from "@/lib/models/plan";
import Simulation from "@/lib/models/simulation";
import Subscription from "@/lib/models/subscription";

export default async function AdminPage() {
  const token = cookies().get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  let decoded;

  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );
  } catch {
    redirect("/login");
  }

  await dbConnect();

  const user = await User.findById(decoded.userId);

  if (!user || user.role !== "admin") {
    return (
      <div style={{ padding: "40px" }}>
        <h1>Access Denied</h1>
      </div>
    );
  }

  let totalUsers = 0;
  let totalPlans = 0;
  let totalSimulations = 0;
  let totalSubscriptions = 0;

  try {
    totalUsers = await User.countDocuments();
    totalPlans = await Plan.countDocuments();
    totalSimulations = await Simulation.countDocuments();
    totalSubscriptions =
      await Subscription.countDocuments({
        status: "active",
      });
  } catch (err) {
    console.error("ADMIN DASHBOARD ERROR:", err);
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>🚀 NEW ADMIN DASHBOARD</h1>

      <p>Welcome Admin ✅</p>

      <hr />

      <h2>Debug Data</h2>

      <p>Total Users: {totalUsers}</p>
      <p>Total Plans: {totalPlans}</p>
      <p>Total Simulations: {totalSimulations}</p>
      <p>Active Subscriptions: {totalSubscriptions}</p>

      <hr />

      <p>
        If you see this page, the deployment is using the
        newest code.
      </p>
    </div>
  );
}