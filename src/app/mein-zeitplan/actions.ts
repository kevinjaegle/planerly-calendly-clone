// src/app/mein-zeitplan/actions.ts

"use server";

import { db } from "@/lib/db";
import { schedules } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateSchedule(formData: FormData) {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Nicht angemeldet.");
  }

  // 1. Alle alten Einträge für diesen Benutzer löschen
  await db.delete(schedules).where(eq(schedules.userId, userId));

  const newSchedules = [];

  // 2. Durch die 7 Wochentage iterieren (0=So, 1=Mo, ...)
  for (const dayId of ["1", "2", "3", "4", "5", "6", "0"]) {
    const isEnabled = formData.get(`enabled-${dayId}`) === "on";

    if (isEnabled) {
      const startTime = formData.get(`start-${dayId}`) as string;
      const endTime = formData.get(`end-${dayId}`) as string;

      if (startTime && endTime) {
        newSchedules.push({
          userId: userId,
          dayOfWeek: parseInt(dayId),
          startTime: startTime,
          endTime: endTime,
        });
      }
    }
  }

  // 3. Wenn es neue Einträge gibt, diese gesammelt in die DB einfügen
  if (newSchedules.length > 0) {
    await db.insert(schedules).values(newSchedules);
  }

  // 4. Die Seite neu laden, damit die gespeicherten Daten angezeigt werden
  revalidatePath("/mein-zeitplan");
}