import {
  youtube,
  youtubeAnalytics,
  YOUTUBE_CONFIG,
} from "../config/youtube.config";
import { VideoData, YouTubeVideo, VideoType } from "../types/youtube.types";
import { parseISO8601Duration } from "../utils/duration.util";
import { createLogger } from "../utils/logger.util";

export class YouTubeService {
  private logger = createLogger("youtube-service");

  async getLanguages(): Promise<any> {
    const response = await youtube.i18nRegions.list({
      part: ["snippet"],
      hl: "ko",
    });
    return response.data.items;
  }

  async getMostPopularVideos(
    regionCode: string = YOUTUBE_CONFIG.DEFAULT_REGION
  ): Promise<any> {
    const response = await youtube.videos.list({
      part: ["snippet", "statistics", "contentDetails"],
      chart: "mostPopular",
      regionCode: regionCode,
      maxResults: YOUTUBE_CONFIG.MAX_RESULTS,
    });
    console.log(response.data.items?.length ?? 0);
    console.log(response.data);
    const videos = response.data.items?.map((item) => {
      return item.snippet?.title ?? "";
    });
    return videos;
  }

  async getMostPopularVideo(
    regionCode: string = YOUTUBE_CONFIG.DEFAULT_REGION
  ): Promise<any> {
    const response = await youtube.videos.list({
      part: [
        "snippet",
        "statistics",
        "contentDetails",
        "player",
        "status",
        "paidProductPlacementDetails",
        "topicDetails",
        "recordingDetails",
      ],
      chart: "mostPopular",
      regionCode: regionCode,
      maxResults: YOUTUBE_CONFIG.MAX_RESULTS,
      videoCategoryId: "27",
      maxWidth: 1280,
      maxHeight: 720,
    });

    const contentTitles = response.data.items?.map((item) => {
      return {
        title: item.snippet?.title ?? "",
        statistics: item.statistics,
      };
    });
    console.log(contentTitles?.length ?? 0);
    return response.data;
  }

  async getCategories(
    regionCode: string = YOUTUBE_CONFIG.DEFAULT_REGION
  ): Promise<any> {
    const response_ko = await youtube.videoCategories.list({
      part: ["snippet"],
      hl: "ko",
      regionCode: regionCode,
    });
    const categories_ko = response_ko.data.items?.map((item) => {
      return {
        id: item.id,
        name_ko: item.snippet?.title ?? "",
      };
    });

    const response_en = await youtube.videoCategories.list({
      part: ["snippet"],
      hl: "en",
      regionCode: regionCode,
    });

    const categories_en = response_en.data.items?.map((item) => {
      return {
        id: item.id,
        name_en: item.snippet?.title ?? "",
      };
    });

    // 한국어와 영어 카테고리를 ID 기준으로 병합
    const categoryMap = new Map<string, any>();

    // 한국어 데이터 추가
    categories_ko?.forEach((cat) => {
      if (cat.id) {
        categoryMap.set(cat.id, {
          categoryId: cat.id,
          name_ko: cat.name_ko,
        });
      }
    });

    // 영어 데이터 병합
    categories_en?.forEach((cat) => {
      if (cat.id) {
        const existing = categoryMap.get(cat.id);
        if (existing) {
          existing.name_en = cat.name_en;
        } else {
          categoryMap.set(cat.id, {
            categoryId: cat.id,
            name_en: cat.name_en,
          });
        }
      }
    });

    // Map을 배열로 변환
    const categories = Array.from(categoryMap.values());
    return categories;
  }

  /**
   * Check if a video is a YouTube Short by testing the /shorts/ URL
   * Returns true if status is 200 (Short), false if 303 (regular video)
   */
  private async checkIfShort(
    player: {
      embedWidth: string | null | undefined;
      embedHeight: string | null | undefined;
    },
    duration: number
  ): Promise<boolean> {
    try {
      /**
       * 아래 조건을 만족 하면 숏츠영상으로 판단
       * 1. duration < 180 seconds
       * 2. player.embedWidth : player.embedHeight = 9:16
       */
      if (
        duration > 180 ||
        Number(player.embedWidth ?? 0) / Number(player.embedHeight ?? 0) !==
          9 / 16
      ) {
        return false;
      }
      return true;
    } catch (error) {
      this.logger.warn(`Failed to check if video is short:`, error);
      return false;
    }
  }

  /**
   * Fetch trending videos from YouTube API
   */
  async fetchTrendingVideos(
    regionCode: string = YOUTUBE_CONFIG.DEFAULT_REGION,
    maxWidth: number = YOUTUBE_CONFIG.MAX_WIDTH,
    maxHeight: number = YOUTUBE_CONFIG.MAX_HEIGHT,
    categoryId?: string
  ): Promise<VideoData[]> {
    try {
      // Step 1: Get most popular videos
      const response = await youtube.videos.list({
        part: [
          "snippet",
          "statistics",
          "contentDetails",
          "player",
          "paidProductPlacementDetails",
        ],
        chart: "mostPopular",
        regionCode,
        maxResults: YOUTUBE_CONFIG.MAX_RESULTS,
        videoCategoryId: categoryId,
        maxWidth,
        maxHeight,
      });

      if (!response.data.items) {
        return [];
      }

      // Step 2: Check all videos for Shorts status in parallel
      const videoPromises = response.data.items.map(async (item, i) => {
        const typedItem = item as YouTubeVideo;

        if (
          !typedItem.id ||
          !typedItem.snippet ||
          !typedItem.statistics ||
          !typedItem.contentDetails ||
          !typedItem.player ||
          !typedItem.paidProductPlacementDetails
        ) {
          return null;
        }

        const duration = parseISO8601Duration(
          typedItem.contentDetails.duration
        );

        // Check if video is a Short using HTTP status code method
        const isShort = await this.checkIfShort(typedItem.player, duration);
        const type: VideoType = isShort ? "shorts" : "long";
        const aspect_ratio = isShort ? "9:16" : "16:9";

        const videoData: VideoData = {
          video_id: typedItem.id,
          title: typedItem.snippet.title,
          channel_id: typedItem.snippet.channelId,
          channel_title: typedItem.snippet.channelTitle,
          thumbnail_url: typedItem.snippet.thumbnails.high.url,
          view_count: BigInt(typedItem.statistics.viewCount || "0"),
          like_count: BigInt(typedItem.statistics.likeCount || "0"),
          comment_count: BigInt(typedItem.statistics.commentCount || "0"),
          published_at: new Date(typedItem.snippet.publishedAt),
          duration,
          aspect_ratio: aspect_ratio,
          type: type,
          category_id: typedItem.snippet.categoryId,
          region_code: regionCode,
          is_ad: typedItem.paidProductPlacementDetails.hasPaidProductPlacement,
          rank: i + 1, // Rank based on position in trending list
        };

        return videoData;
      });

      // Wait for all parallel checks to complete
      const allVideos = await Promise.all(videoPromises);

      // Filter out null entries
      const videos = allVideos.filter(
        (video): video is VideoData => video !== null
      );

      return videos;
    } catch (error) {
      this.logger.error("Error fetching trending videos:", error);
      throw error;
    }
  }

  /**
   * Fetch trending videos by category
   */
  async fetchTrendingByCategory(
    categoryId: string,
    regionCode: string = YOUTUBE_CONFIG.DEFAULT_REGION
  ): Promise<VideoData[]> {
    return this.fetchTrendingVideos(
      regionCode,
      YOUTUBE_CONFIG.MAX_WIDTH,
      YOUTUBE_CONFIG.MAX_HEIGHT,
      categoryId
    );
  }

  /**
   * Filter videos by type
   */
  filterByType(videos: VideoData[], type: VideoType): VideoData[] {
    return videos.filter((video) => video.type === type);
  }

  /**
   * Get top N videos
   */
  getTopVideos(videos: VideoData[], limit: number = 10): VideoData[] {
    return videos.slice(0, limit);
  }
}

export const youtubeService = new YouTubeService();
