"use client";

import Link from "next/link";
import AuthButtons from "@/components/AuthButtons";

// Client Component — needed for AuthButtons (useSession requires client context).
const Header = () => {
  return (
    <header className="app-header chrome-header">
      <Link href="/" className="brand-link">
        <span className="brand-icon">▶</span>
        <span className="brand-title">PlaylistSorter</span>
      </Link>

      <div className="header-spacer" />

      <AuthButtons />
    </header>
  );
};

export default Header;
