// src/app/dashboard/page.tsx

import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { CreateEventForm } from '@/components/dashboard/CreateEventForm';

export default async function DashboardPage() {
  const user = await currentUser();
  if (!user) {
    return <div>Du bist nicht angemeldet.</div>;
  }

  // Lade die Events des Benutzers aus der Datenbank
  const userEvents = await db.query.events.findMany({
    where: (events, { eq }) => eq(events.userId, user.id),
    orderBy: (events, { desc }) => [desc(events.createdAt)], // Neueste zuerst
  });

  return (
    <main className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">
          Willkommen, {user.firstName || 'User'}!
        </h1>
        <p className="text-lg text-muted-foreground">
          Verwalte hier deine buchbaren Events.
        </p>
      </div>

      {/* HIER FÜGEN WIR DAS FORMULAR WIEDER EIN */}
      <div className="mb-8">
        <CreateEventForm />
      </div>

      {/* Hier zeigen wir die Liste der erstellten Events an */}
      <div>
        <h2 className="text-2xl font-bold">Deine Events</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {userEvents.length > 0 ? (
            userEvents.map((event) => (
              <div key={event.id} className="border p-4 rounded-lg bg-card">
                <h3 className="font-semibold">{event.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Dauer: {event.duration} Minuten
                </p>
                <p className="text-xs mt-2 text-muted-foreground">
                  Slug für den Link: {event.slug}
                </p>
              </div>
            ))
          ) : (
            <p>Du hast noch keine Events erstellt.</p>
          )}
        </div>
      </div>
    </main>
  );
}