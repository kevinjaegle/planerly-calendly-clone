// src/lib/db/index.ts

import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

// Erstellt einen Verbindungspool mit der URL aus unserer .env.local Datei
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Erstellt den finalen Datenbank-Client, den wir in unserer App verwenden werden
export const db = drizzle(pool, { schema });