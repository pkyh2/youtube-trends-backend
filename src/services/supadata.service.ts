import supadata from "../config/supadata";

export class SupadataService {
  async getTranscript(): Promise<any> {
    const transcriptResult = await supadata.transcript({
      url: "https://www.youtube.com/watch?v=pOFCKN0DSYo",
      lang: "en", // optional
      text: true, // optional: return plain text instead of timestamped chunks
      mode: "auto", // optional: 'native', 'auto', or 'generate'
    });
    return transcriptResult;
  }
}

export const supadataService = new SupadataService();
