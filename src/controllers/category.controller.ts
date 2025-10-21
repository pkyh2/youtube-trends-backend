import { Request, Response } from "express";
import prisma from "../config/database";

export class CategoryController {
  /**
   * GET /api/categories
   * 모든 카테고리 조회
   */
  async getAllCategories(req: Request, res: Response): Promise<void> {
    try {
      const categories = await prisma.category.findMany({
        orderBy: { categoryId: "asc" },
        select: {
          categoryId: true,
          name_en: true,
          name_ko: true,
        },
      });

      res.json({
        success: true,
        count: categories.length,
        data: categories,
      });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({
        error: "Failed to fetch categories",
      });
    }
  }

  /**
   * GET /api/categories/:categoryId
   * 특정 카테고리 조회
   */
  async getCategoryById(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;

      const category = await prisma.category.findUnique({
        where: { categoryId },
      });

      if (!category) {
        res.status(404).json({
          error: "Category not found",
        });
        return;
      }

      res.json({
        success: true,
        data: category,
      });
    } catch (error) {
      console.error("Error fetching category:", error);
      res.status(500).json({
        error: "Failed to fetch category",
      });
    }
  }

  /**
   * POST /api/categories
   * 새 카테고리 추가
   * Body: { categoryId: string, name_en: string, name_ko: string }
   */
  async createCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId, name_en, name_ko } = req.body;

      if (!categoryId || !name_en || !name_ko) {
        res.status(400).json({
          error: "Missing required fields: categoryId, name_en, name_ko",
        });
        return;
      }

      const category = await prisma.category.create({
        data: {
          categoryId,
          name_en,
          name_ko,
        },
      });

      res.status(201).json({
        success: true,
        data: category,
      });
    } catch (error: any) {
      console.error("Error creating category:", error);

      if (error.code === "P2002") {
        res.status(409).json({
          error: "Category with this ID already exists",
        });
        return;
      }

      res.status(500).json({
        error: "Failed to create category",
      });
    }
  }

  /**
   * PUT /api/categories/:categoryId
   * 카테고리 업데이트
   * Body: { name_en?: string, name_ko?: string }
   */
  async updateCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;
      const { name_en, name_ko } = req.body;

      const updateData: any = {};
      if (name_en) updateData.name_en = name_en;
      if (name_ko) updateData.name_ko = name_ko;

      if (Object.keys(updateData).length === 0) {
        res.status(400).json({
          error: "No fields to update",
        });
        return;
      }

      const category = await prisma.category.update({
        where: { categoryId },
        data: updateData,
      });

      res.json({
        success: true,
        data: category,
      });
    } catch (error: any) {
      console.error("Error updating category:", error);

      if (error.code === "P2025") {
        res.status(404).json({
          error: "Category not found",
        });
        return;
      }

      res.status(500).json({
        error: "Failed to update category",
      });
    }
  }

  /**
   * DELETE /api/categories/:categoryId
   * 카테고리 삭제
   */
  async deleteCategory(req: Request, res: Response): Promise<void> {
    try {
      const { categoryId } = req.params;

      await prisma.category.delete({
        where: { categoryId },
      });

      res.json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error: any) {
      console.error("Error deleting category:", error);

      if (error.code === "P2025") {
        res.status(404).json({
          error: "Category not found",
        });
        return;
      }

      res.status(500).json({
        error: "Failed to delete category",
      });
    }
  }
}

export const categoryController = new CategoryController();
