/*
  Warnings:

  - You are about to drop the `Game` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameResult` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameSerie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `GameStats` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "MatchKind" AS ENUM ('REGULAR', 'PLAYOFF', 'FINAL', 'ALLSTAR');

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_awayTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_gameSerieId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_homeTeamId_fkey";

-- DropForeignKey
ALTER TABLE "Game" DROP CONSTRAINT "Game_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "GameResult" DROP CONSTRAINT "GameResult_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameResult" DROP CONSTRAINT "GameResult_playerOfTheGameId_fkey";

-- DropForeignKey
ALTER TABLE "GameSerie" DROP CONSTRAINT "GameSerie_seasonId_fkey";

-- DropForeignKey
ALTER TABLE "GameStats" DROP CONSTRAINT "GameStats_gameId_fkey";

-- DropForeignKey
ALTER TABLE "GameStats" DROP CONSTRAINT "GameStats_playerId_fkey";

-- DropTable
DROP TABLE "Game";

-- DropTable
DROP TABLE "GameResult";

-- DropTable
DROP TABLE "GameSerie";

-- DropTable
DROP TABLE "GameStats";

-- DropEnum
DROP TYPE "GameKind";

-- CreateTable
CREATE TABLE "Match" (
    "id" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "homeTeamId" TEXT NOT NULL,
    "awayTeamId" TEXT NOT NULL,
    "scheduledTo" TIMESTAMP(3),
    "matchKind" "MatchKind" NOT NULL,
    "matchSerieId" TEXT,

    CONSTRAINT "Match_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MatchResult" (
    "matchId" TEXT NOT NULL,
    "homeScore" INTEGER NOT NULL,
    "awayScore" INTEGER NOT NULL,
    "isWalkover" BOOLEAN NOT NULL DEFAULT false,
    "releasedAt" TIMESTAMP(3) NOT NULL,
    "playerOfTheMatchId" TEXT NOT NULL,

    CONSTRAINT "MatchResult_pkey" PRIMARY KEY ("matchId")
);

-- CreateTable
CREATE TABLE "MatchStats" (
    "matchId" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "points" SMALLINT NOT NULL DEFAULT 0,
    "assists" SMALLINT NOT NULL DEFAULT 0,
    "steals" SMALLINT NOT NULL DEFAULT 0,
    "rebounds" SMALLINT NOT NULL DEFAULT 0,
    "blocks" SMALLINT NOT NULL DEFAULT 0,
    "turnovers" SMALLINT NOT NULL DEFAULT 0,
    "fouls" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "MatchStats_pkey" PRIMARY KEY ("matchId","playerId")
);

-- CreateTable
CREATE TABLE "MatchSeries" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "MatchSeries_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Match_id_key" ON "Match"("id");

-- CreateIndex
CREATE UNIQUE INDEX "MatchResult_matchId_key" ON "MatchResult"("matchId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchStats_matchId_playerId_key" ON "MatchStats"("matchId", "playerId");

-- CreateIndex
CREATE UNIQUE INDEX "MatchSeries_id_key" ON "MatchSeries"("id");

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_homeTeamId_fkey" FOREIGN KEY ("homeTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_awayTeamId_fkey" FOREIGN KEY ("awayTeamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Match" ADD CONSTRAINT "Match_matchSerieId_fkey" FOREIGN KEY ("matchSerieId") REFERENCES "MatchSeries"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_playerOfTheMatchId_fkey" FOREIGN KEY ("playerOfTheMatchId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchStats" ADD CONSTRAINT "MatchStats_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchStats" ADD CONSTRAINT "MatchStats_matchId_fkey" FOREIGN KEY ("matchId") REFERENCES "Match"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
