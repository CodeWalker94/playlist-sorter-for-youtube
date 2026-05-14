"use client";

import { useState, useMemo } from "react";
import { useParams } from "next/navigation";
import { SavedPlaylist } from "@/types/types";
import { useLocalStorageState } from "@/lib/hooks/useLocalStorageState";
import SortDropdown from "@/components/UI/SortDropdown";
import SavePlaylistModal from "@/components/UI/SavePlaylistModal";
import VideoList from "@/components/VideoList/VideoList";
import Toast from "@/components/UI/Toast";


export default function SavedPlaylistPage() {
  const { id } = useParams<{ id: string }>();
  const [playlist, setPlaylist] = useState<SavedPlaylist | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      const raw = localStorage.getItem("saved-playlists");
      const playlists: SavedPlaylist[] = raw ? JSON.parse(raw) : [];
      return playlists.find((p) => p.id === id) ?? null;
    } catch {
      return null;
    }
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMode, setSortMode] = useLocalStorageState(
    `sort-saved-${id}`,
    "recent",
  );
  const [selectMode, setSelectMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const displayedVideos = useMemo(() => {
    if (!playlist) return [];
    const q = searchQuery.trim().toLowerCase();
    let list = q
      ? playlist.videos.filter(
          (v) =>
            v.title.toLowerCase().includes(q) ||
            v.channelTitle.toLowerCase().includes(q),
        )
      : [...playlist.videos];
    if (sortMode === "alphabetical") {
      list = list.sort((a, b) => a.title.localeCompare(b.title));
    }
    return list;
  }, [playlist, searchQuery, sortMode]);

  const toggleSelect = (entryId: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(entryId)) next.delete(entryId);
      else next.add(entryId);
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

  const handleSave = (_targetPlaylistId: string | null, title: string) => {
    if (!playlist) return;
    const selectedVideos = playlist.videos.filter((v) =>
      selectedIds.has(v.entryId),
    );
    const newPlaylist: SavedPlaylist = {
      id: Date.now().toString(),
      title,
      videos: selectedVideos,
      createdAt: new Date().toISOString(),
    };
    try {
      const existing: SavedPlaylist[] = JSON.parse(
        localStorage.getItem("saved-playlists") ?? "[]",
      );
      localStorage.setItem(
        "saved-playlists",
        JSON.stringify([...existing, newPlaylist]),
      );
    } catch {}
    setShowModal(false);
    setSelectMode(false);
    clearSelection();
    setToastMessage(`"${title}" saved.`);
  };

  const handleRemoveSelected = () => {
    if (!playlist) return;
    const updated: SavedPlaylist = {
      ...playlist,
      videos: playlist.videos.filter((v) => !selectedIds.has(v.entryId)),
    };
    try {
      const existing: SavedPlaylist[] = JSON.parse(
        localStorage.getItem("saved-playlists") ?? "[]",
      );
      localStorage.setItem(
        "saved-playlists",
        JSON.stringify(
          existing.map((p) => (p.id === playlist.id ? updated : p)),
        ),
      );
    } catch {}
    setPlaylist(updated);
    setSelectMode(false);
    clearSelection();
    setToastMessage(
      `${selectedIds.size} video${selectedIds.size !== 1 ? "s" : ""} removed.`,
    );
  };

  if (!playlist) return <p className="text-muted">Playlist not found.</p>;

  return (
    <div className="page-section">
      <h1 className="section-heading">{playlist.title}</h1>


      {/* Search */}
      <div className="relative flex items-center mb-6">
        <label htmlFor="saved-search" className="sr-only">
          Search
        </label>
        <input
          id="saved-search"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search videos..."
          className="peer block w-full rounded-md border border-gray-700 bg-surface px-10 py-3 text-sm text-foreground outline-none focus:border-white"
        />
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
      </div>

      {/* Toolbar */}
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

      {/* Selection bar */}
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
                className="chrome-btn chrome-btn-danger"
                style={{ padding: "0.4rem 1rem", fontSize: "0.85rem" }}
                onClick={handleRemoveSelected}
              >
                Remove from playlist
              </button>
              <button
                className="chrome-btn"
                style={{
                  padding: "0.4rem 1rem",
                  fontSize: "0.85rem",
                  marginLeft: "auto",
                }}
                onClick={() => setShowModal(true)}
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

      {showModal && (
        <SavePlaylistModal
          videoCount={selectedIds.size}
          existingPlaylists={[]}
          onSave={handleSave}
          onCancel={() => setShowModal(false)}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onDismiss={() => setToastMessage("")} />
      )}
    </div>
  );
}
