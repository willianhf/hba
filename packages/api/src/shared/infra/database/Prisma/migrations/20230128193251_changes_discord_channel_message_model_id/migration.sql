/*
  Warnings:

  - The primary key for the `DiscordChannelMessage` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropIndex
DROP INDEX "DiscordChannelMessage_category_key";

-- AlterTable
ALTER TABLE "DiscordChannelMessage" DROP CONSTRAINT "DiscordChannelMessage_pkey",
ADD CONSTRAINT "DiscordChannelMessage_pkey" PRIMARY KEY ("discordId");
