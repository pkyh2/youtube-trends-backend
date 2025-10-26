-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "first_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "last_seen_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "trending_days" INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE INDEX "videos_last_seen_at_idx" ON "videos"("last_seen_at");

-- CreateIndex
CREATE INDEX "videos_trending_days_category_id_idx" ON "videos"("trending_days", "category_id");
