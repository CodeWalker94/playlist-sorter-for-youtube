import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { useYouTubeToken } from "@/lib/hooks/useYouTubeToken";
import { PlaylistCardProps, YTPlaylistItem } from "@/types/types";
import { fetchMyPlaylists } from "@/lib/API";

const CACHE_KEY = "accountPlaylists";

const readCache = (): PlaylistCardProps[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

const writeCache = (data: PlaylistCardProps[]) => {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {}
};

export const useAccountPlaylists = () => {
  const { isSignedIn, isLoaded } = useAuth();
  const { token: accessToken } = useYouTubeToken();
  const [playlists, setPlaylists] = useState<PlaylistCardProps[]>(() =>
    readCache(),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const mapItems = (items: YTPlaylistItem[]): PlaylistCardProps[] =>
    items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails?.medium?.url ?? "",
      videos: item.contentDetails?.itemCount ?? 0,
    }));

  useEffect(() => {
    if (!isLoaded || !isSignedIn || !accessToken) return;

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const loadPlaylists = async () => {
      try {
        const all: PlaylistCardProps[] = [];
        let cursor: string | undefined = undefined;
        do {
          if (controller.signal.aborted) return;
          const response = await fetchMyPlaylists(accessToken, cursor);
          const items: YTPlaylistItem[] = response.items ?? [];
          all.push(...mapItems(items));
          cursor = response.nextPageToken ?? undefined;
        } while (cursor);
        if (!controller.signal.aborted) {
          setPlaylists(all);
          writeCache(all);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            err instanceof Error ? err.message : "Failed to load playlists",
          );
        }
      } finally {
        if (!controller.signal.aborted) setIsLoading(false);
      }
    };

    loadPlaylists();
    return () => controller.abort();
  }, [isLoaded, isSignedIn, accessToken]);

  return {
    playlists,
    isLoading,
    error,
    status,
  };
};
