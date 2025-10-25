export interface Category {
  category_id: string;
  name_en: string;
  name_ko: string;
}

export interface ICategoryRepository {
  getAllCategories(): Promise<Category[]>;
  getCategoryById(categoryId: string): Promise<Category | null>;
}
