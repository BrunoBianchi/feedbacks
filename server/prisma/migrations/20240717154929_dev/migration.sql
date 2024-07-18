/*
  Warnings:

  - You are about to drop the column `creratedAt` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "creratedAt";
ALTER TABLE "Feedback" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
