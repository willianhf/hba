-- CreateTable
CREATE TABLE "HabboAccount" (
    "id" TEXT NOT NULL,
    "nickname" TEXT NOT NULL,
    "verificationCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "HabboAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "HabboAccount_nickname_key" ON "HabboAccount"("nickname");

-- CreateIndex
CREATE UNIQUE INDEX "HabboAccount_userId_key" ON "HabboAccount"("userId");

-- AddForeignKey
ALTER TABLE "HabboAccount" ADD CONSTRAINT "HabboAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
