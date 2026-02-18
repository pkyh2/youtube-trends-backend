import { Router } from "express";
import { adminController } from "../controllers/admin.controller";

const router = Router();

// POST /api/admin/shorts-stories
router.post(
  "/shorts-stories",
  adminController.createShortsStory.bind(adminController)
);

// PUT /api/admin/shorts-stories/:id/full-script
router.put(
  "/shorts-stories/:id/full-script",
  adminController.updateShortsStoryFullScript.bind(adminController)
);

export default router;
