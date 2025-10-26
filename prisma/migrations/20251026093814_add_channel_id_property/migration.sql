/*
  Warnings:

  - Added the required column `channel_id` to the `videos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "videos" ADD COLUMN     "channel_id" TEXT NOT NULL;
