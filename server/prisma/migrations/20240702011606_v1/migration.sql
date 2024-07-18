-- CreateTable
CREATE TABLE "Website" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "url" STRING NOT NULL,
    "form" STRING NOT NULL,

    CONSTRAINT "Website_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Feedbacks" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "user" STRING NOT NULL,
    "rating" FLOAT8 NOT NULL,
    "comment" STRING NOT NULL,
    "websiteId" UUID,

    CONSTRAINT "Feedbacks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feedbacks" ADD CONSTRAINT "Feedbacks_websiteId_fkey" FOREIGN KEY ("websiteId") REFERENCES "Website"("id") ON DELETE SET NULL ON UPDATE CASCADE;
