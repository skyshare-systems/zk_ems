/*
  Warnings:

  - You are about to drop the column `company` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `firstName` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Recipient` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `_CompanyToUser` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[token]` on the table `Token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[emailAddress]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `emailAddress` to the `Recipient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `companyId` to the `SentEmail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `SentEmail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `emailAddress` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_CompanyToUser" DROP CONSTRAINT "_CompanyToUser_A_fkey";

-- DropForeignKey
ALTER TABLE "_CompanyToUser" DROP CONSTRAINT "_CompanyToUser_B_fkey";

-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "Recipient" DROP COLUMN "company",
DROP COLUMN "email",
DROP COLUMN "firstName",
DROP COLUMN "lastName",
DROP COLUMN "phone",
ADD COLUMN     "emailAddress" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SentEmail" ADD COLUMN     "companyId" TEXT NOT NULL,
ADD COLUMN     "email" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "email",
ADD COLUMN     "emailAddress" TEXT NOT NULL;

-- DropTable
DROP TABLE "_CompanyToUser";

-- CreateTable
CREATE TABLE "UserCompany" (
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "UserCompany_pkey" PRIMARY KEY ("userId","companyId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "User"("emailAddress");

-- AddForeignKey
ALTER TABLE "UserCompany" ADD CONSTRAINT "UserCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompany" ADD CONSTRAINT "UserCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SentEmail" ADD CONSTRAINT "SentEmail_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
