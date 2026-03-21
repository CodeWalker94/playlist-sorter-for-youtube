// Route: /playlists/[id]
// Shows all videos inside a specific playlist with search and filter.

// In Next.js 15+, params is a Promise — always await it.
interface PlaylistPageProps {
  params: Promise<{ id: string }>;
}

export default async function PlaylistPage({ params }: PlaylistPageProps) {
  const { id } = await params;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-foreground mb-1">Playlist</h1>
      <p className="text-muted text-sm mb-6">ID: {id}</p>

      {/* TODO: Build SearchBar component (must be "use client" — needs useState) */}

      {/* TODO: Build VideoList component that:
           - receives an array of videos as props
           - filters them based on the search query
           - maps over filtered results and renders a VideoCard for each
           - VideoCard links out to the actual YouTube video URL
      */}

      <p className="text-muted">Loading videos...</p>
    </div>
  );
}
