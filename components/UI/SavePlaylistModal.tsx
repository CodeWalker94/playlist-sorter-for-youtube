"use client";

import { useState } from "react";
import { SavedPlaylist } from "@/types/types";

type SavePlaylistModalProps = {
  videoCount: number;
  existingPlaylists: SavedPlaylist[];
  onSave: (targetPlaylistId: string | null, title: string) => void;
  onCancel: () => void;
};

const SavePlaylistModal = ({
  videoCount,
  existingPlaylists,
  onSave,
  onCancel,
}: SavePlaylistModalProps) => {
  const [title, setTitle] = useState("");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState("");

  const isCreatingNew = selectedPlaylistId === "";
  const canSave = isCreatingNew ? title.trim().length > 0 : true;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSave) return;
    onSave(selectedPlaylistId || null, title.trim());
  };

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2
          className="section-heading"
          style={{ fontSize: "1.25rem", marginBottom: 0 }}
        >
          Save to playlist
        </h2>
        <p className="muted" style={{ marginTop: "-4px" }}>
          {videoCount} video{videoCount !== 1 ? "s" : ""} selected
        </p>
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "16px" }}
        >
          {existingPlaylists.length > 0 ? (
            <div
              style={{ display: "flex", flexDirection: "column", gap: "8px" }}
            >
              <label className="muted">Add to existing saved playlist</label>
              <select
                className="form-input"
                value={selectedPlaylistId}
                onChange={(e) => setSelectedPlaylistId(e.target.value)}
              >
                <option value="">Create new playlist</option>
                {existingPlaylists.map((playlist) => (
                  <option key={playlist.id} value={playlist.id}>
                    {playlist.title} ({playlist.videos.length} videos)
                  </option>
                ))}
              </select>
            </div>
          ) : null}

          {isCreatingNew ? (
            <input
              type="text"
              className="form-input"
              placeholder="New playlist title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
            />
          ) : (
            <p className="muted">
              Videos will be added to the selected saved playlist. Duplicates
              will be skipped.
            </p>
          )}

          <div
            style={{ display: "flex", gap: "12px", justifyContent: "flex-end" }}
          >
            <button
              type="button"
              className="chrome-btn"
              style={{ padding: "0.6rem 1.4rem" }}
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="chrome-btn"
              style={{ padding: "0.6rem 1.4rem" }}
              disabled={!canSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SavePlaylistModal;
