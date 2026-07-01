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
        <p>Admin access required.</p>
      </div>
    );
  }

  const totalUsers = await User.countDocuments();

  const totalPlans = await Plan.countDocuments();

  const totalSimulations =
    await Simulation.countDocuments();

  const totalSubscriptions =
    await Subscription.countDocuments({
      status: "active",
    });

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>

      <p>Welcome Admin ✅</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h3>Total Users</h3>
          <h2>{totalUsers}</h2>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h3>Total Plans</h3>
          <h2>{totalPlans}</h2>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h3>Total Simulations</h3>
          <h2>{totalSimulations}</h2>
        </div>

        <div
          style={{
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
          }}
        >
          <h3>Active Subscriptions</h3>
          <h2>{totalSubscriptions}</h2>
        </div>
      </div>
    </div>
  );
}