"use client";

import { useMemo, useState } from "react";
import { usePlaylistVideos } from "@/lib/hooks/usePlaylistVideos";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import SortDropdown from "@/components/UI/SortDropdown";
import SavePlaylistModal from "@/components/UI/SavePlaylistModal";
import VideoList from "@/components/VideoList/VideoList";
import Loader from "@/components/UI/Loader";
import Toast from "@/components/UI/Toast";
import { SavedPlaylist } from "@/types/types";

type PlaylistVideosClientProps = {
  playlistId: string;
  query: string;
};

const PlaylistVideosClient = ({
  playlistId,
  query,
}: PlaylistVideosClientProps) => {
  const { videos, isLoading, error, hasMore, loadMore, fetchAll } =
    usePlaylistVideos(playlistId);
  const [sortMode, setSortMode] = useLocalStorageState(
    `sort-playlist-videos-${playlistId}`,
    "recent",
  );

  // Selection state
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [savedPlaylists, setSavedPlaylists] = useState<SavedPlaylist[]>([]);
  const [toastMessage, setToastMessage] = useState("");

  const loadSavedPlaylists = () => {
    try {
      const raw = localStorage.getItem("saved-playlists");
      setSavedPlaylists(raw ? JSON.parse(raw) : []);
    } catch {
      setSavedPlaylists([]);
    }
  };

  // Filter + sort in one place (VideoList no longer does filtering)
  const displayedVideos = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    let list = normalizedQuery
      ? videos.filter(
          (v) =>
            v.title.toLowerCase().includes(normalizedQuery) ||
            v.channelTitle.toLowerCase().includes(normalizedQuery),
        )
      : videos;

    if (sortMode === "alphabetical") {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [videos, query, sortMode]);

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () =>
    setSelectedIds(new Set(displayedVideos.map((v) => v.entryId)));
  const clearSelection = () => setSelectedIds(new Set());

  const handleExitSelectMode = () => {
    setSelectMode(false);
    clearSelection();
  };

  const handleSave = (targetPlaylistId: string | null, title: string) => {
    const selectedVideos = videos.filter((v) => selectedIds.has(v.entryId));
    const existing: SavedPlaylist[] = JSON.parse(
      localStorage.getItem("saved-playlists") ?? "[]",
    );

    let updatedPlaylists: SavedPlaylist[];

    if (targetPlaylistId) {
      const target = existing.find((p) => p.id === targetPlaylistId);
      if (!target) {
        updatedPlaylists = existing;
      } else {
        const existingIds = new Set(target.videos.map((video) => video.id));
        const videosToAdd = selectedVideos.filter(
          (video) => !existingIds.has(video.id),
        );
        const merged = {
          ...target,
          videos: [...target.videos, ...videosToAdd],
        };
        updatedPlaylists = existing.map((playlist) =>
          playlist.id === targetPlaylistId ? merged : playlist,
        );
      }
    } else {
      const newPlaylist: SavedPlaylist = {
        id: Date.now().toString(),
        title,
        videos: selectedVideos,
        createdAt: new Date().toISOString(),
      };
      updatedPlaylists = [...existing, newPlaylist];
    }

    try {
      localStorage.setItem("saved-playlists", JSON.stringify(updatedPlaylists));
      setSavedPlaylists(updatedPlaylists);
    } catch {}

    setShowModal(false);
    setSelectMode(false);
    clearSelection();
    setToastMessage(
      targetPlaylistId ? "Videos added to playlist." : `"${title}" saved.`,
    );
  };

  if (error) return <p className="error-text">{error}</p>;

  return (
    <div>
      {/* Toolbar row */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <SortDropdown
          label="Sort"
          value={sortMode}
          options={[
            { value: "recent", label: "Most recent" },
            { value: "alphabetical", label: "Alphabetical" },
          ]}
          onChange={(value) => setSortMode(value as "recent" | "alphabetical")}
        />
        <button
          className={`chrome-btn${selectMode ? " chrome-btn-active" : ""}`}
          style={{ padding: "0.5rem 1.2rem" }}
          onClick={() =>
            selectMode ? handleExitSelectMode() : setSelectMode(true)
          }
        >
          {selectMode ? "Cancel" : "Select"}
        </button>
      </div>

      {/* Selection action bar — only visible in select mode */}
      {selectMode && (
        <div className="selection-bar mb-4">
          <span className="selection-tally">{selectedIds.size} selected</span>
          <button
            className="chrome-btn"
            style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}
            onClick={selectAll}
          >
            Select all ({displayedVideos.length})
          </button>
          {selectedIds.size > 0 && (
            <>
              <button
                className="chrome-btn"
                style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}
                onClick={clearSelection}
              >
                Clear
              </button>
              <button
                className="chrome-btn"
                style={{
                  padding: "0.4rem 1rem",
                  fontSize: "0.85rem",
                  marginLeft: "auto",
                }}
                onClick={() => {
                  loadSavedPlaylists();
                  setShowModal(true);
                }}
              >
                Save to playlist
              </button>
            </>
          )}
        </div>
      )}

      <VideoList
        videos={displayedVideos}
        isSelectMode={selectMode}
        selectedIds={selectedIds}
        onSelect={toggleSelect}
      />

      {isLoading && (
        <div className="flex justify-center mt-6">
          <Loader />
        </div>
      )}

      {(hasMore || true) && !isLoading && hasMore && (
        <div className="flex justify-center gap-3 mt-6">
          <button className="chrome-btn chrome-btn-large" onClick={loadMore}>
            Load More
          </button>
          <button className="chrome-btn chrome-btn-large" onClick={fetchAll}>
            Show All
          </button>
        </div>
      )}

      {showModal && (
        <SavePlaylistModal
          videoCount={selectedIds.size}
          existingPlaylists={savedPlaylists}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onDismiss={() => setToastMessage("")} />
      )}
    </div>
  );
};

export default PlaylistVideosClient;
