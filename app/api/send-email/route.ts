import { NextRequest, NextResponse } from "next/server";
import { sendMail } from "@/lib/sendMail";

export async function POST(request: NextRequest) {
  try {
    const { to, subject, html } = await request.json();

    if (!to || !subject || !html) {
      return NextResponse.json(
        { error: "Missing required fields: to, subject, html" },
        { status: 400 }
      );
    }

    await sendMail({ to, subject, html });
    return NextResponse.json({ success: true, message: "Email sent" });
  } catch (error: any) {
    console.error("Failed to send email:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
