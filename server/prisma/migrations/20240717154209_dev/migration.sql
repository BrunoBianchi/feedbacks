/*
  Warnings:

  - You are about to drop the column `comment` on the `Feedback` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "comment";
ALTER TABLE "Feedback" ADD COLUMN     "comments" STRING[];
