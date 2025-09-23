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
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-screen text-foreground antialiased relative`}>
        {/* Global unified background */}
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-neutral-950 to-black" />
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.04'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
            }}
          />
        </div>

        <SessionProvider session={session}>
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 lg:pt-32 pb-12">
              {children}
            </main>
            <footer className="border-t border-border bg-[#0b0b0b] py-6">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                  <div className="text-sm text-muted-foreground">
                    © 2025 InkSpire. Built with ❤️ by Lucky Jha
                  </div>
                  <div className="flex gap-4 text-sm text-muted-foreground">
                    <a href="/privacy" className="hover:text-foreground transition-colors">Privacy</a>
                    <a href="/terms" className="hover:text-foreground transition-colors">Terms</a>
                    <a href="/contact" className="hover:text-foreground transition-colors">Contact</a>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}