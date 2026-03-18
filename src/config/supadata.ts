import { Supadata } from "@supadata/js";
import dotenv from "dotenv";

dotenv.config();

const SUPADATA_API_KEY = process.env.SUPADATA_API_KEY;

if (!SUPADATA_API_KEY) {
  throw new Error("SUPADATA_API_KEY is not defined in environment variables");
}

// Initialize the client
export const supadata = new Supadata({
  apiKey: SUPADATA_API_KEY,
});

export default supadata;
