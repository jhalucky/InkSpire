import { PrismaClient } from "@prisma/client";

declare global {
  // prevent multiple instances in dev
  var prisma: PrismaClient | undefined;
}

export const prisma =
  globalThis.prisma ||
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;
