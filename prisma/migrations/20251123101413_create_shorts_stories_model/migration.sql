-- CreateTable
CREATE TABLE "shorts_story_templates" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "tags" TEXT,
    "hook" TEXT NOT NULL,
    "background" TEXT NOT NULL,
    "problem" TEXT NOT NULL,
    "escalation" TEXT NOT NULL,
    "twist" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "ending" TEXT NOT NULL,
    "title_template" TEXT NOT NULL,
    "hashtags" TEXT,
    "target_length_sec" INTEGER DEFAULT 60,
    "tts_voice_profile" TEXT DEFAULT 'neutral',
    "prompt_main" TEXT NOT NULL,
    "prompt_background" TEXT,
    "prompt_problem" TEXT,
    "prompt_twist" TEXT,
    "prompt_explanation" TEXT,
    "prompt_ending" TEXT,
    "is_active" BOOLEAN DEFAULT true,
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT DEFAULT 'ready',
    "is_processing" BOOLEAN DEFAULT false,

    CONSTRAINT "shorts_story_templates_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shorts_stories" (
    "id" SERIAL NOT NULL,
    "category" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "full_script" TEXT NOT NULL,
    "status" TEXT DEFAULT 'ready',
    "is_processing" BOOLEAN DEFAULT false,
    "target_length_sec" INTEGER DEFAULT 45,
    "tts_voice_profile" TEXT DEFAULT 'neutral',
    "hashtags" TEXT,
    "prompt_style" TEXT DEFAULT 'comic',
    "safety_level" TEXT DEFAULT 'normal',
    "created_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "shorts_stories_pkey" PRIMARY KEY ("id")
);
