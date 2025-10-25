/*
  Warnings:

  - The primary key for the `categories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoryId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `categories` table. All the data in the column will be lost.
  - The primary key for the `videos` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `aspectRatio` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `categoryId` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `channelTitle` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `publishedAt` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `regionCode` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `thumbnailUrl` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `videoId` on the `videos` table. All the data in the column will be lost.
  - You are about to drop the column `viewCount` on the `videos` table. All the data in the column will be lost.
  - Added the required column `category_id` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `aspect_ratio` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `category_id` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `channel_title` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `comment_count` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `like_count` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `published_at` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `thumbnail_url` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_at` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `video_id` to the `videos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `view_count` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "youtube"."categories_categoryId_idx";

-- DropIndex
DROP INDEX "youtube"."categories_categoryId_key";

-- DropIndex
DROP INDEX "youtube"."videos_type_categoryId_regionCode_rank_idx";

-- DropIndex
DROP INDEX "youtube"."videos_updatedAt_idx";

-- DropIndex
DROP INDEX "youtube"."videos_videoId_idx";

-- DropIndex
DROP INDEX "youtube"."videos_videoId_key";

-- AlterTable
ALTER TABLE "categories" DROP CONSTRAINT "categories_pkey",
DROP COLUMN "categoryId",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "updatedAt",
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD CONSTRAINT "categories_pkey" PRIMARY KEY ("category_id");

-- AlterTable
ALTER TABLE "videos" DROP CONSTRAINT "videos_pkey",
DROP COLUMN "aspectRatio",
DROP COLUMN "categoryId",
DROP COLUMN "channelTitle",
DROP COLUMN "createdAt",
DROP COLUMN "id",
DROP COLUMN "publishedAt",
DROP COLUMN "regionCode",
DROP COLUMN "thumbnailUrl",
DROP COLUMN "updatedAt",
DROP COLUMN "videoId",
DROP COLUMN "viewCount",
ADD COLUMN     "aspect_ratio" TEXT NOT NULL,
ADD COLUMN     "category_id" TEXT NOT NULL,
ADD COLUMN     "channel_title" TEXT NOT NULL,
ADD COLUMN     "comment_count" BIGINT NOT NULL,
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "is_ad" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "like_count" BIGINT NOT NULL,
ADD COLUMN     "published_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "region_code" TEXT NOT NULL DEFAULT 'KR',
ADD COLUMN     "thumbnail_url" TEXT NOT NULL,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "video_id" TEXT NOT NULL,
ADD COLUMN     "view_count" BIGINT NOT NULL,
ADD CONSTRAINT "videos_pkey" PRIMARY KEY ("video_id");

-- CreateIndex
CREATE INDEX "videos_type_category_id_region_code_rank_idx" ON "videos"("type", "category_id", "region_code", "rank");

-- CreateIndex
CREATE INDEX "videos_region_code_type_rank_idx" ON "videos"("region_code", "type", "rank");

-- CreateIndex
CREATE INDEX "videos_category_id_idx" ON "videos"("category_id");

-- CreateIndex
CREATE INDEX "videos_updated_at_idx" ON "videos"("updated_at");

-- AddForeignKey
ALTER TABLE "videos" ADD CONSTRAINT "videos_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("category_id") ON DELETE CASCADE ON UPDATE CASCADE;
