// lib/mailer.ts
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,      // your@gmail.com
    pass: process.env.GMAIL_APP_PASSWORD, // 16-char App Password (not your real password)
  },
});

export default transporter;