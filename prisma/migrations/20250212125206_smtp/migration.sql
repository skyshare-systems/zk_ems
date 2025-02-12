-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "smtpCredentialId" TEXT;

-- CreateTable
CREATE TABLE "SmtpCredential" (
    "id" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmtpCredential_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Company" ADD CONSTRAINT "Company_smtpCredentialId_fkey" FOREIGN KEY ("smtpCredentialId") REFERENCES "SmtpCredential"("id") ON DELETE SET NULL ON UPDATE CASCADE;
