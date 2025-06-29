// src/app/event/[event-slug]/page.tsx

import { db } from "@/lib/db";
import { events } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { clerkClient } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
import { BookingForm } from "@/components/booking/BookingForm"; // <-- NEUER IMPORT

export default async function BookingPage({
  params,
}: {
  params: { "event-slug": string };
}) {
  const event = await db.query.events.findFirst({
    where: eq(events.slug, params["event-slug"]),
  });

  if (!event) {
    notFound();
  }

  const client = await clerkClient();
  const host = await client.users.getUser(event.userId);

  return (
    <main className="p-4 md:p-8">
      <div className="mb-8 border-b pb-8">
        <p className="text-lg text-muted-foreground">
          Veranstaltet von: {host.firstName} {host.lastName}
        </p>
        <h1 className="text-3xl font-bold mt-2">{event.name}</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Dauer: {event.duration} Minuten
        </p>
      </div>

      {/* HIER ERSETZEN WIR DEN PLATZHALTER */}
    <BookingForm
      userId={event.userId}
      eventId={event.id} // <-- HIER DIE ID HINZUFÜGEN
      eventDuration={parseInt(event.duration)}
    />
  </main>
  );
}