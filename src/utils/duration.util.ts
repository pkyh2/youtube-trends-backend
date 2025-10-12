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
 * Note: YouTube API doesn't provide exact aspect ratio through contentDetails.dimension
 * The dimension field only indicates "2d" or "3d", not orientation.
 *
 * For accurate Shorts detection, use HTTP status code check instead.
 * This function is kept for backward compatibility but is not accurate.
 *
 * @deprecated Use HTTP-based Shorts detection in YouTubeService instead
 */
export function estimateAspectRatio(dimension: string, duration: number): string {
  // Default to standard widescreen
  // Note: This is an estimation and should not be relied upon for Shorts detection
  return '16:9';
}
