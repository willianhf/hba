/*
  Warnings:

  - A unique constraint covering the columns `[name,seasonId]` on the table `MatchSeries` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seasonId` to the `MatchSeries` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchSeries" ADD COLUMN     "seasonId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "MatchSeries_name_seasonId_key" ON "MatchSeries"("name", "seasonId");

-- AddForeignKey
ALTER TABLE "MatchSeries" ADD CONSTRAINT "MatchSeries_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
