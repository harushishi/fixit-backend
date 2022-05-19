/*
  Warnings:

  - You are about to drop the column `userId` on the `UserType` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "UserType" DROP CONSTRAINT "UserType_userId_fkey";

-- DropIndex
DROP INDEX "UserType_userId_key";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "userTypeId" INTEGER;

-- AlterTable
ALTER TABLE "UserType" DROP COLUMN "userId";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_userTypeId_fkey" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE SET NULL ON UPDATE CASCADE;
