// src/app/dashboard/actions.ts

"use server"; // Diese Zeile macht die Funktion zu einer Server Action

import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createEvent(formData: FormData) {
  // 1. Benutzer-ID sicher vom Server holen
  const { userId } = await auth();
  if (!userId) {
    throw new Error("Du musst angemeldet sein, um ein Event zu erstellen.");
  }

  // 2. Daten aus dem Formular auslesen
  const name = formData.get("name") as string;
  const duration = formData.get("duration") as string;

  if (!name || !duration) {
    throw new Error("Name und Dauer sind Pflichtfelder.");
  }

  const slug = name
    .toLowerCase()
    .replace(/\s+/g, '-') // Leerzeichen durch Bindestriche ersetzen
    .replace(/[^a-z0-9-]/g, ''); // Alle ungültigen Zeichen entfernen

  // 3. Event in die Datenbank einfügen
  await db.insert(events).values({
    userId: userId,
    name: name,
    slug: slug, // slug hinzufügen
    duration: duration,
  });

  // 4. Dashboard-Seite neu laden, um das neue Event anzuzeigen
  revalidatePath("/dashboard");
}