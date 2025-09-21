// app/layout.tsx

import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next"
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar"; // Import the new Navbar
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "InkSpire",
  description: "A complete blogging website built with Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Navbar />
          <main className="container mx-auto p-4">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}