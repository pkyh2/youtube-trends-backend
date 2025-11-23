import prisma from "../config/database";
import {
  Category,
  CategoryVideo,
  PaginationResult,
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

  /**
   * 비디오가 있는 카테고리만 조회
   */
  async getCategoriesWithVideos(): Promise<Category[]> {
    const categories = await prisma.category.findMany({
      where: {
        videos: {
          some: {},
        },
      },
      orderBy: { category_id: "asc" },
      select: {
        category_id: true,
        name_en: true,
        name_ko: true,
      },
    });

    return categories;
  }

  /**
   * 카테고리별 비디오 조회 (페이지네이션)
   */
  async getCategoryVideos(
    categoryId: string,
    page: number = 1,
    limit: number = 20
  ): Promise<PaginationResult<CategoryVideo>> {
    const skip = (page - 1) * limit;

    const [videos, totalCount] = await Promise.all([
      prisma.video.findMany({
        where: { category_id: categoryId },
        orderBy: { rank: "asc" },
        skip,
        take: limit,
      }),
      prisma.video.count({
        where: { category_id: categoryId },
      }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);
    const hasNextPage = page < totalPages;

    return {
      data: videos as CategoryVideo[],
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        hasNextPage,
      },
    };
  }
}

export const categoryRepository = new CategoryRepository();
