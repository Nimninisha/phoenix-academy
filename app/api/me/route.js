// app/api/me/route.js
export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function GET(req) {
  try {
    const token = req.cookies.get("auth_token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    await dbConnect();
    const user = await User.findById(decoded.userId).select("-passwordHash");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
  }
}
