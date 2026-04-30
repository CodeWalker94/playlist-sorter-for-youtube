"use client";

import { useMemo } from "react";
import { usePlaylistVideos } from "@/lib/hooks/usePlaylistVideos";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import SortDropdown from "@/components/UI/SortDropdown";
import VideoList from "@/components/VideoList/VideoList";
import Loader from "@/components/UI/Loader";

type PlaylistVideosClientProps = {
  playlistId: string;
  query: string;
};

const PlaylistVideosClient = ({
  playlistId,
  query,
}: PlaylistVideosClientProps) => {
  const { videos, isLoading, error, hasMore, loadMore } =
    usePlaylistVideos(playlistId);
  const [sortMode, setSortMode] = useLocalStorageState(
    `sort-playlist-videos-${playlistId}`,
    "recent",
  );

  const sortedVideos = useMemo(() => {
    if (sortMode === "alphabetical") {
      return [...videos].sort((a, b) => a.title.localeCompare(b.title));
    }
    return videos;
  }, [videos, sortMode]);

  if (error) return <p className="error-text">{error}</p>;

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

      <VideoList videos={sortedVideos} query={query} />

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

export default PlaylistVideosClient;
