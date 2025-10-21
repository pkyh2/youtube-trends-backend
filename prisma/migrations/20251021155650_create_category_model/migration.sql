-- CreateTable
CREATE TABLE "categories" (
    "id" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "name_en" TEXT NOT NULL,
    "name_ko" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "categories_categoryId_key" ON "categories"("categoryId");

-- CreateIndex
CREATE INDEX "categories_categoryId_idx" ON "categories"("categoryId");
