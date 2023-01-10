/*
  Warnings:

  - You are about to drop the `TeamRoster` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "TeamRole" AS ENUM ('CAPTAIN', 'CO_CAPTAIN', 'PLAYER');

-- DropForeignKey
ALTER TABLE "TeamRoster" DROP CONSTRAINT "TeamRoster_actorId_fkey";

-- DropForeignKey
ALTER TABLE "TeamRoster" DROP CONSTRAINT "TeamRoster_teamId_fkey";

-- DropTable
DROP TABLE "TeamRoster";

-- DropEnum
DROP TYPE "TeamRosterRole";

-- CreateTable
CREATE TABLE "TeamActor" (
    "teamId" TEXT NOT NULL,
    "actorId" TEXT NOT NULL,
    "role" "TeamRole" NOT NULL DEFAULT E'PLAYER',

    CONSTRAINT "TeamActor_pkey" PRIMARY KEY ("teamId","actorId")
);

-- CreateIndex
CREATE UNIQUE INDEX "TeamActor_teamId_actorId_key" ON "TeamActor"("teamId", "actorId");

-- AddForeignKey
ALTER TABLE "TeamActor" ADD CONSTRAINT "TeamActor_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TeamActor" ADD CONSTRAINT "TeamActor_teamId_fkey" FOREIGN KEY ("teamId") REFERENCES "Team"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
