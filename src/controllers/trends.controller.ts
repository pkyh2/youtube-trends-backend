import { Request, Response } from 'express';
import prisma from '../config/database';
import { VideoType } from '../types/youtube.types';

export class TrendsController {
  /**
   * GET /api/trends/popular?type=shorts|long&regionCode=KR
   */
  async getPopularVideos(req: Request, res: Response): Promise<void> {
    try {
      const type = req.query.type as VideoType | undefined;
      const regionCode = (req.query.regionCode as string) || 'KR';

      if (type && type !== 'shorts' && type !== 'long') {
        res.status(400).json({
          error: 'Invalid type parameter. Must be "shorts" or "long"',
        });
        return;
      }

      const whereClause: any = { regionCode };
      if (type) {
        whereClause.type = type;
      }

      const videos = await prisma.video.findMany({
        where: whereClause,
        orderBy: { rank: 'asc' },
        take: 10,
      });

      res.json({
        success: true,
        count: videos.length,
        data: videos.map(video => ({
          videoId: video.videoId,
          title: video.title,
          channelTitle: video.channelTitle,
          thumbnailUrl: video.thumbnailUrl,
          viewCount: video.viewCount.toString(),
          publishedAt: video.publishedAt,
          duration: video.duration,
          type: video.type,
          rank: video.rank,
        })),
      });
    } catch (error) {
      console.error('Error fetching popular videos:', error);
      res.status(500).json({
        error: 'Failed to fetch popular videos',
      });
    }
  }

  /**
   * GET /api/trends/category/:categoryId?type=shorts|long&regionCode=KR
   */
  async getVideosByCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;
      const type = req.query.type as VideoType | undefined;
      const regionCode = (req.query.regionCode as string) || 'KR';

      if (type && type !== 'shorts' && type !== 'long') {
        res.status(400).json({
          error: 'Invalid type parameter. Must be "shorts" or "long"',
        });
        return;
      }

      const whereClause: any = {
        categoryId,
        regionCode,
      };

      if (type) {
        whereClause.type = type;
      }

      const videos = await prisma.video.findMany({
        where: whereClause,
        orderBy: { rank: 'asc' },
        take: 10,
      });

      res.json({
        success: true,
        count: videos.length,
        categoryId,
        data: videos.map(video => ({
          videoId: video.videoId,
          title: video.title,
          channelTitle: video.channelTitle,
          thumbnailUrl: video.thumbnailUrl,
          viewCount: video.viewCount.toString(),
          publishedAt: video.publishedAt,
          duration: video.duration,
          type: video.type,
          rank: video.rank,
        })),
      });
    } catch (error) {
      console.error('Error fetching videos by category:', error);
      res.status(500).json({
        error: 'Failed to fetch videos by category',
      });
    }
  }

  /**
   * GET /api/trends/categories
   */
  async getCategories(req: Request, res: Response): Promise<void> {
    try {
      // YouTube video categories (commonly used)
      const categories = [
        { id: '1', name: 'Film & Animation' },
        { id: '2', name: 'Autos & Vehicles' },
        { id: '10', name: 'Music' },
        { id: '15', name: 'Pets & Animals' },
        { id: '17', name: 'Sports' },
        { id: '19', name: 'Travel & Events' },
        { id: '20', name: 'Gaming' },
        { id: '22', name: 'People & Blogs' },
        { id: '23', name: 'Comedy' },
        { id: '24', name: 'Entertainment' },
        { id: '25', name: 'News & Politics' },
        { id: '26', name: 'Howto & Style' },
        { id: '27', name: 'Education' },
        { id: '28', name: 'Science & Technology' },
      ];

      res.json({
        success: true,
        count: categories.length,
        data: categories,
      });
    } catch (error) {
      console.error('Error fetching categories:', error);
      res.status(500).json({
        error: 'Failed to fetch categories',
      });
    }
  }
}

export const trendsController = new TrendsController();
