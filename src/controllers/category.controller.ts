import { Request, Response } from "express";
import { categoryRepository } from "../repositories/category.repository";
import { Category } from "../interfaces/category.interface";

export class CategoryController {
  /**
   * GET /api/category
   * 모든 카테고리 조회
   */
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryRepository.getAllCategories();

      res.json({
        success: true,
        count: categories.length,
        data: categories.map((cat: Category) => ({
          categoryId: cat.category_id,
          nameEn: cat.name_en,
          nameKo: cat.name_ko,
        })),
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({
        error: "Failed to fetch categories",
      });
    }
  }

  /**
   * GET /api/category/with-videos
   * 비디오가 있는 카테고리만 조회
   */
  async getCategoriesWithVideos(req: Request, res: Response): Promise<void> {
    try {
      const categories = await categoryRepository.getCategoriesWithVideos();

      res.json({
        success: true,
        count: categories.length,
        data: categories.map((cat: Category) => ({
          categoryId: cat.category_id,
          nameEn: cat.name_en,
          nameKo: cat.name_ko,
        })),
      });
    } catch (error) {
      console.error("Error fetching categories with videos:", error);
      res.status(500).json({
        error: "Failed to fetch categories with videos",
      });
    }
  }

  /**
   * GET /api/category/:categoryId
   * 특정 카테고리 조회
   */
  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;

      const category = await categoryRepository.getCategoryById(categoryId);

      if (!category) {
        res.status(404).json({
          error: "Category not found",
        });
        return;
      }

      res.json({
        success: true,
        data: {
          categoryId: category.category_id,
          nameEn: category.name_en,
          nameKo: category.name_ko,
        },
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({
        error: "Failed to fetch category",
      });
    }
  }

  /**
   * GET /api/category/:categoryId/videos?page=1&limit=20
   * 카테고리별 비디오 조회 (페이지네이션)
   */
  async getCategoryVideos(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;
      const page = parseInt(req.query.page as string) || 1;
      const limit = parseInt(req.query.limit as string) || 20;

      if (page < 1 || limit < 1 || limit > 100) {
        res.status(400).json({
          error: "Invalid pagination parameters",
        });
        return;
      }

      const result = await categoryRepository.getCategoryVideos(
        categoryId,
        page,
        limit
      );

      res.json({
        success: true,
        data: result.data.map((video) => ({
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
          isAd: video.is_ad,
          trendingDays: video.trending_days,
          firstSeenAt: video.first_seen_at,
          lastSeenAt: video.last_seen_at,
        })),
        pagination: result.pagination,
      });
    } catch (error) {
      console.error("Error fetching category videos:", error);
      res.status(500).json({
        error: "Failed to fetch category videos",
      });
    }
  }
}

export const categoryController = new CategoryController();
