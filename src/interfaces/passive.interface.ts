export interface Channel {
  channel_id: string;
  title: string;
  description: string;
  thumbnail_url: string;
  view_count: number;
  subscriber_count: number;
  video_count: number;
  published_at: Date;
}

export interface IPassiveRepository {
  createChannelInfo(data: Channel): Promise<void>;
}
