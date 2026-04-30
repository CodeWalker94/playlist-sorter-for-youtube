# YouTube Playlist Sorter

> A personal dashboard for browsing, sorting, and curating YouTube playlists — built with Next.js 16, React 19, and the YouTube Data API v3.

---

## Overview

YouTube's native interface doesn't let you sort your playlists alphabetically, filter by title, or save custom collections of videos across playlists. This app solves that.

Sign in with Google, browse all your playlists, sort and search through videos, select the ones you want, and save them into your own curated playlists — all without touching YouTube directly.

---

## Features

- **Google OAuth sign-in** with automatic access token refresh (no repeated logins)
- **Account playlists** — full library loaded in the background, alphabetical sort auto-fetches all pages
- **Playlist by URL** — paste any public YouTube playlist URL to load and sort its videos
- **Video selection mode** — multi-select videos with checkboxes, select all, clear, and bulk actions
- **Save to playlist** — create a new saved playlist or add to an existing one, with automatic duplicate prevention
- **Saved playlists viewer** — browse saved collections in a dedicated page with sort, search, and select mode
- **Sort persistence** — sort preference per playlist saved to `localStorage`
- **Session cache** — playlist data cached in `sessionStorage` for fast revisits, refreshed on each page open

---

## Tech Stack

| Layer     | Technology                                  |
| --------- | ------------------------------------------- |
| Framework | Next.js 16 (App Router)                     |
| UI        | React 19, Tailwind CSS v4                   |
| Auth      | NextAuth v4 (Google OAuth)                  |
| Data      | YouTube Data API v3                         |
| Language  | TypeScript                                  |
| State     | React hooks + localStorage / sessionStorage |

---

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd youtube-playlist-sorter-app
npm install
```

### 2. Environment variables

This app requires a Google OAuth client ID and secret (via NextAuth) and a YouTube Data API v3 key. Create a `.env.local` file with the appropriate values — these are not committed to the repo.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
  playlists/
    page.tsx                  # Dashboard entry — Account / URL / Saved tabs
    [id]/                     # YouTube playlist video viewer
    saved/[id]/               # Saved playlist viewer
lib/
  hooks/
    useAccountPlaylists.ts    # Fetches and caches signed-in user's playlists
    usePlaylistVideos.ts      # Paginated video fetch with sessionStorage cache
    useUrlPlaylists.ts        # Loads a playlist by pasted URL
  API.ts                      # YouTube Data API v3 wrappers
components/
  Cards/VideoCard.tsx         # Vertical video card with selection mode
  UI/SavePlaylistModal.tsx    # Create or add to saved playlist modal
types/types.ts                # Shared TypeScript interfaces
```

---

## Key Decisions

- **App Router over Pages Router** — colocated layouts, server components for metadata, client components for interactivity
- **Token refresh in JWT callback** — users stay signed in across long sessions without re-authenticating
- **`entryId` for playlist items** — YouTube allows the same video to appear multiple times in a playlist. Using the playlist item's own ID (`item.id`) as the React key prevents duplicate key bugs
- **Sorted list requires full data** — YouTube's API returns playlists in its own order with no sort parameter. Switching to alphabetical triggers a `fetchAll()` to load every page before sorting

---

## What I built

This project was built across several sessions focused on:

- Setting up Google OAuth and handling long-lived sessions with refresh tokens
- Working with paginated YouTube API responses
- Building a reusable hook pattern for caching and loading state
- Implementing multi-select UI with bulk actions
- Managing cross-page state without a global store (localStorage + URL params)
- Designing a clean dark UI with Tailwind v4 and custom CSS variables
