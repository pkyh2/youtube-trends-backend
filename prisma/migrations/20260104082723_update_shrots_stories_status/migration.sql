/*
  Warnings:

  - You are about to drop the column `safety_level` on the `shorts_stories` table. All the data in the column will be lost.
  - The `status` column on the `shorts_stories` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `visual_style` column on the `shorts_stories` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Status" AS ENUM ('READY', 'PROCESSING', 'SCENES_DONE', 'RENDERED', 'PUBLISHED');

-- AlterTable
ALTER TABLE "shorts_stories" DROP COLUMN "safety_level",
ADD COLUMN     "final_video_url" TEXT,
ADD COLUMN     "youtube_video_id" TEXT,
DROP COLUMN "status",
ADD COLUMN     "status" "Status" NOT NULL DEFAULT 'READY',
DROP COLUMN "visual_style",
ADD COLUMN     "visual_style" JSONB;
