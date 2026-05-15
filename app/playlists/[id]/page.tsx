import Search from "@/components/Search/Search";
import { fetchYoutubeData, fetchYoutubeAccountData } from "@/lib/API";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import PlaylistVideosClient from "./PlaylistVideosClient";

interface PlaylistPageProps {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ query?: string }>;
}

const PlaylistPage = async ({ params, searchParams }: PlaylistPageProps) => {
  const { id } = await params;
  const { query = "" } = await searchParams;

  // Fetch the playlist title server-side only
  const session = await getServerSession(authOptions);
  const token = session?.accessToken;

  let playlistTitle = "Playlist";
  try {
    const playlistMetaEndpoint = `/playlists?part=snippet&id=${id}`;
    let playlistMetaRes: { items?: Array<{ snippet?: { title?: string } }> };
    try {
      playlistMetaRes = token
        ? await fetchYoutubeAccountData(playlistMetaEndpoint, token)
        : await fetchYoutubeData(playlistMetaEndpoint);
    } catch (err) {
      if (token && err instanceof Error && err.message.includes("401")) {
        playlistMetaRes = await fetchYoutubeData(playlistMetaEndpoint);
      } else {
        throw err;
      }
    }
    playlistTitle = playlistMetaRes.items?.[0]?.snippet?.title || "Playlist";
  } catch (err) {
    console.error("[PlaylistPage] Failed to fetch playlist title:", err);
  }

  return (
    <div className="page-section">
      <h1 className="section-heading">{playlistTitle}</h1>
      <Search />

      {/* Video fetching, pagination, and filtering are all handled client-side */}
      <PlaylistVideosClient playlistId={id} query={query} />
    </div>
  );
};

export default PlaylistPage;
