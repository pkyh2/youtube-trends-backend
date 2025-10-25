import { Router } from "express";
import { categoryController } from "../controllers/category.controller";

const router = Router();

// GET /api/category/
router.get("/", categoryController.getAllCategories);

// GET /api/category/:categoryId
router.get("/:categoryId", categoryController.getCategoryById);
export default router;
