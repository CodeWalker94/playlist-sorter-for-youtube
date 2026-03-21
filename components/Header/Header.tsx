import Link from "next/link";

// Server Component — no interactivity yet.
// When you add a search bar, extract it as a separate "use client" component inside here.
export default function Header() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 bg-surface border-b border-border">
      <Link
        href="/"
        className="flex items-center gap-2 text-foreground hover:opacity-80 transition-opacity"
      >
        <span className="text-yt-red text-2xl font-bold">▶</span>
        <span className="font-semibold text-base">PlaylistSorter</span>
      </Link>

      {/* TODO: Search bar goes here — build as a Client Component */}
      <div className="flex-1 mx-8 hidden md:block" />

      {/* TODO: Wire this to Google OAuth sign-in */}
      <button className="px-4 py-1.5 text-sm font-medium rounded-full border border-border text-foreground hover:bg-surface-elevated transition-colors">
        Sign in
      </button>
    </header>
  );
}
