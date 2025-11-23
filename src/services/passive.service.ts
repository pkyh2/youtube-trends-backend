import { passiveRepository } from "../repositories/passive.repository";
import { createLogger } from "../utils/logger.util";
import { youtubeService } from "./youtube.service";
import { supadataService } from "./supadata.service";

export class PassiveService {
  private logger = createLogger("passive-service");

  async addChannelInfo(channelId: string): Promise<void> {
    const channelInfo = await youtubeService.getChannelInfo(channelId);
    await passiveRepository.createChannelInfo({
      channel_id: channelId,
      title: channelInfo[0].snippet.title,
      description: channelInfo[0].snippet.description,
      thumbnail_url: channelInfo[0].snippet.thumbnails.default.url,
      view_count: channelInfo[0].statistics.viewCount,
      subscriber_count: channelInfo[0].statistics.subscriberCount,
      video_count: channelInfo[0].statistics.videoCount,
      published_at: channelInfo[0].snippet.publishedAt,
    });
  }

  async addVideoTranscript(channelId: string, videoId: string): Promise<void> {
    const transcriptResult = await supadataService.getTranscript(videoId);
    await passiveRepository.createVideoTranscript({
      channel_id: channelId,
      video_id: videoId,
      transcript: transcriptResult.content,
    });
  }

  async getAllVideoTranscript(): Promise<string[]> {
    const transcriptData = await passiveRepository.getAllVideoTranscript();
    const transcripts = transcriptData.map((item) => item.transcript);
    return transcripts as string[];
  }
}
