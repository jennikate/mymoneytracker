/*
  Warnings:

  - A unique constraint covering the columns `[label]` on the table `ExpenseType` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[label]` on the table `PaymentType` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ExpenseType_label_key" ON "ExpenseType"("label");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentType_label_key" ON "PaymentType"("label");
