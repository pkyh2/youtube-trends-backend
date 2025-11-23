import { Router } from "express";
import { categoryController } from "../controllers/category.controller";

const router = Router();

// GET /api/category/
router.get("/", categoryController.getAllCategories.bind(categoryController));

// GET /api/category/with-videos
router.get(
  "/with-videos",
  categoryController.getCategoriesWithVideos.bind(categoryController)
);

// GET /api/category/:categoryId/videos
router.get(
  "/:categoryId/videos",
  categoryController.getCategoryVideos.bind(categoryController)
);

// GET /api/category/:categoryId
router.get(
  "/:categoryId",
  categoryController.getCategoryById.bind(categoryController)
);

export default router;
