import { Transcript, TranscriptOrJobId } from "@supadata/js";
import supadata from "../config/supadata";
import { createLogger } from "../utils/logger.util";

export class SupadataService {
  private logger = createLogger("supadata-service");
  private readonly maxPollAttempts = 20;
  private readonly pollIntervalMs = 3000;

  private isTranscript(response: TranscriptOrJobId): response is Transcript {
    return "content" in response;
  }

  private async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  private hasTranscriptPayload(value: unknown): value is Transcript {
    return (
      typeof value === "object" &&
      value !== null &&
      "content" in value &&
      "lang" in value &&
      "availableLangs" in value
    );
  }

  private async waitForTranscriptJob(jobId: string): Promise<Transcript> {
    for (let attempt = 1; attempt <= this.maxPollAttempts; attempt += 1) {
      const jobResult = await supadata.transcript.getJobStatus(jobId);

      if (jobResult.status === "completed" && jobResult.result) {
        return jobResult.result;
      }

      if (jobResult.status === "completed") {
        if (this.hasTranscriptPayload(jobResult)) {
          return jobResult;
        }

        this.logger.error("Transcript job completed without result payload", {
          jobId,
          attempt,
          jobResult,
        });

        throw new Error("Supadata transcript job completed without result");
      }

      if (jobResult.status === "failed") {
        throw new Error(
          jobResult.error?.message || "Supadata transcript job failed"
        );
      }

      this.logger.info("Waiting for transcript job to complete", {
        jobId,
        attempt,
        status: jobResult.status,
      });

      if (attempt < this.maxPollAttempts) {
        await this.sleep(this.pollIntervalMs);
      }
    }

    throw new Error(
      `Supadata transcript job timed out after ${this.maxPollAttempts} attempts`
    );
  }

  async getTranscript(videoId: string): Promise<Transcript> {
    const transcriptResult = await supadata.transcript({
      url: `https://www.youtube.com/watch?v=${videoId}`,
      lang: "en", // optional
      text: true, // optional: return plain text instead of timestamped chunks
      mode: "auto", // optional: 'native', 'auto', or 'generate'
    });

    if (this.isTranscript(transcriptResult)) {
      return transcriptResult;
    }

    this.logger.info("Supadata returned async transcript job", {
      jobId: transcriptResult.jobId,
      videoId,
    });

    return await this.waitForTranscriptJob(transcriptResult.jobId);
  }
}

export const supadataService = new SupadataService();
