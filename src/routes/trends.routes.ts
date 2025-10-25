import { Router } from "express";
import { trendsController } from "../controllers/trends.controller";

const router = Router();

// GET /api/trends/popular?type=shorts|long&regionCode=KR
router.get("/popular", (req, res) =>
  trendsController.getPopularVideos(req, res)
);
export default router;
