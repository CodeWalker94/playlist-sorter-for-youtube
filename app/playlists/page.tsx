"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import AccountPlaylists from "./AccountPlaylists";
import URLPlaylists from "./URLPlaylists";
import SavedPlaylists from "./SavedPlaylists";
import Search from "@/components/Search/Search";

const PlaylistsPage = () => {
  const params = useSearchParams();
  const mode = params.get("mode") ?? "account";
  const playlistId = params.get("playlistId");
  const [query, setQuery] = useState("");

  let content;
  if (mode === "url") {
    content = <URLPlaylists playlistId={playlistId ?? ""} query={query} />;
  } else if (mode === "saved") {
    content = <SavedPlaylists query={query} />;
  } else {
    content = <AccountPlaylists query={query} />;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="section-heading">Your Playlists</h1>
        <Search placeholder="Search playlists..." onChange={setQuery} />
      </div>
      {content}
    </div>
  );
};

export default PlaylistsPage;
