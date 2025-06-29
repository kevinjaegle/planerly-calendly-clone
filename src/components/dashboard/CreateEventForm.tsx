// src/components/dashboard/CreateEventForm.tsx

"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { createEvent } from "@/app/dashboard/actions"; // Unsere Server Action importieren

export function CreateEventForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Neues Event erstellen</CardTitle>
        <CardDescription>
          Lege eine neue Art von Termin an, die andere bei dir buchen können.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {/* Das action-Attribut ruft unsere Server Action direkt auf */}
        <form action={createEvent} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Event-Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              placeholder="z.B. 30-Minuten-Kennenlerngespräch"
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="duration">Dauer (in Minuten)</Label>
            <Input
              id="duration"
              name="duration"
              type="number"
              placeholder="z.B. 30"
              required
            />
          </div>
          <Button type="submit" className="self-start">
            Event erstellen
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}