import { ClerkProvider } from '@clerk/nextjs' // HIER IMPORTIEREN
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider> {/* HIER STARTET DER PROVIDER */}
      <html lang="de">
        <body className={inter.className}> {/* <-- HIER ANPASSEN */}
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider> /* HIER ENDET ER */
  );
}