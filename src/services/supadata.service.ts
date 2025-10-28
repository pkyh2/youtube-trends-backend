import supadata, { TranscriptResponse } from "../config/supadata";

export class SupadataService {
  async getTranscript(videoId: string): Promise<TranscriptResponse> {
    const transcriptResult = await supadata.transcript({
      url: `https://www.youtube.com/watch?v=${videoId}`,
      lang: "en", // optional
      text: true, // optional: return plain text instead of timestamped chunks
      mode: "auto", // optional: 'native', 'auto', or 'generate'
    });
    return transcriptResult as TranscriptResponse;
  }
}

export const supadataService = new SupadataService();
