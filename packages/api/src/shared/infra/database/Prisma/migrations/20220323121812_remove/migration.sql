/*
  Warnings:

  - You are about to drop the column `description` on the `Icon` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Position` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Icon" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Position" DROP COLUMN "description";
