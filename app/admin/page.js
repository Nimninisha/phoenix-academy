import { redirect } from "next/navigation";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export default async function AdminPage() {
  const token = cookies().get("auth_token")?.value;

  if (!token) {
    redirect("/login");
  }

  let decoded;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    redirect("/login");
  }

  await dbConnect();

  const user = await User.findById(decoded.userId);

  if (!user || user.role !== "admin") {
    return (
      <div style={{ padding: "40px" }}>
        ❌ Access Denied (Admin only)
      </div>
    );
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1>Admin Dashboard</h1>
      <p>Welcome Admin ✅</p>
    </div>
  );
}
``