/*
  Warnings:

  - You are about to drop the column `ssmlGender` on the `shorts_story_voices` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "shorts_story_voices" DROP COLUMN "ssmlGender",
ADD COLUMN     "ssml_gender" TEXT;
