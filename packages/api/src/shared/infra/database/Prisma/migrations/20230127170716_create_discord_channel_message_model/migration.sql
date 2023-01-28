-- CreateTable
CREATE TABLE "DiscordChannelMessage" (
    "discordId" TEXT NOT NULL,
    "category" "DiscordChannelCategory" NOT NULL,
    "seasonId" INTEGER NOT NULL,

    CONSTRAINT "DiscordChannelMessage_pkey" PRIMARY KEY ("discordId")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscordChannelMessage_discordId_key" ON "DiscordChannelMessage"("discordId");

-- AddForeignKey
ALTER TABLE "DiscordChannelMessage" ADD CONSTRAINT "DiscordChannelMessage_seasonId_fkey" FOREIGN KEY ("seasonId") REFERENCES "Season"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
