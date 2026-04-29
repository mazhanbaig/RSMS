// lib/emailTemplates.ts

export function eventReminderTemplate({
  agentName,
  eventTitle,
  eventType,
  date,
  startTime,
  endTime,
  address,
  clientNames,
  notes,
}: {
  agentName: string;
  eventTitle: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  address: string;
  clientNames: string[];
  notes?: string;
}) {
  const formatTime = (t: string) =>
    new Date(`2000-01-01T${t}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });

  const eventTypeLabel: Record<string, string> = {
    "property-viewing": "🏠 Property Viewing",
    "client-meeting": "🤝 Client Meeting",
    "closing-session": "🔑 Closing Session",
    "property-inspection": "🔍 Property Inspection",
    "follow-up-call": "📞 Follow-up Call",
  };

  return `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
      
      <!-- Header -->
      <div style="background: linear-gradient(135deg, #7c3aed, #2563eb); padding: 32px 24px; text-align: center;">
        <div style="font-size: 36px; margin-bottom: 8px;">⏰</div>
        <h1 style="color: white; margin: 0; font-size: 22px; font-weight: 700;">Event Reminder</h1>
        <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">
          Starting in <strong>2 hours</strong>
        </p>
      </div>

      <!-- Body -->
      <div style="padding: 28px 24px;">
        <p style="color: #374151; font-size: 16px; margin: 0 0 20px;">
          Hi <strong>${agentName}</strong>, you have an upcoming event today.
        </p>

        <!-- Event Card -->
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; padding: 20px; margin-bottom: 20px;">
          <div style="font-size: 13px; color: #7c3aed; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">
            ${eventTypeLabel[eventType] || eventType}
          </div>
          <h2 style="color: #111827; font-size: 20px; font-weight: 700; margin: 0 0 16px;">${eventTitle}</h2>

          <!-- Details -->
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                <span style="color: #6b7280; font-size: 13px;">📅 Date</span>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                <strong style="color: #111827; font-size: 13px;">${formatDate(date)}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0;">
                <span style="color: #6b7280; font-size: 13px;">🕐 Time</span>
              </td>
              <td style="padding: 8px 0; border-bottom: 1px solid #e2e8f0; text-align: right;">
                <strong style="color: #111827; font-size: 13px;">${formatTime(startTime)} – ${formatTime(endTime)}</strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; ${clientNames.length > 0 ? "border-bottom: 1px solid #e2e8f0;" : ""}">
                <span style="color: #6b7280; font-size: 13px;">📍 Location</span>
              </td>
              <td style="padding: 8px 0; ${clientNames.length > 0 ? "border-bottom: 1px solid #e2e8f0;" : ""} text-align: right;">
                <strong style="color: #111827; font-size: 13px;">${address || "N/A"}</strong>
              </td>
            </tr>
            ${
              clientNames.length > 0
                ? `<tr>
              <td style="padding: 8px 0;">
                <span style="color: #6b7280; font-size: 13px;">👥 Clients</span>
              </td>
              <td style="padding: 8px 0; text-align: right;">
                <strong style="color: #111827; font-size: 13px;">${clientNames.join(", ")}</strong>
              </td>
            </tr>`
                : ""
            }
          </table>
        </div>

        ${
          notes
            ? `<div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px; padding: 14px 16px; margin-bottom: 20px;">
            <p style="color: #92400e; font-size: 13px; font-weight: 600; margin: 0 0 6px;">📝 Notes</p>
            <p style="color: #78350f; font-size: 13px; margin: 0;">${notes}</p>
          </div>`
            : ""
        }

        <!-- Maps Button -->
        ${
          address
            ? `<div style="text-align: center; margin-bottom: 20px;">
            <a href="https://maps.google.com/?q=${encodeURIComponent(address)}"
               style="display: inline-block; background: linear-gradient(135deg, #7c3aed, #2563eb); color: white; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 600; font-size: 14px;">
              📍 Open in Google Maps
            </a>
          </div>`
            : ""
        }
      </div>

      <!-- Footer -->
      <div style="background: #f8fafc; border-top: 1px solid #e2e8f0; padding: 16px 24px; text-align: center;">
        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
          This reminder was sent automatically by Z-State • Real Estate Management
        </p>
      </div>
    </div>
  `;
}