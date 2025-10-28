import { Request, Response } from "express";
import { youtubeService } from "../services/youtube.service";
import { YOUTUBE_CONFIG } from "../config/youtube.config";
import { supadataService } from "../services/supadata.service";

export class TestController {
  /**
   * GET /api/test/test1
   */
  async getTest1(req: Request, res: Response): Promise<void> {
    try {
      // const result = await youtubeService.getMostPopularVideo(
      //   YOUTUBE_CONFIG.DEFAULT_REGION
      // );

      // const result = await youtubeService.getCaptions();
      // const result = await supadataService.getTranscript();
      const result = await youtubeService.getChannelSection();
      // const result = await youtubeService.getChannelInfo();
      // const result = await youtubeService.getPlaylists();

      res.json({
        success: true,
        data: result,
      });
    } catch (error) {
      console.error("Error fetching popular videos:", error);
      res.status(500).json({
        error: "Failed to fetch popular videos",
      });
    }
  }
}

export const testController = new TestController();
