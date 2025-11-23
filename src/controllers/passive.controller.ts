import { Request, Response } from "express";
import { PassiveService } from "../services/passive.service";

export class PassiveController {
  private passiveService = new PassiveService();

  async addChannelInfo(req: Request, res: Response): Promise<void> {
    try {
      const { channelId } = req.body;
      await this.passiveService.addChannelInfo(channelId);
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
      await this.passiveService.addVideoTranscript(channelId, videoId);
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

  async getAllVideoTranscript(req: Request, res: Response): Promise<void> {
    try {
      const transcripts = await this.passiveService.getAllVideoTranscript();
      res.json({
        success: true,
        data: transcripts,
      });
    } catch (error) {
      console.error("Error getting all video transcripts:", error);
      res.status(500).json({
        error: "Failed to get all video transcripts",
      });
    }
  }
}

export const passiveController = new PassiveController();
