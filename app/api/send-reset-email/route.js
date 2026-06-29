import { NextResponse } from "next/server";
import crypto from "crypto";
import dbConnect from "@/lib/mongodb";
import User from "@/lib/models/User";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "Email not found" }, { status: 404 });
    }

    // Generate secure reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = Date.now() + 1000 * 60 * 15; // 15 minutes

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password?token=${resetToken}`;

    // Send email using Resend
    
await resend.emails.send({
  from: "Phoenix Academy <onboarding@resend.dev>",
  to: email,
  subject: "Reset Your Password",
  html: `
    <h2>Phoenix Academy Password Reset</h2>
    <p>You requested a password reset.</p>
    <p>Click the link below to reset your password:</p>
    <a href="${resetLink}">${resetLink}</a>
    <p>This link expires in 15 minutes.</p>
  `,
});
    return NextResponse.json({ message: "Reset email sent" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
