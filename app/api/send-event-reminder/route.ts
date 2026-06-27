import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
    } = body;

    if (!agentEmail || !eventTitle || !date || !startTime) {
      return NextResponse.json(
        { error: "Missing required fields: agentEmail, eventTitle, date, startTime" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const clientList =
      clientNames?.length > 0
        ? clientNames.join(", ")
        : "No clients assigned";

    const mailOptions = {
      from: `"Zestate Reminders" <${process.env.GMAIL_USER}>`,
      to: agentEmail,
      subject: `⏰ Event Reminder: ${eventTitle} — ${date}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #6366f1, #8b5cf6); padding: 24px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 24px;">⏰ Event Reminder</h1>
          </div>
          <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-radius: 0 0 12px 12px;">
            <p style="color: #374151; font-size: 16px;">Hi <strong>${agentName || "Agent"}</strong>,</p>
            <p style="color: #374151;">This is a reminder for your upcoming event:</p>
            <div style="background: white; padding: 16px; border-radius: 8px; margin: 16px 0; border: 1px solid #e5e7eb;">
              <h2 style="color: #4f46e5; margin: 0 0 12px 0;">${eventTitle}</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 6px 0; color: #6b7280;">Type:</td><td style="padding: 6px 0; font-weight: 500;">${eventType}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280;">Date:</td><td style="padding: 6px 0; font-weight: 500;">${date}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280;">Time:</td><td style="padding: 6px 0; font-weight: 500;">${startTime} — ${endTime || "N/A"}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280;">Address:</td><td style="padding: 6px 0; font-weight: 500;">${address || "N/A"}</td></tr>
                <tr><td style="padding: 6px 0; color: #6b7280;">Clients:</td><td style="padding: 6px 0; font-weight: 500;">${clientList}</td></tr>
              </table>
            </div>
            ${notes ? `<div style="background: #fffbeb; padding: 12px; border-radius: 8px; margin: 12px 0; border: 1px solid #fde68a;"><p style="color: #92400e; margin: 0;"><strong>Notes:</strong> ${notes}</p></div>` : ""}
            <p style="color: #6b7280; font-size: 14px; margin-top: 20px;">Sent by Zestate — Your Real Estate Management Platform</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Reminder email sent" });
  } catch (error: any) {
    console.error("Failed to send event reminder:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send reminder" },
      { status: 500 }
    );
  }
}
