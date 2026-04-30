"use client";
import { useSearchParams } from "next/navigation";
import AccountPlaylists from "./AccountPlaylists";
import URLPlaylists from "./URLPlaylists";
import CuratedPlaylists from "./CuratedPlaylists";

const PlaylistsPage = () => {
  const params = useSearchParams();
  const mode = params.get("mode");
  const playlistId = params.get("playlistId");

  // TODO: replace null with a fallback component if you want a proper empty state
  let content = null;

  if (mode === "account") {
    content = <AccountPlaylists />;
  } else if (mode === "url") {
    content = <URLPlaylists playlistId={playlistId ?? ""} />;
  } else if (mode === "curated") {
    content = <CuratedPlaylists />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-heading">Your Playlists</h1>
      </div>
      {/* TODO: {content} renders whichever view component matches the current mode */}
      {content}
    </div>
  );
};

export default PlaylistsPage;
