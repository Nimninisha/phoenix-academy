import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";

export async function POST(req) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await dbConnect();

    const existing = await User.findOne({ email });
    if (existing) {
      return NextResponse.json({ error: "Email already registered" }, { status: 400 });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await User.create({ name, email, passwordHash });

    return NextResponse.json({ message: "Registered successfully" }, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
