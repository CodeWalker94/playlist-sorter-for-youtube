// Route: /playlists
// This page displays the grid of all loaded or saved playlists.

export default function PlaylistsPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-6">
        Your Playlists
      </h1>

      {/* TODO: Add sort/filter controls here */}

      {/* TODO: Build a PlaylistGrid component that:
           - receives an array of playlists as props
           - maps over them and renders a PlaylistCard for each
           - PlaylistCard links to /playlists/[id]
      */}

      <p className="text-muted">No playlists loaded yet.</p>
    </div>
  );
}
