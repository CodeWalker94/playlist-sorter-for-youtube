/**
 * formatViews
 * Converts a raw view count into a compact readable string.
 *
 * Examples:
 *   999        → "999"
 *   1_500      → "1.5K"
 *   1_000_000  → "1M"
 *   2_300_000  → "2.3M"
 *   1_000_000_000 → "1B"
 */
export const formatViews = (views: number): string => {
  if (views >= 1_000_000_000) {
    const value = views / 1_000_000_000;
    return `${parseFloat(value.toFixed(1))}B`;
  }
  if (views >= 1_000_000) {
    const value = views / 1_000_000;
    return `${parseFloat(value.toFixed(1))}M`;
  }
  if (views >= 1_000) {
    const value = views / 1_000;
    return `${parseFloat(value.toFixed(1))}K`;
  }
  return views.toString();
};

/**
 * formatRelativeDate
 * Converts an ISO date string into a human-readable "time ago" string.
 *
 * Examples:
 *   "2026-03-11" → "1 day ago"
 *   "2026-02-12" → "4 weeks ago"
 *   "2025-03-12" → "1 year ago"
 */
export const formatRelativeDate = (dateString: string): string => {
  const now = new Date();
  const past = new Date(dateString);
  const diffMs = now.getTime() - past.getTime(); // difference in milliseconds

  const seconds = Math.floor(diffMs / 1_000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years >= 1) return `${years} year${years > 1 ? "s" : ""} ago`;
  if (months >= 1) return `${months} month${months > 1 ? "s" : ""} ago`;
  if (weeks >= 1) return `${weeks} week${weeks > 1 ? "s" : ""} ago`;
  if (days >= 1) return `${days} day${days > 1 ? "s" : ""} ago`;
  if (hours >= 1) return `${hours} hour${hours > 1 ? "s" : ""} ago`;
  if (minutes >= 1) return `${minutes} minute${minutes > 1 ? "s" : ""} ago`;
  return "Just now";
};
