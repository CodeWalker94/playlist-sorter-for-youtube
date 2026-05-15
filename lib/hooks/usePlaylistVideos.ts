"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { VideoCardProps } from "@/types/types";
import { fetchPlaylistVideos, fetchVideoDetails } from "@/lib/API";

const CACHE_VERSION = "v3";
const cacheKey = (id: string) => `playlistVideos:${CACHE_VERSION}:${id}`;
const tokenKey = (id: string) =>
  `playlistVideosNextPage:${CACHE_VERSION}:${id}`;

const readCache = (id: string): VideoCardProps[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(cacheKey(id));
    if (!raw) return [];
    const parsed = JSON.parse(raw) as VideoCardProps[];
    const hasEntryIds = parsed.every(
      (item) => typeof item.entryId === "string",
    );
    return hasEntryIds ? parsed : [];
  } catch {
    return [];
  }
};

const writeCache = (id: string, data: VideoCardProps[]) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(cacheKey(id), JSON.stringify(data));
  } catch {}
};

// Parses ISO 8601 duration strings like "PT4M13S" into total seconds
const parseDuration = (iso: string): number => {
  const match = iso.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return 0;
  return (
    parseInt(match[1] || "0", 10) * 3600 +
    parseInt(match[2] || "0", 10) * 60 +
    parseInt(match[3] || "0", 10)
  );
};

const mapVideoItems = (
  entries: Array<{ entryId: string; videoId: string }>,
  details: any[],
): VideoCardProps[] => {
  const detailMap = new Map<string, any>();
  details.forEach((video: any) => {
    if (video?.id) {
      detailMap.set(video.id, video);
    }
  });

  return entries
    .map((entry) => {
      const video = detailMap.get(entry.videoId);
      if (!video) return null;
      const snippet = video.snippet || {};
      const stats = video.statistics || {};
      return {
        entryId: entry.entryId,
        id: video.id,
        title: snippet.title || "",
        channelTitle: snippet.channelTitle || "",
        thumbnailUrl: snippet.thumbnails?.medium?.url || "",
        duration: parseDuration(video.contentDetails?.duration || ""),
        views: Number(stats.viewCount) || 0,
        datePosted: snippet.publishedAt || "",
      };
    })
    .filter(Boolean) as VideoCardProps[];
};

export const usePlaylistVideos = (playlistId: string) => {
  const { data: session } = useSession();
  const [videos, setVideos] = useState<VideoCardProps[]>(() =>
    readCache(playlistId),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(() =>
    typeof window !== "undefined"
      ? (sessionStorage.getItem(tokenKey(playlistId)) ?? undefined)
      : undefined,
  );

  const token = session?.accessToken;

  const fetchPage = async (pageToken?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // 1. Get playlist items — requires auth for private/account playlists
      // Do NOT fall back to API-key-only: private playlists return 404 without a token
      const playlistRes = await fetchPlaylistVideos(
        playlistId,
        token,
        pageToken,
      );
      const items = playlistRes.items || [];
      const entries = items
        .map((item: any) => {
          const videoId =
            item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
          return videoId ? { entryId: item.id, videoId } : null;
        })
        .filter(Boolean) as Array<{ entryId: string; videoId: string }>;
      const videoIds = Array.from(
        new Set(entries.map((entry) => entry.videoId)),
      );

      // 2. Get video details — same fallback pattern
      let detailsRes: any;
      try {
        detailsRes = await fetchVideoDetails(videoIds, token);
      } catch (err) {
        if (token && err instanceof Error && err.message.includes("401")) {
          detailsRes = await fetchVideoDetails(videoIds, undefined);
        } else {
          throw err;
        }
      }
      const details = Array.isArray(detailsRes)
        ? detailsRes
        : detailsRes.items || [];

      const mapped = mapVideoItems(entries, details);

      // 3. Append or set, then cache
      setVideos((prev) => {
        const updated = pageToken ? [...prev, ...mapped] : mapped;
        writeCache(playlistId, updated);
        return updated;
      });

      const next = playlistRes.nextPageToken ?? undefined;
      setNextPageToken(next);
      if (next) sessionStorage.setItem(tokenKey(playlistId), next);
      else sessionStorage.removeItem(tokenKey(playlistId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load videos");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Skip fetch if we already have cached data
    if (videos.length > 0) return;
    fetchPage();
  }, [playlistId, token]);

  const loadMore = () => {
    if (!nextPageToken || isLoading) return;
    fetchPage(nextPageToken);
  };

  // Fetches all remaining pages in sequence — used when a search query is active
  const fetchAll = async () => {
    if (isLoading || !nextPageToken) return;
    setIsLoading(true);
    setError(null);
    let cursor: string | undefined = nextPageToken;
    const accumulated: VideoCardProps[] = [];
    try {
      while (cursor) {
        const playlistRes = await fetchPlaylistVideos(
          playlistId,
          token,
          cursor,
        );
        const items = playlistRes.items || [];
        const entries = items
          .map((item: any) => {
            const videoId =
              item.contentDetails?.videoId || item.snippet?.resourceId?.videoId;
            return videoId ? { entryId: item.id, videoId } : null;
          })
          .filter(Boolean) as Array<{ entryId: string; videoId: string }>;
        const videoIds = Array.from(
          new Set(entries.map((entry) => entry.videoId)),
        );

        if (videoIds.length > 0) {
          let detailsRes: any;
          try {
            detailsRes = await fetchVideoDetails(videoIds, token);
          } catch (err) {
            if (token && err instanceof Error && err.message.includes("401")) {
              detailsRes = await fetchVideoDetails(videoIds, undefined);
            } else {
              throw err;
            }
          }
          const details = Array.isArray(detailsRes)
            ? detailsRes
            : detailsRes.items || [];
          accumulated.push(...mapVideoItems(entries, details));
        }
        cursor = playlistRes.nextPageToken ?? undefined;
      }
      setVideos((prev) => {
        const updated = [...prev, ...accumulated];
        writeCache(playlistId, updated);
        return updated;
      });
      setNextPageToken(undefined);
      sessionStorage.removeItem(tokenKey(playlistId));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load videos");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    videos,
    isLoading,
    error,
    hasMore: !!nextPageToken,
    loadMore,
    fetchAll,
  };
};
