"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";


const parsePlaylistId = (url: string) => {
  try {
    return new URL(url).searchParams.get("list") || "";
  } catch {
    return "";
  }
};

const HomePage = () => {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const handleAccountLink = () => {
    signIn("google", {callbackUrl: "/playlists?mode=account" } )
  }

  const handleLoad = () => {
    const id = parsePlaylistId(url);
     if (id) router.push(`/playlists?mode=url&playlistId=${id}`);


  }
  return (
    <div className="page-root">
      <div className="page-intro">
        <h1 className="page-title">Sort Your YouTube Playlists</h1>
        <p className="page-copy">
          Connect your account to load all your playlists, or paste a single
          playlist URL to get started immediately.
        </p>
      </div>

      <div className="panel-grid">
        {/* Panel 1 — Connect Account */}
        <div className="panel-card">
          <span className="panel-card-icon">📺</span>
          <h2 className="panel-card-title">Connect Account</h2>
          <p className="panel-card-copy">
            Sign in with Google to load and save all your YouTube playlists.
          </p>
          {/* TODO: Wire to Google OAuth — you'll build this */}
          <button className="button button-primary" onClick={handleAccountLink}>Connect YouTube Account</button>
        </div>

        {/* Panel 2 — Paste URL */}
        <div className="panel-card">
          <span className="panel-card-icon">🔗</span>
          <h2 className="panel-card-title">Add a Playlist</h2>
          <p className="panel-card-copy">
            Paste any YouTube playlist URL to search and filter its videos.
          </p>
          {/*
            NOTE: When you add state/onChange to this input,
            extract this section into its own "use client" component.
          */}
          <input
            type="url"
            placeholder="https://youtube.com/playlist?list=..."
            className="form-input"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button className="button button-secondary" onClick={handleLoad}>Load Playlist</button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
