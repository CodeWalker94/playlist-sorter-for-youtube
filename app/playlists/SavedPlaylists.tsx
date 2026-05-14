"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { SavedPlaylist } from "@/types/types";
import { formatRelativeDate } from "@/lib/formatters";
import ConfirmModal from "@/components/UI/ConfirmModal";
import Toast from "@/components/UI/Toast";

const SavedPlaylists = ({ query = "" }: { query?: string }) => {
  const [playlists, setPlaylists] = useState<SavedPlaylist[]>([]);
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("saved-playlists");
      setPlaylists(raw ? JSON.parse(raw) : []);
    } catch {
      setPlaylists([]);
    }
  }, []);

  const displayedPlaylists = useMemo(() => {
    const q = query.trim().toLowerCase();
    return q
      ? playlists.filter((p) => p.title.toLowerCase().includes(q))
      : playlists;
  }, [playlists, query]);

  const confirmDelete = () => {
    if (!pendingDeleteId) return;
    const updated = playlists.filter((p) => p.id !== pendingDeleteId);
    setPlaylists(updated);
    localStorage.setItem("saved-playlists", JSON.stringify(updated));
    setPendingDeleteId(null);
    setToastMessage("Playlist deleted.");
  };

  if (playlists.length === 0) {
    return (
      <p className="text-muted">
        No saved playlists yet. Select videos from any playlist and save them
        here.
      </p>
    );
  }

  return (
    <>
      {displayedPlaylists.length === 0 ? (
        <p className="muted">No saved playlists match your search.</p>
      ) : (
        <div className="playlist-grid">
          {displayedPlaylists.map((playlist) => {
            const thumbUrl = playlist.videos[0]?.thumbnailUrl ?? "";
            return (
              <Link
                key={playlist.id}
                href={`/playlists/saved/${playlist.id}`}
                className="chrome-card playlist-card"
                style={{ position: "relative" }}
              >
                {thumbUrl && (
                  <div className="playlist-card-thumb">
                    <Image
                      src={thumbUrl}
                      alt={playlist.title}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                    <div className="playlist-card-count">
                      <span>{playlist.videos.length}</span>
                      <span>videos</span>
                    </div>
                  </div>
                )}
                <div className="playlist-card-info">
                  <h3 className="card-title line-clamp-2">{playlist.title}</h3>
                  <p className="muted" style={{ marginTop: "4px" }}>
                    {playlist.videos.length} video
                    {playlist.videos.length !== 1 ? "s" : ""}
                  </p>
                  <p className="muted">
                    {formatRelativeDate(playlist.createdAt)}
                  </p>
                </div>
                <button
                  className="chrome-btn absolute top-2.5 right-2.5 px-3 py-1 text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    setPendingDeleteId(playlist.id);
                  }}
                  aria-label="Delete playlist"
                >
                  Delete
                </button>
              </Link>
            );
          })}
        </div>
      )}

      {pendingDeleteId && (
        <ConfirmModal
          message="Delete this playlist? This cannot be undone."
          onConfirm={confirmDelete}
          onCancel={() => setPendingDeleteId(null)}
        />
      )}

      {toastMessage && (
        <Toast message={toastMessage} onDismiss={() => setToastMessage("")} />
      )}
    </>
  );
};

export default SavedPlaylists;
