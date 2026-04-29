// lib/sendMail.ts
import transporter from "./mailer";

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const info = await transporter.sendMail({
    from: `"Your App" <${process.env.GMAIL_USER}>`,
    to,
    subject,
    html,
  });

  return info;
}