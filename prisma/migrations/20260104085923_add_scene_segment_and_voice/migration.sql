-- CreateTable
CREATE TABLE "shorts_story_scene_segments" (
    "id" SERIAL NOT NULL,
    "scene_id" INTEGER NOT NULL,
    "segment_order" INTEGER NOT NULL,
    "speaker_key" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "tts_audio_url" TEXT,
    "duration_sec" INTEGER,
    "status" "SceneStatus" NOT NULL DEFAULT 'READY',
    "retry_count" INTEGER DEFAULT 0,
    "error_message" TEXT,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shorts_story_scene_segments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shorts_story_voices" (
    "id" SERIAL NOT NULL,
    "speaker_key" TEXT NOT NULL,
    "tts_provider" TEXT NOT NULL,
    "voice_name" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shorts_story_voices_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "shorts_story_scene_segments_scene_id_idx" ON "shorts_story_scene_segments"("scene_id");

-- CreateIndex
CREATE INDEX "shorts_story_scene_segments_segment_order_idx" ON "shorts_story_scene_segments"("segment_order");

-- CreateIndex
CREATE INDEX "shorts_story_scene_segments_status_idx" ON "shorts_story_scene_segments"("status");

-- CreateIndex
CREATE INDEX "shorts_story_scene_segments_scene_id_status_idx" ON "shorts_story_scene_segments"("scene_id", "status");

-- CreateIndex
CREATE UNIQUE INDEX "shorts_story_voices_speaker_key_key" ON "shorts_story_voices"("speaker_key");

-- CreateIndex
CREATE INDEX "shorts_story_voices_speaker_key_idx" ON "shorts_story_voices"("speaker_key");

-- CreateIndex
CREATE INDEX "shorts_story_voices_tts_provider_idx" ON "shorts_story_voices"("tts_provider");

-- CreateIndex
CREATE INDEX "shorts_story_voices_voice_name_idx" ON "shorts_story_voices"("voice_name");

-- AddForeignKey
ALTER TABLE "shorts_story_scene_segments" ADD CONSTRAINT "shorts_story_scene_segments_scene_id_fkey" FOREIGN KEY ("scene_id") REFERENCES "shorts_story_scenes"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "shorts_story_scene_segments" ADD CONSTRAINT "shorts_story_scene_segments_speaker_key_fkey" FOREIGN KEY ("speaker_key") REFERENCES "shorts_story_voices"("speaker_key") ON DELETE CASCADE ON UPDATE NO ACTION;
