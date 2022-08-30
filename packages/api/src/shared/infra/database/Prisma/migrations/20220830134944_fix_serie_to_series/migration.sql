/*
  Warnings:

  - You are about to drop the column `matchSerieId` on the `Match` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Match" DROP CONSTRAINT "Match_matchSerieId_fkey";

-- AlterTable
ALTER TABLE "Match" DROP COLUMN "matchSerieId",
ADD COLUMN     "matchSeriesId" TEXT;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_matchSeriesId_fkey" FOREIGN KEY ("matchSeriesId") REFERENCES "MatchSeries"("id") ON DELETE SET NULL ON UPDATE CASCADE;
