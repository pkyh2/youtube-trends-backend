-- CreateTable
CREATE TABLE "transcripts" (
    "id" TEXT NOT NULL,
    "channel_id" TEXT NOT NULL,
    "video_id" TEXT NOT NULL,
    "transcript" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transcripts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transcripts_video_id_key" ON "transcripts"("video_id");

-- CreateIndex
CREATE INDEX "transcripts_channel_id_video_id_idx" ON "transcripts"("channel_id", "video_id");

-- AddForeignKey
ALTER TABLE "transcripts" ADD CONSTRAINT "transcripts_channel_id_fkey" FOREIGN KEY ("channel_id") REFERENCES "channels"("channel_id") ON DELETE CASCADE ON UPDATE CASCADE;
