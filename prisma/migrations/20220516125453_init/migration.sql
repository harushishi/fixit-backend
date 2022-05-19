/*
  Warnings:

  - You are about to drop the column `userTypeId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId]` on the table `UserType` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_userTypeId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "userTypeId";

-- AlterTable
ALTER TABLE "UserType" ADD COLUMN     "userId" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserType_userId_key" ON "UserType"("userId");

-- AddForeignKey
ALTER TABLE "UserType" ADD CONSTRAINT "UserType_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
