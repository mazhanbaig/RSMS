// hooks/useEventReminder.ts
"use client";

import { useEffect, useRef } from "react";

interface EventData {
  id: string;
  title: string;
  eventType: string;
  date: string;
  startTime: string;
  endTime: string;
  address: string;
  notes?: string;
  reminderSent: boolean;
}

interface ClientDetail {
  id: string;
  firstName: string;
  lastName: string;
}

interface AgentInfo {
  email: string;
  name?: string;
}

export function useEventReminder(
  event: EventData | null,
  clients: ClientDetail[],
  agent: AgentInfo | null
) {
  const reminderSentRef = useRef(false); // prevent double-firing

  useEffect(() => {
    if (!event || !agent?.email || event.reminderSent || reminderSentRef.current) return;

    const checkAndSchedule = () => {
      const now = new Date();
      const eventStart = new Date(`${event.date}T${event.startTime}`);
      const msUntilEvent = eventStart.getTime() - now.getTime();
      const twoHoursMs = 2 * 60 * 60 * 1000;

      // Already past or more than 2 hrs away — schedule a timer
      if (msUntilEvent > twoHoursMs) {
        const delay = msUntilEvent - twoHoursMs;

        // Don't schedule if it's more than 24hrs away — let the page reload handle it
        if (delay > 24 * 60 * 60 * 1000) return;

        const timer = setTimeout(() => {
          sendReminder();
        }, delay);

        return () => clearTimeout(timer);
      }

      // Within the 2-hour window but reminder not sent yet — send immediately
      if (msUntilEvent > 0 && msUntilEvent <= twoHoursMs) {
        sendReminder();
      }
    };

    const sendReminder = async () => {
      if (reminderSentRef.current) return;
      reminderSentRef.current = true;

      try {
        const clientNames = clients.map(
          (c) => `${c.firstName} ${c.lastName}`
        );

        const res = await fetch("/api/send-event-reminder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            agentEmail: agent.email,
            agentName: agent.name || "Agent",
            eventTitle: event.title,
            eventType: event.eventType,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            address: event.address,
            clientNames,
            notes: event.notes,
          }),
        });

        if (res.ok) {
          console.log("✅ Reminder email sent");
          // Optionally update reminderSent: true in Firebase here
        }
      } catch (err) {
        console.error("Reminder failed:", err);
        reminderSentRef.current = false; // allow retry
      }
    };

    return checkAndSchedule();
  }, [event, clients, agent]);
}