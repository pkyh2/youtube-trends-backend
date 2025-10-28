import { Router } from "express";
import { passiveController } from "../controllers/passive.controller";

const router = Router();

// GET /api/passive/channels
router.post("/channel", (req, res) =>
  passiveController.addChannelInfo(req, res)
);
export default router;
