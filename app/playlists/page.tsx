"use client";
import { useSearchParams } from "next/navigation";
import AccountPlaylists from "./AccountPlaylists";
import URLPlaylists from "./URLPlaylists";
import SavedPlaylists from "./SavedPlaylists";

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
  } else if (mode === "saved") {
    content = <SavedPlaylists />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-heading">Your Playlists</h1>
      </div>
      {content}
    </div>
  );
};

export default PlaylistsPage;
