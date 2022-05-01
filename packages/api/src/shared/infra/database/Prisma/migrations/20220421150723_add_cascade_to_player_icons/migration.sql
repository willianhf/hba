-- DropForeignKey
ALTER TABLE "PlayerIcon" DROP CONSTRAINT "PlayerIcon_playerId_fkey";

-- AddForeignKey
ALTER TABLE "PlayerIcon" ADD CONSTRAINT "PlayerIcon_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE CASCADE ON UPDATE CASCADE;
