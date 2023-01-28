/*
  Warnings:

  - Added the required column `seasonId` to the `DiscordChannelMessage` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "DiscordChannelMessage" ADD COLUMN     "seasonId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "DiscordChannelMessage" ADD CONSTRAINT "DiscordChannelMessage_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
