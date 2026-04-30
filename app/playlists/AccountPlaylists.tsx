"use client";

import { useMemo } from "react";
import PlaylistCard from "@/components/Cards/PlaylistCard";
import SortDropdown from "@/components/UI/SortDropdown";
import { useAccountPlaylists } from "@/lib/hooks/useAccountPlaylists";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import Loader from "@/components/UI/Loader";

const AccountPlaylists = () => {
  const { playlists, isLoading, error, status } = useAccountPlaylists();
  const [sortMode, setSortMode] = useLocalStorageState(
    "sort-account-playlists",
    "recent",
  );

  const handleSortChange = (value: string) => {
    setSortMode(value as "recent" | "alphabetical");
  };

  const sortedPlaylists = useMemo(() => {
    if (sortMode === "alphabetical") {
      return [...playlists].sort((a, b) => a.title.localeCompare(b.title));
    }
    return playlists;
  }, [playlists, sortMode]);

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
          onChange={handleSortChange}
        />
      </div>

      <div className="playlist-grid">
        {sortedPlaylists.map((playlist) => (
          <PlaylistCard key={playlist.id} {...playlist} />
        ))}
      </div>

      {isLoading && <Loader />}
    </div>
  );
};

export default AccountPlaylists;
