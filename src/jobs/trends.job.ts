import cron from "node-cron";
import { youtubeService } from "../services/youtube.service";
import prisma from "../config/database";
import { VideoData } from "../types/youtube.types";
import { YOUTUBE_CONFIG } from "../config/youtube.config";
import { createLogger } from "../utils/logger.util";

export class TrendsJob {
  private isRunning = false;
  private logger = createLogger("trends-job");

  /**
   * Update trends data in database
   * Collects trending videos for ALL categories with deduplication
   */
  async updateTrendsData(): Promise<void> {
    if (this.isRunning) {
      this.logger.warn("Trends update already in progress, skipping...");
      return;
    }

    this.isRunning = true;
    this.logger.info("Starting category-based trends update...");

    try {
      const regionCode = "KR";
      let totalVideosProcessed = 0;
      let categoriesProcessed = 0;

      // Fetch all categories from database
      const categories = await prisma.category.findMany({
        orderBy: { category_id: 'asc' }
      });

      this.logger.info(`📊 Processing ${categories.length} categories...`);

      // Iterate through each category
      for (const category of categories) {
        try {
          this.logger.info(`🔍 Category: ${category.name_ko} (${category.category_id})`);

          // Fetch trending videos for this category
          const videos = await youtubeService.fetchTrendingVideos(
            regionCode,
            YOUTUBE_CONFIG.MAX_WIDTH,
            YOUTUBE_CONFIG.MAX_HEIGHT,
            category.category_id
          );

          if (videos.length === 0) {
            this.logger.warn(`No videos found for ${category.name_ko}`);
            continue;
          }

          // Save videos with upsert (increment counter if duplicate)
          await this.saveVideosWithCounter(videos);

          totalVideosProcessed += videos.length;
          categoriesProcessed++;
          this.logger.success(`Processed ${videos.length} videos for ${category.name_ko}`);

        } catch (error: any) {
          // Handle 404 errors (category has no trending videos)
          if (error.response?.status === 404 || error.status === 404) {
            this.logger.info(`Category ${category.name_ko} has no trending videos, skipping...`);
            continue;
          }

          // Log other errors but continue processing
          this.logger.error(`Error processing category ${category.name_ko}:`, error);
          continue;
        }
      }

      this.logger.success(`Trends update completed: ${categoriesProcessed}/${categories.length} categories, ${totalVideosProcessed} videos processed`);

    } catch (error) {
      this.logger.error("Error updating trends data:", error);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Save videos to database with trending counter
   * Increments trending_days for existing videos, creates new ones with counter = 1
   */
  private async saveVideosWithCounter(videos: VideoData[]): Promise<void> {
    const now = new Date();

    for (const video of videos) {
      await prisma.video.upsert({
        where: { video_id: video.video_id },

        // UPDATE: Existing video - increment counter and update stats
        update: {
          trending_days: { increment: 1 },  // 트렌딩 카운터 증가
          last_seen_at: now,                // 마지막 등장 시간 갱신
          title: video.title,               // 제목 업데이트 (변경 가능)
          channel_title: video.channel_title,
          thumbnail_url: video.thumbnail_url,
          view_count: video.view_count,     // 최신 조회수
          like_count: video.like_count,
          comment_count: video.comment_count,
          rank: video.rank,                 // 최신 순위
          aspect_ratio: video.aspect_ratio,
          type: video.type,
          // first_seen_at은 그대로 유지 (생성 시에만 설정)
        },

        // CREATE: New video - initialize with counter = 1
        create: {
          video_id: video.video_id,
          title: video.title,
          channel_id: video.channel_id,
          channel_title: video.channel_title,
          thumbnail_url: video.thumbnail_url,
          view_count: video.view_count,
          like_count: video.like_count,
          comment_count: video.comment_count,
          published_at: video.published_at,
          duration: video.duration,
          aspect_ratio: video.aspect_ratio,
          type: video.type,
          category_id: video.category_id,
          region_code: video.region_code,
          rank: video.rank,
          is_ad: video.is_ad,
          trending_days: 1,        // 첫 등장: 카운터 1
          first_seen_at: now,      // 처음 트렌딩에 등장한 시간
          last_seen_at: now,       // 마지막 등장 시간
        },
      });
    }
  }

  /**
   * Cleanup old trending data based on retention period
   * Deletes videos that haven't appeared in trending for N days
   */
  async cleanupOldTrending(): Promise<void> {
    const retentionDays = parseInt(process.env.RETENTION_DAYS || '30');
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - retentionDays);

    this.logger.info(`🗑️  Starting cleanup: removing videos not trending for ${retentionDays} days (cutoff: ${cutoffDate.toISOString()})`);

    try {
      const result = await prisma.video.deleteMany({
        where: {
          last_seen_at: {
            lt: cutoffDate  // 마지막 등장이 N일 이전
          }
        }
      });

      this.logger.success(`Cleaned up ${result.count} old videos`);
    } catch (error) {
      this.logger.error("Error during cleanup:", error);
    }
  }

  /**
   * Start cron jobs
   * - Trends update: Every N minutes (default: 30)
   * - Cleanup: Daily at 3 AM
   */
  start(): void {
    const interval = process.env.TRENDS_UPDATE_INTERVAL || "30";
    const retentionDays = process.env.RETENTION_DAYS || "30";

    this.logger.info(`Initializing trends job system...`);
    this.logger.info(`Log file: ${this.logger.getLogFilePath()}`);

    // Run collection immediately on start
    this.updateTrendsData();

    // Schedule periodic collection (every 30 minutes: */30 * * * *)
    cron.schedule(`*/${interval} * * * *`, () => {
      this.updateTrendsData();
    });

    // Schedule daily cleanup at 3 AM (0 3 * * *)
    cron.schedule('0 3 * * *', () => {
      this.cleanupOldTrending();
    });

    this.logger.success(`Trends update job scheduled: every ${interval} minutes`);
    this.logger.success(`Cleanup job scheduled: daily at 3 AM (${retentionDays}-day retention)`);
  }
}

export const trendsJob = new TrendsJob();
