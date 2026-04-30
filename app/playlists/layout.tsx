import Link from "next/link";

const PlaylistsLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="page-section min-h-screen">
      <div className="playlist-layout">
        <aside className="sidebar">
          <div className="mb-6">
            <p className="label-caps">Playlist dashboard</p>
            <h2 className="mt-2 text-2xl font-semibold">Views</h2>
          </div>
          <div className="nav-list">
            <Link href="/playlists?mode=account" className="nav-link">
              Account playlists
            </Link>
            <Link href="/playlists?mode=url" className="nav-link">
              Playlist by URL
            </Link>
            <Link href="/playlists?mode=saved" className="nav-link">
              Saved playlists
            </Link>
          </div>
        </aside>
        <section className="grow">{children}</section>
      </div>
    </div>
  );
};

export default PlaylistsLayout;
