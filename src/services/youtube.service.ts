import { youtube, YOUTUBE_CONFIG } from '../config/youtube.config';
import { VideoData, YouTubeVideo, VideoType } from '../types/youtube.types';
import { parseISO8601Duration } from '../utils/duration.util';

export class YouTubeService {
  /**
   * Check if a video is a YouTube Short by testing the /shorts/ URL
   * Returns true if status is 200 (Short), false if 303 (regular video)
   */
  private async checkIfShort(videoId: string): Promise<boolean> {
    try {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 3000); // 3 second timeout

      const response = await fetch(`https://www.youtube.com/shorts/${videoId}`, {
        method: 'HEAD',
        redirect: 'manual', // Don't follow redirects
        signal: controller.signal,
      });

      clearTimeout(timeout);

      // 200 = Short, 303 = Regular video (redirects to /watch)
      return response.status === 200;
    } catch (error) {
      console.warn(`Failed to check if ${videoId} is short:`, error);
      return false; // Default to regular video on error
    }
  }

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

      // Step 2: Check all videos for Shorts status in parallel
      const videoPromises = response.data.items.map(async (item, i) => {
        const typedItem = item as YouTubeVideo;

        if (!typedItem.id || !typedItem.snippet || !typedItem.statistics || !typedItem.contentDetails) {
          return null;
        }

        const duration = parseISO8601Duration(typedItem.contentDetails.duration);

        // Check if video is a Short using HTTP status code method
        const isShort = await this.checkIfShort(typedItem.id);
        const type: VideoType = isShort ? 'shorts' : 'long';
        const aspectRatio = isShort ? '9:16' : '16:9';

        const videoData: VideoData = {
          videoId: typedItem.id,
          title: typedItem.snippet.title,
          channelTitle: typedItem.snippet.channelTitle,
          thumbnailUrl: typedItem.snippet.thumbnails.high.url,
          viewCount: BigInt(typedItem.statistics.viewCount || '0'),
          publishedAt: new Date(typedItem.snippet.publishedAt),
          duration,
          aspectRatio,
          type,
          categoryId: typedItem.snippet.categoryId,
          regionCode,
          rank: i + 1, // Rank based on position in trending list
        };

        return videoData;
      });

      // Wait for all parallel checks to complete
      const allVideos = await Promise.all(videoPromises);

      // Filter out null entries
      const videos = allVideos.filter((video): video is VideoData => video !== null);

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
