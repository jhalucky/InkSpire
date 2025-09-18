/*
  Warnings:

  - You are about to drop the column `twitter` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "twitter",
ADD COLUMN     "twitterUrl" TEXT;
