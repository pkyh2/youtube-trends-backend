/*
  Warnings:

  - You are about to drop the `shorts_story_scene` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "SceneStatus" AS ENUM ('READY', 'IMG_DONE', 'TTS_DONE', 'VIDEO_DONE', 'SCENE_DONE');

-- DropForeignKey
ALTER TABLE "youtube"."shorts_story_scene" DROP CONSTRAINT "shorts_story_scene_shorts_story_id_fkey";

-- DropTable
DROP TABLE "youtube"."shorts_story_scene";

-- CreateTable
CREATE TABLE "shorts_story_scenes" (
    "id" SERIAL NOT NULL,
    "shorts_story_id" INTEGER NOT NULL,
    "scene_order" INTEGER NOT NULL,
    "narration_text" TEXT NOT NULL,
    "on_screen_text" TEXT,
    "image_prompt" TEXT,
    "video_prompt" TEXT,
    "duration_sec" INTEGER,
    "image_url" TEXT,
    "video_url" TEXT,
    "tts_audio_url" TEXT,
    "merged_video_url" TEXT,
    "status" "SceneStatus" NOT NULL DEFAULT 'READY',
    "retry_count" INTEGER DEFAULT 0,
    "error_message" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shorts_story_scenes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shorts_story_scenes_shorts_story_id_scene_order_idx" ON "shorts_story_scenes"("shorts_story_id", "scene_order");

-- CreateIndex
CREATE INDEX "shorts_story_scenes_status_idx" ON "shorts_story_scenes"("status");

-- CreateIndex
CREATE INDEX "shorts_story_scenes_shorts_story_id_status_idx" ON "shorts_story_scenes"("shorts_story_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "shorts_story_scenes_shorts_story_id_scene_order_key" ON "shorts_story_scenes"("shorts_story_id", "scene_order");

-- CreateIndex
CREATE INDEX "shorts_stories_status_idx" ON "shorts_stories"("status");

-- CreateIndex
CREATE INDEX "shorts_stories_category_status_idx" ON "shorts_stories"("category", "status");

-- CreateIndex
CREATE INDEX "shorts_stories_is_processing_idx" ON "shorts_stories"("is_processing");

-- CreateIndex
CREATE INDEX "shorts_stories_created_at_idx" ON "shorts_stories"("created_at");

-- AddForeignKey
ALTER TABLE "shorts_story_scenes" ADD CONSTRAINT "shorts_story_scenes_shorts_story_id_fkey" FOREIGN KEY ("shorts_story_id") REFERENCES "shorts_stories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
