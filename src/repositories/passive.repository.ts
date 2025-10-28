import prisma from "../config/database";
import { Channel, IPassiveRepository } from "../interfaces/passive.interface";

export class PassiveRepository implements IPassiveRepository {
  async createChannelInfo(data: Channel): Promise<void> {
    await prisma.channel.create({
      data,
    });
  }
}

export const passiveRepository = new PassiveRepository();
