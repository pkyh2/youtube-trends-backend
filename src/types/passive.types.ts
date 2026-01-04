export interface Channel {
  channel_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  view_count: number;
  subscriber_count: number;
  video_count: number;
  published_at: Date;
}

export interface Transcript {
  channel_id: string;
  video_id: string;
  transcript: string | null;
}

export interface ShortsStoryVoice {
  speaker_key: string;
  voice_name: string;
  tts_provider: string;
}
