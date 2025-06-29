// src/lib/db/schema.ts

import { pgTable, serial, text, varchar, timestamp, integer, time } from "drizzle-orm/pg-core";

// Diese Tabelle ist schon da
export const events = pgTable("events", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  name: text("name").notNull(),
  slug: text("slug").notNull().unique(),
  duration: text("duration").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// HIER DIE NEUE TABELLE EINFÜGEN
export const schedules = pgTable("schedules", {
  id: serial("id").primaryKey(),
  userId: varchar("user_id", { length: 256 }).notNull(),
  dayOfWeek: integer("day_of_week").notNull(), // 0=Sonntag, 1=Montag, ..., 6=Samstag
  startTime: time("start_time").notNull(), // z.B. '09:00'
  endTime: time("end_time").notNull(),   // z.B. '17:00'
});

// HIER DIE NEUE TABELLE EINFÜGEN
export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  eventId: integer("event_id").references(() => events.id), // Verknüpfung zum Event
  guestName: text("guest_name").notNull(),
  guestEmail: text("guest_email").notNull(),
  bookingTime: timestamp("booking_time", { withTimezone: true }).notNull(), // Der genaue gebuchte Zeitpunkt
  createdAt: timestamp("created_at").defaultNow().notNull(),
});