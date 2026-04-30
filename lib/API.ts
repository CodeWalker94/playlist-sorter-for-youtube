const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY = process.env.API_KEY;

// For user-specific endpoints (requires OAuth token).
export const fetchYoutubeAccountData = async (
  endpoint: string,
  token: string,
) => {
  const url = `${BASE_URL}${endpoint}&key=${API_KEY}`;
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) throw new Error(`Youtube API error: ${res.status}`);
  return res.json();
};

// For public endpoints (API key only).
export const fetchYoutubeData = async (endpoint: string) => {
  const url = `${BASE_URL}${endpoint}&key=${API_KEY}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Youtube API error: ${res.status}`);
  return res.json();
};

// Grab a single public playlist by ID (no token needed)
export const fetchPlaylistById = async (playlistId: string) => {
  const endpoint = `/playlists?part=snippet,contentDetails&id=${playlistId}&maxResults=1`;
  return fetchYoutubeData(endpoint);
};

// Grab playlists for the signed-in account only. Does not grabb videos
export const fetchMyPlaylists = async (token: string, pageToken?: string) => {
  const pagination = pageToken ? `&pageToken=${pageToken}` : "";
  const endpoint = `/playlists?part=snippet,contentDetails&mine=true&maxResults=50${pagination}`;
  return fetchYoutubeAccountData(endpoint, token);
};

// Grab the videos of a selected playlist
export const fetchPlaylistVideos = async (
  playlistId: string,
  token?: string,
  pageToken?: string,
) => {
  const pagination = pageToken ? `&pageToken=${pageToken}` : "";
  const endpoint = `/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50${pagination}`;
  if (token) {
    return fetchYoutubeAccountData(endpoint, token);
  }
  return fetchYoutubeData(endpoint);
};

// Grabs the video details for the video cards
export const fetchVideoDetails = async (videoIds: string[], token?: string) => {
  if (!videoIds.length) {
    return [];
  }
  const ids = videoIds.join(",");
  const endpoint = `/videos?part=snippet,contentDetails,statistics&id=${ids}`;
  if (token) {
    return fetchYoutubeAccountData(endpoint, token);
  }
  return fetchYoutubeData(endpoint);
};
