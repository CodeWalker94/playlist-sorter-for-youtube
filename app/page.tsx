export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 gap-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-foreground mb-3">
          Sort Your YouTube Playlists
        </h1>
        <p className="text-muted max-w-md mx-auto">
          Connect your account to load all your playlists, or paste a single
          playlist URL to get started immediately.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        {/* Panel 1 — Connect Account */}
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-surface border border-border text-center">
          <span className="text-5xl">📺</span>
          <h2 className="text-lg font-semibold text-foreground">
            Connect Account
          </h2>
          <p className="text-sm text-muted">
            Sign in with Google to load and save all your YouTube playlists.
          </p>
          {/* TODO: Wire to Google OAuth — you'll build this */}
          <button className="w-full py-2 rounded-full bg-yt-red text-white font-medium hover:bg-yt-red-hover transition-colors">
            Connect YouTube
          </button>
        </div>

        {/* Panel 2 — Paste URL */}
        <div className="flex flex-col items-center gap-4 p-8 rounded-2xl bg-surface border border-border text-center">
          <span className="text-5xl">🔗</span>
          <h2 className="text-lg font-semibold text-foreground">
            Add a Playlist
          </h2>
          <p className="text-sm text-muted">
            Paste any YouTube playlist URL to search and filter its videos.
          </p>
          {/*
            NOTE: When you add state/onChange to this input,
            extract this section into its own "use client" component.
          */}
          <input
            type="url"
            placeholder="https://youtube.com/playlist?list=..."
            className="w-full px-3 py-2 rounded-lg bg-surface-elevated border border-border text-foreground text-sm placeholder:text-muted focus:outline-none focus:border-yt-red transition-colors"
          />
          <button className="w-full py-2 rounded-full border border-border text-foreground text-sm font-medium hover:bg-surface-elevated transition-colors">
            Load Playlist
          </button>
        </div>
      </div>
    </div>
  );
}
