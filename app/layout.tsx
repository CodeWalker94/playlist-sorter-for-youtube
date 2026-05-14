import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header/Header";
import Providers from "@/components/Providers";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PlaylistSorter for YouTube",
  description: "Search, filter, and sort your YouTube playlists",
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} antialiased bg-background text-foreground min-h-screen`}
      >
        <Providers>
          <Header />
          <main>{children}</main>
          <footer className="app-footer">
            <span>© {new Date().getFullYear()} PlaylistSorter for YouTube</span>
            <Link href="/privacy">Privacy Policy</Link>
          </footer>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
