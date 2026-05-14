"use client";

import { useMemo } from "react";
import PlaylistCard from "@/components/Cards/PlaylistCard";
import SortDropdown from "@/components/UI/SortDropdown";
import { useAccountPlaylists } from "@/lib/hooks/useAccountPlaylists";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import Loader from "@/components/UI/Loader";

const AccountPlaylists = ({ query = "" }: { query?: string }) => {
  const { playlists, isLoading, error, status } = useAccountPlaylists();
  const [sortMode, setSortMode] = useLocalStorageState(
    "sort-account-playlists",
    "recent",
  );

  const sortedPlaylists = useMemo(() => {
    const q = query.trim().toLowerCase();
    let list = q
      ? playlists.filter((p) => p.title.toLowerCase().includes(q))
      : playlists;
    if (sortMode === "alphabetical") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [playlists, sortMode, query]);

  if (status === "loading") {
    return (
      <div className="page-section min-h-screen flex items-center justify-center px-6 text-center">
        <Loader />
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <p>Please sign in with Google to load your playlists.</p>;
  }

  if (error) {
    return <p className="error-text">{error}</p>;
  }

  if (!playlists.length && !isLoading) {
    return <p>No playlists found for this account.</p>;
  }

  return (
    <div>
      <div className="mb-5 flex items-center gap-4">
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

      {sortedPlaylists.length === 0 ? (
        <p className="muted">No playlists match your search.</p>
      ) : (
        <div className="playlist-grid">
          {sortedPlaylists.map((playlist) => (
            <PlaylistCard key={playlist.id} {...playlist} />
          ))}
        </div>
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default AccountPlaylists;
