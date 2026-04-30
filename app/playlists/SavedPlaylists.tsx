"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { SavedPlaylist } from "@/types/types";
import { formatRelativeDate } from "@/lib/formatters";

const SavedPlaylists = () => {
  const [playlists, setPlaylists] = useState<SavedPlaylist[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem("saved-playlists");
      setPlaylists(raw ? JSON.parse(raw) : []);
    } catch {
      setPlaylists([]);
    }
  }, []);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const updated = playlists.filter((p) => p.id !== id);
    setPlaylists(updated);
    localStorage.setItem("saved-playlists", JSON.stringify(updated));
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
    <div className="playlist-grid">
      {playlists.map((playlist) => {
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
              <p className="muted">{formatRelativeDate(playlist.createdAt)}</p>
            </div>
            <button
              className="chrome-btn"
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                padding: "0.3rem 0.8rem",
                fontSize: "0.75rem",
              }}
              onClick={(e) => handleDelete(e, playlist.id)}
              aria-label="Delete playlist"
            >
              Delete
            </button>
          </Link>
        );
      })}
    </div>
  );
};

export default SavedPlaylists;
