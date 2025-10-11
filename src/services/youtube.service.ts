import { youtube, YOUTUBE_CONFIG } from '../config/youtube.config';
import { VideoData, YouTubeVideo, VideoType } from '../types/youtube.types';
import { parseISO8601Duration, estimateAspectRatio } from '../utils/duration.util';

export class YouTubeService {
  /**
   * Fetch trending videos from YouTube API
   */
  async fetchTrendingVideos(
    regionCode: string = YOUTUBE_CONFIG.DEFAULT_REGION,
    categoryId?: string
  ): Promise<VideoData[]> {
    try {
      // Step 1: Get most popular videos
      const response = await youtube.videos.list({
        part: ['snippet', 'statistics', 'contentDetails'],
        chart: 'mostPopular',
        regionCode,
        maxResults: YOUTUBE_CONFIG.MAX_RESULTS,
        videoCategoryId: categoryId,
      });

      if (!response.data.items) {
        return [];
      }

      // Step 2: Process and filter videos
      const videos: VideoData[] = [];

      for (let i = 0; i < response.data.items.length; i++) {
        const item = response.data.items[i] as YouTubeVideo;

        if (!item.id || !item.snippet || !item.statistics || !item.contentDetails) {
          continue;
        }

        const duration = parseISO8601Duration(item.contentDetails.duration);
        const aspectRatio = estimateAspectRatio(item.contentDetails.dimension, duration);
        const type = this.determineVideoType(duration, aspectRatio);

        const videoData: VideoData = {
          videoId: item.id,
          title: item.snippet.title,
          channelTitle: item.snippet.channelTitle,
          thumbnailUrl: item.snippet.thumbnails.high.url,
          viewCount: BigInt(item.statistics.viewCount || '0'),
          publishedAt: new Date(item.snippet.publishedAt),
          duration,
          aspectRatio,
          type,
          categoryId: item.snippet.categoryId,
          regionCode,
          rank: i + 1, // Rank based on position in trending list
        };

        videos.push(videoData);
      }

      return videos;
    } catch (error) {
      console.error('Error fetching trending videos:', error);
      throw new Error('Failed to fetch trending videos from YouTube API');
    }
  }

  /**
   * Fetch trending videos by category
   */
  async fetchTrendingByCategory(
    categoryId: string,
    regionCode: string = YOUTUBE_CONFIG.DEFAULT_REGION
  ): Promise<VideoData[]> {
    return this.fetchTrendingVideos(regionCode, categoryId);
  }

  /**
   * Determine video type (shorts or long-form)
   * Shorts: duration <= 180s AND aspectRatio is 9:16
   */
  private determineVideoType(duration: number, aspectRatio: string): VideoType {
    if (duration <= YOUTUBE_CONFIG.SHORTS_MAX_DURATION && aspectRatio === YOUTUBE_CONFIG.SHORTS_ASPECT_RATIO) {
      return 'shorts';
    }
    return 'long';
  }

  /**
   * Filter videos by type
   */
  filterByType(videos: VideoData[], type: VideoType): VideoData[] {
    return videos.filter(video => video.type === type);
  }

  /**
   * Get top N videos
   */
  getTopVideos(videos: VideoData[], limit: number = 10): VideoData[] {
    return videos.slice(0, limit);
  }
}

export const youtubeService = new YouTubeService();
