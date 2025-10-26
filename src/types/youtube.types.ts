// YouTube API Types

export interface VideoData {
  video_id: string;
  title: string;
  channel_id: string;
  channel_title: string;
  thumbnail_url: string;
  view_count: bigint;
  like_count: bigint;
  comment_count: bigint;
  published_at: Date;
  duration: number;
  aspect_ratio: string;
  type: VideoType;
  category_id: string;
  is_ad: boolean;
  region_code: string;
  rank: number;
  // Optional: only present when creating new records
  trending_days?: number;
  first_seen_at?: Date;
  last_seen_at?: Date;
}

export interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
    channelId: string;
    channelTitle: string;
    publishedAt: string;
    thumbnails: {
      high: {
        url: string;
      };
    };
    categoryId: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    commentCount: string;
  };
  contentDetails: {
    duration: string; // ISO 8601 format (PT1M30S)
    dimension: string; // "2d" or "3d"
  };
  paidProductPlacementDetails: {
    hasPaidProductPlacement: boolean;
  };
  player: {
    embedHtml: string;
    embedHeight: number;
    embedWidth: number;
  };
}

export type VideoType = "shorts" | "long";
