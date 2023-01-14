/*
  Warnings:

  - Added the required column `category` to the `Icon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "IconCategory" AS ENUM ('PRIMARY', 'SECONDARY');

-- AlterTable
ALTER TABLE "Icon" ADD COLUMN     "category" "IconCategory" NOT NULL,
ADD COLUMN     "enabled" BOOLEAN NOT NULL DEFAULT true;
