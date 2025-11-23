import prisma from "../config/database";
import { IPassiveRepository } from "../interfaces/passive.interface";
import { Channel, Transcript } from "../types/passive.types";

export class PassiveRepository implements IPassiveRepository {
  async createChannelInfo(data: Channel): Promise<void> {
    await prisma.channel.create({
      data,
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
}

export const passiveRepository = new PassiveRepository();
