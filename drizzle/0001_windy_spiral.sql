CREATE TABLE "bookings" (
	"id" serial PRIMARY KEY NOT NULL,
	"event_id" integer,
	"guest_name" text NOT NULL,
	"guest_email" text NOT NULL,
	"booking_time" timestamp with time zone NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bookings" ADD CONSTRAINT "bookings_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE no action ON UPDATE no action;