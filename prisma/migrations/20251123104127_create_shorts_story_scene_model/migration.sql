-- CreateTable
CREATE TABLE "shorts_story_scene" (
    "id" SERIAL NOT NULL,
    "shorts_story_id" INTEGER NOT NULL,
    "scene_order" INTEGER NOT NULL,
    "narration_text" TEXT NOT NULL,
    "on_screen_text" TEXT,
    "scene_type" TEXT DEFAULT 'narration',
    "is_punchline" BOOLEAN DEFAULT false,
    "pause_ms" INTEGER DEFAULT 0,
    "image_prompt" TEXT,
    "duration_sec" INTEGER,
    "tts_audio_url" TEXT,
    "image_url" TEXT,
    "status" TEXT DEFAULT 'ready',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shorts_story_scene_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shorts_story_scene_shorts_story_id_scene_order_key" ON "shorts_story_scene"("shorts_story_id", "scene_order");

-- AddForeignKey
ALTER TABLE "shorts_story_scene" ADD CONSTRAINT "shorts_story_scene_shorts_story_id_fkey" FOREIGN KEY ("shorts_story_id") REFERENCES "shorts_stories"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
