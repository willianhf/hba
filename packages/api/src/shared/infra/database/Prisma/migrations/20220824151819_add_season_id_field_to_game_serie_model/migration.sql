/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `GameSerie` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `seasonId` to the `GameSerie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GameSerie" ADD COLUMN     "seasonId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GameSerie_id_key" ON "GameSerie"("id");

-- AddForeignKey
ALTER TABLE "GameSerie" ADD CONSTRAINT "GameSerie_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
