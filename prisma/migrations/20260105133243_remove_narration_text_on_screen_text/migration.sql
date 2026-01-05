/*
  Warnings:

  - You are about to drop the column `narration_text` on the `shorts_story_scenes` table. All the data in the column will be lost.
  - You are about to drop the column `on_screen_text` on the `shorts_story_scenes` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shorts_story_scenes" DROP COLUMN "narration_text",
DROP COLUMN "on_screen_text";
