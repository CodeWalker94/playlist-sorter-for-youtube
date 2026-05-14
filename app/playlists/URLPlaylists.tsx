"use client";

import { useMemo, useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import PlaylistCard from "@/components/Cards/PlaylistCard";
import SortDropdown from "@/components/UI/SortDropdown";
import { useUrlPlaylists } from "@/lib/hooks/useUrlPlaylists";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import Loader from "@/components/UI/Loader";
import { parsePlaylistId } from "@/lib/formatters";

const URLPlaylists = ({
  playlistId,
  query = "",
}: {
  playlistId: string;
  query?: string;
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const [sortMode, setSortMode] = useLocalStorageState(
    "sort-url-playlists",
    "recent",
  );
  const [urlValue, setUrlValue] = useState(
    playlistId ? `https://youtube.com/playlist?list=${playlistId}` : "",
  );

  // Auto-restore the last loaded playlist when navigating back via sidebar
  useEffect(() => {
    if (!playlistId && typeof window !== "undefined") {
      const saved = localStorage.getItem("last-url-playlist-id");
      if (saved) {
        router.replace(`${pathname}?mode=url&playlistId=${saved}`);
      }
    }
  }, [playlistId, pathname, router]);

  const { playlists, isLoading, error } = useUrlPlaylists(playlistId);

  const filteredPlaylists = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q
      ? playlists.filter((p) => p.title.toLowerCase().includes(q))
      : playlists;
    if (sortMode === "alphabetical") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [playlists, sortMode, query]);

  const handleLoad = () => {
    const id = parsePlaylistId(urlValue);
    if (id) {
      if (typeof window !== "undefined") {
        localStorage.setItem("last-url-playlist-id", id);
      }
      router.push(`${pathname}?mode=url&playlistId=${id}`);
    }
  };

  return (
    <div>
      <div className="mb-5 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <input
            type="url"
            placeholder="Paste a valid YouTube URL"
            className="form-input w-full"
            value={urlValue}
            onChange={(event) => setUrlValue(event.target.value)}
          />
        </div>
        <button className="chrome-btn chrome-btn-large" onClick={handleLoad}>
          Load Playlist
        </button>
      </div>

      <div className="mb-5">
        <SortDropdown
          label="Sort"
          value={sortMode}
          options={[
            { value: "recent", label: "Most recent" },
            { value: "alphabetical", label: "Alphabetical" },
          ]}
          onChange={(value) => setSortMode(value as "recent" | "alphabetical")}
        />
      </div>

      {isLoading ? (
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader />
        </div>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : playlistId ? (
        filteredPlaylists.length === 0 ? (
          <p className="muted">No playlists match your search.</p>
        ) : (
          <div className="playlist-grid">
            {filteredPlaylists.map((playlist) => (
              <PlaylistCard key={playlist.id} {...playlist} />
            ))}
          </div>
        )
      ) : null}
    </div>
  );
};

export default URLPlaylists;
