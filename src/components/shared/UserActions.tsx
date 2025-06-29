"use client";

import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export function UserActions() {
  return (
    <div className="flex items-center gap-4">
      <SignedIn>
        <Link href="/dashboard">
          <Button variant="ghost">Dashboard</Button>
        </Link>
        {/* HIER DER NEUE LINK */}
        <Link href="/mein-zeitplan">
          <Button variant="ghost">Mein Zeitplan</Button>
        </Link>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Button>Anmelden</Button>
        </Link>
      </SignedOut>
    </div>
  );
}