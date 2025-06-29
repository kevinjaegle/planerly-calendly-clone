// src/components/booking/BookingForm.tsx
"use client";

import { useState, useEffect } from "react";
import { Calendar } from "@/components/ui/calendar";
import { getAvailableTimeSlots, bookEvent } from "@/app/event/[event-slug]/actions";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type BookingFormProps = {
  userId: string;
  eventId: number;
  eventDuration: number;
};

export function BookingForm({ userId, eventId, eventDuration }: BookingFormProps) {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  useEffect(() => {
    if (date) {
      setIsLoading(true);
      setSelectedTime(null); // Zeit-Auswahl zurücksetzen, wenn Datum geändert wird
      getAvailableTimeSlots(userId, eventDuration, date)
        .then((slots) => setTimeSlots(slots))
        .finally(() => setIsLoading(false));
    }
  }, [date, userId, eventDuration]);

  async function handleBookingSubmit(formData: FormData) {
    if (!date || !selectedTime) return;

    const guestName = formData.get('name') as string;
    const guestEmail = formData.get('email') as string;

    const [hours, minutes] = selectedTime.split(':').map(Number);
    const bookingDateTime = new Date(date);
    bookingDateTime.setHours(hours, minutes, 0, 0);

    const result = await bookEvent({
        eventId,
        bookingTime: bookingDateTime,
        guestName,
        guestEmail
    });

    if (result.success) {
        setIsBookingConfirmed(true);
    }
  }

  // Erfolgsmeldung anzeigen, wenn die Buchung bestätigt ist
  if (isBookingConfirmed) {
    return (
        <div className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Vielen Dank!</h2>
            <p>Dein Termin wurde erfolgreich gebucht.</p>
        </div>
    )
  }

  // Wenn eine Zeit ausgewählt wurde, zeige das Formular
  if (selectedTime) {
    return (
        <div>
            <h3 className="font-semibold mb-4">
                Bestätige deinen Termin am {date?.toLocaleDateString('de-DE')} um {selectedTime} Uhr.
            </h3>
            <form action={handleBookingSubmit} className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="name">Dein Name</Label>
                    <Input id="name" name="name" type="text" required />
                </div>
                <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Deine E-Mail</Label>
                    <Input id="email" name="email" type="email" required />
                </div>
                <div className="flex gap-2">
                    <Button type="button" variant="ghost" onClick={() => setSelectedTime(null)}>Zurück</Button>
                    <Button type="submit">Termin buchen</Button>
                </div>
            </form>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div className="md:col-span-1">
        <Calendar
          mode="single" selected={date} onSelect={setDate}
          className="rounded-md border"
          disabled={(day) => day < new Date(new Date().setDate(new Date().getDate() - 1))}
        />
      </div>
      <div className="md:col-span-2">
        <h3 className="font-semibold mb-4">Verfügbare Zeiten für: {date ? date.toLocaleDateString('de-DE') : '...'}</h3>
        {isLoading ? <p>Zeiten werden geladen...</p> : (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {timeSlots.length > 0 ? (
              timeSlots.map((slot) => (
                <Button key={slot} variant="outline" onClick={() => setSelectedTime(slot)}>
                  {slot}
                </Button>
              ))
            ) : <p>Keine verfügbaren Zeiten an diesem Tag.</p>}
          </div>
        )}
      </div>
    </div>
  );
}