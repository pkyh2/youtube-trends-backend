/*
  Warnings:

  - Added the required column `ssmlGender` to the `shorts_story_voices` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "shorts_story_voices" ADD COLUMN     "ssmlGender" TEXT NOT NULL;
