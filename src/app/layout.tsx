import "styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "trpc/react";

export const metadata: Metadata = {
  title: "Kalkulator Kredytowy | Porównaj oferty kredytów hipotecznych",
  description:
    "Porównaj oferty kredytów hipotecznych z różnych banków w Polsce. Znajdź najlepszy kredyt dostosowany do Twoich potrzeb. Oblicz ratę miesięczną i całkowity koszt kredytu.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pl" className={`${geist.variable}`}>
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
