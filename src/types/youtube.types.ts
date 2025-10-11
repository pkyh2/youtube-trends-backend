// YouTube API Types

export interface VideoData {
  videoId: string;
  title: string;
  channelTitle: string;
  thumbnailUrl: string;
  viewCount: bigint;
  publishedAt: Date;
  duration: number; // in seconds
  aspectRatio: string; // "9:16" or "16:9"
  type: 'shorts' | 'long';
  categoryId: string;
  regionCode: string;
  rank: number;
}

export interface YouTubeVideo {
  id: string;
  snippet: {
    title: string;
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
  };
  contentDetails: {
    duration: string; // ISO 8601 format (PT1M30S)
    dimension: string; // "2d" or "3d"
  };
}

export type VideoType = 'shorts' | 'long';
