/*
  Warnings:

  - Added the required column `refereeId` to the `MatchResult` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scorerId` to the `MatchResult` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchResult" ADD COLUMN     "recorderId" TEXT,
ADD COLUMN     "refereeId" TEXT NOT NULL,
ADD COLUMN     "scorerId" TEXT NOT NULL,
ADD COLUMN     "statsKeeperId" TEXT,
ADD COLUMN     "videoRefereeId" TEXT;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_refereeId_fkey" FOREIGN KEY ("refereeId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_scorerId_fkey" FOREIGN KEY ("scorerId") REFERENCES "Actor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_recorderId_fkey" FOREIGN KEY ("recorderId") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_videoRefereeId_fkey" FOREIGN KEY ("videoRefereeId") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchResult" ADD CONSTRAINT "MatchResult_statsKeeperId_fkey" FOREIGN KEY ("statsKeeperId") REFERENCES "Actor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
