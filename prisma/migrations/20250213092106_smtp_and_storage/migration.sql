/*
  Warnings:

  - You are about to drop the column `smtpCredentialId` on the `Company` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[companyId]` on the table `SmtpCredential` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `companyId` to the `SmtpCredential` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_smtpCredentialId_fkey";

-- DropIndex
DROP INDEX "Company_smtpCredentialId_key";

-- AlterTable
ALTER TABLE "Company" DROP COLUMN "smtpCredentialId";

-- AlterTable
ALTER TABLE "SmtpCredential" ADD COLUMN     "companyId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "StorageConfig" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT,
    "region" TEXT,
    "bucketName" TEXT,
    "accessKeyId" TEXT,
    "secretAccessKey" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "companyId" TEXT NOT NULL,

    CONSTRAINT "StorageConfig_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "StorageConfig_companyId_key" ON "StorageConfig"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "SmtpCredential_companyId_key" ON "SmtpCredential"("companyId");

-- AddForeignKey
ALTER TABLE "SmtpCredential" ADD CONSTRAINT "SmtpCredential_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StorageConfig" ADD CONSTRAINT "StorageConfig_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;
