// src/components/shared/Navbar.tsx

"use client"; // <--- DIESE EINE ZEILE IST DIE LÖSUNG

import dynamic from "next/dynamic";
import Link from "next/link";

// Lade unsere neue Komponente dynamisch und nur im Browser (ssr: false)
const UserActions = dynamic(
  () => import("./UserActions").then((mod) => mod.UserActions),
  { ssr: false }
);

export function Navbar() {
  return (
    <header className="flex items-center justify-between p-4 px-6 border-b">
      <div className="flex items-center gap-8">
        <Link href="/" className="text-xl font-bold">
          Planerly
        </Link>
        <nav className="hidden md:flex gap-6">
          <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
            Features
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
            Preise
          </Link>
          <Link href="#" className="text-gray-600 hover:text-gray-900 text-sm">
            Über uns
          </Link>
        </nav>
      </div>

      {/* Hier binden wir jetzt die dynamische Komponente ein */}
      <UserActions />
    </header>
  );
}