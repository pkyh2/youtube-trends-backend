import { Request, Response } from "express";
import { categoryRepository } from "../repositories/category.repository";
import { Category } from "../interfaces/category.interface";

export class CategoryController {
  /**
   * GET /api/categories
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
   * GET /api/categories/:categoryId
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
}

export const categoryController = new CategoryController();
