-- CreateTable
CREATE TABLE "videos" (
    "id" TEXT NOT NULL,
    "videoId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "channelTitle" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "viewCount" BIGINT NOT NULL,
    "publishedAt" TIMESTAMP(3) NOT NULL,
    "duration" INTEGER NOT NULL,
    "aspectRatio" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,
    "regionCode" TEXT NOT NULL DEFAULT 'KR',
    "rank" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "videos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "videos_videoId_key" ON "videos"("videoId");

-- CreateIndex
CREATE INDEX "videos_type_categoryId_regionCode_rank_idx" ON "videos"("type", "categoryId", "regionCode", "rank");

-- CreateIndex
CREATE INDEX "videos_videoId_idx" ON "videos"("videoId");

-- CreateIndex
CREATE INDEX "videos_updatedAt_idx" ON "videos"("updatedAt");
