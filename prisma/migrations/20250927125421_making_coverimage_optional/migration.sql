-- DropIndex
DROP INDEX "public"."User_twitterUrl_key";

-- AlterTable
ALTER TABLE "public"."Blog" ALTER COLUMN "coverimage" SET DEFAULT '';
