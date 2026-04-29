// app/api/send-event-reminder/route.ts

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { eventReminderTemplate } from "@/lib/emailTemplates";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

export async function POST(req: Request) {
  try {
    const {
      agentEmail,
      agentName,
      eventTitle,
      eventType,
      date,
      startTime,
      endTime,
      address,
      clientNames,
      notes,
    } = await req.json();

    if (!agentEmail) {
      return NextResponse.json({ error: "Agent email is required" }, { status: 400 });
    }

    const html = eventReminderTemplate({
      agentName,
      eventTitle,
      eventType,
      date,
      startTime,
      endTime,
      address,
      clientNames,
      notes,
    });

    await transporter.sendMail({
      from: `"Z-State Reminders" <${process.env.GMAIL_USER}>`,
      to: agentEmail,
      subject: `⏰ Reminder: "${eventTitle}" starts in 2 hours`,
      html,
    });

    return NextResponse.json({ success: true });
  }catch (error: any) {
  console.error("Email error:", error.message); // ← add this
  return NextResponse.json({ error: error.message }, { status: 500 }); // ← return real error
 }
}