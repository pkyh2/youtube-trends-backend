import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

if (!YOUTUBE_API_KEY) {
  throw new Error("YOUTUBE_API_KEY is not defined in environment variables");
}

export const youtube = google.youtube({
  version: "v3",
  auth: YOUTUBE_API_KEY,
});

export const youtubeAnalytics = google.youtubeAnalytics({
  version: "v2",
  auth: YOUTUBE_API_KEY,
});

export const YOUTUBE_CONFIG = {
  API_KEY: YOUTUBE_API_KEY,
  MAX_RESULTS: 50, // YouTube API allows max 50 per request
  DEFAULT_REGION: "KR",
  MAX_WIDTH: 1280,
  MAX_HEIGHT: 720,
};
