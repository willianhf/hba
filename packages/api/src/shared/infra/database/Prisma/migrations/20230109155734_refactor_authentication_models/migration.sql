/*
  Warnings:

  - You are about to drop the column `userId` on the `Player` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Session` table. All the data in the column will be lost.
  - The primary key for the `TeamRoster` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `TeamRoster` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Verification` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[actorId,seasonId,nbaPlayerId]` on the table `Player` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[teamId,actorId]` on the table `TeamRoster` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[identityId]` on the table `Verification` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `actorId` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityId` to the `Session` table without a default value. This is not possible if the table is not empty.
  - Added the required column `actorId` to the `TeamRoster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `identityId` to the `Verification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Player" DROP CONSTRAINT "Player_userId_fkey";

-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_userId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRoster" DROP CONSTRAINT "TeamRoster_userId_fkey";

-- DropForeignKey
ALTER TABLE "Verification" DROP CONSTRAINT "Verification_userId_fkey";

-- DropIndex
DROP INDEX "Player_userId_seasonId_nbaPlayerId_key";

-- DropIndex
DROP INDEX "TeamRoster_teamId_userId_key";

-- DropIndex
DROP INDEX "Verification_userId_key";

-- AlterTable
ALTER TABLE "Player" DROP COLUMN "userId",
ADD COLUMN     "actorId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "userId",
ADD COLUMN     "identityId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "TeamRoster" DROP CONSTRAINT "TeamRoster_pkey",
DROP COLUMN "userId",
ADD COLUMN     "actorId" TEXT NOT NULL,
ADD CONSTRAINT "TeamRoster_pkey" PRIMARY KEY ("teamId", "actorId");

-- AlterTable
ALTER TABLE "Verification" DROP COLUMN "userId",
ADD COLUMN     "identityId" TEXT NOT NULL;

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Actor" (
    "id" TEXT NOT NULL,
    "habboUsername" TEXT NOT NULL,

    CONSTRAINT "Actor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscordActor" (
    "discordId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,

    CONSTRAINT "DiscordActor_pkey" PRIMARY KEY ("discordId")
);

-- CreateTable
CREATE TABLE "Identity" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "isVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actorId" TEXT NOT NULL,

    CONSTRAINT "Identity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Role" (
    "id" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordActor_discordId_key" ON "DiscordActor"("discordId");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordActor_actorId_key" ON "DiscordActor"("actorId");

-- CreateIndex
CREATE UNIQUE INDEX "Identity_username_key" ON "Identity"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Identity_actorId_key" ON "Identity"("actorId");

-- CreateIndex
CREATE UNIQUE INDEX "Player_actorId_seasonId_nbaPlayerId_key" ON "Player"("actorId", "seasonId", "nbaPlayerId");

-- CreateIndex
CREATE UNIQUE INDEX "TeamRoster_teamId_actorId_key" ON "TeamRoster"("teamId", "actorId");

-- CreateIndex
CREATE UNIQUE INDEX "Verification_identityId_key" ON "Verification"("identityId");

-- AddForeignKey
ALTER TABLE "DiscordActor" ADD CONSTRAINT "DiscordActor_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Identity" ADD CONSTRAINT "Identity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Role" ADD CONSTRAINT "Role_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "Identity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "Identity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Player" ADD CONSTRAINT "Player_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamRoster" ADD CONSTRAINT "TeamRoster_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
