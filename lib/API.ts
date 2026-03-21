
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const API_KEY  = process.env.API_KEY;


// For user-specific endpoints (requires OAuth token).
export const fetchYoutubeAccountData = async (endpoint: string, token: string) => {
const url = `${BASE_URL}${endpoint}&key=${API_KEY}`;  
const res = await fetch(url, {
  headers: {Authorization:`Bearer ${token}`}
});
if (!res.ok) throw new Error(`Youtube API error: ${res.status}`);
return res.json();
} 


// For public endpoints (API key only).
export const fetchYoutubeData = async (endpoint: string) => {
const url = `${BASE_URL}${endpoint}&key=${API_KEY}`;  
const res = await fetch(url);
if (!res.ok) throw new Error(`Youtube API error: ${res.status}`);
return res.json();
} 

// Grab playlists — pass mine=true + token for your own account, or channelId for a public channel
export const fetchPlaylist = async (channelId?: string, token?: string, mine?: boolean, pageToken?: string) => {
  const pagination = pageToken ? `&pageToken=${pageToken}` : "";
  
  if (mine) {
    if (!token) throw new Error("Token required to fetch your own playlists.");
    const privateEndpoint = `/playlists?part=snippet,contentDetails&mine=true&maxResults=50${pagination}`;
    return fetchYoutubeAccountData(privateEndpoint, token);
  }
  const publicEndpoint = `/playlists?part=snippet,contentDetails&channelId=${channelId}&maxResults=50${pagination}`;
  return fetchYoutubeData(publicEndpoint);
};


export const fetchPlaylistItems = async (playlistId: string, token?: string, pageToken?: string) => {
  const pagination = pageToken ? `&pageToken=${pageToken}` : "";
  const endpoint = `/playlistItems?part=snippet,contentDetails&playlistId=${playlistId}&maxResults=50${pagination}`;
  if (token) {
  return fetchYoutubeAccountData(endpoint, token);
}
return fetchYoutubeData(endpoint);
}

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
}
