import { Supadata } from "@supadata/js";
import dotenv from "dotenv";

dotenv.config();

const SUPADATA_API_KEY = process.env.SUPADATA_API_KEY;

if (!SUPADATA_API_KEY) {
  throw new Error("SUPADATA_API_KEY is not defined in environment variables");
}

export interface TranscriptResponse {
  content: string;
  lang: string; // ISO 639-1 language code
  availableLangs: string[]; // List of available languages
}

// Initialize the client
export const supadata = new Supadata({
  apiKey: SUPADATA_API_KEY,
});

export default supadata;
