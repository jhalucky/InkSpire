// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

declare global {
  // Prevent multiple instances of Prisma Client in development
  // (Next.js hot reloading can cause new clients to spawn)
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ["query"], // optional: log queries for debugging
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}
