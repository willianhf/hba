-- CreateEnum
CREATE TYPE "DiscordChannelCategory" AS ENUM ('STANDINGS', 'SCHEDULE');

-- CreateEnum
CREATE TYPE "DiscordRoleCategory" AS ENUM ('MOD', 'CAPTAIN', 'COUNCIL', 'PORTUGUESE');

-- CreateTable
CREATE TABLE "DiscordChannel" (
    "category" "DiscordChannelCategory" NOT NULL,
    "discordId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DiscordChannel_pkey" PRIMARY KEY ("category")
);

-- CreateTable
CREATE TABLE "DiscordRole" (
    "category" "DiscordRoleCategory" NOT NULL,
    "discordId" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "DiscordRole_pkey" PRIMARY KEY ("category")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordChannel_category_key" ON "DiscordChannel"("category");

-- CreateIndex
CREATE UNIQUE INDEX "DiscordRole_category_key" ON "DiscordRole"("category");
