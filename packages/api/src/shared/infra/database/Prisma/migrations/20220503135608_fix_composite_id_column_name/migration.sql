/*
  Warnings:

  - The primary key for the `TeamRoster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `teamRosterId` on the `TeamRoster` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamId,playerId]` on the table `TeamRoster` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `teamId` to the `TeamRoster` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "TeamRoster" DROP CONSTRAINT "TeamRoster_teamRosterId_fkey";

-- DropIndex
DROP INDEX "TeamRoster_teamRosterId_playerId_key";

-- AlterTable
ALTER TABLE "TeamRoster" DROP CONSTRAINT "TeamRoster_pkey",
DROP COLUMN "teamRosterId",
ADD COLUMN     "teamId" TEXT NOT NULL,
ADD CONSTRAINT "TeamRoster_pkey" PRIMARY KEY ("teamId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRoster_teamId_playerId_key" ON "TeamRoster"("teamId", "playerId");

-- AddForeignKey
ALTER TABLE "TeamRoster" ADD CONSTRAINT "TeamRoster_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
