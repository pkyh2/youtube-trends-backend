import { Request, Response } from "express";
import prisma from "../config/database";
import { VideoType } from "../types/youtube.types";

export class TrendsController {
  /**
   * GET /api/trends/popular?type=shorts|long&regionCode=KR
   */
  async getPopularVideos(req: Request, res: Response): Promise<void> {
    try {
      const type = req.query.type as VideoType | undefined;
      const regionCode = (req.query.regionCode as string) || "KR";

      if (type && type !== "shorts" && type !== "long") {
        res.status(400).json({
          error: 'Invalid type parameter. Must be "shorts" or "long"',
        });
        return;
      }

      const whereClause: any = { region_code: regionCode };
      if (type) {
        whereClause.type = type;
      }

      const videos = await prisma.video.findMany({
        where: whereClause,
        orderBy: { rank: "asc" },
        take: 10,
      });

      res.json({
        success: true,
        count: videos.length,
        data: videos.map((video) => ({
          videoId: video.video_id,
          title: video.title,
          channelTitle: video.channel_title,
          thumbnailUrl: video.thumbnail_url,
          viewCount: video.view_count.toString(),
          likeCount: video.like_count.toString(),
          commentCount: video.comment_count.toString(),
          publishedAt: video.published_at,
          duration: video.duration,
          aspectRatio: video.aspect_ratio,
          type: video.type,
          categoryId: video.category_id,
          rank: video.rank,
        })),
      });
    } catch (error) {
      console.error("Error fetching popular videos:", error);
      res.status(500).json({
        error: "Failed to fetch popular videos",
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
      const regionCode = (req.query.regionCode as string) || "KR";

      if (type && type !== "shorts" && type !== "long") {
        res.status(400).json({
          error: 'Invalid type parameter. Must be "shorts" or "long"',
        });
        return;
      }

      const whereClause: any = {
        category_id: categoryId,
        region_code: regionCode,
      };

      if (type) {
        whereClause.type = type;
      }

      const videos = await prisma.video.findMany({
        where: whereClause,
        orderBy: { rank: "asc" },
        take: 10,
      });

      res.json({
        success: true,
        count: videos.length,
        categoryId,
        data: videos.map((video) => ({
          videoId: video.video_id,
          title: video.title,
          channelTitle: video.channel_title,
          thumbnailUrl: video.thumbnail_url,
          viewCount: video.view_count.toString(),
          likeCount: video.like_count.toString(),
          commentCount: video.comment_count.toString(),
          publishedAt: video.published_at,
          duration: video.duration,
          aspectRatio: video.aspect_ratio,
          type: video.type,
          categoryId: video.category_id,
          rank: video.rank,
        })),
      });
    } catch (error) {
      console.error("Error fetching videos by category:", error);
      res.status(500).json({
        error: "Failed to fetch videos by category",
      });
    }
  }
}

export const trendsController = new TrendsController();
