"use client";

import { useMemo } from "react";
import PlaylistCard from "@/components/Cards/PlaylistCard";
import SortDropdown from "@/components/UI/SortDropdown";
import { useAccountPlaylists } from "@/lib/hooks/useAccountPlaylists";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import Loader from "@/components/UI/Loader";

const AccountPlaylists = () => {
  const { playlists, isLoading, error, status, hasMore, loadMore } =
    useAccountPlaylists();
  const [sortMode, setSortMode] = useLocalStorageState(
    "sort-account-playlists",
    "recent",
  );

  const sortedPlaylists = useMemo(() => {
    if (sortMode === "alphabetical") {
      return [...playlists].sort((a, b) => a.title.localeCompare(b.title));
    }
    return playlists;
  }, [playlists, sortMode]);

  if (status === "loading") {
    return <Loader />;
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

      <div className="playlist-grid">
        {sortedPlaylists.map((playlist) => (
          <PlaylistCard key={playlist.id} {...playlist} />
        ))}
      </div>

      {isLoading && <Loader />}

      {hasMore && !isLoading && (
        <div className="flex justify-center mt-6">
          <button className="chrome-btn chrome-btn-large" onClick={loadMore}>
            Load More
          </button>
        </div>
      )}
    </div>
  );
};

export default AccountPlaylists;
