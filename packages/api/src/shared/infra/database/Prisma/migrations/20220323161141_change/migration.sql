/*
  Warnings:

  - The primary key for the `GameStats` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userSeasonId` on the `GameStats` table. All the data in the column will be lost.
  - The primary key for the `TeamRoster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userSeasonId` on the `TeamRoster` table. All the data in the column will be lost.
  - You are about to drop the `UserSeason` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserSeasonIcons` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[gameId,playerId]` on the table `GameStats` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[playerId]` on the table `TeamRoster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[nbaTeamId,seasonId,playerId]` on the table `TeamRoster` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `playerId` to the `GameStats` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerId` to the `TeamRoster` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GameResult" DROP CONSTRAINT "GameResult_playerOfTheGameId_fkey";

-- DropForeignKey
ALTER TABLE "GameStats" DROP CONSTRAINT "GameStats_userSeasonId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRoster" DROP CONSTRAINT "TeamRoster_userSeasonId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeason" DROP CONSTRAINT "UserSeason_nbaPlayerId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeason" DROP CONSTRAINT "UserSeason_positionId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeason" DROP CONSTRAINT "UserSeason_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeason" DROP CONSTRAINT "UserSeason_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeasonIcons" DROP CONSTRAINT "UserSeasonIcons_iconId_fkey";

-- DropForeignKey
ALTER TABLE "UserSeasonIcons" DROP CONSTRAINT "UserSeasonIcons_userSeasonId_fkey";

-- DropIndex
DROP INDEX "GameStats_gameId_userSeasonId_key";

-- DropIndex
DROP INDEX "TeamRoster_nbaTeamId_seasonId_userSeasonId_key";

-- DropIndex
DROP INDEX "TeamRoster_userSeasonId_key";

-- AlterTable
ALTER TABLE "GameStats" DROP CONSTRAINT "GameStats_pkey",
DROP COLUMN "userSeasonId",
ADD COLUMN     "playerId" TEXT NOT NULL,
ADD CONSTRAINT "GameStats_pkey" PRIMARY KEY ("gameId", "playerId");

-- AlterTable
ALTER TABLE "TeamRoster" DROP CONSTRAINT "TeamRoster_pkey",
DROP COLUMN "userSeasonId",
ADD COLUMN     "playerId" TEXT NOT NULL,
ADD CONSTRAINT "TeamRoster_pkey" PRIMARY KEY ("nbaTeamId", "seasonId", "playerId");

-- DropTable
DROP TABLE "UserSeason";

-- DropTable
DROP TABLE "UserSeasonIcons";

-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "nbaPlayerId" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "status" "ApprovalStatus" NOT NULL DEFAULT E'IDLE',

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayerIcons" (
    "playerId" TEXT NOT NULL,
    "iconId" TEXT NOT NULL,

    CONSTRAINT "PlayerIcons_pkey" PRIMARY KEY ("playerId","iconId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_id_key" ON "Player"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Player_userId_seasonId_nbaPlayerId_key" ON "Player"("userId", "seasonId", "nbaPlayerId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayerIcons_playerId_iconId_key" ON "PlayerIcons"("playerId", "iconId");

-- CreateIndex
CREATE UNIQUE INDEX "GameStats_gameId_playerId_key" ON "GameStats"("gameId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRoster_playerId_key" ON "TeamRoster"("playerId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRoster_nbaTeamId_seasonId_playerId_key" ON "TeamRoster"("nbaTeamId", "seasonId", "playerId");

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_nbaPlayerId_fkey" FOREIGN KEY ("nbaPlayerId") REFERENCES "NBAPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerIcons" ADD CONSTRAINT "PlayerIcons_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerIcons" ADD CONSTRAINT "PlayerIcons_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoster" ADD CONSTRAINT "TeamRoster_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameResult" ADD CONSTRAINT "GameResult_playerOfTheGameId_fkey" FOREIGN KEY ("playerOfTheGameId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameStats" ADD CONSTRAINT "GameStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
