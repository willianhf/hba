-- CreateEnum
CREATE TYPE "ApprovalStatus" AS ENUM ('IDLE', 'ACCEPTED', 'DENIED');

-- CreateEnum
CREATE TYPE "Conference" AS ENUM ('EAST', 'WEST');

-- CreateEnum
CREATE TYPE "GameKind" AS ENUM ('REGULAR', 'PLAYOFF', 'FINAL', 'ALLSTAR');

-- CreateTable
CREATE TABLE "Season" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "isCurrent" BOOLEAN NOT NULL DEFAULT false,
    "userId" TEXT,

    CONSTRAINT "Season_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NBAPlayer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "NBAPlayer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Position" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Position_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSeason" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "nbaPlayerId" TEXT NOT NULL,
    "positionId" TEXT NOT NULL,
    "status" "ApprovalStatus" NOT NULL DEFAULT E'IDLE',

    CONSTRAINT "UserSeason_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Icon" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Icon_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserSeasonIcons" (
    "userSeasonId" TEXT NOT NULL,
    "iconId" TEXT NOT NULL,

    CONSTRAINT "UserSeasonIcons_pkey" PRIMARY KEY ("userSeasonId","iconId")
);

-- CreateTable
CREATE TABLE "NBATeam" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "conference" "Conference" NOT NULL,
    "tricode" VARCHAR(3) NOT NULL,
    "nickname" TEXT NOT NULL,

    CONSTRAINT "NBATeam_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TeamRoster" (
    "nbaTeamId" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "userSeasonId" TEXT NOT NULL,
    "isCaptain" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "TeamRoster_pkey" PRIMARY KEY ("nbaTeamId","seasonId","userSeasonId")
);

-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "seasonId" INTEGER NOT NULL,
    "homeNBATeamId" TEXT NOT NULL,
    "awayNBATeamId" TEXT NOT NULL,
    "scheduledTo" TIMESTAMP(3),
    "gameKind" "GameKind" NOT NULL,
    "gameSerieId" TEXT,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GameResult" (
    "gameId" TEXT NOT NULL,
    "homeScore" INTEGER NOT NULL,
    "awayScore" INTEGER NOT NULL,
    "isWalkover" BOOLEAN NOT NULL DEFAULT false,
    "releasedAt" TIMESTAMP(3) NOT NULL,
    "playerOfTheGameId" TEXT NOT NULL,

    CONSTRAINT "GameResult_pkey" PRIMARY KEY ("gameId")
);

-- CreateTable
CREATE TABLE "GameStats" (
    "gameId" TEXT NOT NULL,
    "userSeasonId" TEXT NOT NULL,
    "points" SMALLINT NOT NULL DEFAULT 0,
    "assists" SMALLINT NOT NULL DEFAULT 0,
    "steals" SMALLINT NOT NULL DEFAULT 0,
    "rebounds" SMALLINT NOT NULL DEFAULT 0,
    "blocks" SMALLINT NOT NULL DEFAULT 0,
    "turnovers" SMALLINT NOT NULL DEFAULT 0,
    "fouls" SMALLINT NOT NULL DEFAULT 0,

    CONSTRAINT "GameStats_pkey" PRIMARY KEY ("gameId","userSeasonId")
);

-- CreateTable
CREATE TABLE "GameSerie" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "GameSerie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Season_name_key" ON "Season"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NBAPlayer_id_key" ON "NBAPlayer"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Position_id_key" ON "Position"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Position_name_key" ON "Position"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserSeason_id_key" ON "UserSeason"("id");

-- CreateIndex
CREATE UNIQUE INDEX "UserSeason_userId_seasonId_nbaPlayerId_key" ON "UserSeason"("userId", "seasonId", "nbaPlayerId");

-- CreateIndex
CREATE UNIQUE INDEX "Icon_id_key" ON "Icon"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Icon_name_key" ON "Icon"("name");

-- CreateIndex
CREATE UNIQUE INDEX "UserSeasonIcons_userSeasonId_iconId_key" ON "UserSeasonIcons"("userSeasonId", "iconId");

-- CreateIndex
CREATE UNIQUE INDEX "NBATeam_id_key" ON "NBATeam"("id");

-- CreateIndex
CREATE UNIQUE INDEX "NBATeam_name_key" ON "NBATeam"("name");

-- CreateIndex
CREATE UNIQUE INDEX "NBATeam_tricode_key" ON "NBATeam"("tricode");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRoster_userSeasonId_key" ON "TeamRoster"("userSeasonId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRoster_nbaTeamId_seasonId_userSeasonId_key" ON "TeamRoster"("nbaTeamId", "seasonId", "userSeasonId");

-- CreateIndex
CREATE UNIQUE INDEX "Game_id_key" ON "Game"("id");

-- CreateIndex
CREATE UNIQUE INDEX "GameResult_gameId_key" ON "GameResult"("gameId");

-- CreateIndex
CREATE UNIQUE INDEX "GameStats_gameId_userSeasonId_key" ON "GameStats"("gameId", "userSeasonId");

-- AddForeignKey
ALTER TABLE "UserSeason" ADD CONSTRAINT "UserSeason_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeason" ADD CONSTRAINT "UserSeason_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeason" ADD CONSTRAINT "UserSeason_nbaPlayerId_fkey" FOREIGN KEY ("nbaPlayerId") REFERENCES "NBAPlayer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeason" ADD CONSTRAINT "UserSeason_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeasonIcons" ADD CONSTRAINT "UserSeasonIcons_userSeasonId_fkey" FOREIGN KEY ("userSeasonId") REFERENCES "UserSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserSeasonIcons" ADD CONSTRAINT "UserSeasonIcons_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoster" ADD CONSTRAINT "TeamRoster_nbaTeamId_fkey" FOREIGN KEY ("nbaTeamId") REFERENCES "NBATeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoster" ADD CONSTRAINT "TeamRoster_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoster" ADD CONSTRAINT "TeamRoster_userSeasonId_fkey" FOREIGN KEY ("userSeasonId") REFERENCES "UserSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_homeNBATeamId_fkey" FOREIGN KEY ("homeNBATeamId") REFERENCES "NBATeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_awayNBATeamId_fkey" FOREIGN KEY ("awayNBATeamId") REFERENCES "NBATeam"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Game" ADD CONSTRAINT "Game_gameSerieId_fkey" FOREIGN KEY ("gameSerieId") REFERENCES "GameSerie"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameResult" ADD CONSTRAINT "GameResult_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameResult" ADD CONSTRAINT "GameResult_playerOfTheGameId_fkey" FOREIGN KEY ("playerOfTheGameId") REFERENCES "UserSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameStats" ADD CONSTRAINT "GameStats_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameStats" ADD CONSTRAINT "GameStats_userSeasonId_fkey" FOREIGN KEY ("userSeasonId") REFERENCES "UserSeason"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
