import prisma from "../config/database";
import { IPassiveRepository } from "../interfaces/passive.interface";
import { Channel, ShortsStoryVoice, Transcript } from "../types/passive.types";

export class PassiveRepository implements IPassiveRepository {
  async upsertChannelInfo(data: Channel): Promise<void> {
    await prisma.channel.upsert({
      where: {
        channel_id: data.channel_id,
      },
      create: data,
      update: {
        title: data.title,
        description: data.description,
        thumbnail_url: data.thumbnail_url,
        view_count: data.view_count,
        subscriber_count: data.subscriber_count,
        video_count: data.video_count,
        published_at: data.published_at,
      },
    });
  }
  async createVideoTranscript(data: Transcript): Promise<void> {
    await prisma.transcript.create({
      data,
    });
  }
  async getAllVideoTranscript(): Promise<Transcript[]> {
    return await prisma.transcript.findMany();
  }
  async createVideoVoice(data: ShortsStoryVoice): Promise<void> {
    await prisma.shortsStoryVoice.create({
      data,
    });
  }
}

export const passiveRepository = new PassiveRepository();
