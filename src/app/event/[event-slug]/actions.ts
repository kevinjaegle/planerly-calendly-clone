// src/app/event/[event-slug]/actions.ts

"use server";

import { db } from "@/lib/db";
// Wichtig: Wir importieren jetzt 'bookings' und 'schedules' aus dem Schema
import { bookings, schedules } from "@/lib/db/schema";
import { revalidatePath } from "next/cache";

// =================================================================
// FUNKTION 1: Diese hattest du schon, sie bleibt unverändert
// =================================================================
export async function getAvailableTimeSlots(
  userId: string,
  eventDuration: number,
  date: Date
) {
  // 1. Finde den Wochentag für das ausgewählte Datum (0=So, 1=Mo, ...)
  const dayOfWeek = date.getDay();

  // 2. Hole die Verfügbarkeitsregel für diesen Wochentag aus der Datenbank
  const schedule = await db.query.schedules.findFirst({
    where: (schedules, { and, eq }) =>
      and(eq(schedules.userId, userId), eq(schedules.dayOfWeek, dayOfWeek)),
  });

  // Wenn für diesen Wochentag keine Regel existiert, gib ein leeres Array zurück
  if (!schedule) {
    return [];
  }

  // 3. Generiere alle möglichen Zeitfenster
  const slots = [];
  const [startHour, startMinute] = schedule.startTime.split(":").map(Number);
  const [endHour, endMinute] = schedule.endTime.split(":").map(Number);

  const startTime = new Date(date);
  startTime.setHours(startHour, startMinute, 0, 0);

  const endTime = new Date(date);
  endTime.setHours(endHour, endMinute, 0, 0);

  let currentTime = startTime;

  while (currentTime < endTime) {
    slots.push(
      currentTime.toLocaleTimeString("de-DE", {
        hour: "2-digit",
        minute: "2-digit",
      })
    );
    // Gehe zum nächsten Slot weiter (z.B. 15 Minuten später)
    currentTime.setMinutes(currentTime.getMinutes() + eventDuration);
  }

  // TODO: Später werden hier bereits gebuchte Termine herausgefiltert

  return slots;
}


// =================================================================
// FUNKTION 2: Das ist die neue Funktion, die wir hinzufügen
// =================================================================
type BookingDetails = {
  eventId: number;
  bookingTime: Date;
  guestName: string;
  guestEmail: string;
};

export async function bookEvent(details: BookingDetails) {
  // Füge die Buchung in die Datenbank ein
  await db.insert(bookings).values({
    eventId: details.eventId,
    bookingTime: details.bookingTime,
    guestName: details.guestName,
    guestEmail: details.guestEmail,
  });

  // Sage Next.js, dass sich die Daten für dieses Event geändert haben.
  revalidatePath(`/event/*`);

  return { success: true, message: "Termin erfolgreich gebucht!" };
}