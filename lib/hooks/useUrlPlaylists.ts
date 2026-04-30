import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { PlaylistCardProps, YTPlaylistItem } from "@/types/types";
import { fetchPlaylistById } from "@/lib/API";

export const useUrlPlaylists = (playlistId: string) => {
  const { status } = useSession();
  const [playlists, setPlaylists] = useState<PlaylistCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!playlistId) return;

    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    const loadPlaylist = async () => {
      try {
        const response = await fetchPlaylistById(playlistId);
        const items: YTPlaylistItem[] = response.items ?? [];
        const cards = items.map((item) => ({
          id: item.id,
          title: item.snippet.title,
          thumbnailUrl: item.snippet.thumbnails?.medium?.url ?? "",
          videos: item.contentDetails?.itemCount ?? 0,
        }));
        if (!controller.signal.aborted) setPlaylists(cards);
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

    loadPlaylist();
    return () => controller.abort();
  }, [playlistId]);
  return { playlists, isLoading, error, status };
};
