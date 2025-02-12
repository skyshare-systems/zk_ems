/*
  Warnings:

  - A unique constraint covering the columns `[smtpCredentialId]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Made the column `smtpCredentialId` on table `Company` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `from` to the `SmtpCredential` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Company" DROP CONSTRAINT "Company_smtpCredentialId_fkey";

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "smtpCredentialId" SET NOT NULL;

-- AlterTable
ALTER TABLE "SmtpCredential" ADD COLUMN     "from" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_smtpCredentialId_key" ON "Company"("smtpCredentialId");

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_smtpCredentialId_fkey" FOREIGN KEY ("smtpCredentialId") REFERENCES "SmtpCredential"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
