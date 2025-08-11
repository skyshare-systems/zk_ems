-- CreateEnum
CREATE TYPE "public"."Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "public"."TokenType" AS ENUM ('ACCESS', 'REFRESH', 'RESET_PASSWORD', 'VERIFY_EMAIL');

-- CreateEnum
CREATE TYPE "public"."Action" AS ENUM ('SEND_EMAIL', 'LOG_IN', 'LOG_OUT', 'UPDATE_CONFIG');

-- CreateTable
CREATE TABLE "public"."User" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "role" "public"."Role" NOT NULL DEFAULT 'ADMIN',
    "isActivated" BOOLEAN NOT NULL DEFAULT false,
    "lastLogin" TIMESTAMP(3),
    "lastLogout" TIMESTAMP(3),
    "emailAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Company" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Company_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserCompany" (
    "userId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserCompany_pkey" PRIMARY KEY ("userId","companyId")
);

-- CreateTable
CREATE TABLE "public"."Template" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "footer" TEXT NOT NULL,
    "tags" TEXT[],
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SentEmail" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "footer" TEXT NOT NULL,
    "header" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "attachments" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SentEmail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Recipient" (
    "id" TEXT NOT NULL,
    "sentEmailId" TEXT NOT NULL,
    "emailAddress" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Group" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "tagColor" TEXT NOT NULL,
    "description" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."RecipientGroup" (
    "recipientId" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RecipientGroup_pkey" PRIMARY KEY ("recipientId","groupId")
);

-- CreateTable
CREATE TABLE "public"."Token" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "type" "public"."TokenType" NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "blacklisted" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Token_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."SmtpCredential" (
    "id" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "from" TEXT NOT NULL,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SmtpCredential_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."StorageConfig" (
    "id" TEXT NOT NULL,
    "endpoint" TEXT,
    "region" TEXT,
    "bucketName" TEXT,
    "accessKeyId" TEXT,
    "secretAccessKey" TEXT,
    "companyId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StorageConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Transactions" (
    "id" TEXT NOT NULL,
    "action" "public"."Action" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_emailAddress_key" ON "public"."User"("emailAddress");

-- CreateIndex
CREATE INDEX "User_username_idx" ON "public"."User"("username");

-- CreateIndex
CREATE INDEX "User_emailAddress_idx" ON "public"."User"("emailAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Company_name_key" ON "public"."Company"("name");

-- CreateIndex
CREATE INDEX "Company_name_idx" ON "public"."Company"("name");

-- CreateIndex
CREATE INDEX "UserCompany_companyId_idx" ON "public"."UserCompany"("companyId");

-- CreateIndex
CREATE INDEX "UserCompany_userId_idx" ON "public"."UserCompany"("userId");

-- CreateIndex
CREATE INDEX "Template_companyId_idx" ON "public"."Template"("companyId");

-- CreateIndex
CREATE INDEX "Template_name_idx" ON "public"."Template"("name");

-- CreateIndex
CREATE INDEX "SentEmail_templateId_idx" ON "public"."SentEmail"("templateId");

-- CreateIndex
CREATE INDEX "SentEmail_companyId_idx" ON "public"."SentEmail"("companyId");

-- CreateIndex
CREATE INDEX "Recipient_sentEmailId_idx" ON "public"."Recipient"("sentEmailId");

-- CreateIndex
CREATE INDEX "Recipient_emailAddress_idx" ON "public"."Recipient"("emailAddress");

-- CreateIndex
CREATE INDEX "Group_companyId_idx" ON "public"."Group"("companyId");

-- CreateIndex
CREATE INDEX "Group_name_idx" ON "public"."Group"("name");

-- CreateIndex
CREATE INDEX "Group_tag_idx" ON "public"."Group"("tag");

-- CreateIndex
CREATE INDEX "RecipientGroup_recipientId_idx" ON "public"."RecipientGroup"("recipientId");

-- CreateIndex
CREATE INDEX "RecipientGroup_groupId_idx" ON "public"."RecipientGroup"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "Token_token_key" ON "public"."Token"("token");

-- CreateIndex
CREATE INDEX "Token_userId_idx" ON "public"."Token"("userId");

-- CreateIndex
CREATE INDEX "Token_token_idx" ON "public"."Token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "SmtpCredential_companyId_key" ON "public"."SmtpCredential"("companyId");

-- CreateIndex
CREATE INDEX "SmtpCredential_companyId_idx" ON "public"."SmtpCredential"("companyId");

-- CreateIndex
CREATE UNIQUE INDEX "StorageConfig_companyId_key" ON "public"."StorageConfig"("companyId");

-- CreateIndex
CREATE INDEX "StorageConfig_companyId_idx" ON "public"."StorageConfig"("companyId");

-- CreateIndex
CREATE INDEX "Transactions_userId_idx" ON "public"."Transactions"("userId");

-- AddForeignKey
ALTER TABLE "public"."UserCompany" ADD CONSTRAINT "UserCompany_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserCompany" ADD CONSTRAINT "UserCompany_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Template" ADD CONSTRAINT "Template_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SentEmail" ADD CONSTRAINT "SentEmail_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SentEmail" ADD CONSTRAINT "SentEmail_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "public"."Template"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Recipient" ADD CONSTRAINT "Recipient_sentEmailId_fkey" FOREIGN KEY ("sentEmailId") REFERENCES "public"."SentEmail"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Group" ADD CONSTRAINT "Group_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecipientGroup" ADD CONSTRAINT "RecipientGroup_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "public"."Recipient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."RecipientGroup" ADD CONSTRAINT "RecipientGroup_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "public"."Group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Token" ADD CONSTRAINT "Token_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."SmtpCredential" ADD CONSTRAINT "SmtpCredential_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."StorageConfig" ADD CONSTRAINT "StorageConfig_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "public"."Company"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Transactions" ADD CONSTRAINT "Transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
