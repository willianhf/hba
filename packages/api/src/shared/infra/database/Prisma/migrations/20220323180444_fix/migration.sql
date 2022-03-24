/*
  Warnings:

  - You are about to drop the `PlayerIcons` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "PlayerIcons" DROP CONSTRAINT "PlayerIcons_iconId_fkey";

-- DropForeignKey
ALTER TABLE "PlayerIcons" DROP CONSTRAINT "PlayerIcons_playerId_fkey";

-- DropTable
DROP TABLE "PlayerIcons";

-- CreateTable
CREATE TABLE "PlayerIcon" (
    "playerId" TEXT NOT NULL,
    "iconId" TEXT NOT NULL,

    CONSTRAINT "PlayerIcon_pkey" PRIMARY KEY ("playerId","iconId")
);

-- CreateIndex
CREATE UNIQUE INDEX "PlayerIcon_playerId_iconId_key" ON "PlayerIcon"("playerId", "iconId");

-- AddForeignKey
ALTER TABLE "PlayerIcon" ADD CONSTRAINT "PlayerIcon_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayerIcon" ADD CONSTRAINT "PlayerIcon_iconId_fkey" FOREIGN KEY ("iconId") REFERENCES "Icon"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
