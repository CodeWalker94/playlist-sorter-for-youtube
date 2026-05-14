# YouTube Playlist Sorter

A personal dashboard for browsing, sorting, and curating YouTube playlists. Built with Next.js 16, React 19, and the YouTube Data API v3.

![App screenshot placeholder](public/screenshot.png)

---

## The Problem

YouTube's native interface has no way to sort your playlists alphabetically, filter videos by title, or build a custom collection from videos across multiple playlists. This app fills that gap.

---

## Features

- **Google OAuth sign-in** — automatic access token refresh, no repeated logins after the first
- **Account playlists** — full library loaded in the background; alphabetical sort auto-fetches all pages
- **Playlist by URL** — paste any public YouTube playlist URL to load and filter without signing in
- **Per-tab search** — live filtering across account playlists, URL playlists, and saved playlists
- **Sort options** — sort by most recent or alphabetically, persisted per playlist via `localStorage`
- **Video selection mode** — checkboxes, select all, clear selection, bulk save
- **Save to playlist** — create a new saved collection or append to an existing one, with duplicate prevention
- **Saved playlists** — dedicated viewer with its own sort, search, and selection mode
- **Session cache** — playlist and video data cached in `sessionStorage` for fast revisits

---

## Tech Stack

| Layer     | Technology                                      |
| --------- | ----------------------------------------------- |
| Framework | Next.js 16 (App Router)                         |
| UI        | React 19, Tailwind CSS v4                       |
| Auth      | NextAuth v4 (Google OAuth)                      |
| Data      | YouTube Data API v3                             |
| Language  | TypeScript                                      |
| State     | React hooks + `localStorage` / `sessionStorage` |

---

## Getting Started

### Prerequisites

- Node.js 18+
- A Google Cloud project with **YouTube Data API v3** enabled
- A Google OAuth 2.0 client (Web Application type)

### Setup

```bash
git clone <your-repo-url>
cd youtube-playlist-sorter-app
npm install
```

Copy `.env.example` to `.env.local` and fill in your credentials:

```bash
cp .env.example .env.local
```

Required variables: Google OAuth client ID and secret, YouTube Data API key, and a NextAuth secret. None of these are committed to the repo.

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
app/
  page.tsx                        # Landing — sign in or paste URL
  playlists/
    page.tsx                      # Dashboard — Account / URL / Saved tabs
    [id]/page.tsx                 # Playlist video viewer
    saved/[id]/page.tsx           # Saved playlist viewer
components/
  Cards/VideoCard.tsx             # Video card with selection checkbox
  UI/
    SavePlaylistModal.tsx         # Create or append to a saved playlist
    SortDropdown.tsx              # Reusable sort control
    Toast.tsx                     # Feedback toasts
  Search/Search.tsx               # Dual-mode: URL routing or local state filtering
lib/
  hooks/
    useAccountPlaylists.ts        # Paginated fetch + sessionStorage cache
    usePlaylistVideos.ts          # Video fetch, load more, fetch all
    useUrlPlaylists.ts            # Public playlist load by ID
    useLocalStorageState.ts       # Typed localStorage with SSR guard
  API.ts                          # YouTube Data API v3 wrappers
types/types.ts                    # Shared TypeScript interfaces
```

---

## Technical Notes

**Dual-mode search** — The `Search` component works in two modes: URL-param routing (triggers server navigation) or `onChange` callback (local state, no navigation). Playlist filtering uses the local mode to avoid the `loading.tsx` Suspense boundary firing on every keystroke.

**Token refresh** — NextAuth's `jwt` callback calls a `refreshAccessToken()` function when the Google access token expires, keeping users signed in across long sessions without prompting them to re-authenticate.

**`entryId` vs `videoId`** — YouTube allows the same video to appear multiple times in a playlist. The playlist item's own ID (`item.id`) is used as the React key and for delete/reorder operations, while `item.contentDetails.videoId` is used for video detail fetches and watch URLs.

**Full-fetch on sort** — YouTube's API returns results in insertion order with no server-side sort parameter. Switching to alphabetical sort triggers `fetchAll()` to load every page before sorting client-side.

**Versioned cache keys** — `sessionStorage` keys include a version suffix (`playlistVideos:v3:<id>`) so cached data from old data shapes is ignored automatically when the schema changes.

---

## What I Learned

- Google OAuth with long-lived sessions — `access_type: "offline"`, `prompt: "consent"`, and refresh token rotation
- Paginated API design — accumulating results across multiple `pageToken` requests
- `AbortController` cleanup in async `useEffect` to prevent state updates on unmounted components
- Reusable hook pattern with `sessionStorage` caching for perceived performance
- App Router Suspense behavior — `router.replace()` counts as navigation and fires `loading.tsx`
- Tailwind v4's `@theme inline` token system for custom design variables
