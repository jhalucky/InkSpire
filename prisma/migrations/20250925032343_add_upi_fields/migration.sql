-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "upiId" TEXT,
ADD COLUMN     "upiName" TEXT,
ADD COLUMN     "upiVerified" BOOLEAN NOT NULL DEFAULT false;
