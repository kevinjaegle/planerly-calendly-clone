# Planerly - Ein Klon der Terminbuchungs-App Calendly

Planerly ist ein Full-Stack-Webanwendung, die die Kernfunktionalitäten von Calendly nachbildet. Benutzer können sich registrieren, verschiedene Event-Typen erstellen, ihre wöchentliche Verfügbarkeit festlegen und einen einzigartigen Link teilen, über den andere Personen Termine buchen können.

**Live-Demo:** [Wird in Kürze hier eingefügt]

![Image](https://github.com/user-attachments/assets/3668bcaa-62bd-4878-9fbd-d1dc3e378a1a)
---

## Verwendete Technologien (Tech Stack)

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS
- **UI-Komponenten:** Shadcn UI
- **Backend:** Next.js App Router (Server Actions)
- **Authentifizierung:** Clerk
- **Datenbank:** Neon (Serverless PostgreSQL)
- **ORM:** Drizzle ORM
- **Deployment:** Vercel

---

## Features

- ✅ **Benutzer-Authentifizierung:** Sichere Registrierung und Anmeldung (E-Mail/Passwort & Social Login via Google).
- ✅ **Event-Management:** Erstellen, Anzeigen und Verwalten von verschiedenen Event-Typen (z.B. "30-Minuten-Meeting").
- ✅ **Zeitplan-Management:** Benutzer können ihre wöchentliche Verfügbarkeit taggenau mit Start- und Endzeiten festlegen.
- ✅ **Dynamische Buchungsseiten:** Jedes Event hat eine einzigartige, öffentliche URL (`/event/ihr-event-slug`).
- ✅ **Interaktiver Kalender:** Eine Kalender-Ansicht zur Auswahl des gewünschten Datums.
- ✅ **Automatische Zeitfenster-Berechnung:** Das System berechnet basierend auf der Event-Dauer und der Verfügbarkeit des Veranstalters die buchbaren Zeitfenster.
- ✅ **Buchungsprozess:** Gäste können ein Zeitfenster auswählen, ihre Daten eingeben und den Termin buchen, der in der Datenbank gespeichert wird.

---

## Lernprozess & Danksagung

Dieses Projekt wurde als intensive Lernübung umgesetzt, um moderne Web-Technologien in einem Full-Stack-Kontext zu erlernen und anzuwenden. Die grundlegende Projektidee und -struktur basiert auf diesem YouTube-Tutorial: [Link zum YouTube-Video hier einfügen, falls du ihn noch hast].

Während der Umsetzung wurde ich von Googles KI-Assistent Gemini unterstützt, insbesondere beim Debugging von realen Problemen wie Hydration-Fehlern, Versionskonflikten zwischen Paketen und komplexen Datenbank-Migrationen. Dieser Prozess simulierte ein praxisnahes Szenario der Problemlösung mit Hilfe von modernen KI-Werkzeugen.

---