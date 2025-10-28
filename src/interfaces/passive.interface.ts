import { Channel, Transcript } from "../types/passive.types";

export interface IPassiveRepository {
  createChannelInfo(data: Channel): Promise<void>;
  createVideoTranscript(data: Transcript): Promise<void>;
}
