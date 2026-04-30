import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PlaylistCardProps, YTPlaylistItem } from "@/types/types";
import { fetchMyPlaylists } from "@/lib/API";

const CACHE_KEY = "accountPlaylists";
const TOKEN_KEY = "accountPlaylistsNextPage";

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
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState<PlaylistCardProps[]>(() =>
    readCache(),
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>(() =>
    typeof window !== "undefined"
      ? (sessionStorage.getItem(TOKEN_KEY) ?? undefined)
      : undefined,
  );

  const mapItems = (items: YTPlaylistItem[]): PlaylistCardProps[] =>
    items.map((item) => ({
      id: item.id,
      title: item.snippet.title,
      thumbnailUrl: item.snippet.thumbnails?.medium?.url ?? "",
      videos: item.contentDetails?.itemCount ?? 0,
    }));

  useEffect(() => {
    const accessToken = session?.accessToken;
    if (status !== "authenticated" || !accessToken) return;

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
          setNextPageToken(undefined);
          sessionStorage.removeItem(TOKEN_KEY);
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
  }, [status, session?.accessToken]);

  const loadMore = async () => {
    const accessToken = session?.accessToken;
    if (!accessToken || !nextPageToken || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetchMyPlaylists(accessToken, nextPageToken);
      const items: YTPlaylistItem[] = response.items ?? [];
      const mapped = mapItems(items);
      const updated = [...playlists, ...mapped];
      setPlaylists(updated);
      writeCache(updated);
      const token = response.nextPageToken ?? undefined;
      setNextPageToken(token);
      if (token) sessionStorage.setItem(TOKEN_KEY, token);
      else sessionStorage.removeItem(TOKEN_KEY);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to load more playlists",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAll = async () => {
    const accessToken = session?.accessToken;
    if (!accessToken || isLoading) return;
    setIsLoading(true);
    let cursor = nextPageToken;
    const accumulated: PlaylistCardProps[] = [];
    try {
      while (cursor) {
        const response = await fetchMyPlaylists(accessToken, cursor);
        const items: YTPlaylistItem[] = response.items ?? [];
        accumulated.push(...mapItems(items));
        cursor = response.nextPageToken ?? undefined;
      }
      const updated = [...playlists, ...accumulated];
      setPlaylists(updated);
      writeCache(updated);
      setNextPageToken(undefined);
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load playlists");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    playlists,
    isLoading,
    error,
    status,
    hasMore: !!nextPageToken,
    loadMore,
    fetchAll,
  };
};
