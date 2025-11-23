export interface Category {
  category_id: string;
  name_en: string;
  name_ko: string;
}

export interface CategoryVideo {
  video_id: string;
  title: string;
  channel_title: string;
  thumbnail_url: string;
  view_count: bigint;
  like_count: bigint;
  comment_count: bigint;
  published_at: Date;
  duration: string;
  aspect_ratio: string;
  type: string;
  category_id: string;
  rank: number;
  is_ad: boolean;
  trending_days: number;
  first_seen_at: Date;
  last_seen_at: Date;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
  };
}

export interface ICategoryRepository {
  getAllCategories(): Promise<Category[]>;
  getCategoryById(categoryId: string): Promise<Category | null>;
  getCategoriesWithVideos(): Promise<Category[]>;
  getCategoryVideos(
    categoryId: string,
    page: number,
    limit: number
  ): Promise<PaginationResult<CategoryVideo>>;
}
