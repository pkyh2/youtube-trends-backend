import cron from 'node-cron';
import { youtubeService } from '../services/youtube.service';
import prisma from '../config/database';
import { VideoData } from '../types/youtube.types';

export class TrendsJob {
  private isRunning = false;

  /**
   * Update trends data in database
   */
  async updateTrendsData(): Promise<void> {
    if (this.isRunning) {
      console.log('Trends update already in progress, skipping...');
      return;
    }

    this.isRunning = true;
    console.log(`[${new Date().toISOString()}] Starting trends update...`);

    try {
      const regionCode = 'KR';

      // Fetch all trending videos
      const allVideos = await youtubeService.fetchTrendingVideos(regionCode);

      // Separate shorts and long-form videos
      const shorts = youtubeService.filterByType(allVideos, 'shorts');
      const longForm = youtubeService.filterByType(allVideos, 'long');

      // Get top 10 of each type
      const topShorts = youtubeService.getTopVideos(shorts, 10);
      const topLongForm = youtubeService.getTopVideos(longForm, 10);

      const videosToSave = [...topShorts, ...topLongForm];

      // Delete old trending data (keep only latest)
      await prisma.video.deleteMany({
        where: {
          regionCode,
        },
      });

      // Save new trending data
      await this.saveVideos(videosToSave);

      console.log(`[${new Date().toISOString()}] Trends update completed: ${videosToSave.length} videos saved`);
    } catch (error) {
      console.error('Error updating trends data:', error);
    } finally {
      this.isRunning = false;
    }
  }

  /**
   * Save videos to database
   */
  private async saveVideos(videos: VideoData[]): Promise<void> {
    for (const video of videos) {
      await prisma.video.upsert({
        where: { videoId: video.videoId },
        update: {
          title: video.title,
          channelTitle: video.channelTitle,
          thumbnailUrl: video.thumbnailUrl,
          viewCount: video.viewCount,
          publishedAt: video.publishedAt,
          duration: video.duration,
          aspectRatio: video.aspectRatio,
          type: video.type,
          categoryId: video.categoryId,
          regionCode: video.regionCode,
          rank: video.rank,
        },
        create: {
          videoId: video.videoId,
          title: video.title,
          channelTitle: video.channelTitle,
          thumbnailUrl: video.thumbnailUrl,
          viewCount: video.viewCount,
          publishedAt: video.publishedAt,
          duration: video.duration,
          aspectRatio: video.aspectRatio,
          type: video.type,
          categoryId: video.categoryId,
          regionCode: video.regionCode,
          rank: video.rank,
        },
      });
    }
  }

  /**
   * Start cron job (every 30 minutes)
   */
  start(): void {
    const interval = process.env.TRENDS_UPDATE_INTERVAL || '30';

    // Run immediately on start
    this.updateTrendsData();

    // Schedule periodic updates (every 30 minutes: */30 * * * *)
    cron.schedule(`*/${interval} * * * *`, () => {
      this.updateTrendsData();
    });

    console.log(`Trends update job scheduled: every ${interval} minutes`);
  }
}

export const trendsJob = new TrendsJob();
