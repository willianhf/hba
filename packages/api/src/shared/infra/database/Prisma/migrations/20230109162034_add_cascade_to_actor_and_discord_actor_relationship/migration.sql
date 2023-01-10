-- DropForeignKey
ALTER TABLE "DiscordActor" DROP CONSTRAINT "DiscordActor_actorId_fkey";

-- AddForeignKey
ALTER TABLE "DiscordActor" ADD CONSTRAINT "DiscordActor_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
