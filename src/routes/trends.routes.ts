import { Router } from 'express';
import { trendsController } from '../controllers/trends.controller';

const router = Router();

// GET /api/trends/popular?type=shorts|long&regionCode=KR
router.get('/popular', (req, res) => trendsController.getPopularVideos(req, res));

// GET /api/trends/category/:categoryId?type=shorts|long&regionCode=KR
router.get('/category/:categoryId', (req, res) => trendsController.getVideosByCategory(req, res));

// GET /api/trends/categories
router.get('/categories', (req, res) => trendsController.getCategories(req, res));

export default router;
