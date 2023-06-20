-- CreateTable
CREATE TABLE "ExpenseType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" VARCHAR(255) NOT NULL,

    CONSTRAINT "ExpenseType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PaymentType" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "label" VARCHAR(255) NOT NULL,

    CONSTRAINT "PaymentType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Recipient" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Recipient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "expenseTypeId" UUID NOT NULL,
    "paymentTypeId" UUID NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "recipientId" UUID NOT NULL,
    "amount" DECIMAL(9,2) NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ExpenseType_label_key" ON "ExpenseType"("label");

-- CreateIndex
CREATE UNIQUE INDEX "PaymentType_label_key" ON "PaymentType"("label");

-- CreateIndex
CREATE UNIQUE INDEX "Recipient_name_key" ON "Recipient"("name");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_expenseTypeId_fkey" FOREIGN KEY ("expenseTypeId") REFERENCES "ExpenseType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_paymentTypeId_fkey" FOREIGN KEY ("paymentTypeId") REFERENCES "PaymentType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Recipient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
