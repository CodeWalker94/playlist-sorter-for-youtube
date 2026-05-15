"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import AuthButtons from "@/components/AuthButtons";

// Logo destination is context-aware:
// authenticated → playlists dashboard, unauthenticated → landing page
const Header = () => {
  const { data: session } = useSession();
  const homeHref = session ? "/playlists?mode=account" : "/";

  return (
    <header className="app-header chrome-header">
      <Link href={homeHref} className="brand-link">
        <span className="brand-icon">▶</span>
        <span className="brand-title">PlaylistSorter</span>
      </Link>

      <div className="header-spacer" />

      <AuthButtons />
    </header>
  );
};

export default Header;
