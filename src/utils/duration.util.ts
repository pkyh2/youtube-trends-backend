/**
 * Convert ISO 8601 duration format to seconds
 * Examples: PT1M30S -> 90, PT1H2M3S -> 3723
 */
export function parseISO8601Duration(duration: string): number {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);

  if (!match) {
    return 0;
  }

  const hours = parseInt(match[1] || '0', 10);
  const minutes = parseInt(match[2] || '0', 10);
  const seconds = parseInt(match[3] || '0', 10);

  return hours * 3600 + minutes * 60 + seconds;
}

/**
 * Determine aspect ratio from video dimension
 * YouTube API doesn't provide exact aspect ratio, so we estimate based on common patterns
 */
export function estimateAspectRatio(dimension: string, duration: number): string {
  // If video is very short (< 3 min), likely a short-form vertical video
  if (duration <= 180) {
    return '9:16';
  }

  // Default to standard widescreen
  return '16:9';
}
