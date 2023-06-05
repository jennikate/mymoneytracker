/*
  Warnings:

  - You are about to drop the column `paidTo` on the `Payment` table. All the data in the column will be lost.
  - Added the required column `recipientId` to the `Payment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "paidTo",
ADD COLUMN     "recipientId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Recipient" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_name_key" ON "Recipient"("name");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
