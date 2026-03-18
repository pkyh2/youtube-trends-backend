import { Channel, ShortsStoryVoice, Transcript } from "../types/passive.types";

export interface IPassiveRepository {
  upsertChannelInfo(data: Channel): Promise<void>;
  createVideoTranscript(data: Transcript): Promise<void>;
  getAllVideoTranscript(): Promise<Transcript[]>;
  createVideoVoice(data: ShortsStoryVoice): Promise<void>;
}
