/*
  Warnings:

  - The primary key for the `DiscordChannelMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `seasonId` on the `DiscordChannelMessage` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[category]` on the table `DiscordChannelMessage` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "DiscordChannelMessage" DROP CONSTRAINT "DiscordChannelMessage_seasonId_fkey";

-- DropIndex
DROP INDEX "DiscordChannelMessage_discordId_key";

-- AlterTable
ALTER TABLE "DiscordChannelMessage" DROP CONSTRAINT "DiscordChannelMessage_pkey",
DROP COLUMN "seasonId",
ADD CONSTRAINT "DiscordChannelMessage_pkey" PRIMARY KEY ("category");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordChannelMessage_category_key" ON "DiscordChannelMessage"("category");
