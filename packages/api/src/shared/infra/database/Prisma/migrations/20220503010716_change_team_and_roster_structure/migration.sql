/*
  Warnings:

  - You are about to drop the column `awayNBATeamId` on the `Game` table. All the data in the column will be lost.
  - You are about to drop the column `homeNBATeamId` on the `Game` table. All the data in the column will be lost.
  - The primary key for the `TeamRoster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `isCaptain` on the `TeamRoster` table. All the data in the column will be lost.
  - You are about to drop the column `nbaTeamId` on the `TeamRoster` table. All the data in the column will be lost.
  - You are about to drop the column `seasonId` on the `TeamRoster` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[teamRosterId,playerId]` on the table `TeamRoster` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `awayTeamId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `homeTeamId` to the `Game` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teamRosterId` to the `TeamRoster` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "TeamRosterRole" AS ENUM ('CAPTAIN', 'CO_CAPTAIN', 'PLAYER');

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_awayNBATeamId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_homeNBATeamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRoster" DROP CONSTRAINT "TeamRoster_nbaTeamId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRoster" DROP CONSTRAINT "TeamRoster_seasonId_fkey";

-- DropIndex
DROP INDEX "TeamRoster_nbaTeamId_seasonId_playerId_key";

-- DropIndex
DROP INDEX "TeamRoster_playerId_key";

-- AlterTable
ALTER TABLE "Game" DROP COLUMN "awayNBATeamId",
DROP COLUMN "homeNBATeamId",
ADD COLUMN     "awayTeamId" TEXT NOT NULL,
ADD COLUMN     "homeTeamId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeamRoster" DROP CONSTRAINT "TeamRoster_pkey",
DROP COLUMN "isCaptain",
DROP COLUMN "nbaTeamId",
DROP COLUMN "seasonId",
ADD COLUMN     "role" "TeamRosterRole" NOT NULL DEFAULT E'PLAYER',
ADD COLUMN     "teamRosterId" TEXT NOT NULL,
ADD CONSTRAINT "TeamRoster_pkey" PRIMARY KEY ("teamRosterId", "playerId");

-- CreateTable
CREATE TABLE "Team" (
    "id" TEXT NOT NULL,
    "nbaTeamId" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "approvalStatus" "ApprovalStatus" NOT NULL DEFAULT E'IDLE',

    CONSTRAINT "Team_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Team_id_key" ON "Team"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Team_nbaTeamId_seasonId_key" ON "Team"("nbaTeamId", "seasonId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRoster_teamRosterId_playerId_key" ON "TeamRoster"("teamRosterId", "playerId");

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_nbaTeamId_fkey" FOREIGN KEY ("nbaTeamId") REFERENCES "NBATeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Team" ADD CONSTRAINT "Team_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoster" ADD CONSTRAINT "TeamRoster_teamRosterId_fkey" FOREIGN KEY ("teamRosterId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
