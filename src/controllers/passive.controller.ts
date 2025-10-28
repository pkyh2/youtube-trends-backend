import { Request, Response } from "express";
import { passiveService } from "../services/passive.service";

export class PassiveController {
  async addChannelInfo(req: Request, res: Response): Promise<void> {
    try {
      const { channelId } = req.body;
      await passiveService.addChannelInfo(channelId);
      res.json({
        success: true,
        data: "Channel info added successfully",
      });
    } catch (error) {
      console.error("Error adding channel info:", error);
      res.status(500).json({
        error: "Failed to add channel info",
      });
    }
  }

  async addVideoTranscript(req: Request, res: Response): Promise<void> {
    try {
      const { channelId, videoId } = req.body;
      await passiveService.addVideoTranscript(channelId, videoId);
      res.json({
        success: true,
        data: "Video transcript added successfully",
      });
    } catch (error) {
      console.error("Error adding video transcript:", error);
      res.status(500).json({
        error: "Failed to add video transcript",
      });
    }
  }
}

export const passiveController = new PassiveController();
