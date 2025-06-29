// src/components/schedule/ScheduleForm.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateSchedule } from "@/app/mein-zeitplan/actions"; // Unsere neue Action importieren

const daysOfWeek = [
  { id: 1, name: "Montag" },
  { id: 2, name: "Dienstag" },
  { id: 3, name: "Mittwoch" },
  { id: 4, name: "Donnerstag" },
  { id: 5, name: "Freitag" },
  { id: 6, name: "Samstag" },
  { id: 0, name: "Sonntag" },
];

type Schedule = {
    id: number;
    dayOfWeek: number;
    startTime: string;
    endTime: string;
}

export function ScheduleForm({ initialSchedule }: { initialSchedule: Schedule[] }) {
  return (
    // Das Formular ruft jetzt unsere Server Action auf
    <form action={updateSchedule} className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Aktiv</TableHead>
            <TableHead>Wochentag</TableHead>
            <TableHead>Startzeit</TableHead>
            <TableHead>Endzeit</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {daysOfWeek.map((day) => {
            const scheduleForDay = initialSchedule.find(s => s.dayOfWeek === day.id);
            return (
              <TableRow key={day.id}>
                <TableCell>
                  <Checkbox
                    name={`enabled-${day.id}`}
                    defaultChecked={!!scheduleForDay}
                  />
                </TableCell>
                <TableCell className="font-medium">{day.name}</TableCell>
                <TableCell>
                  <Input
                    name={`start-${day.id}`}
                    type="time"
                    defaultValue={scheduleForDay?.startTime}
                  />
                </TableCell>
                <TableCell>
                  <Input
                    name={`end-${day.id}`}
                    type="time"
                    defaultValue={scheduleForDay?.endTime}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <Button type="submit">Zeitplan speichern</Button>
    </form>
  );
}