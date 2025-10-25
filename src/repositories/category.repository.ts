import prisma from "../config/database";
import {
  Category,
  ICategoryRepository,
} from "../interfaces/category.interface";

export class CategoryRepository implements ICategoryRepository {
  async getAllCategories(): Promise<Category[]> {
    return prisma.category.findMany({
      orderBy: { category_id: "asc" },
      select: {
        category_id: true,
        name_en: true,
        name_ko: true,
      },
    });
  }

  async getCategoryById(categoryId: string): Promise<Category | null> {
    return prisma.category.findUnique({
      where: { category_id: categoryId },
      select: {
        category_id: true,
        name_en: true,
        name_ko: true,
      },
    });
  }
}

export const categoryRepository = new CategoryRepository();
