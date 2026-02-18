export interface ShortsStoryFullScriptUpdateResult {
  id: number;
  full_script: string;
  updated_at: Date | null;
}

export interface CreateShortsStoryInput {
  fullScript: string;
  title?: string;
  category?: string;
}

export interface ShortsStoryCreateResult {
  id: number;
  category: string;
  title: string;
  full_script: string;
  status: string;
  created_at: Date | null;
  updated_at: Date | null;
}
