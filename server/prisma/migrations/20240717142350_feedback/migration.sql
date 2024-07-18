/*
  Warnings:

  - You are about to drop the `Feedbacks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Feedbacks" DROP CONSTRAINT "Feedbacks_websiteId_fkey";

-- DropTable
DROP TABLE "Feedbacks";

-- CreateTable
CREATE TABLE "Feedback" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user" STRING NOT NULL,
    "rating" FLOAT8 NOT NULL,
    "comment" STRING[],
    "websiteId" UUID,

    CONSTRAINT "Feedback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedback" ADD CONSTRAINT "Feedback_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;
