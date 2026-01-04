import { Router } from "express";
import { passiveController } from "../controllers/passive.controller";

const router = Router();

// GET /api/passive/channels
router.post("/channel", (req, res) =>
  passiveController.addChannelInfo(req, res)
);

router.post("/video/transcript", (req, res) =>
  passiveController.addVideoTranscript(req, res)
);

router.get("/video/transcript", (req, res) =>
  passiveController.getAllVideoTranscript(req, res)
);

router.post("/video/voice", (req, res) =>
  passiveController.addVideoVoice(req, res)
);
export default router;
