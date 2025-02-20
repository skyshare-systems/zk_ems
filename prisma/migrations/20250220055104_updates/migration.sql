/*
  Warnings:

  - You are about to drop the column `email` on the `SentEmail` table. All the data in the column will be lost.
  - You are about to drop the column `body` on the `Template` table. All the data in the column will be lost.
  - Added the required column `body` to the `SentEmail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `footer` to the `SentEmail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `header` to the `SentEmail` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SentEmail" DROP COLUMN "email",
ADD COLUMN     "body" TEXT NOT NULL,
ADD COLUMN     "footer" TEXT NOT NULL,
ADD COLUMN     "header" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Template" DROP COLUMN "body";
