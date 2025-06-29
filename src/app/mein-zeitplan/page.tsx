// src/app/mein-zeitplan/page.tsx
import { currentUser } from '@clerk/nextjs/server';
import { db } from '@/lib/db';
import { ScheduleForm } from '@/components/schedule/ScheduleForm';

export default async function SchedulePage() {
  const user = await currentUser();
  if (!user) {
    return <div>Bitte anmelden, um den Zeitplan zu bearbeiten.</div>;
  }

  // Lade den existierenden Zeitplan des Benutzers aus der Datenbank
  const mySchedule = await db.query.schedules.findMany({
    where: (schedules, { eq }) => eq(schedules.userId, user.id),
    orderBy: (schedules, { asc }) => [asc(schedules.dayOfWeek)],
  });

  return (
    <main className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Mein Zeitplan</h1>
        <p className="text-lg text-muted-foreground">
          Definiere hier deine wöchentliche Verfügbarkeit für Termine.
        </p>
      </div>

      {/* Wir übergeben die geladenen Daten an unser Formular */}
      <ScheduleForm key={JSON.stringify(mySchedule)} initialSchedule={mySchedule} />
    </main>
  );
}