/*
  Warnings:

  - A unique constraint covering the columns `[twitterUrl]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Blog" ADD COLUMN     "coverimage" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_twitterUrl_key" ON "public"."User"("twitterUrl");
