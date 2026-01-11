/*
  Warnings:

  - Made the column `ssml_gender` on table `shorts_story_voices` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "shorts_story_voices" ALTER COLUMN "ssml_gender" SET NOT NULL;
